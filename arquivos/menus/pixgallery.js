const axios = require('axios');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const FormData = require('form-data');
const path = require('path');

const CATBOX_USERHASH = process.env.CATBOX_USERHASH || ''; 
// Se quiser vincular os uploads à sua conta do Catbox, defina essa variável.
// Se deixar vazio, o upload será anônimo.

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function unwrapMessageContent(message) {
    if (!message) return null;

    if (message.ephemeralMessage?.message) {
        return unwrapMessageContent(message.ephemeralMessage.message);
    }

    if (message.viewOnceMessage?.message) {
        return unwrapMessageContent(message.viewOnceMessage.message);
    }

    if (message.viewOnceMessageV2?.message) {
        return unwrapMessageContent(message.viewOnceMessageV2.message);
    }

    if (message.viewOnceMessageV2Extension?.message) {
        return unwrapMessageContent(message.viewOnceMessageV2Extension.message);
    }

    return message;
}

function getQuotedMessage(info) {
    const quotedRaw = info.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    return unwrapMessageContent(quotedRaw);
}

function getMediaFromMessage(info) {
    const main = unwrapMessageContent(info.message);
    const quoted = getQuotedMessage(info);

    const candidates = [main, quoted];

    for (const msg of candidates) {
        if (!msg) continue;

        if (msg.imageMessage) {
            return {
                type: 'image',
                media: msg.imageMessage,
                mimetype: msg.imageMessage.mimetype || 'image/jpeg',
                defaultName: 'upload.jpg'
            };
        }

        if (msg.videoMessage) {
            return {
                type: 'video',
                media: msg.videoMessage,
                mimetype: msg.videoMessage.mimetype || 'video/mp4',
                defaultName: 'upload.mp4'
            };
        }

        if (msg.audioMessage) {
            return {
                type: 'audio',
                media: msg.audioMessage,
                mimetype: msg.audioMessage.mimetype || 'audio/mpeg',
                defaultName: 'upload.mp3'
            };
        }

        if (msg.documentMessage) {
            return {
                type: 'document',
                media: msg.documentMessage,
                mimetype: msg.documentMessage.mimetype || 'application/octet-stream',
                defaultName: msg.documentMessage.fileName || 'arquivo'
            };
        }
    }

    return null;
}

function getDownloadType(mediaType) {
    switch (mediaType) {
        case 'image':
            return 'image';
        case 'video':
            return 'video';
        case 'audio':
            return 'audio';
        case 'document':
            return 'document';
        default:
            return null;
    }
}

function getExtensionFromMime(mimetype = '') {
    const map = {
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp',
        'image/gif': 'gif',
        'video/mp4': 'mp4',
        'video/webm': 'webm',
        'audio/mpeg': 'mp3',
        'audio/mp3': 'mp3',
        'audio/ogg': 'ogg',
        'audio/opus': 'opus',
        'audio/wav': 'wav',
        'application/pdf': 'pdf',
        'application/zip': 'zip',
        'application/x-rar-compressed': 'rar',
        'text/plain': 'txt'
    };

    return map[mimetype.toLowerCase()] || 'bin';
}

