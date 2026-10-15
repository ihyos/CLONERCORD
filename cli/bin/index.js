#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_URL = 'https://github.com/ihyos/CLONERCORD';
const REPO_RAW = 'https://raw.githubusercontent.com/ihyos/CLONERCORD/master';
const EMOJIS_ONLINE_URL = 'https://github.com/ihyos/CLONERCORD/tree/master/emojis%20discord/emojis%20personalizados';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

console.log(`${colors.bright}${colors.cyan}====================================================${colors.reset}`);
console.log(`${colors.bright}${colors.magenta}           🚀 CLONERCORD AI AGENT SKILL${colors.reset}`);
console.log(`${colors.cyan}   Treinamento Interno de IA & Arquitetura Discord Bot${colors.reset}`);
console.log(`${colors.cyan}====================================================${colors.reset}\n`);

const cwd = process.cwd();
const skillSourcePath = path.join(__dirname, '..', 'skill.md');
const catalogSourcePath = path.join(__dirname, '..', 'emojis-catalog.json');

const skillContent = fs.existsSync(skillSourcePath)
  ? fs.readFileSync(skillSourcePath, 'utf8')
  : '';

const catalogData = fs.existsSync(catalogSourcePath)
  ? JSON.parse(fs.readFileSync(catalogSourcePath, 'utf8'))
  : { total: 379, emojis: [] };

console.log(`${colors.blue}ℹ️  Treinando Agente de IA e injetando regras no ambiente...${colors.reset}`);

// 1. Gera / atualiza skill.md local
fs.writeFileSync(path.join(cwd, 'skill.md'), skillContent, 'utf8');
console.log(`${colors.green}✔ Arquivo skill.md gerado e contextualizado no projeto.${colors.reset}`);

// 2. Treinamento Universal de Agentes e LLMs (Cursor, Antigravity, Copilot, Windsurf, Claude)
const aiPromptTraining = `<!-- CLONERCORD AI AGENT TRAINING -->
# CLONERCORD System Instructions & Training

Você é o Arquiteto Oficial de Bots do Discord treinado pela skill **CLONERCORD**.
Repositório Oficial: ${REPO_URL}
Biblioteca de Emojis Online: ${EMOJIS_ONLINE_URL}
Total de Emojis Oficiais Disponíveis: ${catalogData.total}

## FLUXO OBRIGATÓRIO DE INICIALIZAÇÃO (NÃO PULE ETAPAS)
Antes de escrever código ou criar arquivos, você DEVE guiar o usuário pelas 5 perguntas:
1. **Nome do Bot**: Nome para identidade e logs.
2. **Idioma**: PT-BR ou Inglês.
3. **Stack**: TypeScript (discord.js v14+), JavaScript, Python, etc.
4. **Emojis Personalizados**:
   - Se SIM: Você fará upload automático dos assets da pasta ou repositório para o bot via Discord REST API.
   - Todo emoji DEVE corresponder estritamente ao significado semântico (Pix = pix, Nubank = nubank, Carrinho = cart, Carteira = carteira/wallet, etc.).
   - NUNCA use emojis Unicode comuns (📦, 💸, 📝, etc.). Use apenas <:name:id> ou <a:name:id>.
5. **Banco de Dados**:
   - Local JSON DB (para testes e prototipagem rápida).
   - Banco Remoto (Supabase, PostgreSQL, SQLite, MongoDB).
   - Sempre isole com Repository Pattern para migração sem retrabalho.

## REGRAS DE DESIGN E COMPONENTES
- Utilize estritamente **Discord Components V2** com \`flags: MessageFlags.IsComponentsV2\`.
- Use ContainerBuilder, SectionBuilder, TextDisplayBuilder, SeparatorBuilder (.setDivider(true)).
- Nunca use travessão (— ou –). Use | ou :.
- Respeite o tempo limite de 3s do Discord utilizando \`deferReply()\` imediatamente.
`;

// Injeta .cursorrules para o Cursor
fs.writeFileSync(path.join(cwd, '.cursorrules'), aiPromptTraining, 'utf8');

