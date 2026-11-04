/* Feld-Grafik der Notiz „Das Feld, vermessen“ / „The Field, Measured“ (ADR 0385).
   Fuellt den Behaelter [data-fv="raster"]: Koerper (zwei Platten W × G) und
   sieben Tafeln. Die Klassengrenzen sind Lesarten dieser Notiz, geprueft am
   04.11.2026 an den Veroeffentlichungen der Systeme (Quellen im Front Matter). */
(function () {
  "use strict";
  var DE = (document.documentElement.lang || "").slice(0, 2) === "de";
  function T(de, en) { return DE ? de : en; }
  var NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function h(tag, cls, html, parent) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function leeren(box) { while (box.firstChild) box.removeChild(box.firstChild); }


  /* Muster für die Klassen: Ton, Schraffur, Kreuzschraffur. */
  function muster(box) {
    var s = el("svg", { width: 0, height: 0, style: "position:absolute", "aria-hidden": "true" });
    var d = el("defs", {}, s);
    var a = el("pattern", { id: "fv-p-schraeg", width: 5, height: 5, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, d);
    el("rect", { width: 5, height: 5, style: "fill:var(--page)" }, a);
    el("line", { x1: 0, y1: 0, x2: 0, y2: 5, style: "stroke:var(--ink-soft);stroke-width:1.1" }, a);
    var b = el("pattern", { id: "fv-p-kreuz", width: 5, height: 5, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, d);
    el("rect", { width: 5, height: 5, style: "fill:var(--tone)" }, b);
    el("line", { x1: 0, y1: 0, x2: 0, y2: 5, style: "stroke:var(--ink-soft);stroke-width:1" }, b);
    el("line", { x1: 0, y1: 0, x2: 5, y2: 0, style: "stroke:var(--ink-soft);stroke-width:1" }, b);
    box.appendChild(s);
  }
  var FILL = { flaeche: "var(--tone)", schraeg: "url(#fv-p-schraeg)", kreuz: "url(#fv-p-kreuz)", leer: "var(--page)" };

  /* ================= Raster und Körper ================= */
  var boxR = document.querySelector('[data-fv="raster"]');
  if (boxR) (function () {
    leeren(boxR); muster(boxR);
    var Z = T("Zeichen oder keins", "label or none");
    var P = [
      { id: "etikett", name: T("Etikett", "Label"), unter: "Human Authored (Authors Guild)", zaehl: T("Leserin sieht 1 Zustand", "the reader sees 1 state"),
        k: { z: [T("trägt das Zeichen", "carries the label"), "flaeche"], s: [T("schweigt", "stays silent"), "leer"] },
        f: function (w, g) { return w <= 1 && g <= 1 ? "z" : "s"; },
        notiz: T("Am Original geprüft: höchstens geringfügiger KI-Text, Rechtschreibhilfe ja, Ideenfindung nur grob, Figuren und Plot nicht. Not By AI zieht die Grenze weiter (90 % menschlich), die avj nennt keine Einzelregeln.", "Checked against the original: at most a trifling amount of AI text, spell-check yes, brainstorming only at a high level, characters and plot no. Not By AI draws the line further out (90 % human); the avj label gives no detailed rules.") },
      { id: "organic", name: "Organic Literature", unter: "Books By People", zaehl: T("Leserin sieht 1 Zustand", "the reader sees 1 state"),
        k: { z: [T("trägt das Zeichen", "carries the label"), "flaeche"], s: [T("schweigt", "stays silent"), "leer"] },
        f: function (w) { return w <= 1 ? "z" : "s"; },
        notiz: T("Am Original geprüft: Der Text muss von der Autorin stammen, Rechtschreib- und Grammatikhilfe erlaubt. Zu den Gedanken sagt das Kriterium nichts (Lesart).", "Checked against the original: the writing must come from the author, spelling and grammar help allowed. The criterion says nothing about ideas (reading).") },
      { id: "kdp", name: "KDP", unter: T("Angabe an Amazon", "reported to Amazon"), zaehl: T("der Händler erfährt 2 Zustände", "the retailer learns 2 states"),
        k: { n: [T("unterstützt, nicht anzugeben", "assisted, not disclosed"), "flaeche"], g: [T("KI-generiert, anzugeben", "AI-generated, to be disclosed"), "schraeg"] },
        f: function (w) { return w >= 4 ? "g" : "n"; },
        notiz: T("Am Original geprüft: Von KI erzeugter Text bleibt KI-generiert, auch stark überarbeitet; Ideenfindung und Überarbeitung eigenen Texts gelten als unterstützt. Grenze W 3/4 als Lesart.", "Checked against the original: text created by AI stays AI-generated even after substantial edits; brainstorming and refining one's own text count as assisted. Boundary W 3/4 as a reading.") },
      { id: "stm", name: "STM", unter: T("Verband wissenschaftlicher Verlage, 2025", "association of scholarly publishers, 2025"), zaehl: T("9 Tätigkeiten, für dieses Feld 2", "9 activities, 2 for this field"),
        k: { n: [T("keine Tätigkeit", "no activity"), "leer"], s: [T("Sprache verbessert (Kat. 1)", "language refined (cat. 1)"), "flaeche"], t: [T("Text verfasst (Kat. 2)", "text drafted (cat. 2)"), "schraeg"] },
        f: function (w) { return w === 0 ? "n" : w <= 2 ? "s" : "t"; },
        notiz: T("Am Original geprüft: Ideen gehören zum Forschungsprozess und liegen außerhalb. Kat. 2 heißt „Teil oder Gesamtheit“ des Texts, ohne Ausmaß.", "Checked against the original: ideas belong to the research process and lie outside. Cat. 2 means “part or all” of the text, without extent.") },
      { id: "credtent", name: "Credtent", unter: "Creative Origin Badges", zaehl: T("3 Abzeichen, dazu Legacy für Werke vor Nov. 2022", "3 badges, plus Legacy for works before Nov. 2022"),
        k: { h: ["Human Composed", "flaeche"], a: ["AI-Assisted", "schraeg"], g: ["AI-Generated", "kreuz"] },
        f: function (w, g) { if (w <= 1 && g <= 1) return "h"; if (w >= 4 && g >= 4) return "g"; return "a"; },
        notiz: T("Am Original geprüft: assisted heißt, eine Person hat das Werk mit Hilfe von KI gemacht; generated, das Werk wurde von KI erzeugt. Eine Grenze nach Anteil ziehen die Definitionen nicht; die Grenzen hier sind Lesart.", "Checked against the original: assisted means a person made the work with help from AI; generated means the work was generated by AI. The definitions draw no line by share; the boundaries here are a reading.") },
      { id: "faia", name: "FAIA", unter: "Liccium, Leiden, GO FAIR", zaehl: T("3 Flaggen, dazu Tätigkeitscodes", "3 flags, plus activity codes"),
        k: { h: ["Human-Created", "flaeche"], a: ["AI-Assisted", "schraeg"], g: ["AI-Generated", "kreuz"] },
        f: function (w, g) { if (w === 0 && g === 0) return "h"; if (w >= 4 && g >= 4) return "g"; return "a"; },
        notiz: T("Am Original geprüft: Human-Created heißt keine generative KI in keinem Schritt; generated, wenn die KI der hauptsächliche kreative Akteur ist und niemand substanziell überarbeitet. Alles dazwischen ist assisted.", "Checked against the original: Human-Created means no generative AI at any stage; generated when the AI is the main creative agent and no one edits substantively. Everything in between is assisted.") },
      { id: "ms", name: "Maschinenschrift", unter: T("Selbstauskunft am Werk", "self-declaration on the work"), zaehl: T("72 Zustände: 36 Zellen × 2 Platten", "72 states: 36 cells × 2 plates"),
        k: null, f: function (w, g) { return "c" + w + g; },
        notiz: T("Jede Zelle ist ein eigener Wert. Die Tafel zeigt eine der zwei Platten aus dem Körper oben, je nach Schalter B.", "Every cell is a value of its own. The panel shows one of the two plates of the body above, depending on switch B.") }
    ];
    var cs = 26, ox = 30, oy = 6, N = 6;
    var book = { w: 5, g: 3, b: "a" };

    var steuer = h("div", "fv-steuer", null, boxR);
    steuer.setAttribute("role", "group"); steuer.setAttribute("aria-label", T("Buch setzen", "Place a book"));
    function seg(label, cls) { var s = h("span", "fv-achse", esc(label) + " ", steuer); return h("span", "fv-seg " + (cls || ""), null, s); }
    var segW = seg("W"), segG = seg("G"), segB = seg("B", "fv-seg-b");
    var zur = h("button", "fv-zurueck", "La Scuola", steuer); zur.type = "button";

    var koWrap = h("div", "fv-koerper", null, boxR);
    var koSvg = el("svg", { viewBox: "0 0 350 340", role: "img", "aria-label": T("Explosionszeichnung: zwei Platten aus je 6 mal 6 Zellen übereinander, oben belegt, unten ausstehend.", "Exploded drawing: two plates of 6 by 6 cells, one above the other; above belegt, below ausstehend.") }, koWrap);
    h("p", null, T(
      "<b>Der Körper.</b> Wortlaut und Geist sind Skalen mit sechs Stufen, der Beleg ist ein Schalter mit zwei Stellungen. Zusammen ergeben sie keinen Würfel, sondern zwei Platten: 6 × 6 × 2 = 72 Werte. Der schwarze Punkt ist das Buch aus den Tafeln, der hohle Kreis zeigt, wo es mit dem anderen Beleg läge. Ein Klick auf eine Zelle setzt das Buch dorthin.",
      "<b>The body.</b> <i>Wortlaut</i> and <i>Geist</i> are scales with six steps; <i>Beleg</i> is a switch with two positions. Together they make not a cube but two plates: 6 × 6 × 2 = 72 values. The black dot is the book from the panels; the hollow circle shows where it would sit with the other <i>Beleg</i> value. A click on a cell moves the book there."), koWrap);

    var wrapR = h("div", null, null, boxR); wrapR.style.position = "relative";
    var raster = h("div", "fv-raster", null, wrapR);
    var tipR = h("div", "fv-tip", null, wrapR); tipR.hidden = true;

    function klasse(p, w, g) { return p.f(w, g); }
    function klassenName(p, w, g) { return p.k ? p.k[klasse(p, w, g)][0] : "W " + w + " · G " + g + (book.b === "a" ? " †" : ""); }
    function swatch(fill) {
      var s = el("svg", { viewBox: "0 0 13 13", "aria-hidden": "true" });
      el("rect", { x: .5, y: .5, width: 12, height: 12, style: "fill:" + fill + ";stroke:var(--ink-soft);stroke-width:1" }, s);
      return s;
    }
    P.forEach(function (p) {
      var t = h("div", "fv-tafel", "<h3>" + esc(p.name) + "</h3><div class=\"fv-unter\">" + esc(p.unter) + "</div>", raster);
      var svg = el("svg", { viewBox: "0 0 " + (ox + N * cs + 6) + " " + (oy + N * cs + 26), role: "img", "aria-label": p.name + T(": Aufteilung des Felds Wortlaut mal Geist", ": how it divides the field Wortlaut by Geist") }, t);
      var gC = el("g", {}, svg), w, g, x, y;
      for (w = 0; w < N; w++) for (g = 0; g < N; g++) {
        x = ox + w * cs; y = oy + (N - 1 - g) * cs;
        var fill = p.k ? FILL[p.k[klasse(p, w, g)][1]] : "var(--page)";
        var r = el("rect", { x: x, y: y, width: cs, height: cs, "class": "fv-zelle", style: "fill:" + fill + ";stroke:" + (p.k ? "none" : "var(--line)") + ";stroke-width:1" }, gC);
        r.addEventListener("pointerenter", zeigTip.bind(null, p, w, g, r));
        r.addEventListener("pointerleave", function () { tipR.hidden = true; });
        r.addEventListener("click", setze.bind(null, w, g, undefined));
      }
      var gB = el("g", { style: "pointer-events:none" }, svg);
      for (w = 0; w < N; w++) for (g = 0; g < N; g++) {
        x = ox + w * cs; y = oy + (N - 1 - g) * cs;
        var k = klasse(p, w, g);
        if (w < N - 1 && klasse(p, w + 1, g) !== k) el("line", { x1: x + cs, y1: y, x2: x + cs, y2: y + cs, style: "stroke:var(--ink);stroke-width:1.2" }, gB);
        if (g < N - 1 && klasse(p, w, g + 1) !== k) el("line", { x1: x, y1: y, x2: x + cs, y2: y, style: "stroke:var(--ink);stroke-width:1.2" }, gB);
      }
      el("rect", { x: ox, y: oy, width: N * cs, height: N * cs, style: "fill:none;stroke:var(--ink);stroke-width:1.2;pointer-events:none" }, svg);
      for (var i = 0; i < N; i++) {
        el("text", { x: ox + i * cs + cs / 2, y: oy + N * cs + 12, "text-anchor": "middle", style: "font:9px var(--mono);fill:var(--muted)" }, svg).textContent = i;
        el("text", { x: ox - 7, y: oy + (N - 1 - i) * cs + cs / 2 + 3, "text-anchor": "end", style: "font:9px var(--mono);fill:var(--muted)" }, svg).textContent = i;
      }
      el("text", { x: ox + N * cs, y: oy + N * cs + 24, "text-anchor": "end", style: "font:9px var(--mono);fill:var(--faint);letter-spacing:.06em" }, svg).textContent = "WORTLAUT →";
      el("text", { x: 8, y: oy + 2, transform: "rotate(90 8 " + (oy + 2) + ")", style: "font:9px var(--mono);fill:var(--faint);letter-spacing:.06em" }, svg).textContent = "← GEIST";
      p.dot = el("circle", { r: 6.5, style: "fill:var(--ink);stroke:var(--page);stroke-width:2.5;pointer-events:none" }, svg);
      if (p.id === "ms") p.dag = el("text", { style: "font:600 14px var(--serif);fill:var(--ink);stroke:var(--page);stroke-width:3px;paint-order:stroke;pointer-events:none" }, svg);
      var lg = h("div", "fv-legende", null, t);
      if (p.k) Object.keys(p.k).forEach(function (key) {
        var s = h("span", null, null, lg); s.appendChild(swatch(FILL[p.k[key][1]])); s.appendChild(document.createTextNode(p.k[key][0]));
      });
      else h("span", null, T("jede Zelle ein eigener Wert", "every cell a value of its own"), lg);
      h("div", "fv-zaehl", esc(p.zaehl), t);
      p.befund = h("div", "fv-befund", null, t); p.befund.setAttribute("aria-live", "polite");
      h("div", "fv-notiz", esc(p.notiz), t);
    });
    h("div", "fv-tafel fv-lese", T(
      "<p><b>So liest man eine Tafel.</b> Links unten stammt alles von der Autorin, rechts oben kommen Sätze und Gedanken weitgehend aus dem Modell.</p><p>Eine Fläche ohne Muster heißt: Das System hat dafür keine Angabe. Linien trennen, was das System unterscheidet.</p><p>Die Tafel der Maschinenschrift ist eine Platte aus dem Körper oben. Bei den anderen Systemen ändert der Schalter B nichts.</p>",
      "<p><b>How to read a panel.</b> Bottom left, everything comes from the author; top right, sentences and ideas come largely from the model.</p><p>An area without a pattern means the system has nothing to say there. Lines separate what the system distinguishes.</p><p>The Maschinenschrift panel is one plate of the body above. For the other systems, switch B changes nothing.</p>"), raster);

    function zeigTip(p, w, g, r) {
      tipR.innerHTML = "<div class=\"fv-m\">W " + w + " · G " + g + "</div><b>" + esc(p.name) + ":</b> " + esc(klassenName(p, w, g));
      tipR.hidden = false;
      var a = r.getBoundingClientRect(), b = wrapR.getBoundingClientRect();
      var left = a.left - b.left + a.width + 6, top = a.top - b.top - 6;
      if (left + 230 > b.width) left = a.left - b.left - 236;
      tipR.style.left = Math.max(0, left) + "px"; tipR.style.top = top + "px";
    }

    /* Körper: zwei Platten W × G, axonometrisch; oben belegt, unten ausstehend. */
    var KS = 21, KX = 34, KY = 14, KGAP = 152, C30 = Math.cos(Math.PI / 6);
    function kp(u, v, e) { return [KX + (u + v) * KS * C30, KY + e * KGAP + (u - v) * KS * 0.5 + 3 * KS]; }
    function pts(a) { return a.map(function (q) { return q[0].toFixed(1) + "," + q[1].toFixed(1); }).join(" "); }
    var koRand = [];
    function platte(e) {
      var g0 = el("g", {}, koSvg);
      var a = kp(0, 0, e), b = kp(6, 0, e), c = kp(6, 6, e);
      el("polygon", { points: pts([a, b, c, [c[0], c[1] + 5], [b[0], b[1] + 5], [a[0], a[1] + 5]]), style: "fill:var(--tone);stroke:var(--ink-soft);stroke-width:1;stroke-linejoin:round" }, g0);
      for (var w = 0; w < 6; w++) for (var g = 0; g < 6; g++) {
        var z = el("polygon", { points: pts([kp(w, g, e), kp(w + 1, g, e), kp(w + 1, g + 1, e), kp(w, g + 1, e)]), "class": "fv-ko-zelle" }, g0);
        z.addEventListener("click", setze.bind(null, w, g, e === 0 ? "b" : "a"));
      }
      koRand[e] = el("polygon", { points: pts([kp(0, 0, e), kp(6, 0, e), kp(6, 6, e), kp(0, 6, e)]), style: "fill:none;stroke:var(--ink);stroke-width:1.2;stroke-linejoin:round;pointer-events:none" }, g0);
      var r = kp(6, 6, e);
      el("text", { x: r[0] + 10, y: r[1] + 4, "class": "fv-ko-t" }, g0).textContent = e === 0 ? "belegt" : "† ausstehend";
    }
    platte(1);
    [[0, 0], [6, 6]].forEach(function (q) {
      var o = kp(q[0], q[1], 0), u = kp(q[0], q[1], 1);
      el("line", { x1: o[0], y1: o[1] + 5, x2: u[0], y2: u[1], style: "stroke:var(--rule);stroke-width:1;stroke-dasharray:3 3" }, koSvg);
    });
    var lcO = kp(0, 0, 0), lcU = kp(0, 0, 1), lcY = (lcO[1] + lcU[1]) / 2;
    el("text", { x: lcO[0] - 8, y: lcY, transform: "rotate(-90 " + (lcO[0] - 8) + " " + lcY + ")", "text-anchor": "middle", "class": "fv-ko-achse" }, koSvg).textContent = "BELEG";
    var koFaden = el("line", { style: "stroke:var(--ink);stroke-width:1;stroke-dasharray:2 3" }, koSvg);
    platte(0);
    for (var ki = 0; ki < 6; ki++) {
      var pw = kp(ki + .5, 0, 1); el("text", { x: pw[0] - 7, y: pw[1] + 16, "text-anchor": "middle", "class": "fv-ko-tick" }, koSvg).textContent = ki;
      var pg = kp(6, ki + .5, 1); el("text", { x: pg[0] + 7, y: pg[1] + 16, "text-anchor": "middle", "class": "fv-ko-tick" }, koSvg).textContent = ki;
    }
    var mw = kp(3, 0, 1), mwx = mw[0] - 17, mwy = mw[1] + 31;
    el("text", { x: mwx, y: mwy, "text-anchor": "middle", transform: "rotate(30 " + mwx + " " + mwy + ")", "class": "fv-ko-achse" }, koSvg).textContent = "WORTLAUT →";
    var mg = kp(6, 3, 1), mgx = mg[0] + 17, mgy = mg[1] + 31;
    el("text", { x: mgx, y: mgy, "text-anchor": "middle", transform: "rotate(-30 " + mgx + " " + mgy + ")", "class": "fv-ko-achse" }, koSvg).textContent = "GEIST →";
    var koGeist = el("circle", { r: 5, style: "fill:var(--page);stroke:var(--ink);stroke-width:1.3;pointer-events:none" }, koSvg);
    var koDot = el("circle", { r: 6, style: "fill:var(--ink);stroke:var(--page);stroke-width:2;pointer-events:none" }, koSvg);
    var koDag = el("text", { style: "font:600 14px var(--serif);fill:var(--ink);stroke:var(--page);stroke-width:3px;paint-order:stroke;pointer-events:none" }, koSvg);
    function koUpdate() {
      var e = book.b === "b" ? 0 : 1;
      var p = kp(book.w + .5, book.g + .5, e), q = kp(book.w + .5, book.g + .5, 1 - e);
      var t = kp(book.w + .5, book.g + .5, 0), u = kp(book.w + .5, book.g + .5, 1);
      koDot.setAttribute("cx", p[0]); koDot.setAttribute("cy", p[1]);
      koGeist.setAttribute("cx", q[0]); koGeist.setAttribute("cy", q[1]);
      koFaden.setAttribute("x1", t[0]); koFaden.setAttribute("y1", t[1]); koFaden.setAttribute("x2", u[0]); koFaden.setAttribute("y2", u[1]);
      koDag.setAttribute("x", p[0] + 7); koDag.setAttribute("y", p[1] - 5); koDag.textContent = e === 1 ? "†" : "";
      koRand[0].style.strokeWidth = e === 0 ? 2.2 : 1.2; koRand[1].style.strokeWidth = e === 1 ? 2.2 : 1.2;
    }

    [segW, segG].forEach(function (s, ai) {
      for (var i = 0; i < N; i++) {
        var b = h("button", null, String(i), s); b.type = "button";
        b.setAttribute("aria-label", (ai ? "Geist " : "Wortlaut ") + i);
        b.addEventListener("click", function (v, isG) { return function () { setze(isG ? book.w : v, isG ? v : book.g); }; }(i, ai === 1));
      }
    });
    [["b", "belegt"], ["a", "† ausstehend"]].forEach(function (o) {
      var bt = h("button", null, o[1], segB); bt.type = "button"; bt.setAttribute("data-b", o[0]);
      bt.addEventListener("click", function () { setze(book.w, book.g, o[0]); });
    });
    zur.addEventListener("click", function () { setze(5, 3, "a"); });

    function setze(w, g, bv) {
      book = { w: w, g: g, b: bv === undefined ? book.b : bv };
      var dag = book.b === "a" ? " †" : "";
      P.forEach(function (p) {
        var cx = ox + w * cs + cs / 2, cy = oy + (N - 1 - g) * cs + cs / 2;
        p.dot.setAttribute("cx", cx); p.dot.setAttribute("cy", cy);
        if (p.dag) { p.dag.setAttribute("x", cx + 7); p.dag.setAttribute("y", cy - 5); p.dag.textContent = dag ? "†" : ""; }
        p.befund.innerHTML = "W " + w + " · G " + g + dag + " → <b>" + esc(klassenName(p, w, g)) + "</b>" +
          (p.k ? " <span class=\"fv-ohneb\">· " + T("Beleg: keine Angabe", "Beleg: not covered") + "</span>" : "");
      });
      Array.prototype.forEach.call(segW.children, function (b, i) { b.setAttribute("aria-pressed", i === w); });
      Array.prototype.forEach.call(segG.children, function (b, i) { b.setAttribute("aria-pressed", i === g); });
      Array.prototype.forEach.call(segB.children, function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-b") === book.b); });
      koUpdate();
    }
    setze(5, 3, "a");
  })();

})();
