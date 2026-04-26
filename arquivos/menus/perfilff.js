const axios = require("axios");

async function perfilffCommand(sock, from, Info, args, prefix, API_KEY_TED) {
    const reply = async (text) => {
        return await sock.sendMessage(from, { text }, { quoted: Info });
    };

    try {
        const id = args[0]?.trim();

        if (!id) {
            return await reply(
                `❌ *ERRO:* Você precisa informar o ID do Free Fire!\n\n` +
                `📌 *Uso:* ${prefix}perfilff <ID>\n` +
                `💡 *Exemplo:* ${prefix}perfilff 121440556`
            );
        }

        await sock.sendMessage(from, {
            react: { text: "⏳", key: Info.key }
        });

        const apiUrl = `https://tedzinho.com.br/api/perfilff?apikey=${API_KEY_TED}&id=${id}`;
        const { data } = await axios.get(apiUrl, {
            timeout: 20000
        });

        if (
            !data ||
            data.status !== "OK" ||
            !data.resultado ||
            data.resultado.status !== "OK"
        ) {
            await sock.sendMessage(from, {
                react: { text: "❌", key: Info.key }
            });

            return await reply(
                "❌ *ERRO:* Não foi possível encontrar informações para este ID.\nVerifique se o ID está correto e tente novamente."
            );
        }

        const res = data.resultado || {};
        const perfil = res.perfil || {};
        const datas = res.datas || {};
        const guilda = res.guilda || {};

        const nick = perfil.nick || "Não informado";
        const playerId = perfil.id || id;
        const level = perfil.level || "Não informado";
        const likes = perfil.likes || "0";
        const regiao = perfil.regiao || "Não informado";
        const xp = perfil.xp || "Não informado";
        const booyah = perfil.booyah || "Não informado";
        const versao = perfil.versao || "Não informado";
        const bio = perfil.bio || "Sem bio";
        const avatar = perfil.avatar || null;

        const criacao = datas.criacao || "Não informado";
        const ultimoLogin = datas.ultimo_login || "Não informado";

        const guildaNome = guilda.nome || "Não informado";
        const guildaId = guilda.id || "-";
        const guildaNivel = guilda.nivel || "Não informado";
        const guildaMembros = guilda.membros || "Não informado";

        const menuText =
`╭─❑ 𝐏𝐄𝐑𝐅𝐈𝐋 𝐅𝐑𝐄𝐄 𝐅𝐈𝐑𝐄 ❑─╮
│
│ 👤 *Nick:* ${nick}
│ 🆔 *ID:* ${playerId}
│ 🆙 *Nível:* ${level}
│ ❤️ *Likes:* ${likes}
│ 🌎 *Região:* ${regiao}
│ ✨ *XP:* ${xp}
│ 🎫 *Booyah Pass:* ${booyah}
│ 🎮 *Versão:* ${versao}
│ 📝 *Bio:* ${bio}
│
├─❑ 𝐃𝐀𝐓𝐀𝐒 ❑─╮
│ 📅 *Criação:* ${criacao}
│ 🕒 *Último Login:* ${ultimoLogin}
│
├─❑ 𝐆𝐔𝐈𝐋𝐃𝐀 ❑─╮
│ 🛡️ *Nome:* ${guildaNome}
│ 🆔 *ID:* ${guildaId}
│ 📈 *Nível:* ${guildaNivel}
│ 👥 *Membros:* ${guildaMembros}
│
╰─❑ 𝐓𝐄𝐃-𝐁𝐎𝐓 ❑─╯`;

        if (avatar) {
            await sock.sendMessage(
                from,
                {
                    image: { url: avatar },
                    caption: menuText
                },
                { quoted: Info }
            );
        } else {
            await sock.sendMessage(
                from,
                {
                    text: menuText
                },
                { quoted: Info }
            );
        }

        await sock.sendMessage(from, {
            react: { text: "✅", key: Info.key }
        });

    } catch (error) {
        console.error("Erro no comando perfilff:", error);

        await sock.sendMessage(from, {
            react: { text: "❌", key: Info.key }
        });

        await sock.sendMessage(
            from,
            {
                text: "❌ *ERRO:* Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde."
            },
            { quoted: Info }
        );
    }
}

module.exports = perfilffCommand;