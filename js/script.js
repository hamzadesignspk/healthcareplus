document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky nav shadow on scroll ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        toggle.classList.remove('is-open');
      });
    });
  }

  /* ---------- Appointment / contact form (frontend only) ---------- */
  document.querySelectorAll('form[data-appointment-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var successBox = form.querySelector('.form-success');
      if (successBox) {
        successBox.classList.add('is-visible');
        successBox.setAttribute('role', 'status');
      }
      form.reset();
      if (successBox) {
        setTimeout(function () {
          successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
      }
    });
  });

  /* ---------- Doctors specialty filter (doctors.html) ---------- */
  var tabs = document.querySelectorAll('.filter-tab');
  var doctorCards = document.querySelectorAll('.doctors-grid .doctor-card');
  if (tabs.length && doctorCards.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');
        var filter = tab.getAttribute('data-filter');
        doctorCards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-specialty') === filter;
          card.hidden = !match;
        });
      });
    });
  }

  /* ---------- Reveal on scroll (single orchestrated entrance per section) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Set active nav link based on current page ---------- */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path) link.classList.add('is-active');
  });

});
