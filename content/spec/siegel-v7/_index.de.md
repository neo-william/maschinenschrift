---
title: "Siegel-Spec v7"
description: Kanonische geometrische Spezifikation des Maschinenschrift-Siegels.
---

**Status:** Aktuell kanonisch (seit 2026-08-02). Die Geometrie ist unverändert gegenüber v5; die Achsen heißen jetzt **W/G/B — Wortlaut, *Geist*, Beleg**, und die binäre B-Achse verwendet `belegt` / `ausstehend`. Semantische Grundlage: [Foundation §7](/de/foundation/#7-seal-axis-semantics). Die Vorgänger v6 und v5 sind eingefroren unter [/de/spec/siegel-v6/](/de/spec/siegel-v6/) und [/de/spec/siegel-v5/](/de/spec/siegel-v5/).

## Achsen

Das Siegel dokumentiert drei Achsen der Entstehung eines Textes:

- **Obere Zeile — Wortlaut (W).** Null bis fünf Punkte. Grad der Substratvermittlung an der sprachlichen Oberfläche.
- **Mittlere Zeile — Geist (G).** Null bis fünf Punkte. Grad der Substratvermittlung am Geist des Werks — Inhalt, Ideen, Struktur. *Geist* bleibt im Englischen unübersetzt, analog zu *Maschinenschrift*. Diagnose-Formel: *Geist aus der Maschine* — wie viel von dem, was als Geist des Werks erscheint, wurde aus der Maschine importiert?
- **Untere Zeile — Beleg (B).** Binär. Kein Strich: bibliografischer Beleg erbracht. Halbstrich rechts: der Beleg steht aus.

Punkte bedeuten Substratvermittlung. Die Abwesenheit bedeutet die Autorin allein. Der Halbstrich ist Marker für einen ausstehenden bibliografischen Beleg, nicht Wertung des Werks.

## Parameter

Drei Eingaben:

- `wortlaut` — ganze Zahl von 0 bis 5. W-Punkte, obere Zeile.
- `geist` — ganze Zahl von 0 bis 5. G-Punkte, mittlere Zeile.
- `beleg` — Enum `belegt` oder `ausstehend`. B-Zustand, untere Zeile.

Optional:

- `strokeWidth` — Zahl, Standard `1.8`. Für Inline-Verwendung in laufendem Text empfiehlt sich `2.4`.

## Geometrie

Koordinatensystem: `viewBox="0 0 130 100"`. Alle Einheiten beziehen sich auf dieses System.

### Klammern

Zwei eckige Klammern mit innenliegenden Serifen. Serifen-Tiefe: 8 Einheiten nach innen.

| Element | Koordinaten |
|---|---|
| Linker vertikaler Schaft | `x = 16`, `y = 26..74` |
| Linke obere Serife | von `x = 16` bis `x = 24`, `y = 26` |
| Linke untere Serife | von `x = 16` bis `x = 24`, `y = 74` |
| Rechter vertikaler Schaft | `x = 114`, `y = 26..74` |
| Rechte obere Serife | von `x = 106` bis `x = 114`, `y = 26` |
| Rechte untere Serife | von `x = 106` bis `x = 114`, `y = 74` |

Alle Klammer-Elemente werden als `<rect>` gerendert, nicht als `<path>` oder `<line>`. Die Strichstärke entspricht `strokeWidth`. Ecken exakt rechtwinklig — keine Abrundung.

### Punkte

Fünf feste Slot-Positionen pro Zeile. Slot-Zentren: `40, 52, 64, 76, 88`. Abstand zwischen zwei benachbarten Slots: 12 Einheiten. Punkt-Radius: `2.2`.

Eine Zeile mit `n` Punkten füllt die ersten `n` Slots von links. Position 1 ist belegt, wenn `n ≥ 1`; Position 5 nur bei `n = 5`. Keine zentrierten oder verteilten Punkte. Null Punkte bedeutet: die Zeile ist leer, nicht unsichtbar.

Y-Koordinaten der drei Zeilen:

- Wortlaut: `y = 36`
- Geist: `y = 50`
- Beleg: `y = 64`

### Beleg-Halbstrich

Bei `beleg = 'belegt'`: keine Darstellung. Die Zeile bleibt leer.

Bei `beleg = 'ausstehend'`: ein horizontales Rechteck, rechtsbündig:

- Von `x = 70` bis `x = 92` (Breite 22 Einheiten)
- Zentriert auf `y = 64`
- Höhe: `2.4`

Der Strich beginnt im Gap zwischen Slot 3 (x=64) und Slot 4 (x=76), nicht unter einem Punkt. Er endet 4 Einheiten nach Slot 5 (x=88) — symmetrisch zum Margin der Punkte zur Klammer.

Die Strichstärke ist nicht *dicker* als die Klammer, sondern *gleich-gewichtig*. Damit dominiert er die Notation nicht.

## Rendering-Regeln

- `fill="currentColor"` für alle Elemente. Keine festen Farben. Das Siegel übernimmt die Textfarbe seines Kontexts.
- Kein `stroke`. Alle Formen werden als gefüllte Rechtecke und Kreise gerendert.
- Keine Gradients, Schatten, Filter oder Effekte.
- Kein Rahmen um das Siegel, keine Hintergrundfläche, kein Padding innerhalb der viewBox.
- Skalierung über CSS oder die äußeren SVG-Attribute.
- Kein `<title>`, `<desc>`, keine ARIA-Attribute im SVG selbst. Die Semantik trägt der umgebende Kontext.

## Kanonische Zustaende

Ein korrekt erzeugtes Siegel muss diese Ausgaben pixelgleich reproduzieren:

- **Das leere Zeichen:** `buildSeal(0, 0, 'belegt')` — zwei Klammern, nichts dazwischen.
- **Ein mittleres Zeichen:** `buildSeal(2, 3, 'belegt')` — zwei Punkte oben, drei in der Mitte, keine Markierung unten.
- **Das volle Zeichen:** `buildSeal(5, 5, 'ausstehend')` — beide Punktzeilen voll, rechtsbündiger Halbstrich.

## Referenz-Implementation

Eine Python-Referenz-Implementation, die diese Spec exakt einhält, liegt im Repo unter `siegel-generator/src/siegel.py`. Eine portierte JavaScript-Implementation für Client-seitige Live-Preview liegt unter `static/js/live-preview.js`.

## Was nicht zu tun ist

- Keine runden Klammern, keine geschweiften Klammern, keine spitzen Klammern.
- Keine Zahlen oder Ziffern neben oder statt der Punkte.
- Kein Gleichheitszeichen, kein Trennstrich zwischen den Zeilen.
- Keine Rahmung (Rechteck, Kreis, Oval) um das Siegel.
- Keine vertikale Balkengrafik, keine Sternebewertung, keine Prozent-Darstellung.
- Keine dekorativen Serifen am Glyph selbst, keine typografische Verzierung, keine Textur.
- Keine Farbunterscheidung zwischen den Zeilen. Alles in `currentColor`.
- Der Beleg-Halbstrich darf nicht zentriert oder linksbündig sein. Rechtsbündigkeit ist Teil der Spec.

## Versionshistorie

- **v7** (2026-08-02): Achsen-Vokabular von D/G/K (Diktion, *Geist*, Korrespondenz) auf **W/G/B (Wortlaut, *Geist*, Beleg)** umgestellt. Geometrie unverändert; die binären Werte `belegt`/`ausstehend` unverändert. *Geist* behält Namen und Buchstaben. Asset-Dateinamen von `d{D}-g{G}-{Zustand}.svg` auf `w{W}-g{G}-{Zustand}.svg` geändert; die Feldnamen in `works/*.yaml` von `diktion`/`korrespondenz` auf `wortlaut`/`beleg`. Die Zahlenwerte sind unverändert — eine Deklaration D 4 · G 2 ist eine Deklaration W 4 · G 2. Die Umstellung macht die Achsen ohne Glossar lesbar (ADR 0032). **Das ist ein Breaking Change an der Notation**; die Referenz-Implementation behält die Shims `build_seal_v6()` und `build_seal_v5()`, das Hugo-Partial akzeptiert weiterhin die v6- und v5-Dict-Schlüssel.
- **v6** (2026-05-24): Achsen-Vokabular von F/S/V (Form, Substanz, Verifikation) auf D/G/K (Diktion, *Geist*, Korrespondenz) umgestellt. Binäre K-Achse: Werte `verified`/`unverified` → `belegt`/`ausstehend`. Geometrie unverändert. *Geist* bleibt im Englischen unübersetzt, analog zu *Maschinenschrift*. Die Umstellung reflektiert die Verschiebung von Verifikations-Sprache zu Dokumentations-Sprache (ADR 0008).
- **v5** (2026-05-21): Verifikations-Marker geändert von zentriertem Vollstrich (x=36..92, Höhe 3.4) auf rechtsbündigen Halbstrich (x=70..92, Höhe 2.4). Achsen-Vokabular auf F/S/V harmonisiert. Eingefrorener historischer Stand unter [/de/spec/siegel-v5/](/de/spec/siegel-v5/).
- **v4**: Erste Fassung mit voller Achsen-Geometrie. Verifikations-Marker als zentrierter Vollstrich. Achsen-Vokabular K/T/R — abgelöst durch Foundation §7.
- **v1–v3**: Vorgänger, durch v4 verworfen.
