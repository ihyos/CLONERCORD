# CLONERCORD - Discord Bot Development Skill

## 1. Interactive Step-by-Step Questionnaire (Mandatory Before Implementation)

When starting a new Discord bot or configuring architecture, the AI Agent MUST NOT jump immediately into code. The AI Agent MUST guide the user step-by-step through an interactive interview, asking each question clearly and waiting for the user's decision before proceeding.

### Step 1: Identity & Name
- **Bot Name**: What is the bot name for branding, presence, and logs?
- **Bot Purpose & Scope**: What is the core functionality (e.g., ticket system, moderation, economy, sales/store, auto-role, utility)?

### Step 2: Language & Localization
- **Interface Language**: Portuguese (PT-BR) or English?
- *Rule*: All bot-facing messages, buttons, modals, embeds, and status updates must strictly follow this choice.

### Step 3: Technology Stack & Language
The AI Agent MUST explicitly present the supported runtimes and languages, highlighting TypeScript as the recommended choice:
- **TypeScript** (Recomendado)
- **Python** (discord.py / Pycord)
- **JavaScript** (Node.js)
- **Bun** (discord.js com runtime ultrarrápido)
- **Outras linguagens compatíveis** (Go / DiscordGo, Rust / Serenity, C# / Discord.Net)

### Step 4: Emoji Pipeline (Custom Emojis vs Native)
- **Question**: Would you like to use custom Discord emojis from the official emoji pack (`emojis discord/emojis personalizados`)?
- **If YES (Mandatory Pipeline)**:
  1. The bot MUST automatically register and upload all PNG/GIF assets from `emojis discord/emojis personalizados/` directly to the bot application or target Discord guild using the Discord REST API (`POST /guilds/{guild.id}/emojis` or application emoji endpoint).
  2. The bot must NOT rely on external emoji IDs or hardcoded third-party servers.
  3. All UI panels, buttons, embeds, notifications, and logs MUST use these uploaded custom emojis in `<:name:id>` or `<a:name:id>` format.
  4. Each custom emoji MUST strictly correspond to its contextual meaning (e.g., Pix keyword = `pix.png`, Nubank = `nubank.png`, cart = `cart.png`, wallet = `wallet.png` or `carteira.png`, ticket = `ticket.png`, success = `correct.png` or `success.png`, error = `wrong.png` or `danger.png`, pending = `loading.gif` or `pending.png`).
  5. The bot must map all uploaded emojis into a central dictionary (`emojis.ts` / `emojis.json`) so they can be referenced cleanly across the entire codebase.
- **If NO**: Omit decorative emojis completely. Do NOT fallback to generic Unicode emojis unless explicitly allowed by the user.

### Step 5: Database & Persistence Strategy
- **Question**: Which database persistence strategy do you want to start with?
  1. **Local JSON Database (Recommended for rapid testing / prototype)**: Low-footprint local JSON file storage (e.g., QuickDB, LowDB, or typed local JSON file adapter) with a structured repository interface.
  2. **Remote Persistence (Production-ready)**: Supabase (PostgreSQL), SQLite (better-sqlite3), MongoDB, or Redis.
- **Migration Guarantee**: When starting with a local JSON DB, the data layer MUST be abstracted behind a clean Repository / Service Pattern so the user can seamlessly migrate to Supabase/PostgreSQL/MongoDB later without rewriting command handlers or business logic.

---

## 2. Advanced Discord Components V2 Master Rules

The AI Agent MUST master and implement advanced, high-complexity Discord Components V2 patterns, while strictly avoiding ugly formatting artifacts:

- **100% Components V2 Architecture**: All interfaces, modals, panel responses, and dashboards MUST use Components V2 with `flags: MessageFlags.IsComponentsV2`.
- **PROHIBITED TEXT STYLING**:
  - NEVER use underlined text (`__texto__`).
  - NEVER use italic/tilted formatting (`*texto*`, `_texto_`, `***texto***`).
  - Keep typography clean, crisp, bold when needed (`**texto**`), and readable.

### Advanced Functional Implementations:
1. **Interactive Modals with Advanced Inputs**:
   - Dynamic Modals containing `StringSelectMenuBuilder` / Dropdowns inside modals where supported by Discord V2 protocol.
   - Text inputs with clean validation, placeholders, and error-trapping states.
2. **Media & File Handling inside Components V2**:
   - `MediaGalleryBuilder` and `FileBuilder` for dynamic image uploads, attachments, invoices, and dynamic QR Code rendering.
   - `ThumbnailBuilder` integrated cleanly with `SectionBuilder` accessories for product avatars or profile badges.
3. **Complex Nested Layouts**:
   - Multi-layer `ContainerBuilder` with contextual `SeparatorBuilder` (`.setDivider(true)`).
   - Rich interactive Action Rows combining primary buttons, secondary navigation buttons, and select menus smoothly without reaching Discord component limits.

---

## 3. Strict Emoji Rules and Semantic Dictionary

- **NEVER use standard Unicode emojis** in bot messages, titles, buttons, panels, or logs (e.g., no 📦, 💸, 📝, 🛒, ℹ️, 🚨, ⏱️, 📋, 🔘, ⌨️, 💰).
- **ONLY use uploaded custom Discord emojis** (`<:name:id>` / `<a:name:id>`).
- **Semantic Consistency**: Every emoji used must match its exact contextual meaning.
  - **Payment & Finance**: Pix (`pix`), Nubank (`nubank`), Mercado Pago (`mercado_pago`), PagBank (`pagbank`), EFI Bank (`efi_bank`), PicPay (`picpay`), Saldo (`wallet`/`carteira`), Carrinho (`cart`), Dinheiro (`dollar`/`coin`/`moneybag`), QR Code (`qrcode`), Comprovante (`receipt`), Cupom (`coupon`/`discount`).
  - **Status & Feedback**: Sucesso (`correct`/`check`/`success`/`verified`), Erro (`wrong`/`danger`/`cancel`/`forbidden`), Alerta (`warn`/`warning`/`alert`/`alerta01`), Carregando (`loading`/`refreshing`/`pending`/`time`/`clock`).
  - **Navegação & Controle**: Voltar (`back`/`voltar`), Avançar (`arrow`/`arrowr`/`chevron`), Configurações (`settings`/`config`), Excluir (`trashcan`/`delete`/`lixeirared`), Atualizar (`reload`/`torefresh`).
  - **Sistemas**: Ticket (`ticket`/`help`), Membros (`member`/`members`/`users`), Canais (`announcement`/`textc`/`voice`), Segurança (`shield`/`lock`/`unlock`/`role`).
- **Asset Directory**: All assets reside in `emojis discord/emojis personalizados/`.
- If a specific emoji is missing from the pack, omit the emoji rather than placing a generic Unicode emoji.

---

## 4. Interaction Lifecycle & Anti-Timeout

- Strictly enforce Discord's 3-second interaction window.
- **Immediate Deferral**:
  - Always call `await interaction.deferReply({ ephemeral: true })` or `await interaction.deferUpdate()` before asynchronous tasks, database reads/writes, or external HTTP calls.
  - Edit or follow-up once the operation completes.
- Never let an unhandled rejection crash the bot process.

---

## 5. Security & Environment Standard

- **Zero Hardcoded Credentials**:
  - Tokens, API secrets, database URLs, and webhook keys MUST reside in `.env`.
  - Validate environment variables at boot (fail fast with descriptive error message if missing).
  - Add `.env` to `.gitignore`.
- **Zero In-Source Comments**:
  - Code must be declarative, self-documenting, and clean.
  - Do not pollute production code with commented-out code, debug `//`, or trivial docstrings.

---

## 6. Architecture & Data Layer Pattern

- **Repository Pattern**:
  - Always decouple Discord interaction handlers from database implementations.
  - Create an abstract Interface (e.g., `UserRepository`, `ProductRepository`, `GuildConfigRepository`).
  - Provide an initial implementation (e.g., `JsonGuildConfigRepository` for rapid prototype) and maintain identical contracts for SQL/Supabase implementations.
- **No Mock Production Fallbacks**:
  - If data is absent, return `null` or explicit not-found error. Never inject dummy orders, balances, or mock payments.
- **Compilation & Verification**:
  - Every modification must be validated by running `npm run build` or the respective language type checker before completing the task.
