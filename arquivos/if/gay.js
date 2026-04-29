const axios = require("axios");
const fs = require("fs/promises");
const path = require("path");
const { createWriteStream } = require("fs");
const { execFile } = require("child_process");
const { promisify } = require("util");

const execFileAsync = promisify(execFile);
const TEMP_DIR = path.join(__dirname, "temp");

// Função auxiliar para criar delays (ajuda a evitar rate-overlimit)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Baixa um arquivo de uma URL e salva no destino especificado.
 */
async function baixarArquivo(url, destino) {
    const response = await axios.get(url, { 
        responseType: "stream",
        timeout: 30000 
    });
    await new Promise((resolve, reject) => {
        const writer = createWriteStream(destino);
        response.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
}

/**
 * Envia o áudio com proteção contra 'rate-overlimit' e correção de erro de arquivo.
 */
async function enviarAudioGay(from, sock, Info) {
    const audioLink = "https://tedzinho.com.br/upload/qibbBy.mp3";
    const timestamp = Date.now();
    const tempMp3 = path.join(TEMP_DIR, `temp_${timestamp}.mp3`);
    const tempOgg = path.join(TEMP_DIR, `temp_${timestamp}.ogg`);

    try {
        // Garante que o diretório temporário existe
        await fs.mkdir(TEMP_DIR, { recursive: true });

        // --- PREVENÇÃO DE RATE LIMIT ---
        // 1. Pequena pausa antes de começar qualquer ação de presença
        await delay(500);

        // 2. Atualiza status para "gravando" (isso avisa o WhatsApp que uma ação de áudio está vindo)
        await sock.sendPresenceUpdate("recording", from);
        
        // 3. Aguarda um tempo realista de "gravação"
        await delay(1500);

        // Baixa e processa o arquivo
        await baixarArquivo(audioLink, tempMp3);

        /**
         * Conversão ultra-compatível:
         * -vn: remove capas/metadados (evita erro de arquivo indisponível)
         * -map_metadata -1: limpa todos os metadados globais
         * -c:a libopus -b:a 32k -ar 48000 -ac 1: padrão PTT do WhatsApp
         */
        await execFileAsync("ffmpeg", [
            "-y",
            "-i", tempMp3,
            "-vn",
            "-map_metadata", "-1",
            "-c:a", "libopus",
            "-b:a", "32k",
            "-ar", "48000",
            "-ac", "1",
            "-f", "ogg",
            tempOgg
        ]);

        const audioBuffer = await fs.readFile(tempOgg);

        // 4. Envia a mensagem com o buffer
        await sock.sendMessage(from, {
            audio: audioBuffer,
            mimetype: "audio/ogg; codecs=opus",
            ptt: true
        }, { quoted: Info });

        // 5. Pequeno delay após o envio antes de limpar o status
        await delay(500);
        await sock.sendPresenceUpdate("available", from);

    } catch (e) {
        console.error("Erro no comando enviarAudioGay:", e.message);
        // Tenta garantir que o status volte ao normal em caso de erro
        try { await sock.sendPresenceUpdate("available", from); } catch {}
    } finally {
        // Limpeza de arquivos
        try {
            await fs.unlink(tempMp3);
            await fs.unlink(tempOgg);
        } catch {}
    }
}

module.exports = { enviarAudioGay };
