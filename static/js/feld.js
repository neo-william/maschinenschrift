/* Feld-Grafiken der Notiz „Das Feld, vermessen“ / „The Field, Measured“ (ADR 0385).
   Fuellt die Behaelter [data-fv="raster|faden|laenge"]. Die Zeilen des Codebuchs
   kommen aus #fv-daten (data-rows, gebaut aus static/daten/feld-kodierung.csv).
   Die Klassengrenzen im Raster und die Werte der Laengen-Grafik sind Lesarten
   dieser Notiz und stehen deshalb hier, nicht in der CSV. */
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

  var quelle = document.getElementById("fv-daten");
  var rows = [];
  try { rows = JSON.parse(quelle ? quelle.getAttribute("data-rows") : "[]"); } catch (e) { rows = []; }

  /* Kategorien stehen in der CSV deutsch. */
  var UEB = {
    "Werk": "Work", "Schreibprozess": "Writing process", "Datei": "File", "Textoberfläche": "Text surface",
    "Autorin": "Author", "Verlag": "Publisher", "Dritte Stelle": "Third party", "Software": "Software",
    "Leserin": "Reader", "Fachwelt": "Scholars", "Maschinen": "Machines", "Händler": "Retailer", "Prüfende": "Assessors",
    "Umschlag/Impressum": "Cover/imprint", "Anhang/Erklärung": "Statement", "Metadaten": "Metadata", "Plattformkonto": "Platform account", "Prüfbericht": "Report",
    "rund 70": "about 70", "offen": "open", "stetig": "continuous",
    "Selbstauskunft": "Self-declaration", "Pflicht/Vertrag": "Duty/contract", "Prüfung durch Dritte": "Third-party check", "Signatur": "Signature", "Aufzeichnung": "Recording", "Statistik": "Statistics",
    "frei": "free", "Konto/Software": "Account/software", "Mitgliedschaft/Vertrag": "Membership/contract", "Gebühr": "Fee", "unbekannt": "unknown"
  };
  function K(v) { return DE ? v : (UEB[v] || v); }
  /* Kurzformen nur für die Achsenbeschriftung des Fadenbilds. */
  var KURZ = DE
    ? { "Umschlag/Impressum": "Umschlag", "Anhang/Erklärung": "Erklärung", "Prüfung durch Dritte": "Prüfstelle", "Mitgliedschaft/Vertrag": "Mitgliedschaft", "Konto/Software": "Konto", "Pflicht/Vertrag": "Vertrag" }
    : { "Cover/imprint": "Cover", "Third-party check": "Assessor", "Membership/contract": "Membership", "Account/software": "Account", "Duty/contract": "Contract", "Platform account": "Platform" };
  function KK(v) { var k = K(v); return KURZ[k] || k; }

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

  /* ================= Fadenbild ================= */
  var boxF = document.querySelector('[data-fv="faden"]');
  if (boxF && rows.length) (function () {
    leeren(boxF);
    var DIMS = [
      { k: "gegenstand", t: T("Gegenstand", "Object"), c: ["Werk", "Schreibprozess", "Datei", "Textoberfläche"] },
      { k: "sprecherin", t: T("Sprecherin", "Speaker"), c: ["Autorin", "Verlag", "Dritte Stelle", "Software"] },
      { k: "adressat", t: T("Adressat", "Addressee"), c: ["Leserin", "Fachwelt", "Maschinen", "Händler", "Prüfende"] },
      { k: "ort", t: T("Ort", "Place"), c: ["Umschlag/Impressum", "Anhang/Erklärung", "Metadaten", "Plattformkonto", "Prüfbericht"] },
      { k: "aufloesung", t: T("Auflösung", "Resolution"), c: ["1", "2–3", "4–12", "rund 70", "offen", "stetig"] },
      { k: "buergschaft", t: T("Bürgschaft", "Guarantee"), c: ["Selbstauskunft", "Pflicht/Vertrag", "Prüfung durch Dritte", "Signatur", "Aufzeichnung", "Statistik"] },
      { k: "huerde", t: T("Hürde", "Barrier"), c: ["frei", "Konto/Software", "Mitgliedschaft/Vertrag", "Gebühr", "unbekannt"] }
    ];
    var FAM = [["A", T("Detektion", "Detection")], ["B", T("Aufzeichnung", "Recording")], ["C", T("Signatur", "Signature")], ["D", T("Etikett", "Label")], ["E", T("Stufenleiter", "Ladder")], ["F", T("Taxonomie", "Taxonomy")], ["G", T("Plattform", "Platform")], ["H", T("Mitautorschaft", "Co-authorship")], ["M", "Maschinenschrift"]];
    var famOrder = {}; FAM.forEach(function (f, i) { famOrder[f[0]] = i; });

    var chips = h("div", "fv-chips", null, boxF);
    chips.setAttribute("role", "group"); chips.setAttribute("aria-label", T("Familie hervorheben", "Highlight a family"));
    var scroller = h("div", "fv-scroller", null, boxF);
    var svgF = el("svg", { "class": "fv-faden fv-faden-svg", role: "img", "aria-label": T("Parallele Koordinaten: 22 Ansätze über sieben Merkmale. Das Codebuch unten enthält dieselben Werte.", "Parallel coordinates: 22 approaches across seven features. The codebook below holds the same values.") }, scroller);
    var tipF = h("div", "fv-tip", null, scroller); tipF.hidden = true;

    var slot = 11, gap = 22, top0 = 46, x0 = 80, dx = 112;
    var pos = rows.map(function () { return []; });
    var maxY = 0, knoten = [];
    DIMS.forEach(function (d, ai) {
      var x = x0 + ai * dx, y = top0;
      d.c.forEach(function (cat) {
        var mem = rows.map(function (r, i) { return i; }).filter(function (i) { return rows[i][d.k] === cat; });
        if (ai === 0) mem.sort(function (a, b) { return famOrder[rows[a].familie] - famOrder[rows[b].familie] || a - b; });
        else mem.sort(function (a, b) { return pos[a][ai - 1] - pos[b][ai - 1]; });
        knoten.push({ x: x, y: y, n: mem.length, cat: cat, letzte: ai === DIMS.length - 1 });
        mem.forEach(function (i, j) { pos[i][ai] = y + j * slot + slot / 2; });
        y += Math.max(mem.length, 1) * slot + gap;
      });
      maxY = Math.max(maxY, y);
    });
    var W = x0 + (DIMS.length - 1) * dx + 125, H = maxY - gap + 16;
    svgF.setAttribute("viewBox", "0 0 " + W + " " + H);
    var gAx = el("g", {}, svgF), gL = el("g", {}, svgF), gK = el("g", {}, svgF), gT = el("g", {}, svgF), gH = el("g", {}, svgF);
    DIMS.forEach(function (d, ai) {
      var x = x0 + ai * dx;
      el("line", { x1: x, y1: top0 - 6, x2: x, y2: H - 8, "class": "fv-achslinie" }, gAx);
      el("text", { x: x - 4, y: 18, "class": "fv-kopf" }, gT).textContent = d.t.toUpperCase();
    });
    knoten.forEach(function (k) {
      el("rect", { x: k.x - 1.5, y: k.y, width: 3, height: Math.max(k.n, 1) * slot, "class": "fv-knoten" }, gK);
      el("text", { x: k.letzte ? k.x + 8 : k.x - 4, y: k.y - 5, "class": "fv-kat" }, gT).textContent = KK(k.cat);
    });
    var linien = [];
    rows.forEach(function (r, i) {
      var d = "M" + (x0 - 6) + "," + pos[i][0] + " L" + x0 + "," + pos[i][0];
      for (var a = 1; a < DIMS.length; a++) {
        var xa = x0 + (a - 1) * dx, xb = x0 + a * dx, xm = (xa + xb) / 2;
        d += " C" + xm + "," + pos[i][a - 1] + " " + xm + "," + pos[i][a] + " " + xb + "," + pos[i][a];
      }
      var xl = x0 + (DIMS.length - 1) * dx;
      d += " L" + (xl + 8) + "," + pos[i][DIMS.length - 1];
      var line = el("path", { d: d, "class": "fv-linie" }, gL);
      var fam = el("text", { x: x0 - 10, y: pos[i][0] + 3.3, "text-anchor": "end", "class": "fv-fam" }, gT); fam.textContent = r.familie;
      var name = el("text", { x: xl + 12, y: pos[i][DIMS.length - 1] + 3.8, "class": "fv-name" }, gT); name.textContent = r.kurz;
      var hit = el("path", { d: d, "class": "fv-treffer" }, gH);
      hit.addEventListener("pointerenter", function (e) { fokus([i]); zeigTipF(i, e); });
      hit.addEventListener("pointermove", function (e) { zeigTipF(i, e); });
      hit.addEventListener("pointerleave", function () { tipF.hidden = true; fokus(aktiv ? famIdx(aktiv) : null); });
      linien.push({ line: line, fam: fam, name: name });
    });
    function zeigTipF(i, e) {
      var r = rows[i], anm = DE ? r.anmerkung : r.anmerkung_en;
      tipF.innerHTML = "<b>" + esc(r.ansatz) + "</b> <span class=\"fv-m\">" + esc(r.familie) + "</span><div class=\"fv-m\" style=\"margin-top:.25rem\">" +
        DIMS.map(function (d) { return esc(d.t) + ": " + esc(K(r[d.k])); }).join("<br>") + "</div>" + (anm ? "<div style=\"margin-top:.25rem\">" + esc(anm) + "</div>" : "");
      tipF.hidden = false;
      var b = scroller.getBoundingClientRect();
      var left = e.clientX - b.left + scroller.scrollLeft + 14, top = e.clientY - b.top + 12;
      if (left + 280 > scroller.scrollLeft + b.width) left = e.clientX - b.left + scroller.scrollLeft - 290;
      tipF.style.left = left + "px"; tipF.style.top = top + "px";
    }
    function famIdx(f) { return rows.map(function (r, i) { return i; }).filter(function (i) { return rows[i].familie === f; }); }
    function fokus(idx) {
      svgF.classList.toggle("fv-fokus", !!idx);
      linien.forEach(function (o, i) {
        var an = !!idx && idx.indexOf(i) >= 0;
        o.line.classList.toggle("fv-an", an); o.fam.classList.toggle("fv-an", an); o.name.classList.toggle("fv-an", an);
        if (an) o.line.parentNode.appendChild(o.line);
      });
    }
    var aktiv = null;
    function chip(label, f) {
      var b = h("button", "fv-chip", esc(label), chips); b.type = "button"; b.setAttribute("aria-pressed", f === null);
      b.addEventListener("click", function () {
        aktiv = f;
        Array.prototype.forEach.call(chips.children, function (c) { c.setAttribute("aria-pressed", c === b); });
        fokus(f ? famIdx(f) : null);
      });
    }
    chip(T("Alle", "All"), null);
    FAM.forEach(function (f) { chip((f[0] === "M" ? "" : f[0] + " ") + f[1], f[0]); });
  })();

  /* ================= Information gegen Länge ================= */
  var boxL = document.querySelector('[data-fv="laenge"]');
  if (boxL) (function () {
    leeren(boxL);
    var L2 = Math.log(2), Z = T("2 Zustände: Zeichen oder keins", "2 states: label or none");
    var LK = [
      { n: "Pharmako-AI", f: "H", b: 1, z: 5, a: T("„GPT-3“ als Mitautor auf dem Umschlag", "“GPT-3” as co-author on the cover"), s: T("2 Zustände: Modell genannt oder nicht", "2 states: model named or not") },
      { n: "Human Authored", f: "D", b: 1, z: 14, a: "“Human Authored”", s: Z },
      { n: "Création humaine", f: "D", b: 1, z: 16, a: "“Création humaine”", s: Z },
      { n: "Organic Literature", f: "D", b: 1, z: 18, a: "“Organic Literature”", s: Z },
      { n: "Not By AI", f: "D", b: 1, z: 27, a: "“Written by Human, Not by AI”", s: Z },
      { n: "Von Menschen", f: "D", b: 1, z: 48, a: "„Von Menschen · geschrieben · gestaltet · geprüft“", s: Z },
      { n: "Credtent", f: "E", b: Math.log(3) / L2, z: 11, a: "“AI-Assisted”", s: T("3 Abzeichen", "3 badges") },
      { n: "Maschinenschrift", f: "M", b: Math.log(72) / L2, z: 22, a: "„W 5 · G 3 · ausstehend“", s: T("6 × 6 × 2 = 72 Zustände", "6 × 6 × 2 = 72 states"), rechts: true },
      { n: "STM", f: "F", b: 9, z: 400, a: T("Form und Länge legt der Verlag fest; 400 Zeichen sind geschätzt", "form and length set by the publisher; 400 characters is an estimate"), s: T("9 ankreuzbare Tätigkeiten = 512 Kombinationen; für Sätze und Gedanken eines Buchs zählen davon 2", "9 tick-box activities = 512 combinations; 2 of them concern a book's sentences and ideas"), rechts: true },
      { n: T("Detektor", "Detector"), f: "A", o: true, hohl: true, z: 9, a: T("„92 % KI“ im Prüfbericht", "“92 % AI” in a report"), s: T("stetig: eine Wahrscheinlichkeit", "continuous: a probability") },
      { n: "IBM Toolkit", f: "F", o: true, z: 300, a: T("erzeugte Erklärung, etwa drei Sätze (Schätzung)", "generated statement, about three sentences (estimate)"), s: T("Fragebogen, Ergebnis als Text", "questionnaire, result as text") },
      { n: "GAIDeT", f: "F", o: true, z: 350, a: T("Erklärung nach Aufgaben und Phasen (Schätzung)", "statement by task and phase (estimate)"), s: T("Aufgabenliste, Ergebnis als Text", "task list, result as text") },
      { n: T("Maschinenschrift + Narration", "Maschinenschrift + narration"), f: "M", o: true, z: 700, a: T("Siegel und acht Zeilen in den Worten der Autorin", "seal plus eight lines in the author's words"), s: T("Siegel fest, Narration frei", "seal fixed, narration free") },
      { n: "AID", f: "F", o: true, z: 800, a: T("ein Absatz je Arbeitsphase (Schätzung)", "a paragraph per phase (estimate)"), s: T("Freitext nach Phasen", "free text by phase") },
      { n: "Usage Card", f: "F", o: true, z: 1800, a: T("Formular, etwa eine Normseite", "form, about one standard page"), s: T("Formularfelder und Freitext", "form fields and free text") },
      { n: "Xexéo ↑", f: "F", o: true, z: 5000, a: T("sechs Facetten je Absatz, wächst mit dem Buch", "six facets per paragraph, grows with the book"), s: T("bis zum Absatz", "down to the paragraph") }
    ];
    var lab = h("label", "fv-schalter", null, boxL);
    var cb = document.createElement("input"); cb.type = "checkbox"; cb.checked = true; cb.id = "fv-kante";
    lab.appendChild(cb); lab.appendChild(document.createTextNode(" " + T("untere Kante zeigen", "show the lower edge")));
    var wrapL = h("div", "fv-scroller", null, boxL);
    var svgL = el("svg", { "class": "fv-lk fv-lk-svg", role: "img", "aria-label": T("Streudiagramm: Auflösung in Bit gegen Länge der sichtbaren Angabe in Zeichen, logarithmisch.", "Scatter plot: resolution in bits against the length of the visible statement in characters, logarithmic.") }, wrapL);
    var tipL = h("div", "fv-tip", null, wrapL); tipL.hidden = true;

    var G = { W: 870, H: 470, x0: 70, x1: 540, ox: 652, top: 30, bot: 400 };
    var lmin = Math.log(4) / Math.LN10, lmax = Math.log(5000) / Math.LN10;
    function xb(b) { return G.x0 + b / 10 * (G.x1 - G.x0); }
    function yz(z) { return G.bot - (Math.log(z) / Math.LN10 - lmin) / (lmax - lmin) * (G.bot - G.top); }
    svgL.setAttribute("viewBox", "0 0 " + G.W + " " + G.H);
    el("rect", { x: G.ox - 34, y: G.top, width: 68, height: G.bot - G.top, "class": "fv-band" }, svgL);
    [10, 100, 1000].forEach(function (z) {
      el("line", { x1: G.x0, y1: yz(z), x2: G.ox + 34, y2: yz(z), "class": "fv-gitter" }, svgL);
      el("text", { x: G.x0 - 8, y: yz(z) + 3.5, "text-anchor": "end", "class": "fv-tick" }, svgL).textContent = z === 1000 ? T("1 000", "1,000") : z;
    });
    el("line", { x1: G.x0, y1: yz(1800), x2: G.ox + 34, y2: yz(1800), "class": "fv-norm" }, svgL);
    el("text", { x: G.x1, y: yz(1800) - 5, "text-anchor": "end", "class": "fv-tick2" }, svgL).textContent = T("1 Normseite = 1 800 Zeichen", "1 standard page = 1,800 characters");
    for (var b = 0; b <= 10; b++) {
      el("line", { x1: xb(b), y1: G.bot, x2: xb(b), y2: G.bot + 4, "class": "fv-ax" }, svgL);
      el("text", { x: xb(b), y: G.bot + 17, "text-anchor": "middle", "class": "fv-tick" }, svgL).textContent = b;
      el("text", { x: xb(b), y: G.bot + 30, "text-anchor": "middle", "class": "fv-tick2" }, svgL).textContent = Math.pow(2, b);
    }
    el("text", { x: G.ox, y: G.bot + 17, "text-anchor": "middle", "class": "fv-tick" }, svgL).textContent = T("offen", "open");
    el("text", { x: G.ox, y: G.bot + 30, "text-anchor": "middle", "class": "fv-tick2" }, svgL).textContent = T("Freitext", "free text");
    el("line", { x1: G.x0, y1: G.bot, x2: G.x1 + 8, y2: G.bot, "class": "fv-ax" }, svgL);
    el("line", { x1: G.x0, y1: G.top, x2: G.x0, y2: G.bot, "class": "fv-ax" }, svgL);
    el("text", { x: G.x0, y: G.bot + 52, "class": "fv-titel" }, svgL).textContent = T("AUFLÖSUNG IN BIT · DARUNTER ZAHL DER ZUSTÄNDE →", "RESOLUTION IN BITS · BELOW, NUMBER OF STATES →");
    el("text", { x: 16, y: G.bot, transform: "rotate(-90 16 " + G.bot + ")", "class": "fv-titel" }, svgL).textContent = T("LÄNGE DER SICHTBAREN ANGABE IN ZEICHEN (LOG) →", "LENGTH OF THE VISIBLE STATEMENT IN CHARACTERS (LOG) →");

    LK.forEach(function (d) { d.px = d.o ? G.ox : xb(d.b); d.py = yz(d.z); });
    function byN(n) { for (var i = 0; i < LK.length; i++) if (LK[i].n === n) return LK[i]; }
    var kante = ["Pharmako-AI", "Credtent", "Maschinenschrift", "STM"].map(byN);
    el("path", { d: "M" + kante.map(function (d) { return d.px + "," + d.py; }).join(" L"), "class": "fv-kante" }, svgL);
    el("text", { x: xb(7.15), y: yz(150), "text-anchor": "end", "class": "fv-kante-t" }, svgL).textContent = T("untere Kante", "lower edge");
    function relax(arr, maxY) {
      arr.sort(function (a, c) { return a.py - c.py; });
      var prev = -1e9;
      arr.forEach(function (d) { d.ly = Math.max(d.py, prev + 14); prev = d.ly; });
      for (var i = arr.length - 1; i >= 0; i--) {
        var lim = i === arr.length - 1 ? maxY : arr[i + 1].ly - 14;
        arr[i].ly = Math.min(arr[i].ly, lim);
      }
    }
    var grpA = LK.filter(function (d) { return !d.o && !d.rechts; }), grpB = LK.filter(function (d) { return d.o; });
    relax(grpA, G.bot - 4); relax(grpB, G.bot - 4);
    grpA.forEach(function (d) { d.lx = xb(2.7); });
    grpB.forEach(function (d) { d.lx = G.ox + 50; });
    var gLeit = el("g", {}, svgL), gPkt = el("g", {}, svgL), gLbl = el("g", {}, svgL), gHit = el("g", {}, svgL);
    LK.forEach(function (d) {
      if (d.rechts) {
        el("text", { x: d.px + 9, y: d.py + 4.5, "class": "fv-lbl" }, gLbl).textContent = d.n;
      } else {
        el("path", { d: "M" + (d.px + 5) + "," + d.py + " L" + (d.lx - 16) + "," + d.ly + " L" + (d.lx - 4) + "," + d.ly, "class": "fv-leit" }, gLeit);
        el("text", { x: d.lx, y: d.ly + 4.5, "class": "fv-lbl" }, gLbl).textContent = d.n;
      }
      el("circle", { cx: d.px, cy: d.py, r: 4.5, "class": "fv-pkt" + (d.hohl ? " fv-hohl" : "") }, gPkt);
      var hc = el("circle", { cx: d.px, cy: d.py, r: 11, "class": "fv-hit" }, gHit);
      hc.addEventListener("pointerenter", function () {
        var bit = d.o ? T("Auflösung offen", "resolution open") : (Math.round(d.b * 10) / 10).toString().replace(".", DE ? "," : ".") + " Bit";
        tipL.innerHTML = "<b>" + esc(d.n.replace(" ↑", "")) + "</b> <span class=\"fv-m\">" + esc(d.f) + "</span><div style=\"margin-top:.2rem\">" + esc(d.a) + "</div><div class=\"fv-m\" style=\"margin-top:.25rem\">" +
          esc(d.s) + "<br>" + bit + " · ≈ " + d.z + T(" Zeichen", " characters") + "</div>";
        tipL.hidden = false;
        var a = hc.getBoundingClientRect(), w = wrapL.getBoundingClientRect();
        var left = a.right - w.left + wrapL.scrollLeft + 4, top = a.top - w.top - 4;
        if (left + 280 > wrapL.scrollLeft + w.width) left = a.left - w.left + wrapL.scrollLeft - 284;
        tipL.style.left = Math.max(0, left) + "px"; tipL.style.top = top + "px";
      });
      hc.addEventListener("pointerleave", function () { tipL.hidden = true; });
    });
    cb.addEventListener("change", function () { svgL.classList.toggle("fv-ohne-kante", !cb.checked); });

    var v = h("div", "fv-vorsicht", null, boxL);
    [
      [T("Wer die Achsen wählt", "Whoever chooses the axes"), T("wählt die Kante mit. Diese zwei Maße hat dieses Projekt gesetzt, und auf ihnen schneidet es gut ab.", "chooses the edge as well. This project set these two measures, and it does well on them.")],
      [T("Der Detektor", "The detector"), T("wäre hier kaum zu schlagen: neun Zeichen, stetige Auflösung. Er beantwortet eine andere Frage, und die Grafik bemerkt das nicht.", "would be hard to beat here: nine characters, continuous resolution. It answers a different question, and the chart does not notice.")],
      [T("Nicht gemessen", "Not measured"), T("ist, wer für die Angabe bürgt, ob sie stimmt und ob die Leserin sie versteht. Im Fadenbild bleibt Maschinenschrift bei der Bürgschaft ohne Dritte.", "is who stands behind the statement, whether it is true, and whether the reader understands it. In the thread chart, Maschinenschrift has no third party behind it.")],
      [T("Bit zählt Zustände", "Bits count states"), T("und sagt nichts über Wahrheit oder Bedeutung. STM unterscheidet mehr Kombinationen als Maschinenschrift, aber nur zwei davon betreffen Sätze und Gedanken.", "and say nothing about truth or relevance. STM distinguishes more combinations than Maschinenschrift, but only two of them concern sentences and ideas.")]
    ].forEach(function (x) { h("div", null, "<b>" + esc(x[0]) + "</b>" + esc(x[1]), v); });
  })();
})();
