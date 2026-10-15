const EMOJIS_RAW_BASE = 'https://raw.githubusercontent.com/ihyos/CLONERCORD/master/emojis%20discord/emojis%20personalizados';

// Destaques do catálogo com 379 ícones
const FEATURED_EMOJIS = [
  'pix.png', 'nubank.png', 'mercado_pago.png', 'cart.png', 'carteira.png',
  'wallet.png', 'ticket.png', 'correct.png', 'wrong.png', 'loading.gif',
  'shield.png', 'settings.png', 'dollar.png', 'coin.png', 'qrcode.png',
  'receipt.png', 'discount.png', 'nitro.png', 'boost1.png', 'bot.png',
  'crown.png', 'lock.png', 'unlock.png', 'bell.png', 'verified.png',
  'python.png', 'typescript.png', 'javascript.png', 'vscode.png', 'github.png'
];

document.addEventListener('DOMContentLoaded', () => {
  const emojiGrid = document.getElementById('emojiGrid');
  const searchInput = document.getElementById('emojiSearch');
  const copyBtn = document.getElementById('copyBtn');
  const toast = document.getElementById('toast');

  let allEmojis = [...FEATURED_EMOJIS];

  // Carrega catálogo completo se disponível
  fetch('../cli/emojis-catalog.json')
    .then(res => res.json())
    .then(data => {
      if (data && data.emojis) {
        allEmojis = data.emojis;
        renderEmojis(allEmojis.slice(0, 48));
      }
    })
    .catch(() => {
      renderEmojis(FEATURED_EMOJIS);
    });

  function renderEmojis(list) {
    if (!emojiGrid) return;
    emojiGrid.innerHTML = '';
    
    if (list.length === 0) {
      emojiGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-dim); padding: 40px 0;">Nenhum emoji encontrado</div>';
      return;
    }

    list.forEach(item => {
      const cleanName = item.replace(/\.[^/.]+$/, '');
      const badge = document.createElement('div');
      badge.className = 'emoji-badge';
      badge.title = `:${cleanName}: (Clique para copiar o nome)`;

      const img = document.createElement('img');
      img.src = `${EMOJIS_RAW_BASE}/${encodeURIComponent(item)}`;
      img.alt = cleanName;
      img.loading = 'lazy';

      const label = document.createElement('span');
      label.textContent = cleanName;

      badge.appendChild(img);
      badge.appendChild(label);

      badge.addEventListener('click', () => {
        navigator.clipboard.writeText(`<:${cleanName}:ID>`);
        showToast(`Copiado: <:${cleanName}:ID>`);
      });

      emojiGrid.appendChild(badge);
    });
  }

  // Busca rápida com filtro
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const filtered = allEmojis.filter(name => name.toLowerCase().includes(query));
      renderEmojis(filtered.slice(0, 60));
    });
  }

  // Botão de copiar comando do terminal
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const cmd = 'npx clonercord-discord-skill';
      navigator.clipboard.writeText(cmd);
      showToast('Comando copiado para a área de transferência!');
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }
});
