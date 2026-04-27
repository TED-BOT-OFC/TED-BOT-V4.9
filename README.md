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

# TED-BOT 4.9 - Guia Completo de Configuração e Uso

Bem-vindo ao guia completo do TED-BOT 4.9! Este documento detalha como configurar, personalizar e utilizar seu bot, além de fornecer informações sobre hospedagem e canais de suporte.

## 1. Visão Geral do Bot

O TED-BOT 4.9 é um bot para WhatsApp desenvolvido em Node.js, utilizando a biblioteca `@whiskeysockets/baileys` para interação com a API do WhatsApp. Ele oferece uma vasta gama de funcionalidades, desde comandos de entretenimento e utilitários até ferramentas de moderação e automação para grupos. A versão 4.9 traz melhorias de estabilidade e um sistema de inicialização robusto.

### 1.1. Como Funciona

O bot opera da seguinte forma:

1.  **Inicialização Robusta (`temux.js`)**: O arquivo `temux.js` é o ponto de entrada principal. Ele garante uma inicialização estável, convertendo dinamicamente a biblioteca `@whiskeysockets/baileys` (que é um módulo ESM) para um formato compatível com CommonJS, e então carrega o `connect.js`.
2.  **Conexão ao WhatsApp (`connect.js`)**: O `connect.js` gerencia a conexão com o WhatsApp. Ele utiliza um sistema de autenticação multi-arquivo para persistir a sessão e oferece um processo de pareamento inicial via QR Code ou código de 8 dígitos. Também inclui lógica de reconexão automática e limpeza de mensagens para otimizar o uso de memória.
3.  **Manipulação de Eventos (`index.js`)**: O `index.js` é o coração do bot, onde todos os eventos do WhatsApp (mensagens, atualizações de participantes de grupo, etc.) são processados. Ele importa e gerencia diversos módulos de comandos e sistemas (como cooldown, anti-link, bem-vindo, etc.), roteando as mensagens para as funções apropriadas com base no prefixo e nos comandos recebidos.
4.  **Estrutura de Comandos e Menus**: Os comandos são organizados em módulos JavaScript (`.js`) dentro da pasta `arquivos/menus/` e `settings/commands/`. Os menus (`menu.js`, `menudono.js`, `menuadm.js`, `menulogos.js`, `menu-brincadeiras.js`) são gerados dinamicamente, exibindo os comandos disponíveis e informações personalizadas do bot e do dono.

## 2. Configuração Inicial

Antes de iniciar o bot, é necessário configurar algumas informações essenciais no arquivo `settings/config.json`.

### 2.1. Personalizando o `config.json`

Abra o arquivo `settings/config.json` e edite os campos conforme suas preferências:

```json
{
  "prefix": "#",
  "NomeDoBot": "TED-BOT",
  "NickDono": "彡[  TED  ]彡",
  "numerodono": "559984814822",
  "API_KEY_TED": "tedzinho"
}
```

-   **`prefix`**: O prefixo que o bot usará para reconhecer comandos. Por exemplo, se o prefixo for `#`, você usará `#menu` para acessar o menu.
-   **`NomeDoBot`**: O nome que será exibido para o seu bot em diversas mensagens e menus.
-   **`NickDono`**: O apelido ou nome do dono do bot, que aparecerá em menus e mensagens personalizadas.
-   **`numerodono`**: **MUITO IMPORTANTE!** Este é o número de telefone do dono do bot, incluindo o código do país (DDI) e o DDD, sem sinais de `+` ou espaços. Por exemplo, `5511999999999`. Este número terá acesso a comandos administrativos exclusivos.
-   **`API_KEY_TED`**: Uma chave de API para serviços específicos do bot. Mantenha-a segura.

## 3. Como Dar Dono ao Bot

O número do dono é definido no campo `numerodono` do `settings/config.json`. Apenas o número configurado terá acesso aos comandos de dono, que podem ser visualizados no menu de dono (`#menudono`). Certifique-se de que o número esteja no formato correto (DDI+DDD+Número, sem `+` ou espaços).

## 4. Conexão e QR Code