// Injeta .agents / AGENTS.md para Antigravity & Copilot
const agentsDir = path.join(cwd, '.agents');
if (!fs.existsSync(agentsDir)) {
  fs.mkdirSync(agentsDir, { recursive: true });
}
fs.writeFileSync(path.join(agentsDir, 'CLONERCORD.md'), aiPromptTraining, 'utf8');
fs.writeFileSync(path.join(cwd, 'AGENTS.md'), aiPromptTraining, 'utf8');

console.log(`${colors.green}✔ Treinamento interno injetado para: Cursor (.cursorrules), Antigravity/AGENTS (.agents/CLONERCORD.md, AGENTS.md).${colors.reset}`);

// 3. Salva o catálogo de emojis com URLs diretas (sem forçar download pesado)
const catalogWithUrls = {
  repository: REPO_URL,
  emojisUrl: EMOJIS_ONLINE_URL,
  total: catalogData.total,
  rawBaseUrl: `${REPO_RAW}/emojis%20discord/emojis%20personalizados`,
  instructions: "A IA pode baixar sob demanda ou subir direto para o Discord via REST API usando as URLs do repositório.",
  emojis: catalogData.emojis.map(name => ({
    name: name.replace(/\.[^/.]+$/, ""),
    filename: name,
    url: `${REPO_RAW}/emojis%20discord/emojis%20personalizados/${encodeURIComponent(name)}`
  }))
};

fs.writeFileSync(path.join(cwd, 'clonercord-emojis.json'), JSON.stringify(catalogWithUrls, null, 2), 'utf8');
console.log(`${colors.green}✔ Catálogo indexado salvo em clonercord-emojis.json (${catalogData.total} emojis mapeados com URLs diretas).${colors.reset}`);

// 4. Pergunta ou verifica se o usuário deseja baixar fisicamente a pasta de emojis
const args = process.argv.slice(2);
const shouldDownloadFolder = args.includes('--download-emojis') || args.includes('-d');

if (shouldDownloadFolder) {
  console.log(`${colors.yellow}⬇️  Opção detectada: Clonando pasta de emojis localmente...${colors.reset}`);
  const { execSync } = require('child_process');
  try {
    execSync('git clone --depth 1 --filter=blob:none --sparse https://github.com/ihyos/CLONERCORD.git temp_clonercord --quiet', { stdio: 'ignore' });
    execSync('cd temp_clonercord && git sparse-checkout set "emojis discord" --quiet', { shell: true, stdio: 'ignore' });
    if (!fs.existsSync(path.join(cwd, 'emojis discord'))) {
      fs.cpSync(path.join(cwd, 'temp_clonercord', 'emojis discord'), path.join(cwd, 'emojis discord'), { recursive: true });
    }
    fs.rmSync(path.join(cwd, 'temp_clonercord'), { recursive: true, force: true });
    console.log(`${colors.green}✔ Pasta 'emojis discord' baixada localmente com sucesso!${colors.reset}`);
  } catch (err) {
    console.log(`${colors.yellow}⚠️  Não foi possível executar git sparse-checkout direto. O catálogo online clonercord-emojis.json está pronto para uso direto!${colors.reset}`);
  }
} else {
  console.log(`\n${colors.bright}${colors.cyan}💡 Emojis sob demanda ativados:${colors.reset}`);
  console.log(`   A IA acessará os ${catalogData.total} emojis diretamente do repositório via API/URLs sem consumir espaço em disco.`);
  console.log(`   (Se quiser a pasta física localmente, basta rodar: ${colors.yellow}npx clonercord-discord-skill --download-emojis${colors.reset})`);
}

console.log(`\n${colors.bright}${colors.green}🎉 CLONERCORD ATIVADO COM SUCESSO!${colors.reset}`);
console.log(`${colors.cyan}Agora a sua IA / Agente LLM já possui todas as instruções e o fluxo de 5 etapas para iniciar seu bot.${colors.reset}\n`);
