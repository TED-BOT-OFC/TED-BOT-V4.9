const config = require("../config.json");

// Função para gerar data/hora formatada
function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const time = now.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" });
    return { date, time };
}

function generateBrincadeirasMenu() {
    const { date, time } = getCurrentDateTime();

    return `
╔═════ ∘◦ ✨ ◦∘ ═════╗
      *🎉 MENU DE BRINCADEIRAS 🎉*
╚═════ ∘◦ ✨ ◦∘ ═════╝

🗓️ _${date}_
🕰️ _${time}_
👤 _Dono: ${config.NickDono}_

┏━────╯⌬╰────━┓
┃   *🏆 TOP 5 - RANKS* 📊
┃ ▸ 🌈 ${config.prefix}rankgay      - *Top 5 Gays*
┃ ▸ 🐂 ${config.prefix}rankcorno    - *Top 5 Cornos*
┃ ▸ 😍 ${config.prefix}rankbelo     - *Top 5 Bonitos*
┃ ▸ 🤓 ${config.prefix}ranknerd     - *Top 5 Nerds*
┃ ▸ 💃 ${config.prefix}rankgostosa  - *Top 5 Gostosas*
┃ ▸ 🤡 ${config.prefix}rankotario   - *Top 5 Otários*
┃ ▸ 😂 ${config.prefix}rankfeio     - *Top 5 Feios*
┃ ▸ 💸 ${config.prefix}rankrico     - *Top 5 Milionários*
┃ ▸ 🎮 ${config.prefix}jokenpo      - *Pedra, Papel e Tesoura*
┃ ▸ 🏆 ${config.prefix}rankjkp      - *Ranking do Jokenpô*
┗━────╮⌬╭────━┛
┏━────╯🎲╰────━┓
┃   *🎯 AÇÕES COM MEMBROS*
┃ ▸ 👋 ${config.prefix}tapa @membro  - *Dá um tapa em alguém*
┃ ▸ 🍅 ${config.prefix}tomate @membro - *Joga um tomate em alguém*
┃ ▸ 🥰 ${config.prefix}carinho @membro - *Dá um carinho em alguém*
┃ ▸ 👏 ${config.prefix}aplaudir @membro - *Aplaude alguém*
┃ ▸ 💆‍♂️ ${config.prefix}cafune @membro - *Faz um cafuné em alguém*
┃ ▸ 🦵 ${config.prefix}chutar @membro - *Dá um chute em alguém*
┃ ▸ 👋 ${config.prefix}acenar @membro - *Acena para alguém*
┃ ▸ 💃 ${config.prefix}dancar @membro - *Dança com alguém*
┃ ▸ 🦷 ${config.prefix}morder @membro - *Dá uma mordida em alguém*
┃ ▸ 🔫 ${config.prefix}atirar @membro - *Dá um tiro em alguém*
┃ ▸ 🤏 ${config.prefix}beliscar @membro - *Dá um beliscão em alguém*
┃ ▸ 🤗 ${config.prefix}abracar @membro - *Dá um abraço em alguém*
┃ ▸ 💀 ${config.prefix}matar @membro - *Mata alguém*
┃ ▸ 🍽️ ${config.prefix}comer @membro - *Come alguém*
┃ ▸ 💋 ${config.prefix}beijo @membro - *Dá um beijo em alguém*
┃ ▸ 🥵 ${config.prefix}foda @membro - *Faz sexo com alguém*
┃ ▸ 👊 ${config.prefix}soco @membro - *Dá um soco em alguém*
┃ ▸ 😉 ${config.prefix}piscada @membro - *Dá uma piscada para alguém*
┃ ▸ 👉 ${config.prefix}cutucar @membro - *Dá uma cutucada em alguém*
┃ ▸ 🦵 ${config.prefix}rasteira @membro - *Dá uma rasteira em alguém*
┃ ▸ 👂 ${config.prefix}puxarorelha @membro - *Puxa a orelha de alguém*
┃ ▸ 🥚 ${config.prefix}ovo @membro - *Joga um ovo em alguém*
┃ ▸ 🦶 ${config.prefix}voadora @membro - *Dá uma voadora em alguém*
┗━────╮🎲╭────━┛
`;
}

module.exports = generateBrincadeirasMenu;