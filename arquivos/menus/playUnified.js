const axios = require("axios");
const { prepareWAMessageMedia, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

/**
 * Comando: play (Unificado)
 * Compatível com iPhone ✅
 */
async function playUnified(sock, from, Info, args, API_KEY_TED) {
    const react = async (emoji) => {
        try {
            await sock.sendMessage(from, { react: { text: emoji, key: Info.key } });
        } catch {}
    };

    const reply = (texto) => sock.sendMessage(from, { text: texto }, { quoted: Info });

    const formatViews = (num) => {
        if (!num || isNaN(num)) return "0";
        num = parseInt(num);
        if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' mi';
        if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        return num.toString();
    };

    try {
        const query = args.join(" ").trim();
        if (!query) {
            await react('⚠️');
            return reply(`❌ Digite o nome da música/vídeo ou cole o link do YouTube!`);
        }

        await react('🔍');

        const key = API_KEY_TED || "J";
        const searchUrl = `https://tedzinho.com.br/api/pesquisa/youtube?apikey=${key}&query=${encodeURIComponent(query)}`;

        const { data: searchData } = await axios.get(searchUrl);

        let resultados = [];
        if (Array.isArray(searchData)) {
            resultados = searchData;
        } else if (searchData?.resultado) {
            resultados = searchData.resultado.resultado || searchData.resultado;
        }

        if (!resultados.length) {
            await react('❌');
            return reply("❌ Nenhum resultado encontrado!");
        }

        const video = resultados[0];
        const videoUrl = video.url || `https://youtube.com/watch?v=${video.videoId}`;
        const title = video.title || "Vídeo do YouTube";
        const author = video.author?.name || "Desconhecido";
        const duration = video.timestamp || video.duration?.timestamp || "N/A";
        const views = formatViews(video.views);
        const thumbnail = video.thumbnail || video.image || "";

        const btnMp3 = `play_mp3|${videoUrl}`;
        const btnMp4 = `play_mp4|${videoUrl}`;

        const caption = `╔━᳀『 🎬 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 𝗣𝗟𝗔𝗬 』═᳀
┃
⌬ ✦ 𝗧𝗶́𝘁𝘂𝗹𝗼 : ${title}
⌬ ✦ 𝗖𝗮𝗻𝗮𝗹 : ${author}
⌬ ✦ 𝗗𝘂𝗿𝗮𝗰̧𝗮̃𝗼 : ${duration}
⌬ ✦ 𝗩𝗶𝘀𝘂𝗮𝗹𝗶𝘇𝗮𝗰̧𝗼̃𝗲𝘀 : ${views}
┃
⌬ ✦ 𝗘𝘀𝗰𝗼𝗹𝗵𝗮 𝘂𝗺𝗮 𝗼𝗽𝗰̧𝗮̃𝗼 𝗮𝗯𝗮𝗶𝘅𝗼
┃
╚═━═━═━═━═━═━═━═━═᳀

💫 𝗖𝗹𝗶𝗾𝘂𝗲 𝗻𝗼 𝗯𝗼𝘁𝗮̃𝗼 𝗱𝗲𝘀𝗲𝗷𝗮𝗱𝗼 💫`;

        const media = await prepareWAMessageMedia(
            { image: { url: thumbnail } },
            { upload: sock.waUploadToServer }
        );

        const cards = [{
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: caption
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: "Resultado da Busca",
                hasMediaAttachment: true,
                imageMessage: media.imageMessage
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                    {
                        name: "quick_reply",
                        buttonParamsJson: JSON.stringify({
                            display_text: "🎵 Áudio (MP3)",
                            id: btnMp3
                        })
                    },
                    {
                        name: "quick_reply",
                        buttonParamsJson: JSON.stringify({
                            display_text: "🎥 Vídeo (MP4)",
                            id: btnMp4
                        })
                    }
                ]
            })
        }];

        // ✅ SEM viewOnceMessage (compatível com iPhone)
        const message = generateWAMessageFromContent(from, {
            interactiveMessage: {
                body: { text: `🔎 Resultados para: ${query}` },
                carouselMessage: { cards },
                footer: { text: "TED BOT - Download Center" }
            }
        }, { quoted: Info });

        await sock.relayMessage(from, message.message, {
            messageId: message.key.id
        });

        await react('✅');

    } catch (e) {
        console.error("Erro no playUnified:", e);
        await react('❌');
        reply("❌ Ocorreu um erro ao processar sua solicitação.");
    }
}

module.exports = playUnified;