/* Minimal replacement for Squarespace's visitor JS: mobile burger menu,
   mobile folder navigation, and the contact form's mailto submit. */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    // --- burger / mobile menu ---
    var burger = document.querySelector('.header-burger-btn');
    if (burger) {
      burger.addEventListener('click', function () {
        burger.classList.toggle('burger--active');
        document.body.classList.toggle('header--menu-open');
      });
    }

    // --- desktop nav folder dropdown (PROJECTS) ---
    document.querySelectorAll('button.header-nav-folder-title').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = btn.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('button.header-nav-folder-title[aria-expanded="true"]')
          .forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.header-nav-item--folder')) {
        document.querySelectorAll('button.header-nav-folder-title[aria-expanded="true"]')
          .forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      }
    });

    // --- mobile menu folder navigation (PROJECTS submenu) ---
    // Squarespace's menu JS reparents nested subfolders to siblings of the
    // root folder so the slide transforms work; do the same.
    var rootFolder = document.querySelector('[data-folder="root"]');
    if (rootFolder) {
      rootFolder.querySelectorAll('.header-menu-nav-folder').forEach(function (sub) {
        rootFolder.parentElement.appendChild(sub);
      });
    }
    document.querySelectorAll('[data-folder-id]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var id = el.getAttribute('data-folder-id');
        var target = document.querySelector('[data-folder="' + id + '"]');
        if (target) {
          target.classList.add('header-menu-nav-folder--active');
          if (rootFolder) rootFolder.classList.add('header-menu-nav-folder--open');
        }
      });
    });
    document.querySelectorAll('[data-action="back"]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var folder = el.closest('[data-folder]');
        if (folder) folder.classList.remove('header-menu-nav-folder--active');
        if (rootFolder) rootFolder.classList.remove('header-menu-nav-folder--open');
      });
    });

    // --- contact form -> mailto ---
    var form = document.querySelector('form[data-nccp-mailto]');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var to = form.getAttribute('data-nccp-mailto');
        var fname = (form.querySelector('[name="fname"]') || {}).value || '';
        var lname = (form.querySelector('[name="lname"]') || {}).value || '';
        var name = (fname + ' ' + lname).trim() ||
          ((form.querySelector('[name="name"]') || {}).value || '');
        var email = (form.querySelector('[name="email"]') || {}).value || '';
        var msg = (form.querySelector('[name="message"]') || {}).value || '';
        var subject = 'Website inquiry from ' + name;
        var body = msg + '\n\nFrom: ' + name + ' <' + email + '>';
        window.location.href = 'mailto:' + to +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(body);
      });
    }
  });
})();
