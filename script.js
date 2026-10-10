function toggleMobileProfile() {
    const panel = document.getElementById('profile-panel');
    const btn = document.getElementById('mobile-toggle-btn');
    const text = document.getElementById('mobile-toggle-text');
    const icon = document.getElementById('mobile-toggle-icon');

    const isVisible = panel.classList.toggle('mobile-visible');
    btn.classList.toggle('active', isVisible);
    btn.setAttribute('aria-expanded', isVisible);

    if (isVisible) {
        text.textContent = 'Fechar / Close';
        icon.innerHTML = '<path d="M12 19V5M5 12l7-7 7 7"/>';
    } else {
        text.textContent = 'Sobre Mim / About Me';
        icon.innerHTML = '<path d="M12 5v14M19 12l-7 7-7-7"/>';
    }
}

function switchLang(lang) {
    const toggle = document.getElementById('lang-toggle') || document.querySelector('.lang-toggle');
    const currentLang = toggle ? toggle.getAttribute('data-lang') : 'pt';
    if (currentLang === lang) return;

    if (toggle) toggle.setAttribute('data-lang', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById('btn-' + lang);
    if (activeBtn) activeBtn.classList.add('active');

    document.querySelectorAll('.bio-lang').forEach(el => el.classList.remove('active'));
    const activeBio = document.getElementById('bio-' + lang);
    if (activeBio) {
        void activeBio.offsetWidth; // Força reflow para reiniciar a animação
        activeBio.classList.add('active');
    }

    const titleEl = document.getElementById('bio-title');
    if (titleEl) {
        titleEl.textContent = (lang === 'pt') ? 'Sobre Mim' : 'About Me';
        titleEl.classList.remove('fade-in');
        void titleEl.offsetWidth; // Força reflow para reiniciar a animação
        titleEl.classList.add('fade-in');
    }
}

function copyToClipboard() {
    const pixCode = "00020101021126330014br.gov.bcb.pix0111408509258865204000053039865802BR5922CAIQUE C N DE OLIVEIRA6009SAO PAULO62070503***6304C35E";
    const copyBtn = document.getElementById("copy-btn");
    const btnText = copyBtn.querySelector("span");
    const btnIcon = copyBtn.querySelector("svg");
    const fallbackBox = document.getElementById("fallback-box");

    // Esconde o fallback se ele já estava visível
    fallbackBox.style.display = 'none';

    navigator.clipboard.writeText(pixCode).then(() => {
        // Atualiza estado visual do botão
        copyBtn.classList.add("copied");
        btnText.textContent = "Copiado!";
        
        // Ícone de checkmark
        btnIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>';

        // Reseta após 2 segundos
        setTimeout(() => {
            copyBtn.classList.remove("copied");
            btnText.textContent = "Pix Copia e Cola";
            btnIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>';
        }, 2000);
    }).catch(err => {
        console.error('Falha ao copiar texto: ', err);
        fallbackBox.style.display = 'block';
    });
}

// Isola o emoji do Buy Me a Coffee em uma tag para permitir a animação independente
function setupBmcEmojiAnimation() {
    const bmcBtn = document.querySelector('.bmc-btn');
    if (!bmcBtn) return;

    for (const node of bmcBtn.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
            const span = document.createElement('span');
            span.className = 'bmc-btn-emoji';
            span.textContent = node.textContent;
            bmcBtn.replaceChild(span, node);
            break;
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupBmcEmojiAnimation);
} else {
    setupBmcEmojiAnimation();
}

