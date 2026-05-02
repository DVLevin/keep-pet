/* Keep Pet site chrome
   - Soft password gate (sessionStorage; "KeepPetLoved")
   - Top nav strip (Hub | Vision | Roadmap | Plan + RU/EN toggle)
   - Reads data-page and data-lang from <body> for active highlight + lang link
   NOTE: This is a soft gate. Anyone reading source can see the password.
   It exists to stop crawlers and casual visitors, not to enforce confidentiality.
*/
(function () {
  'use strict';

  var PASS = 'KeepPetLoved';
  var KEY = 'kp_auth_v1';

  var page = document.body.getAttribute('data-page') || 'index';
  var lang = document.body.getAttribute('data-lang') || 'ru';

  // ---- Gate ----------------------------------------------------------------
  function authed() {
    try { return sessionStorage.getItem(KEY) === PASS; } catch (e) { return false; }
  }
  function setAuthed() {
    try { sessionStorage.setItem(KEY, PASS); } catch (e) {}
  }

  function buildGate() {
    var copy = lang === 'en'
      ? { title: 'Keep Pet', sub: 'Internal — vision, roadmap, plan', ph: 'Password', go: 'Enter', err: 'Wrong password.', hint: 'Ask Dima.' }
      : { title: 'Keep Pet', sub: 'Внутренний документ — видение, дорожная карта, план', ph: 'Пароль', go: 'Войти', err: 'Неверный пароль.', hint: 'Спросите Диму.' };

    var wrap = document.createElement('div');
    wrap.id = 'kp-gate';
    wrap.innerHTML =
      '<div class="kp-gate-card">' +
        '<div class="kp-gate-mark">Keep Pet</div>' +
        '<div class="kp-gate-sub">' + copy.sub + '</div>' +
        '<form class="kp-gate-form" autocomplete="off">' +
          '<input type="password" class="kp-gate-input" placeholder="' + copy.ph + '" autofocus>' +
          '<button type="submit" class="kp-gate-btn">' + copy.go + '</button>' +
        '</form>' +
        '<div class="kp-gate-err" hidden>' + copy.err + ' <span class="kp-gate-hint">' + copy.hint + '</span></div>' +
      '</div>';
    document.body.appendChild(wrap);

    var input = wrap.querySelector('.kp-gate-input');
    var err = wrap.querySelector('.kp-gate-err');
    wrap.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value === PASS) {
        setAuthed();
        wrap.parentNode.removeChild(wrap);
        document.documentElement.classList.remove('kp-locked');
      } else {
        err.hidden = false;
        input.value = '';
        input.focus();
      }
    });
  }

  // ---- Top nav -------------------------------------------------------------
  var NAV = [
    { id: 'index',   ru: 'Главная',  en: 'Home' },
    { id: 'vision',  ru: 'Видение',  en: 'Vision' },
    { id: 'roadmap', ru: 'Дорожная карта', en: 'Roadmap' },
    { id: 'plan',    ru: 'План',     en: 'Plan' }
  ];

  function pageHref(id, lng) {
    if (id === 'index') return lng === 'en' ? 'index.html?lang=en' : 'index.html';
    return lng === 'en' ? id + '-en.html' : id + '.html';
  }

  function buildNav() {
    var bar = document.createElement('nav');
    bar.id = 'kp-topbar';
    var inner = document.createElement('div');
    inner.className = 'kp-topbar-inner';

    var brand = document.createElement('a');
    brand.className = 'kp-brand';
    brand.href = pageHref('index', lang);
    brand.innerHTML = '<span class="kp-brand-mark">Keep Pet</span><span class="kp-brand-sub">' + (lang === 'en' ? 'internal' : 'внутреннее') + '</span>';
    inner.appendChild(brand);

    var links = document.createElement('div');
    links.className = 'kp-nav-links';
    NAV.forEach(function (item) {
      if (item.id === 'index') return;
      var a = document.createElement('a');
      a.href = pageHref(item.id, lang);
      a.textContent = lang === 'en' ? item.en : item.ru;
      if (item.id === page) a.className = 'is-active';
      links.appendChild(a);
    });
    inner.appendChild(links);

    var langBox = document.createElement('div');
    langBox.className = 'kp-lang';
    var ru = document.createElement('a');
    ru.href = pageHref(page, 'ru');
    ru.textContent = 'RU';
    if (lang === 'ru') ru.className = 'is-active';
    var en = document.createElement('a');
    en.href = pageHref(page, 'en');
    en.textContent = 'EN';
    if (lang === 'en') en.className = 'is-active';
    langBox.appendChild(ru);
    langBox.appendChild(document.createTextNode(' · '));
    langBox.appendChild(en);
    inner.appendChild(langBox);

    bar.appendChild(inner);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  // ---- Boot ----------------------------------------------------------------
  if (!authed()) {
    document.documentElement.classList.add('kp-locked');
    buildGate();
  }
  buildNav();
})();
