const config = require("../config.json");

// Função para gerar data/hora formatada
function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const time = now.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" });
    return { date, time };
}

function generatemenulogos() {
    const { date, time } = getCurrentDateTime();

    return `
╔═════ ∘◦ ✨ ◦∘ ═════╗
      *${config.NomeDoBot}*
╚═════ ∘◦ ✨ ◦∘ ═════╝

🗓️ _${date}_
🕰️ _${time}_
👤 _Dono: ${config.NickDono}_

╰╦══════════════════ 🖋️
╭┤🖋️ 𝐋𝐎𝐆𝐎𝐒 𝟏 𝐓𝐄𝐗𝐓𝐎 🖋️
┃│〘🎨〙➢ ${config.prefix}Anime - Texto  
┃│〘🎨〙➢ ${config.prefix}Anime2 - Texto  
┃│〘🕹️〙➢ ${config.prefix}Game - Texto  
┃│〘❄️〙➢ ${config.prefix}Ffrose - Texto  
┃│〘🍃〙➢ ${config.prefix}Ffgren - Texto
┃│〘✨〙➢ ${config.prefix}Fluffy-logo - Texto
┃│〘🔥〙➢ ${config.prefix}Lava-logo - Texto
┃│〘😎〙➢ ${config.prefix}Cool-logo - Texto
┃│〘🗯️〙➢ ${config.prefix}Comic-logo - Texto
┃│〘🔥〙➢ ${config.prefix}Fire-logo - Texto
┃│〘💧〙➢ ${config.prefix}Water-logo - Texto
┃│〘🧊〙➢ ${config.prefix}Ice-logo - Texto
┃│〘🎀〙➢ ${config.prefix}Elegant-logo - Texto
┃│〘👑〙➢ ${config.prefix}Gold-logo - Texto
┃│〘🍀〙➢ ${config.prefix}Fortune-logo - Texto
┃│〘🔵〙➢ ${config.prefix}Blue-logo - Texto
┃│〘⚪〙➢ ${config.prefix}Silver-logo - Texto
┃│〘🌟〙➢ ${config.prefix}Neon-logo - Texto
┃│〘🛹〙➢ ${config.prefix}Skate-name - Texto
┃│〘📼〙➢ ${config.prefix}Retro-logo - Texto
┃│〘🍬〙➢ ${config.prefix}Candy-logo - Texto
┃│〘✨〙➢ ${config.prefix}Glossy-logo - Texto
┃│〘🎉〙➢ ${config.prefix}Newyear - Texto
┃│〘🐯〙➢ ${config.prefix}Tiger - Texto
┃│〘🎮〙➢ ${config.prefix}Pubgvideo - Texto
┃│〘🌌〙➢ ${config.prefix}Galaxy-light - Texto
┃│〘🌌〙➢ ${config.prefix}Galaxy - Texto
┃│〘🔀〙➢ ${config.prefix}Glitch - Texto
┃│〘🎨〙➢ ${config.prefix}Graffiti - Texto
┃│〘🔩〙➢ ${config.prefix}Metallic - Texto
┃│〘✨〙➢ ${config.prefix}Glossy - Texto
┃│〘🤖〙➢ ${config.prefix}Mascote - Texto
┃│〘🔥〙➢ ${config.prefix}Dragonfire - Texto
┃│〘💖〙➢ ${config.prefix}Goldpink - Texto
┃│〘🎮〙➢ ${config.prefix}Pubgavatar - Texto
┃│〘🎮〙➢ ${config.prefix}Ffavatar - Texto
┃│〘🚀〙➢ ${config.prefix}Amongus - Texto
┃│〘🗯️〙➢ ${config.prefix}Comics - Texto
┃│〘👾〙➢ ${config.prefix}Lolavatar - Texto
┃│〘⚰️〙➢ ${config.prefix}Cemiterio - Texto
┃│〘🩸〙➢ ${config.prefix}Blood - Texto
┃│〘🦇〙➢ ${config.prefix}Hallobat - Texto
┃│〘⚙️〙➢ ${config.prefix}Titanium - Texto
┃│〘🧽〙➢ ${config.prefix}Eraser - Texto
┃│〘🎃〙➢ ${config.prefix}Halloween - Texto
┃│〘❄️〙➢ ${config.prefix}Snow - Texto
┃│〘🇺🇸〙➢ ${config.prefix}America - Texto
┃│〘⚡〙➢ ${config.prefix}Mascoteneon - Texto
┃│〘🌀〙➢ ${config.prefix}Doubleexposure - Texto
┃│〘🔩〙➢ ${config.prefix}Metal - Texto
┃│〘🕳️〙➢ ${config.prefix}3dcrack - Texto
┃│〘🌈〙➢ ${config.prefix}Colorful - Texto
┃│〘🎈〙➢ ${config.prefix}Ballon - Texto
┃│〘🌈〙➢ ${config.prefix}Multicolor - Texto
┃│〘🖌️〙➢ ${config.prefix}Graffitipaint - Texto
┃│〘🖌️〙➢ ${config.prefix}Graffitistyle - Texto
┃│〘❄️〙➢ ${config.prefix}Frozen - Texto
┃│〘🔡〙➢ ${config.prefix}Ligatures - Texto
┃│〘🎨〙➢ ${config.prefix}Watercolor - Texto
┃│〘🏖️〙➢ ${config.prefix}Summerbeach - Texto
┃│〘☁️〙➢ ${config.prefix}Cloudsky - Texto
┃│〘🖥️〙➢ ${config.prefix}Techstyle - Texto
┃│〘👑〙➢ ${config.prefix}Royal - Texto
┃│〘🎆〙➢ ${config.prefix}Firework - Texto
┃│〘🤖〙➢ ${config.prefix}Mascotemetal - Texto
┃│〘🦸‍♂️〙➢ ${config.prefix}Captain - Texto
┃│〘🖍️〙➢ ${config.prefix}Graffitiwall - Texto
┃│〘🔥〙➢ ${config.prefix}Phlogo - Texto
┃│〘🎀〙➢ ${config.prefix}Blackpink - Texto
┃│〘💀〙➢ ${config.prefix}Deadpool - Texto
┃│〘✨〙➢ ${config.prefix}Glitter - Texto
┃│〘🕶️〙➢ ${config.prefix}Vintage3d - Texto
┃│〘📼〙➢ ${config.prefix}Retro - Texto
┃╰══ 🖋️
╰═════════════════ 🌟
`;
}

module.exports = generatemenulogos;