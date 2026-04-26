const axios = require("axios");
const fs = require("fs");
const path = require("path");

/**
 * Comando: play6
 * Função: Baixar áudio (MP3) do YouTube usando a API tedzinho.com.br.
 * Suporta pesquisa por nome e links diretos do YouTube.
 */
async function play6(sock, API_KEY_TED, from, args, Info) {
  const reply = (texto) => sock.sendMessage(from, { text: texto }, { quoted: Info });

  try {
    const query = args.join(" ").trim();

    if (!query) {
      return reply(`❌ Digite o nome da música ou cole o link do YouTube!\n\n*Exemplo:*\n.play6 Matuê - Quer Voar`);
    }

    await sock.sendMessage(from, { react: { text: "🔍", key: Info.key } });

    // A variável API_KEY_TED deve estar disponível globalmente no bot
    const key = typeof API_KEY_TED !== 'undefined' ? API_KEY_TED : "tedzinho";

    let videoUrl = "";
    let title = "Áudio do YouTube";

    // Verifica se a query já é um link do YouTube
    const isYoutubeLink = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(query);

    if (isYoutubeLink) {
        // Se for um link direto, usamos ele diretamente para o download
        videoUrl = query;
    } else {
        // Se não for link, fazemos a pesquisa
        const searchUrl = `https://tedzinho.com.br/api/pesquisa/youtube?apikey=${key}&query=${encodeURIComponent(query)}`;
        let searchData;
        try {
            const searchResponse = await axios.get(searchUrl);
            searchData = searchResponse.data;
        } catch (e) {
            console.error("Erro na API de pesquisa:", e.message);
            await sock.sendMessage(from, { react: { text: "❌", key: Info.key } });
            return reply("❌ Falha na conexão com a API de pesquisa.");
        }

        // Lógica robusta para extrair resultados da pesquisa
        let resultados = [];
        if (Array.isArray(searchData)) {
            resultados = searchData;
        } else if (searchData && Array.isArray(searchData.resultado)) {
            resultados = searchData.resultado;
        } else if (searchData && searchData.resultado && Array.isArray(searchData.resultado.resultado)) {
            resultados = searchData.resultado.resultado;
        }

        // Filtrar apenas itens do tipo 'video'
        const videos = resultados.filter(item => item.type === 'video');

        if (videos.length === 0) {
            console.error("Nenhum resultado encontrado. Resposta da API:", JSON.stringify(searchData));
            await sock.sendMessage(from, { react: { text: "❌", key: Info.key } });
            return reply("❌ Música não encontrada! Tente ser mais específico ou cole o link direto do vídeo.");
        }

        const video = videos[0];
        videoUrl = video.url || `https://youtube.com/watch?v=${video.videoId}`;
        title = video.title || "Áudio do YouTube";
    }
    
    await sock.sendMessage(from, { react: { text: "⏳", key: Info.key } });

    // Passo 2: A URL de download
    const downloadUrl = `https://tedzinho.com.br/api/download/play_audio/v9?apikey=${key}&nome_url=${encodeURIComponent(videoUrl)}`;

    const tempDir = path.join(__dirname, "../../temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    
    const fileName = `audio_play6_${Date.now()}.mp3`;
    const outputPath = path.join(tempDir, fileName);

    // Passo 3: Baixar o arquivo MP3
    try {
        const response = await axios({
            method: 'get',
            url: downloadUrl,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 60000 // 60 segundos de timeout
        });

        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        // Verificar se o arquivo foi realmente baixado e tem conteúdo
        const stats = fs.statSync(outputPath);
        if (stats.size < 1000) { // Se o arquivo for muito pequeno, provavelmente é um erro da API (HTML/JSON em vez de MP3)
            const content = fs.readFileSync(outputPath, 'utf8');
            if (content.includes('{"status":') || content.includes('<!DOCTYPE html>')) {
                throw new Error("A API retornou um erro em vez do arquivo de áudio.");
            }
        }

        // Enviar o áudio
        const audioBuffer = fs.readFileSync(outputPath);
        await sock.sendMessage(from, {
            audio: audioBuffer,
            mimetype: 'audio/mpeg',
            fileName: `${title.substring(0, 40)}.mp3`,
            ptt: false
        }, { quoted: Info });
        
        await sock.sendMessage(from, { react: { text: "✅", key: Info.key } });

        // Limpar arquivo temporário
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }

    } catch (e) {
        console.error("Erro no download ou envio do arquivo:", e.message);
        await sock.sendMessage(from, { react: { text: "❌", key: Info.key } });
        reply("❌ Erro ao processar o áudio. Isso pode acontecer se o vídeo for muito longo ou se a API estiver instável.");
        
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
    }

  } catch (e) {
    console.error("❌ Erro no play6:", e);
    reply("❌ Ocorreu um erro inesperado.");
  }
}

module.exports = play6;
