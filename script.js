// UI Elements
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('section');
const typingTarget = document.getElementById('typing-text');
const loader = document.getElementById('loader');
const workGrid = document.getElementById('work-grid');
const socialGrid = document.getElementById('social-grid');
const aboutGrid = document.getElementById('about-grid');

// Data is loaded from config.js (projectsConfig, siteSettings, socialLinks, aboutCards)

// Typing Config
let typingIndex = 0;
let isTyping = false;

// Preloader Handling
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            renderProjects();
            renderSocials();
            renderAboutCards();
            switchSection('hero');
        }, 500);
    }, 1000);
});

// Render About Cards (NEW)
function renderAboutCards() {
    if (!aboutGrid || !aboutCards) return;
    aboutGrid.innerHTML = '';

    aboutCards.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = `glass-card ${card.highlight ? 'highlighted' : ''} clickable-card`;
        
        // Handle Logo vs Icon
        const visualContent = card.logo 
            ? `<img src="${card.logo}" alt="${card.title}" class="card-logo">`
            : `<i class="${card.icon}"></i>`;

        cardEl.innerHTML = `
            <div class="card-icon-box">
                ${visualContent}
            </div>
            <h3>${card.title}</h3>
            <p>${card.description}</p>
            ${card.badge ? `<div class="card-badge ${card.badge === 'Owner' ? '' : 'gold-badge'}">${card.badge}</div>` : ''}
        `;

        // Make whole card clickable
        cardEl.addEventListener('click', () => {
            if (card.url && card.url !== '#') {
                window.open(card.url, '_blank');
            }
        });

        aboutGrid.appendChild(cardEl);
    });
}

// Render Projects Logic
function renderProjects() {
    if (!workGrid || !projectsConfig) return;
    workGrid.innerHTML = '';

    projectsConfig.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card glass';
        card.innerHTML = `
            <div class="project-img-container">
                <img src="${project.image}" alt="${project.title}">
                <div class="img-overlay"></div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.url}" target="_blank" class="visit-link">انقر للنقل <i class="fas fa-external-link-alt"></i></a>
            </div>
        `;
        workGrid.appendChild(card);
    });
}

// Render Social Links Logic
function renderSocials() {
    if (!socialGrid || !socialLinks) return;
    socialGrid.innerHTML = '';

    socialLinks.forEach(item => {
        const socialItem = document.createElement('a');
        socialItem.href = item.url;
        socialItem.className = 'social-item';
        socialItem.target = '_blank';
        socialItem.title = item.platform;
        socialItem.innerHTML = `
            <div class="social-aura"></div>
            <i class="${item.icon}"></i>
        `;
        socialGrid.appendChild(socialItem);
    });
}

// Typing Animation Logic
function startTyping() {
    if (isTyping || !siteSettings) return;
    const text = siteSettings.typingText;
    isTyping = true;
    typingTarget.textContent = "";
    typingIndex = 0;
    
    function type() {
        if (typingIndex < text.length) {
            typingTarget.textContent += text.charAt(typingIndex);
            typingIndex++;
            setTimeout(type, 80);
        } else {
            isTyping = false;
        }
    }
    type();
}

// Section Switching Logic
function switchSection(targetId) {
    navBtns.forEach(btn => {
        if (btn.getAttribute('data-section') === targetId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    sections.forEach(section => {
        if (section.id === targetId) {
            section.style.display = 'flex';
            setTimeout(() => {
                section.classList.add('active-section');
            }, 10);
        } else {
            section.classList.remove('active-section');
            section.style.display = 'none';
        }
    });

    if (targetId === 'hero') {
        startTyping();
    }
}

// Event Listeners for Nav
navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-section');
        switchSection(targetId);
        window.scrollTo(0, 0);
    });
});
