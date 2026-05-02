const config = require("../config.json");

// 🎄 Função para gerar data/hora formatada no fuso de Brasília
function getCurrentDateTime() {
    const now = new Date();
    // Força o fuso horário de Brasília (America/Sao_Paulo)
    const date = now.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const time = now.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" });
    return { date, time };
}

// 🎅 MENU DE NATAL — ${config.NomeDoBot}
function generateMenu() {
    const { date, time } = getCurrentDateTime();
    return `╔══════════════╗
   🎭 ${config.NomeDoBot} 🎭
╚══════════════╝
📅 ${date} • ⏰ ${time}  
👑 Dono: ${config.NickDono}

─────── ✦ MENU ✦ ───────

🎉 PRINCIPAL
▸ ${config.prefix}menuadm  
▸ ${config.prefix}brincadeiras  
▸ ${config.prefix}menulogos  

⚙️ SISTEMA
▸ ${config.prefix}ping  
▸ ${config.prefix}status  
▸ ${config.prefix}stats  
▸ ${config.prefix}roubar  
▸ ${config.prefix}revelar  
▸ ${config.prefix}sticker  
▸ ${config.prefix}legenda  
▸ ${config.prefix}toimg  
▸ ${config.prefix}jeff  
▸ ${config.prefix}faber  
▸ ${config.prefix}norian

✨ CONVERSÃO
▸ ${config.prefix}totext  
▸ ${config.prefix}ptvmsg  
▸ ${config.prefix}attp  
▸ ${config.prefix}ttp
▸ ${config.prefix}brat  
▸ ${config.prefix}gerarlink  
▸ ${config.prefix}rvisu  

📥 DOWNLOADS
▸ ${config.prefix}tomp3  
▸ ${config.prefix}8d (Efeito 3D) 🎧
▸ ${config.prefix}shazam  
▸ ${config.prefix}play (MP3/MP4)
▸ ${config.prefix}play2
▸ ${config.prefix}play3  
▸ ${config.prefix}playvid2
▸ ${config.prefix}sc  
▸ ${config.prefix}ttk
▸ ${config.prefix}ttk2  
▸ ${config.prefix}tiktok
▸ ${config.prefix}tiktok2  
▸ ${config.prefix}kwai  
▸ ${config.prefix}instamp3
▸ ${config.prefix}instamp4  
▸ ${config.prefix}myinstants  
▸ ${config.prefix}Pintemp3
▸ ${config.prefix}Pintemp4  
▸ ${config.prefix}Pinterest 
▸ ${config.prefix}Pinterest2  
▸ ${config.prefix}gif  
▸ ${config.prefix}robloxcodes  

👤 PERFIL
▸ ${config.prefix}perfil  
▸ ${config.prefix}perfilff

🎙️ ALTERADORES DE VOZ

───── ✦ BOA FOLIA ✦ ─────
`;
}

module.exports = generateMenu;