function sanitizeFileName(name = '') {
    return String(name)
        .replace(/[\\/:*?"<>|\r\n]+/g, '_')
        .replace(/\s+/g, '_')
        .slice(0, 120) || 'arquivo';
}

function buildFileName(defaultName, mimetype) {
    const safeName = sanitizeFileName(defaultName);
    const ext = getExtensionFromMime(mimetype);

    if (safeName.includes('.')) return safeName;
    return `${safeName}.${ext}`;
}

async function bufferFromStream(stream, maxSize) {
    const chunks = [];
    let totalLength = 0;

    for await (const chunk of stream) {
        totalLength += chunk.length;

        if (totalLength > maxSize) {
            throw new Error(`LIMIT_EXCEEDED:${totalLength}`);
        }

        chunks.push(chunk);
    }

    return Buffer.concat(chunks);
}

async function uploadToCatbox(buffer, filename, mimetype, userhash = '') {
    const form = new FormData();
    form.append('reqtype', 'fileupload');

    if (userhash && String(userhash).trim()) {
        form.append('userhash', String(userhash).trim());
    }

    form.append('fileToUpload', buffer, {
        filename,
        contentType: mimetype,
        knownLength: buffer.length
    });

    const response = await axios.post('https://catbox.moe/user/api.php', form, {
        headers: {
            ...form.getHeaders(),
            'Accept': '*/*',
            'User-Agent': 'Mozilla/5.0'
        },
        timeout: 180000,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        responseType: 'text',
        validateStatus: () => true
    });

    return {
        status: response.status,
        body: String(response.data || '').trim()
    };
}

module.exports = {
    comando: ['pixgallery', 'pixgal', 'catbox'],
    exec: async (sock, from, Info, args, prefix, sasah) => {
        const reply = async (text) => {
            return sock.sendMessage(from, { text }, { quoted: sasah });
        };

        try {
            const mediaData = getMediaFromMessage(Info);

            if (!mediaData) {
                return reply(
                    "❌ Envie ou marque uma mídia com o comando.\n\n" +
                    `Exemplo: ${prefix}catbox\n\n` +
                    "✅ Suporta: imagem, vídeo, áudio e documento\n" +
                    "📦 Limite do Catbox: 200MB por arquivo"
                );
            }

            const { type, media, mimetype, defaultName } = mediaData;
            const downloadType = getDownloadType(type);

            if (!downloadType) {
                return reply("❌ Tipo de mídia não suportado.");
            }

            await reply(
                "⏳ Baixando mídia e enviando para o Catbox...\n\n" +
                "📌 Armazenamento: permanente\n" +
                "📦 Limite: 200MB"
            );

            const maxSize = 200 * 1024 * 1024;
            const stream = await downloadContentFromMessage(media, downloadType);
            const buffer = await bufferFromStream(stream, maxSize);

            if (!buffer.length) {
                throw new Error('BUFFER_EMPTY');
            }

            const filename = buildFileName(defaultName, mimetype);
            const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);

            let lastResult = null;
            const retries = [0, 5000, 12000];

            for (let i = 0; i < retries.length; i++) {
                if (retries[i] > 0) {
                    await reply(`⏳ Catbox ocupado no momento. Nova tentativa ${i + 1}/${retries.length}...`);
                    await sleep(retries[i]);
                }

                const result = await uploadToCatbox(
                    buffer,
                    filename,
                    mimetype,
                    CATBOX_USERHASH
                );

                lastResult = result;
                const lowerBody = result.body.toLowerCase();

                if (result.status >= 200 && result.status < 300 && result.body.startsWith('http')) {
                    const fileUrl = result.body;
                    const uploadedName = path.basename(fileUrl);

                    const mensagemFinal =
                        `✅ *Upload concluído com sucesso!*\n\n` +
                        `🔗 *Link Direto:* ${fileUrl}\n` +
                        `📄 *Nome do Arquivo:* ${uploadedName}\n` +
                        `🧩 *Tipo:* ${mimetype}\n` +
                        `📦 *Categoria:* ${type}\n` +
                        `⚖️ *Tamanho:* ${sizeMb}MB\n` +
                        `🌐 *Serviço:* Catbox.moe\n` +
                        `🗂️ *Modo:* ${CATBOX_USERHASH ? 'Conta vinculada' : 'Upload anônimo'}\n\n` +
                        `_Observação: o Catbox é o modo permanente; não use Litterbox para arquivos duradouros._`;

                    return await reply(mensagemFinal);
                }

                if (
                    result.status === 412 ||
                    lowerBody.includes('uploads paused') ||
                    lowerBody.includes('please wait')
                ) {
                    continue;
                }

                break;
            }

            if (lastResult?.status === 412) {
                return await reply(
                    "❌ O Catbox está com uploads pausados temporariamente.\n\n" +
                    "Tente novamente em alguns minutos.\n" +
                    "Esse erro não é da sua mídia nem do comando."
                );
            }

            return await reply(
                "❌ Falha ao enviar para o Catbox.\n\n" +
                `Status: ${lastResult?.status || 'desconhecido'}\n` +
                `Detalhes: ${lastResult?.body || 'sem detalhes'}`
            );

        } catch (e) {
            console.error('Erro no upload Catbox:', e);

            if (String(e.message || '').startsWith('LIMIT_EXCEEDED:')) {
                const bytes = Number(String(e.message).split(':')[1] || 0);
                const sizeMb = (bytes / (1024 * 1024)).toFixed(2);

                return await sock.sendMessage(from, {
                    text:
                        `❌ O arquivo é muito grande.\n` +
                        `⚖️ Tamanho detectado: ${sizeMb}MB\n` +
                        `📌 Limite do Catbox: 200MB`
                }, { quoted: sasah });
            }

            let errorMsg = "❌ Erro ao realizar upload para o Catbox.";

            if (e.response) {
                errorMsg += `\nStatus: ${e.response.status}`;
                errorMsg += `\nDetalhes: ${
                    typeof e.response.data === 'string'
                        ? e.response.data
                        : JSON.stringify(e.response.data)
                }`;
            } else {
                errorMsg += `\nDetalhes: ${e.message}`;
            }

            await sock.sendMessage(from, { text: errorMsg }, { quoted: sasah });
        }
    }
};