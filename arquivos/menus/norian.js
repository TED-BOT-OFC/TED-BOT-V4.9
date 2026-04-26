const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

module.exports = async function executarNorian({ sock, API_KEY_TED, from, Info, args, command }) {
  const canalInfo = {
    newsletterJid: "120363317585508358@newsletter",
    newsletterName: "TED BOT DOMINA",
    newsletterLink: "https://whatsapp.com/channel/120363317585508358"
  };

  const contextInfo = {
    forwardingScore: 1000000,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: canalInfo.newsletterJid,
      newsletterName: canalInfo.newsletterName
    }
  };

  let wavPath = null;
  let oggPath = null;

  try {
    const q = args.join(" ").trim();

    if (!q) {
      return await sock.sendMessage(
        from,
        {
          text: "Digite o texto para converter em áudio.\n\nExemplo:\n.jeff Olá tudo bem",
          contextInfo
        },
        { quoted: Info }
      );
    }

    await sock.sendMessage(from, {
      react: { text: "🗣️", key: Info.key }
    });

    const texto = encodeURIComponent(q);
    const apiUrl = `https://tedzinho.com.br/api/voz/gerar-triplo?apikey=${API_KEY_TED}&texto=${texto}`;

    const response = await axios.get(apiUrl, { timeout: 120000 });
    const data = response.data;

    if (
      !data ||
      data.status !== "OK" ||
      !data.resultado ||
      !Array.isArray(data.resultado.resultados)
    ) {
      throw new Error("Resposta inválida da API");
    }

    const resultados = data.resultado.resultados;
    const cmd = String(command || "").toLowerCase();

    let vozEscolhida = null;

    if (cmd === "jeff") {
      vozEscolhida = resultados.find(
        v => String(v?.voz || "").toLowerCase() === "jeff"
      );
    } else if (cmd === "faber") {
      vozEscolhida = resultados.find(
        v => String(v?.voz || "").toLowerCase() === "faber"
      );
    } else if (cmd === "norian") {
      vozEscolhida = resultados.find(
        v =>
          String(v?.tipo || "").toLowerCase() === "norian" ||
          String(v?.voz || "").toLowerCase() === "cadu"
      );
    }

    if (!vozEscolhida) {
      vozEscolhida = resultados[0];
    }

    if (!vozEscolhida?.url_completa) {
      throw new Error("URL do áudio não encontrada");
    }

    const audioResponse = await axios.get(vozEscolhida.url_completa, {
      responseType: "arraybuffer",
      timeout: 120000
    });

    const tempDir = path.join(__dirname, "../../temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const uniqueId = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    wavPath = path.join(tempDir, `${uniqueId}.wav`);
    oggPath = path.join(tempDir, `${uniqueId}.ogg`);

    fs.writeFileSync(wavPath, Buffer.from(audioResponse.data));

    await new Promise((resolve, reject) => {
      const ffmpegCmd = `ffmpeg -y -i "${wavPath}" -vn -map_metadata -1 -ac 1 -ar 48000 -c:a libopus -b:a 96k "${oggPath}"`;
      exec(ffmpegCmd, (error, stdout, stderr) => {
        if (error) {
          console.log("Erro ffmpeg:", stderr || error.message);
          return reject(error);
        }
        resolve();
      });
    });

    if (!fs.existsSync(oggPath)) {
      throw new Error("Arquivo OGG não foi criado");
    }

    const audioFinal = fs.readFileSync(oggPath);

    await sock.sendMessage(
      from,
      {
        audio: audioFinal,
        mimetype: "audio/ogg; codecs=opus",
        ptt: true,
        contextInfo
      },
      { quoted: Info }
    );

    await sock.sendMessage(from, {
      react: { text: "✅", key: Info.key }
    });

  } catch (e) {
    console.log("Erro TTS:", e?.response?.data || e?.message || e);

    try {
      await sock.sendMessage(
        from,
        {
          text: "Erro ao gerar ou enviar o áudio.",
          contextInfo
        },
        { quoted: Info }
      );
    } catch {}

    try {
      await sock.sendMessage(from, {
        react: { text: "❌", key: Info.key }
      });
    } catch {}
  } finally {
    try {
      if (wavPath && fs.existsSync(wavPath)) fs.unlinkSync(wavPath);
    } catch {}

    try {
      if (oggPath && fs.existsSync(oggPath)) fs.unlinkSync(oggPath);
    } catch {}
  }
};