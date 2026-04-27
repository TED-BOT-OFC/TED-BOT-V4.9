<img src="https://readme-typing-svg.herokuapp.com/?font=mono&size=30&duration=4000&color=00008b&center=falso&vCenter=falso&lines=🜛+𝐓𝐄𝐃-𝐁𝐎𝐓-𝐕𝟒.9/+🜛;۞+𝙊𝙁𝘾+𝙐𝙋𝘿𝘼𝙏𝙀+۞;@𝙏𝙚𝙙𝙯𝙞𝙣𝙝𝙤">      

<h1 align="center">
<p>
<img src= "https://xatimg.com/image/t840CylM9nUn.jpg" alt="𝐓𝐄𝐃 𝐁𝐎𝐓 𝐕𝟒.9" width="1080">
</p>

<p align="center">
<a href="#"><img title="BOT-MULTI-DEVICE" src="https://img.shields.io/badge/BOT•MULTI•DEVICE-blue?&style=for-the-badge"></a>
</p>

<p align="center">
<img title="Autor" src="https://img.shields.io/badge/Autor-@tedzinho_-orange.svg?style=for-the-badge&logo=github"></a>
<img title="Versão" src="https://img.shields.io/badge/Versão-𝟒.9.0-orange.svg?style=for-the-badge&logo=github"></a>
</p>

---

## 🚀 INSTALAÇÃO E START (RÁPIDO)

Siga os passos abaixo para instalar e ligar o bot no Termux:

### 1. Instalar Pacotes Necessários
```bash
apt-get update -y && pkg upgrade -y && pkg update -y && pkg install nodejs -y && pkg install nodejs-lts -y && pkg install ffmpeg -y && pkg install wget -y && pkg install tesseract -y && pkg install git -y
```
*Atenção: Digite `y` sempre que for solicitado.*

### 2. Configurar Armazenamento
```bash
termux-setup-storage
```

### 3. Baixar o Bot (Clone)
```bash
cd /sdcard/Download && git clone https://github.com/TED-BOT-OFC/TED-BOT-V4.8 && cd /sdcard/Download/TED-BOT-V4.9
```

### 4. Instalar Dependências
```bash
npm install --force --no-bin-links
```

### 5. Ligar o Bot
```bash
npm start
```

---

# 📖 INFORMAÇÕES DETALHADAS

Abaixo você encontra tudo sobre como o bot funciona, como configurar e personalizar.

## 1. Visão Geral do Bot

O TED-BOT 4.9 é um bot para WhatsApp desenvolvido em Node.js, utilizando a biblioteca `@whiskeysockets/baileys`. Ele oferece funcionalidades de entretenimento, utilitários, moderação e automação para grupos.

### 1.1. Como Funciona
1.  **Inicialização (`temux.js`)**: Garante que o bot ligue corretamente e converte as bibliotecas necessárias.
2.  **Conexão (`connect.js`)**: Gerencia o login no WhatsApp e a reconexão automática.
3.  **Comandos (`index.js`)**: Processa todas as mensagens e executa as funções do bot.

## 2. Configuração e Personalização

Para mudar o nome do bot, o prefixo ou o dono, edite o arquivo `settings/config.json`:

```json
{
  "prefix": "#",
  "NomeDoBot": "TED-BOT",
  "NickDono": "彡[  TED  ]彡",
  "numerodono": "559984814822",
  "API_KEY_TED": "tedzinho"
}
```

-   **`prefix`**: O símbolo para usar comandos (ex: `#`).
-   **`NomeDoBot`**: O nome que o bot terá.
-   **`NickDono`**: Seu nome/apelido.
-   **`numerodono`**: **Seu número de WhatsApp** (DDI+DDD+Número) para ter acesso aos comandos de dono.

## 3. Como Dar Dono ao Bot
Basta colocar o seu número no campo `numerodono` dentro do `config.json`. Assim, você poderá usar o comando `#menudono`.

## 4. Conexão e QR Code
Ao ligar o bot pela primeira vez:
1.  Digite seu número no terminal quando solicitado (ex: `5511999999999`).
2.  O bot vai gerar um **Código de 8 dígitos**.
3.  No seu WhatsApp, vá em `Aparelhos Conectados > Conectar com código` e digite o código que apareceu no terminal.

## 5. Menus de Comandos
-   **`#menu`**: Menu principal com todas as categorias.
-   **`#menuadm`**: Comandos para administradores de grupo.
-   **`#menudono`**: Comandos exclusivos para quem é dono do bot.
-   **`#brincadeiras`**: Rankings e ações divertidas entre membros.
-   **`#menulogos`**: Criação de logos personalizadas.

## 6. Hospedagem e Suporte (Ted Host)
Precisa de uma hospedagem de qualidade ou suporte?
-   **Loja**: [https://loja.tedhost.com.br](https://loja.tedhost.com.br)
-   **Canal**: [https://whatsapp.com/channel/0029VajvIUnLikgCdbIzSm2h](https://whatsapp.com/channel/0029VajvIUnLikgCdbIzSm2h)
-   **Grupo**: [https://chat.whatsapp.com/DVDE1TCtHrKFatUKrlepjZ?mode=gi_t](https://chat.whatsapp.com/DVDE1TCtHrKFatUKrlepjZ?mode=gi_t)

---

<img src="https://readme-typing-svg.herokuapp.com/?font=mono&size=30&duration=4000&color=00008b&center=falso&vCenter=falso&lines=╰•★𝐓𝐄𝐃-𝐁𝐎𝐓-𝐕𝟒.9★•╯"> 

**Autor:** *tedzinho*
