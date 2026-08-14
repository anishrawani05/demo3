// ============================================================
// FAQ DATA
// ============================================================
const faqData = [
    { q: 'Is 99ToolHub completely free?', a: 'Yes, all tools are 100% free with no hidden charges.' },
    { q: 'Do I need to sign up?', a: 'No account required. Just visit and start using any tool.' },
    { q: 'Are my files secure?', a: 'Absolutely. We do not store any files or data.' },
    { q: 'How many tools are available?', a: 'We currently have 21+ tools and add new ones regularly.' },
    { q: 'Can I use the tools offline?', a: 'Most tools require an internet connection, but some may work offline.' },
    { q: 'Is 99ToolHub mobile-friendly?', a: 'Yes, the entire site is fully responsive on all devices.' },
    { q: 'How fast are the tools?', a: 'Our tools are optimized for speed and provide results instantly.' },
    { q: 'Do you track user data?', a: 'We respect privacy. We collect only anonymous usage statistics.' },
    { q: 'Can I suggest a new tool?', a: 'Yes, please contact us with your suggestion.' },
    { q: 'Is there a limit on usage?', a: 'No, you can use tools as many times as you want.' }
];

const articlesData = [
    {
        title: 'PDF vs JPG: Document Share Karne ke liye Kaunsa Better Hai',
        excerpt: 'PDF aur JPG ke differences, advantages aur use cases ko simple language mein samjhein.',
        image: 'images/image1.png',
        link: 'Blog/blog1.html'
    },

    {
        title: 'Image Compress Karna Kyon Zaroori Hai',
        excerpt: 'Smaller image files website speed, sharing aur storage ko kaise improve karte hain.',
        image: 'images/image2.png',
        link: 'Blog/blog2.html'
    },

    {
        title: 'Online Forms ke liye Photo aur PDF Ready Kaise Karein',
        excerpt: 'Size, dimensions, format aur file requirements ko easily manage karne ka practical guide.',
        image: 'images/image3.png',
        link: 'Blog/blog3.html'
    }
 
];
// ============================================================
// RENDER FAQ & ARTICLES
// ============================================================
function renderFAQ() {
    const container = document.getElementById('faqContainer');
    if (!container) return;
    container.innerHTML = faqData.map((item, idx) => `
            <div class="faq-item" data-animate>
                <div class="faq-question" data-idx="${idx}">
                    <span>${item.q}</span>
                    <span class="faq-toggle">▼</span>
                </div>
                <div class="faq-answer">${item.a}</div>
            </div>
        `).join('');

    container.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', function() {
            const item = this.parentElement;
            const isOpen = item.classList.contains('open');
            container.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
    const first = container.querySelector('.faq-item');
    if (first) first.classList.add('open');
}

function renderArticles() {

    const grid = document.getElementById('articlesGrid');

    if (!grid) return;

    grid.innerHTML = articlesData.map(a => `
        <div class="article-card" data-animate>

            <a href="${a.link}" class="article-img-link">
                <div class="article-img">
                    <img 
                        src="${a.image}" 
                        alt="${a.title}" 
                        loading="lazy"
                        onerror="this.style.display='none';"
                    >
                </div>
            </a>

            <div class="article-body">

                <div class="article-title">
                    ${a.title}
                </div>

                <div class="article-excerpt">
                    ${a.excerpt}
                </div>

                <a href="${a.link}" class="read-more">
                    Read More →
                </a>

            </div>

        </div>
    `).join('');
}

// ============================================================
// NAVBAR – MOBILE MENU TOGGLE
// ============================================================
const mobileToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('open');
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.style.background = mobileMenu.classList.contains('open') ? '#000000' : '');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });

    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileMenu.classList.remove('open');
        }
    });
}

// ============================================================
// SEARCH (live filter for tools)
// ============================================================
const searchInputs = document.querySelectorAll('.search-input, .hero-search-input');
searchInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        const query = this.value.toLowerCase().trim();
        const toolCards = document.querySelectorAll('.tool-card');
        toolCards.forEach(card => {
            const name = card.querySelector('.tool-name')?.textContent?.toLowerCase() || '';
            const desc = card.querySelector('.tool-desc')?.textContent?.toLowerCase() || '';
            const match = name.includes(query) || desc.includes(query);
            card.style.display = match ? '' : 'none';
        });
    });
});

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
    const elements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    elements.forEach(el => observer.observe(el));
}

// ============================================================
// COUNTER ANIMATION
// ============================================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-count'));
                const isFloat = target % 1 !== 0;
                const duration = 1500;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = progress * target;
                    el.textContent = isFloat ? current.toFixed(2) : Math.floor(current);
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = isFloat ? target.toFixed(2) : target;
                    }
                }
                requestAnimationFrame(updateCounter);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });
    counters.forEach(c => observer.observe(c));
}

// ============================================================
// RIPPLE BUTTONS
// ============================================================
function initRippleButtons() {
    document.querySelectorAll('.btn-ripple').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const size = Math.max(rect.width, rect.height);
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x - size / 2 + 'px';
            ripple.style.top = y - size / 2 + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ============================================================
// NEWSLETTER
// ============================================================
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            if (email) {
                alert('Thank you for subscribing! (Demo)');
                this.reset();
            }
        });
    }
}

// ============================================================
// MAIN INIT
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    renderFAQ();
    renderArticles();
    initScrollReveal();
    initCounters();
    initRippleButtons();
    initNewsletter();
});
/* ==============================
   MOBILE CATEGORIES
============================== */

const categoriesToggle =
    document.getElementById("categoriesToggle");

const categoriesDropdown =
    document.getElementById("categoriesDropdown");


if (categoriesToggle && categoriesDropdown) {

    categoriesToggle.addEventListener(
        "click",
        function () {

            categoriesDropdown.classList.toggle(
                "active"
            );

            categoriesToggle.classList.toggle(
                "active"
            );

        }
    );

}