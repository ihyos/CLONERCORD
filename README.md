<div align="center">

<img src="./logo.png" alt="ClonerCord Logo" height="52" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b5061df29d55a92d945_full_logo_blurple_RGB.svg" alt="Discord" height="42" />

<br />

# CLONERCORD

**Antigravity AI Agent Skill | Discord Components V2 | Interactive Setup & Auto-Uploader**

<br />

[![PT-BR](https://img.shields.io/badge/lang-PT--BR-009c3b?style=flat-square)](./docs/pt-br/README.pt-br.md)
[![English](https://img.shields.io/badge/lang-English-012169?style=flat-square)](./docs/en/README.en.md)
[![Components V2](https://img.shields.io/badge/Discord-Components%20V2-5865F2?style=flat-square&logo=discord&logoColor=white)](https://docs.discord.com/developers/components/overview)
[![Asset Pack](https://img.shields.io/badge/Emoji%20Pack-375%2B%20Assets-success?style=flat-square)](#emoji-asset-pack)

</div>

---

## 🚀 Quick Install | Instalação Rápida

Injeta o treinamento completo para o Agente de IA, a `skill.md` e o catálogo indexado dos 375+ emojis com URLs diretas no projeto:

### NPX (Recomendado - Instantâneo & Sem Download Pesado)
Permite selecionar a linguagem/stack interativamente, **constrói uma base organizada do bot** (com arquivos iniciais, handlers, configs e env) e injeta o treinamento completo para a IA:
```bash
npx clonercord-discord-skill
```
*Ou escolha a stack diretamente via flag: `--ts` (TypeScript Recomendado), `--python`, `--js` ou `--bun`.*

### NPX + Download Completo dos Emojis (Pasta Física Local)
Injeta o treinamento da IA, constrói a base do bot e baixa localmente todos os 379 arquivos PNG/GIF da pasta `emojis discord`:
```bash
npx clonercord-discord-skill --download-emojis
```

### PowerShell (Windows)
```powershell
irm https://raw.githubusercontent.com/ihyos/CLONERCORD/master/install.ps1 | iex
```

### Bash (Linux / macOS)
```bash
curl -fsSL https://raw.githubusercontent.com/ihyos/CLONERCORD/master/install.sh | bash
```

### Git Sparse-Checkout
```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/ihyos/CLONERCORD.git
cd CLONERCORD
git sparse-checkout set skill.md "emojis discord"
```

---

## 🎯 How the AI Agent Works | Como a IA Opera

Quando esta skill está ativa, o modelo de IA segue um fluxo de 5 etapas obrigatórias antes de gerar qualquer linha de código:

1. **Nome e Propósito do Bot**: Define o nome para branding, presença e escopo (vendas, tickets, moderação, etc.).
2. **Idioma do Bot**: Define PT-BR ou Inglês para todas as interfaces e interações.
3. **Stack Tecnológica**: TypeScript (discord.js v14+), JavaScript, Python, Go ou Rust.
4. **Pipeline de Emojis Personalizados**:
   - Se o usuário optar por emojis personalizados, a IA **faz upload automático** dos 375+ ícones da pasta `emojis discord/emojis personalizados/` diretamente para o bot/servidor via Discord REST API.
   - O projeto não depende de emojis externos ou servidores terceiros.
   - Cada emoji é estritamente aplicado de acordo com o contexto semântico (ex: Pix = ícone do Pix, Nubank = ícone do Nubank, carrinho = ícone de carrinho).
5. **Estratégia de Banco de Dados**:
   - Opção de iniciar com **JSON DB local** para prototipagem rápida e desenvolvimento sem dependências externas.
   - Opção de **Banco Remoto** (Supabase, PostgreSQL, SQLite, MongoDB).
   - O código é sempre estruturado em **Repository Pattern** para permitir migração transparente de JSON DB para Supabase/PostgreSQL com zero retrabalho.

---

## 🎨 Discord Components V2 Standard

- Todos os painéis, botões, selects e embeds utilizam **Discord Components V2** (`flags: MessageFlags.IsComponentsV2`).
- Uso nativo de `ContainerBuilder`, `TextDisplayBuilder`, `SectionBuilder`, `SeparatorBuilder` e `ActionRowBuilder`.
- Sem caracteres de travessão (`—` ou `–`).
- Sem emojis Unicode convencionais quando emojis personalizados estão habilitados.

---

## 📦 Repositório e Estrutura

```
skill.md                                Arquivo central de instrução para o Modelo de IA
emojis discord/emojis personalizados/   Pack oficial consolidado (375+ ícones PNG e GIFs)
install.ps1                             Script de instalação automatizado (Windows)
install.sh                              Script de instalação automatizado (Linux/macOS)
docs/                                   Guias técnicos detalhados (PT-BR / EN)
```

---

<div align="center">
<sub>Built for Antigravity AI Agent & Professional Discord Bot Development</sub>
</div>