O bot utiliza o sistema de autenticação do Baileys, que permite a conexão via QR Code ou código de pareamento de 8 dígitos. O processo é gerenciado pelo arquivo `connect.js`.

### 4.1. Processo de Conexão

Ao iniciar o bot pela primeira vez, ou se a sessão for perdida (por exemplo, ao deslogar do WhatsApp Web/Desktop), o bot solicitará o número de telefone para gerar um código de pareamento:

1.  **Informe o número**: O terminal pedirá para você informar seu número de telefone com DDI (ex: `5511999999999`).
2.  **Código de Pareamento**: Após informar o número, o bot gerará um `TOKEN DE PAREAMENTO` (código de 8 dígitos).
3.  **Pareamento no WhatsApp**: Abra o WhatsApp no seu celular, vá em `Configurações > Aparelhos Conectados > Conectar um Aparelho` e selecione a opção `Conectar com código`. Insira o código fornecido pelo bot.

Após o pareamento, a sessão será salva na pasta `database/qr/ted-qr`, e o bot se conectará automaticamente nas próximas vezes.

## 5. Comandos Principais

O TED-BOT 4.9 possui uma vasta gama de comandos, organizados em menus. Você pode acessar os menus usando o prefixo configurado no `config.json` (padrão: `#`).

### 5.1. Menu Principal (`#menu`)

Este menu lista as categorias principais de comandos:

-   **PRINCIPAL**: `menuadm`, `brincadeiras`, `menulogos`
-   **SISTEMA**: `ping`, `status`, `stats`, `roubar`, `revelar`, `sticker`, `legenda`, `toimg`, `jeff`, `faber`, `norian`
-   **CONVERSÃO**: `totext`, `ptvmsg`, `attp`, `ttp`, `brat`, `gerarlink`, `rvisu`
-   **DOWNLOADS**: `tomp3`, `8d` (Efeito 3D), `shazam`, `play` (MP3/MP4), `play2`, `play3`, `playvid2`, `sc`, `ttk`, `ttk2`, `tiktok`, `tiktok2`, `kwai`, `instamp3`, `instamp4`, `myinstants`, `Pintemp3`, `Pintemp4`, `Pinterest`, `Pinterest2`, `gif`, `robloxcodes`
-   **PERFIL**: `perfil`, `perfilff`
-   **ALTERADORES DE VOZ**

### 5.2. Menu de Administrador (`#menuadm`)

Este menu contém comandos para administradores de grupo e o dono do bot:

-   **CONFIGURAÇÕES GERAIS**:
    -   `views 1/0`: Ativar/Desativar visualizações.
    -   `backup`: Backup completo do sistema.
    -   `restart`: Reinicialização do bot.
-   **PROTEÇÃO & SEGURANÇA**:
    -   `antilinkhard`: Anti-link global (todos os grupos).
    -   `antilinkhard2 (on/off)`: Anti-link com domínios permitidos.
    -   `antilinkgrupo`: Anti-link apenas neste grupo.
    -   `totag`: Mencionar todos os membros.
    -   `grupo f/a`: Fechar/Abrir grupo.
    -   `tempo-pg HH:MM/HH:MM`: Programar Fechar/Abrir grupo.
    -   `d`: Configurações de detecção.
    -   `welcome`: Boas-vindas & Legendas.
    -   `#tempo-pg`: Ajustar tempo de postagem.
    -   `cooldown`: Definir intervalo entre comandos.
-   **GERENCIAMENTO**:
    -   `ban @user`: Banir membro do grupo.
    -   `blacklist @user`: Adicionar membro à blacklist.
    -   `#brincadeiras on/off`: Ativar o modo brincadeiras.
    -   `marcar`: Marcar membro específico.
    -   `adverter`: Adverter ao usuário.
    -   `xingamentos`: Xingamentos ao nome.
    -   `autofigu`: Autofigu ao Sticker.
    -   `promover`: Conceder administração.
    -   `rebaixar`: Remover administração.
    -   `audio`: Enviar áudio aleatório.
    -   `mute`: Silenciar membro.
    -   `unmute`: Remover silenciamento.
    -   `linkgp`: Gerar link do grupo.
    -   `regras`: Exibir regras do grupo.
    -   `addsticker`: Salvar figurinha enviada.

