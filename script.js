/* ═══════════════════════════════════════
   SURYA BARU — BENGKEL LAS
   script.js  |  Rebuilt from source
═══════════════════════════════════════ */

/* ─── YEAR ─── */
document.getElementById('year').textContent = new Date().getFullYear();


/* ─── NAV SCROLL EFFECT ─── */
(function () {
  const nav = document.querySelector('.site-nav');
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ─── MOBILE MENU ─── */
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const isOpen = menu.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Close when a link inside mobile menu is clicked
document.querySelectorAll('#mobile-menu a').forEach(function (a) {
  a.addEventListener('click', function () {
    document.getElementById('mobile-menu').classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ─── LIGHTBOX ─── */
function openLightbox(src, name, cat) {
  document.getElementById('lb-img').src = src;
  document.getElementById('lb-img').alt = name;
  document.getElementById('lb-label').textContent = cat + ' · ' + name;
  const lb = document.getElementById('lightbox');
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  const lb = document.getElementById('lightbox');
  if (!e || e.target === lb || (e.currentTarget && e.currentTarget.classList.contains('lightbox-close'))) {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});


/* ─── SCROLL REVEAL ─── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { io.observe(el); });
})();


/* ─── AUTO-SCROLL hero rows (pause on hover) ─── */
(function () {
  document.querySelectorAll('.hero-scroll-row').forEach(function (row, i) {
    var speed = i === 0 ? 0.5 : 0.35; // px per frame
    var dir   = i === 0 ? 1 : -1;
    var paused = false;

    row.addEventListener('mouseenter', function () { paused = true; });
    row.addEventListener('mouseleave', function () { paused = false; });
    row.addEventListener('touchstart', function () { paused = true; }, { passive: true });

    (function tick() {
      if (!paused) {
        row.scrollLeft += speed * dir;
        // infinite loop: reset when hitting edges
        if (row.scrollLeft <= 0) {
          row.scrollLeft = row.scrollWidth / 2;
        }
        if (row.scrollLeft >= row.scrollWidth / 2) {
          row.scrollLeft = 0;
        }
      }
      requestAnimationFrame(tick);
    })();
  });
})();
