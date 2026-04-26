const axios = require("axios");
const fs = require("fs");
const path = require("path");

/**
 * Comando: playvid6
 * Função: Baixar vídeo (MP4) do YouTube usando a API tedzinho.com.br.
 * Suporta pesquisa por nome e links diretos do YouTube.
 */
async function playvid6(sock, from, args, Info) {

  const reply = (texto) => {
    const options = (Info && Info.key) ? { quoted: Info } : {};
    return sock.sendMessage(from, { text: texto }, options);
  };

  try {
    const configPath = path.resolve(__dirname, "../../settings/config.json");
    let config = {};
    
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    } else {
      console.error("❌ Arquivo config.json não encontrado em:", configPath);
      // Fallback para evitar erro se o arquivo não existir durante testes
      config = { API_KEY_TED: "tedzinho" };
    }

    const apiKey = config.API_KEY_TED || "tedzinho";

    let query = "";
    if (Array.isArray(args)) {
      query = args.join(" ").trim();
    } else if (typeof args === "string") {
      query = args.trim();
    }

    if (!query) {
      return reply(
        `❌ Digite o nome do vídeo ou cole o link do YouTube!\n\n*Exemplo:*\n.playvid6 Matuê - Quer Voar`
      );
    }

    await safeReact(sock, from, Info, "🔍");

    let videoUrl = "";
    let videoTitle = "YouTube Video";

    // Verifica se a query já é um link do YouTube
    const isYoutubeLink = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(query);

    if (isYoutubeLink) {
        videoUrl = query;
    } else {
        // Se não for link, fazemos a pesquisa
        const searchUrl = `https://tedzinho.com.br/api/pesquisa/youtube?apikey=${encodeURIComponent(apiKey)}&query=${encodeURIComponent(query)}`;
        const searchResponse = await axios.get(searchUrl, {
          timeout: 30000,
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" }
        });
        
        const searchData = searchResponse.data;

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
          await safeReact(sock, from, Info, "❌");
          return reply("❌ Vídeo não encontrado! Tente ser mais específico ou use o link direto.");
        }

        const video = videos[0];
        videoUrl = video.url || `https://youtube.com/watch?v=${video.videoId}`;
        videoTitle = video.title || "YouTube Video";
    }

    await safeReact(sock, from, Info, "⏳");

    // Passo 2: Obter o link de download final
    const downloadApiUrl = `https://tedzinho.com.br/api/download/play_video/v5?apikey=${encodeURIComponent(apiKey)}&nome_url=${encodeURIComponent(videoUrl)}`;
    
    try {
        const downloadResponse = await axios.get(downloadApiUrl, {
          timeout: 60000,
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" }
        });
        
        const downloadData = downloadResponse.data;

        if (!downloadData?.status || !downloadData?.resultado) {
          await safeReact(sock, from, Info, "❌");
          return reply("❌ Erro ao processar o vídeo no servidor da API.");
        }

        const res = downloadData.resultado;
        const title = res.titulo || res.title || videoTitle;
        const finalVideoUrl = res.download_url;

        if (!finalVideoUrl) {
          await safeReact(sock, from, Info, "❌");
          return reply("❌ Link de download não gerado pela API.");
        }

        const sendOptions = (Info && Info.key) ? { quoted: Info } : {};
        
        // Enviar o vídeo diretamente via URL (mais eficiente se o servidor suportar)
        await sock.sendMessage(
          from,
          {
            video: { url: finalVideoUrl },
            mimetype: "video/mp4",
            fileName: `${sanitizeFileName(title)}.mp4`,
            caption: `✅ *${title}* baixado com sucesso!`
          },
          sendOptions
        );

        await safeReact(sock, from, Info, "✅");

    } catch (err) {
        console.error("Erro na API de download:", err.message);
        await safeReact(sock, from, Info, "❌");
        return reply("❌ Erro ao obter o link de download do vídeo.");
    }

  } catch (e) {
    console.error("❌ Erro no playvid6:", e);
    await safeReact(sock, from, Info, "❌");
    return reply(`❌ Ocorreu um erro inesperado: ${e.message}`);
  }
}

async function safeReact(sock, from, Info, emoji) {
  try {
    if (sock && from && Info && Info.key) {
      await sock.sendMessage(from, { react: { text: emoji, key: Info.key } });
    }
  } catch (err) {
      // Ignorar erros de reação
  }
}

function sanitizeFileName(name) {
  return String(name)
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60) || "video";
}

module.exports = playvid6;
