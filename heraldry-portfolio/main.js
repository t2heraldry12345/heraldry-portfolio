/* ===== CURSOR ===== */
var cursor = document.getElementById('cursor');
var ring = document.getElementById('cursorRing');
var mx = 0, my = 0, rx = 0, ry = 0;

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

/* ===== THEME TOGGLE ===== */
var html = document.documentElement;
var toggleBtn = document.getElementById('themeToggle');

var savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

toggleBtn.addEventListener('click', function() {
  var current = html.getAttribute('data-theme');
  var next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
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
}, { threshold: 0.12 });

reveals.forEach(function(el, i) {
  el.dataset.delay = i % 4;
  observer.observe(el);
});

/* ===== ACTIVE NAV ===== */
var allSections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
  var current = '';
  allSections.forEach(function(s) {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(function(a) {
    a.style.color = (a.getAttribute('href') === '#' + current) ? 'var(--accent)' : '';
  });
});