// Maschinenschrift-Siegel — Client-Side Live-Preview (Phase 3, optional).
//
// Aktiviert die Slider-Live-Preview ueber dem Atlas-Grid. Ohne JS bleibt
// #siegel-preview ausgeblendet und der Atlas dient als Baseline.
//
// Geometrie ist identisch zur Python-Referenz (scripts/siegel.py).
// Spec v6 (seit 2026-05-24): Achsen D/G/K (Diktion, Geist, Korrespondenz),
// K-Werte belegt/ausstehend.
// Quelle: /spec/siegel-v6/ bzw. _quellen/maschinenschrift-siegel-prompt-v6.md.

(function () {
  'use strict';

  // --- Spec-Konstanten (Spec v6) -------------------------------------------
  const SLOT_CENTERS_X = [40, 52, 64, 76, 88];
  const DOT_RADIUS = 2.2;
  const BRACKET = {
    topY: 26, bottomY: 74,
    leftVertX: 16, leftSerifEndX: 24,
    rightVertX: 114, rightSerifStartX: 106,
  };
  const ROW_Y = { diktion: 36, geist: 50, korrespondenz: 64 };
  const PENDING_BAR = { startX: 70, endX: 92, height: 2.4 };
  const DEFAULT_STROKE = 1.8;
  const DEFAULT_COLOR = '#1a1a1a';

  function fmt(v) {
    return Number.isInteger(v) ? String(v) : (+v.toFixed(4)).toString();
  }

  function rect(x, y, w, h, color) {
    return `<rect x="${fmt(x)}" y="${fmt(y)}" width="${fmt(w)}" height="${fmt(h)}" fill="${color}"/>`;
  }

  function circle(cx, cy, r, color) {
    return `<circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}" fill="${color}"/>`;
  }

  function buildBrackets(stroke, color) {
    const h = stroke / 2;
    const height = BRACKET.bottomY - BRACKET.topY + stroke;
    const leftSerifW = BRACKET.leftSerifEndX - BRACKET.leftVertX + h;
    const rightSerifW = BRACKET.rightVertX - BRACKET.rightSerifStartX + stroke;
    return [
      rect(BRACKET.leftVertX - h, BRACKET.topY - h, stroke, height, color),
      rect(BRACKET.leftVertX - h, BRACKET.topY - h, leftSerifW, stroke, color),
      rect(BRACKET.leftVertX - h, BRACKET.bottomY - h, leftSerifW, stroke, color),
      rect(BRACKET.rightVertX - h, BRACKET.topY - h, stroke, height, color),
      rect(BRACKET.rightSerifStartX - h, BRACKET.topY - h, rightSerifW, stroke, color),
      rect(BRACKET.rightSerifStartX - h, BRACKET.bottomY - h, rightSerifW, stroke, color),
    ].join('');
  }

  function buildDotRow(n, y, color) {
    let s = '';
    for (let i = 0; i < n; i++) s += circle(SLOT_CENTERS_X[i], y, DOT_RADIUS, color);
    return s;
  }

  function buildKorrespondenzRow(state, y, color) {
    if (state === 'belegt') return '';
    return rect(
      PENDING_BAR.startX,
      y - PENDING_BAR.height / 2,
      PENDING_BAR.endX - PENDING_BAR.startX,
      PENDING_BAR.height,
      color,
    );
  }

  function buildSeal(diktion, geist, korrespondenz, stroke, color) {
    stroke = stroke || DEFAULT_STROKE;
    color = color || DEFAULT_COLOR;
    const inner =
      buildBrackets(stroke, color) +
      buildDotRow(diktion, ROW_Y.diktion, color) +
      buildDotRow(geist, ROW_Y.geist, color) +
      buildKorrespondenzRow(korrespondenz, ROW_Y.korrespondenz, color);
    return `<svg viewBox="0 0 130 100" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  // --- Color helpers --------------------------------------------------------
  function normalizeHex(input) {
    let s = (input || '').trim();
    if (!s.startsWith('#')) s = '#' + s;
    if (/^#[0-9a-fA-F]{6}$/.test(s)) return s.toLowerCase();
    if (/^#[0-9a-fA-F]{3}$/.test(s)) {
      return '#' + s.slice(1).split('').map((c) => c + c).join('').toLowerCase();
    }
    return null;
  }

  // Returns true for colors whose perceived luminance is high (i.e., light).
  // Used to swap the preview backdrop so the seal stays visible.
  function isLightColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return false;
    const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luma > 0.6;
  }

  // --- i18n -----------------------------------------------------------------
  const STRINGS = {
    en: {
      diktionLabel: 'Diction (D)',
      geistLabel: 'Geist (G)',
      korrespondenzLegend: 'Correspondence (K)',
      colorLegend: 'Color',
      swatchBlack: 'Black',
      swatchWhite: 'White',
      swatchBlue: 'Netscape Blue',
      hexLabel: 'HEX value',
      colorPickerLabel: 'Custom color picker',
      dlSvg: 'Download SVG',
      dlPng: 'Download PNG (1024 px)',
    },
    de: {
      diktionLabel: 'Diktion (D)',
      geistLabel: 'Geist (G)',
      korrespondenzLegend: 'Korrespondenz (K)',
      colorLegend: 'Farbe',
      swatchBlack: 'Schwarz',
      swatchWhite: 'Weiß',
      swatchBlue: 'Netscape Blue',
      hexLabel: 'HEX-Wert',
      colorPickerLabel: 'Eigene Farbe wählen',
      dlSvg: 'SVG herunterladen',
      dlPng: 'PNG herunterladen (1024 px)',
    },
  };

  function getStrings() {
    const lang = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
    return STRINGS[lang] || STRINGS.en;
  }

  // --- UI-Bootstrap ---------------------------------------------------------
  function mount() {
    const container = document.getElementById('siegel-preview');
    if (!container) return;

    container.hidden = false;
    container.setAttribute('aria-hidden', 'false');
    const t = getStrings();
    container.innerHTML = `
      <div class="preview-glyph" id="preview-glyph"></div>
      <div class="preview-controls">
        <label>${t.diktionLabel}
          <input type="range" id="ctrl-d" min="0" max="5" step="1" value="0">
          <output id="out-d">0</output>
        </label>
        <label>${t.geistLabel}
          <input type="range" id="ctrl-g" min="0" max="5" step="1" value="0">
          <output id="out-g">0</output>
        </label>
        <fieldset class="preview-k">
          <legend>${t.korrespondenzLegend}</legend>
          <label><input type="radio" name="ctrl-k" value="belegt" checked> belegt</label>
          <label><input type="radio" name="ctrl-k" value="ausstehend"> ausstehend</label>
        </fieldset>
        <fieldset class="preview-color">
          <legend>${t.colorLegend}</legend>
          <div class="color-swatches" id="color-swatches">
            <button type="button" data-color="#1a1a1a" class="swatch swatch-black" aria-label="${t.swatchBlack}" title="${t.swatchBlack}"></button>
            <button type="button" data-color="#ffffff" class="swatch swatch-white" aria-label="${t.swatchWhite}" title="${t.swatchWhite}"></button>
            <button type="button" data-color="#0000ee" class="swatch swatch-blue" aria-label="${t.swatchBlue}" title="${t.swatchBlue}"></button>
          </div>
          <div class="color-picker-row">
            <input type="color" id="ctrl-color" value="#1a1a1a" aria-label="${t.colorPickerLabel}">
            <input type="text" id="ctrl-color-hex" value="#1a1a1a" maxlength="7" spellcheck="false" aria-label="${t.hexLabel}">
          </div>
        </fieldset>
      </div>
      <div class="preview-downloads">
        <a id="dl-svg" href="#" download="siegel.svg">${t.dlSvg}</a>
        <a id="dl-png" href="#" download="siegel.png">${t.dlPng}</a>
      </div>
    `;

    const $ = (id) => document.getElementById(id);
    const ctrls = {
      d: $('ctrl-d'),
      g: $('ctrl-g'),
      outD: $('out-d'),
      outG: $('out-g'),
      glyph: $('preview-glyph'),
      color: $('ctrl-color'),
      colorHex: $('ctrl-color-hex'),
      swatches: $('color-swatches'),
      dlSvg: $('dl-svg'),
      dlPng: $('dl-png'),
    };

    function currentState() {
      const d = parseInt(ctrls.d.value, 10);
      const g = parseInt(ctrls.g.value, 10);
      const kEl = document.querySelector('input[name="ctrl-k"]:checked');
      const k = kEl ? kEl.value : 'belegt';
      const color = normalizeHex(ctrls.color.value) || DEFAULT_COLOR;
      return { d, g, k, color };
    }

    function render() {
      const { d, g, k, color } = currentState();
      ctrls.outD.value = String(d);
      ctrls.outG.value = String(g);

      // Auto-backdrop: dark behind light colors so the seal stays visible.
      ctrls.glyph.classList.toggle('dark-backdrop', isLightColor(color));

      const svg = buildSeal(d, g, k, DEFAULT_STROKE, color);
      ctrls.glyph.innerHTML = svg;

      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(blob);
      ctrls.dlSvg.href = svgUrl;
      ctrls.dlSvg.download = `siegel-d${d}-g${g}-${k}-${color.slice(1)}.svg`;

      ctrls.dlPng.onclick = function (ev) {
        ev.preventDefault();
        rasterize(svg, 1024).then((url) => {
          const a = document.createElement('a');
          a.href = url;
          a.download = `siegel-d${d}-g${g}-${k}-${color.slice(1)}-1024.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
      };
    }

    function rasterize(svgText, widthPx) {
      return new Promise((resolve) => {
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);
        const img = new Image();
        img.onload = function () {
          const ratio = 100 / 130;
          const heightPx = Math.round(widthPx * ratio);
          const canvas = document.createElement('canvas');
          canvas.width = widthPx;
          canvas.height = heightPx;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, widthPx, heightPx);
          URL.revokeObjectURL(url);
          canvas.toBlob((blob) => resolve(URL.createObjectURL(blob)), 'image/png');
        };
        img.src = url;
      });
    }

    // Sync color picker, HEX text input, and swatches.
    function setColor(hex) {
      const normalized = normalizeHex(hex);
      if (!normalized) return;
      ctrls.color.value = normalized;
      ctrls.colorHex.value = normalized;
      render();
    }

    ctrls.color.addEventListener('input', () => setColor(ctrls.color.value));
    ctrls.colorHex.addEventListener('change', () => {
      const n = normalizeHex(ctrls.colorHex.value);
      if (n) setColor(n);
      else ctrls.colorHex.value = ctrls.color.value; // revert invalid input
    });
    ctrls.swatches.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-color]');
      if (btn) setColor(btn.dataset.color);
    });

    ctrls.d.addEventListener('input', render);
    ctrls.g.addEventListener('input', render);
    document.querySelectorAll('input[name="ctrl-k"]').forEach((el) => {
      el.addEventListener('change', render);
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
