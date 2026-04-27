<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&weight=700&size=32&duration=3500&pause=800&color=0066FF&center=true&vCenter=true&width=900&lines=%F0%9F%9C%9B+TED-BOT-V4.9+%F0%9F%9C%9B;%E2%9A%A1+BOT+WHATSAPP+MULTI-DEVICE;%F0%9F%9A%80+OFICIAL+UPDATE;%F0%9F%91%91+By+%40Tedzinho" alt="Typing SVG" />

<br>

<img src="https://xatimg.com/image/t840CylM9nUn.jpg" alt="TED BOT V4.9" width="100%" />

<br><br>

<img src="https://img.shields.io/badge/BOT-MULTI--DEVICE-0066FF?style=for-the-badge&logo=whatsapp&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/WhatsApp-Baileys-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" />
<img src="https://img.shields.io/badge/Vers%C3%A3o-4.9.0-FF8C00?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/Autor-%40tedzinho-111111?style=for-the-badge&logo=github&logoColor=white" />

<br><br>

<h1>🜛 TED-BOT V4.9 🜛</h1>

<p>
  Um bot para WhatsApp feito em <b>Node.js</b>, usando <b>@whiskeysockets/baileys</b>, com recursos de diversão, utilidades, moderação, automação e comandos especiais para grupos.
</p>

<p>
  <b>Rápido • Moderno • Multi-device • Personalizável</b>
</p>

</div>

---

## 📌 Sobre o Projeto

O **TED-BOT V4.9** foi criado para facilitar a administração de grupos, entregar comandos divertidos aos membros e oferecer ferramentas úteis diretamente pelo WhatsApp.

Ele conta com conexão via código de pareamento, suporte a comandos personalizados, menus organizados e uma estrutura simples para instalação no **Termux**.

---

## ✨ Principais Recursos

<table>
<tr>
<td width="50%">

### 🤖 Sistema do Bot
- Conexão multi-device
- Login por código de pareamento
- Reconexão automática
- Estrutura em Node.js
- Configuração simples por JSON

</td>
<td width="50%">

### 👥 Grupos
- Menu de administrador
- Comandos de moderação
- Recursos para membros
- Brincadeiras e rankings
- Funções exclusivas para dono

</td>
</tr>
<tr>
<td width="50%">

### 🎨 Personalização
- Nome do bot
- Prefixo de comandos
- Nome do dono
- Número do dono
- Chave/API personalizada

</td>
<td width="50%">

### 🚀 Utilidades
- Menus organizados
- Logos personalizadas
- Comandos interativos
- Sistema pronto para expansão
- Suporte a FFmpeg e pacotes extras

</td>
</tr>
</table>

---

## 🧰 Requisitos

Antes de instalar, tenha o **Termux** atualizado e uma conexão estável com a internet.

| Requisito | Finalidade |
|---|---|
| `nodejs` | Executar o bot |
| `ffmpeg` | Processar mídias |
| `git` | Clonar o projeto |
| `wget` | Baixar arquivos |
| `tesseract` | Recursos de leitura/OCR |
| `npm` | Instalar dependências |

---

## ⚡ Instalação Rápida no Termux

### 1️⃣ Atualize e instale os pacotes

```bash
apt-get update -y && pkg upgrade -y && pkg update -y && pkg install nodejs -y && pkg install nodejs-lts -y && pkg install ffmpeg -y && pkg install wget -y && pkg install tesseract -y && pkg install git -y
```

> Quando o Termux perguntar algo, digite `y` e confirme.

---

### 2️⃣ Libere o armazenamento

```bash
termux-setup-storage
```

---

### 3️⃣ Baixe o bot

```bash
cd /sdcard/Download
git clone https://github.com/TED-BOT-OFC/TED-BOT-V4.8
cd /sdcard/Download/TED-BOT-V4.9
```

> Confira se o nome da pasta clonada está correto. Se o repositório criar uma pasta com outro nome, entre nela usando `cd nome-da-pasta`.

---

### 4️⃣ Instale as dependências

```bash
npm install --force --no-bin-links
```

---

### 5️⃣ Ligue o bot

```bash
npm start
```

---

## 🔐 Como Conectar no WhatsApp

Ao iniciar o bot pela primeira vez:

1. Digite seu número no terminal.
2. Aguarde o código de pareamento aparecer.
3. Abra o WhatsApp no celular.
4. Vá em **Aparelhos conectados**.
5. Toque em **Conectar com código**.
6. Digite o código exibido no Termux.

Exemplo de número:

```txt
5511999999999
```

Use sempre o formato:

```txt
DDI + DDD + NÚMERO
```

---

## ⚙️ Configuração Principal

Para personalizar o bot, edite o arquivo:

```bash
settings/config.json
```

Exemplo:

```json
{
  "prefix": "#",
  "NomeDoBot": "TED-BOT",
  "NickDono": "彡[  TED  ]彡",
  "numerodono": "559984814822",
  "API_KEY_TED": "tedzinho"
}
```

### Explicação dos Campos

| Campo | Descrição |
|---|---|
| `prefix` | Símbolo usado antes dos comandos. Exemplo: `#menu` |
| `NomeDoBot` | Nome que aparecerá no bot |
| `NickDono` | Nome/apelido do dono |
| `numerodono` | Número do dono com DDI + DDD + número |
| `API_KEY_TED` | Chave usada em funções específicas do bot |

---

## 👑 Como Virar Dono do Bot

Para ter acesso aos comandos exclusivos, coloque seu número no campo:

```json
"numerodono": "559984814822"
```

Depois disso, ligue o bot novamente e use:

```bash
#menudono
```

---

## 📜 Menus Disponíveis

| Comando | Função |
|---|---|
| `#menu` | Mostra o menu principal |
| `#menuadm` | Mostra comandos de administradores |
| `#menudono` | Mostra comandos exclusivos do dono |
| `#brincadeiras` | Mostra comandos de diversão e rankings |
| `#menulogos` | Mostra comandos de criação de logos |

> Caso você mude o prefixo no `config.json`, use o novo prefixo antes dos comandos.

---

## 🗂️ Estrutura Básica do Projeto

```txt
TED-BOT-V4.9/
├── index.js
├── connect.js
├── temux.js
├── package.json
├── settings/
│   └── config.json
├── funcoes/
├── database/
└── README.md
```

### Arquivos Importantes

| Arquivo | Função |
|---|---|
| `temux.js` | Inicialização e ajustes necessários para o bot rodar |
| `connect.js` | Conexão com WhatsApp e reconexão automática |
| `index.js` | Processamento das mensagens e comandos |
| `settings/config.json` | Configurações principais do bot |

---

## 🛠️ Comandos Úteis

### Atualizar dependências

```bash
npm update
```

### Reinstalar módulos

```bash
rm -rf node_modules package-lock.json
npm install --force --no-bin-links
```

### Ligar novamente

```bash
npm start
```

---

## ❗ Possíveis Erros e Soluções

| Erro | Solução |
|---|---|
| `npm: command not found` | Instale o Node.js novamente com `pkg install nodejs -y` |
| Bot não conecta | Apague a sessão antiga e gere um novo código |
| Erro em dependências | Rode `npm install --force --no-bin-links` |
| Pasta não encontrada | Confira o nome real da pasta clonada |
| Permissão negada | Execute `termux-setup-storage` |

---

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