### 5.3. Menu de Dono (`#menudono`)

Comandos exclusivos para o dono do bot:

-   **SISTEMA**:
    -   `fotomenu`: Menu de fotos.
    -   `verificado-global`: Verificação global.
    -   `antipv (on/off)`: Ativar/desativar proteção contra mensagens no privado.
    -   `visualizarmsg`: Visualizar mensagens.
    -   `bangp`: Comando específico de dono.
    -   `addsticker (reply)`: Adicionar figurinha (respondendo a uma mídia).
    -   `#tempo-pg`: Ajustar tempo de postagem.
    -   `cooldown`: Definir intervalo entre comandos.

### 5.4. Menu de Brincadeiras (`#brincadeiras`)

Este menu oferece comandos de entretenimento e interação:

-   **RANKINGS**:
    -   `rankgay`, `rankcorno`, `rankbelo`, `ranknerd`, `rankgostosa`, `rankotario`, `rankfeio`, `rankrico`, `jokenpo`, `rankjkp`
-   **AÇÕES COM MEMBROS**:
    -   `tapa`, `tomate`, `carinho`, `aplaudir`, `cafune`, `chutar`, `acenar`, `dancar`, `morder`, `atirar`, `beliscar`, `abracar`, `matar`, `comer`, `beijo`, `foda`, `soco`, `piscada`, `cutucar`, `rasteira`, `puxarorelha`, `ovo`, `voadora`

## 6. Hospedagem e Suporte

Para hospedagem do seu bot e suporte, você pode contar com os serviços da Ted Host.

-   **Site de Hospedagem**: [https://loja.tedhost.com.br](https://loja.tedhost.com.br)
-   **Canal do WhatsApp**: [https://whatsapp.com/channel/0029VajvIUnLikgCdbIzSm2h](https://whatsapp.com/channel/0029VajvIUnLikgCdbIzSm2h)
-   **Grupo Ted Host no WhatsApp**: [https://chat.whatsapp.com/DVDE1TCtHrKFatUKrlepjZ?mode=gi_t](https://chat.whatsapp.com/DVDE1TCtHrKFatUKrlepjZ?mode=gi_t)

## 7. Instalação Via Termux  <img src="https://user-images.githubusercontent.com/108157095/182052725-6568419a-6a9f-490a-85ea-90b94af694fe.png" height="25px">

Siga os passos abaixo para instalar o bot no Termux:

1.  **Atualizar e Instalar Pacotes**:
    ```bash
    apt-get update -y && pkg upgrade -y && pkg update -y && pkg install nodejs -y && pkg install nodejs-lts -y && pkg install ffmpeg -y && pkg install wget -y && pkg install tesseract -y && pkg install git -y
    ```
    *Atenção: Será necessário digitar `y` toda vez que for solicitado `[y/n]`.*

2.  **Configurar Armazenamento**:
    ```bash
    termux-setup-storage
    ```

3.  **Clonar Repositório e Navegar**:
    ```bash
    cd /sdcard/Download && git clone https://github.com/TED-BOT-OFC/TED-BOT-V4.8 && cd /sdcard/Download/TED-BOT-V4.9
    ```
    *Nota: O caminho `TED-BOT-V4.9` pode variar dependendo da versão clonada. Certifique-se de estar no diretório correto.* 

4.  **Instalar Dependências**:
    ```bash
    npm install --force --no-bin-links
    ```

5.  **Iniciar o Bot**:
    ```bash
    cd /sdcard/Download/TED-BOT-V4.9 && npm start
    ```

## 💾 START DO BOT 💾 <img src="https://user-images.githubusercontent.com/108157095/182053901-78e4a217-51ba-42a3-8ec5-38ed978ad752.png" height="25px">
```bash
npm start
```

<img src="https://readme-typing-svg.herokuapp.com/?font=mono&size=30&duration=4000&color=00008b&center=falso&vCenter=falso&lines=╰•★𝐓𝐄𝐃-𝐁𝐎𝐓-𝐕𝟒.9★•╯"> 

--- 

**Autor:** Manus AI (Baseado em informações fornecidas pelo usuário e análise do código-fonte do TED-BOT 4.9)
