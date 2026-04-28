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
cd /sdcard/Download && git clone https://github.com/TED-BOT-OFC/TED-BOT-V4.9 && cd /sdcard/Download/TED-BOT-V4.9
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

## 🌐 Hospedagem e Suporte

<div align="center">

### 💎 Ted Host

| Plataforma | Link |
|---|---|
| 🛒 Loja | [loja.tedhost.com.br](https://loja.tedhost.com.br) |
| 📢 Canal | [Canal WhatsApp](https://whatsapp.com/channel/0029VajvIUnLikgCdbIzSm2h) |
| 👥 Grupo | [Grupo WhatsApp](https://chat.whatsapp.com/DVDE1TCtHrKFatUKrlepjZ?mode=gi_t) |

</div>

---

---

## 📢 Aviso

Este projeto é destinado para fins de estudo, automação e uso pessoal. Use com responsabilidade e respeite as regras do WhatsApp e dos grupos onde o bot for utilizado.

---

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&weight=700&size=28&duration=3500&pause=700&color=0066FF&center=true&vCenter=true&width=850&lines=%E2%95%B0%E2%80%A2%E2%98%85+TED-BOT-V4.9+%E2%98%85%E2%80%A2%E2%95%AF;%F0%9F%9A%80+Obrigado+por+usar+o+projeto;%F0%9F%91%91+Criado+por+%40tedzinho" alt="Footer Typing SVG" />

<br>

### 👑 Autor

**@tedzinho**

<br>

<img src="https://img.shields.io/badge/Status-Online-00C853?style=for-the-badge&logo=whatsapp&logoColor=white" />
<img src="https://img.shields.io/badge/Feito%20com-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Projeto-TED--BOT-0066FF?style=for-the-badge&logo=github&logoColor=white" />

</div>
