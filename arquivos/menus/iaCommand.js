const axios = require("axios");
const fs = require("fs/promises");
const path = require("path");
const { createWriteStream } = require("fs");
const { execFile } = require("child_process");
const { promisify } = require("util");

const execFileAsync = promisify(execFile);

const TEMP_DIR = path.join(__dirname, "temp");
const BG_MUSIC_URL = "https://chat.tedzinho.com.br/uploads2/tlikzlwp1539.mp3";

const axiosClient = axios.create({
    timeout: 60000,
    headers: {
        "User-Agent": "Mozilla/5.0"
    }
});

async function baixarArquivo(url, destino) {
    const response = await axiosClient.get(url, {
        responseType: "stream"
    });

    await new Promise((resolve, reject) => {
        const writer = createWriteStream(destino);
        response.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
}

async function apagarArquivos(...arquivos) {
    for (const arquivo of arquivos) {
        try {
            await fs.unlink(arquivo);
        } catch {}
    }
}

/**
 * Limpa o texto para ser processado pela voz.
 * Remove emojis e caracteres especiais que podem causar erros na API de voz,
 * mas mantém a estrutura do texto (como quebras de linha e pontuação) 
 * para uma narração mais natural.
 */
function prepararTextoParaVoz(texto) {
    if (typeof texto !== "string") return "";
    return texto
        // Remove emojis
        .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")
        // Normaliza espaços e quebras de linha para evitar pausas estranhas
        .replace(/\s+/g, " ")
        .trim();
}

module.exports = async (sock, API_KEY_TED, from, sasah, args, prefix) => {
    const reply = (texto) => sock.sendMessage(from, { text: texto }, { quoted: sasah });
    const react = (emoji) => sock.sendMessage(from, { react: { text: emoji, key: sasah.key } });

    let tempWav;
    let tempOpus;
    let tempBgMusic;
    let tempImage;

    try {
        const pergunta = args.join(" ").trim();

        if (!pergunta) {
            return reply(`Você precisa digitar algo pra eu responder com IA!\n\nExemplo: ${prefix}ia Quem descobriu o Brasil?`);
        }

        await react("⏳");

        const iaUrl = "https://tedzinho.com.br/api/ia/ollama";

        const { data: iaResponse } = await axiosClient.get(iaUrl, {
            params: {
                apikey: API_KEY_TED,
                prompt: pergunta
            }
        });

        // Atualizado para o novo formato: iaResponse.resultado.resposta.text e iaResponse.resultado.resposta.image
        const respostaBruta = iaResponse?.resultado?.resposta?.text;
        const imageUrl = iaResponse?.resultado?.resposta?.image;

        if (iaResponse?.status !== "OK" || !respostaBruta) {
            await react("❌");
            return reply("Não consegui processar sua resposta agora. Tente novamente.");
        }

        // Prepara o texto exatamente como retornado pela IA para a narração
        const textoParaNarrar = prepararTextoParaVoz(respostaBruta);

        if (!textoParaNarrar) {
            await react("❌");
            return reply("A IA retornou uma resposta vazia.");
        }

        let audioUrl = null;

        try {
            const voiceUrl = "https://tedzinho.com.br/api/voz/gerar-triplo";

            const { data: voiceResponse } = await axiosClient.get(voiceUrl, {
                params: {
                    apikey: API_KEY_TED,
                    texto: textoParaNarrar
                }
            });

            const vozes = voiceResponse?.resultado?.resultados || [];
            const faberVoice = vozes.find(v => v.voz === "Faber");

            audioUrl = faberVoice?.url_completa || null;
        } catch (err) {
            console.error("Erro ao gerar voz:", err.message);
        }

        await fs.mkdir(TEMP_DIR, { recursive: true });
        const timestamp = `${Date.now()}_${Math.floor(Math.random() * 9999)}`;

        // Envia a imagem (sem legenda/texto) se existir
        if (imageUrl) {
            tempImage = path.join(TEMP_DIR, `ia_image_${timestamp}.jpg`);
            await baixarArquivo(imageUrl, tempImage);
            await sock.sendMessage(from, {
                image: { url: tempImage }
            }, { quoted: sasah });
        }

        // Envia o áudio (narração do texto da notícia/resposta)
        if (audioUrl) {
            tempWav = path.join(TEMP_DIR, `ia_voice_${timestamp}.wav`);
            tempOpus = path.join(TEMP_DIR, `ia_voice_${timestamp}.opus`);
            tempBgMusic = path.join(TEMP_DIR, `bg_music_${timestamp}.mp3`);

            await baixarArquivo(audioUrl, tempWav);
            await baixarArquivo(BG_MUSIC_URL, tempBgMusic);

            await execFileAsync("ffmpeg", [
                "-y",
                "-i", tempWav,
                "-stream_loop", "-1",
                "-i", tempBgMusic,
                "-filter_complex", "[1:a]volume=0.12[bg];[0:a][bg]amix=inputs=2:duration=shortest",
                "-c:a", "libopus",
                "-b:a", "128k",
                tempOpus
            ]);

            await sock.sendMessage(from, {
                audio: { url: tempOpus },
                mimetype: "audio/ogg; codecs=opus",
                ptt: true
            }, { quoted: sasah });
        } else if (!imageUrl) { 
            // Caso falhe o áudio e não tenha imagem, envia o texto como fallback
            await react("✅");
            return reply(respostaBruta);
        }

        await react("✅");

    } catch (e) {
        console.error("❌ ERRO NO COMANDO 'ia':");
        console.error(e.stack || e.message);

        try {
            await react("❌");
            await reply("Ocorreu um erro ao processar sua IA. Tente novamente daqui a pouco.");
        } catch {}
    } finally {
        await apagarArquivos(tempWav, tempOpus, tempBgMusic, tempImage);
    }
};
