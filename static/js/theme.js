/* Maschinenschrift — Schema-Toggle (ADR 0057).
   Laeuft synchron im <head>, damit ein gespeicherter Override vor dem ersten
   Paint auf <html data-theme> liegt und nichts aufblitzt. Der Speicher ist
   funktional (localStorage, kein Cookie, kein Tracking): er haelt genau die
   vom Leser gedrueckte Wahl. Ohne Wahl entscheidet weiter das System. */
(function () {
  'use strict';

  var root = document.documentElement;
  var KEY = 'theme';
  /* Muss --color-page in main.css entsprechen (hell/dunkel). */
  var PAGE = { light: '#fdfdfb', dark: '#151513' };

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) { /* Storage gesperrt: Toggle wirkt dann nur pro Seite. */ }
  if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  }

  function effectiveTheme() {
    var t = root.getAttribute('data-theme');
    return t === 'light' || t === 'dark' ? t : systemTheme();
  }

  /* Die beiden theme-color-Metas folgen per media-Attribut dem System; ein
     Override muss beide auf seine Seitenfarbe stellen. */
  function syncMeta() {
    var t = root.getAttribute('data-theme');
    if (t !== 'light' && t !== 'dark') return;
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute('content', PAGE[t]);
  }
  syncMeta();

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function paint() {
      btn.setAttribute('aria-pressed', effectiveTheme() === 'dark' ? 'true' : 'false');
    }

    btn.hidden = false;
    paint();

    btn.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      syncMeta();
      paint();
    });

    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () { paint(); };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  });
})();
