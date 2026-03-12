/* ===== CURSOR (desktop only) ===== */
var cursor = document.getElementById('cursor');
var ring = document.getElementById('cursorRing');
var mx = 0, my = 0, rx = 0, ry = 0;

if (cursor && ring) {
  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = (mx - 6) + 'px';
    cursor.style.top = (my - 6) + 'px';
  });

  function animateRing() {
    rx += (mx - rx - 18) * 0.12;
    ry += (my - ry - 18) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      cursor.style.transform = 'scale(2.5)';
      ring.style.opacity = '0.8';
      ring.style.width = '50px';
      ring.style.height = '50px';
    });
    el.addEventListener('mouseleave', function() {
      cursor.style.transform = 'scale(1)';
      ring.style.opacity = '0.4';
      ring.style.width = '36px';
      ring.style.height = '36px';
    });
  });
}

/* ===== THEME TOGGLE ===== */
var html = document.documentElement;
var savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

function applyTheme(next) {
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

var toggleBtn = document.getElementById('themeToggle');
if (toggleBtn) {
  toggleBtn.addEventListener('click', function() {
    var current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

var toggleBtnMobile = document.getElementById('themeToggleMobile');
if (toggleBtnMobile) {
  toggleBtnMobile.addEventListener('click', function() {
    var current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* ===== MOBILE NAV ===== */
var hamburgerBtn = document.getElementById('hamburgerBtn');
var mobileNavOverlay = document.getElementById('mobileNavOverlay');
var mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
var isMenuOpen = false;

function openMenu() {
  isMenuOpen = true;
  hamburgerBtn.classList.add('active');
  mobileNavOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburgerBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  isMenuOpen = false;
  hamburgerBtn.classList.remove('active');
  mobileNavOverlay.classList.remove('open');
  document.body.style.overflow = '';
  hamburgerBtn.setAttribute('aria-expanded', 'false');
}

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', function() {
    if (isMenuOpen) closeMenu(); else openMenu();
  });
}

mobileNavLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    closeMenu();
  });
});

// Close on overlay click (outside links)
if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener('click', function(e) {
    if (e.target === mobileNavOverlay) closeMenu();
  });
}

// Close on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && isMenuOpen) closeMenu();
});

/* ===== SCROLL REVEAL ===== */
var reveals = document.querySelectorAll('.reveal');
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      var delay = parseInt(entry.target.dataset.delay) || 0;
      setTimeout(function() { entry.target.classList.add('visible'); }, delay * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(function(el, i) {
  el.dataset.delay = i % 4;
  observer.observe(el);
});

/* ===== ACTIVE NAV ===== */
var allSections = document.querySelectorAll('section[id]');
var navLinksDesktop = document.querySelectorAll('.nav-link-custom');

window.addEventListener('scroll', function() {
  var current = '';
  allSections.forEach(function(s) {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinksDesktop.forEach(function(a) {
    a.style.color = (a.getAttribute('href') === '#' + current) ? 'var(--accent)' : '';
  });
});