---
title: "Siegel-Spec v5"
description: Kanonische geometrische Spezifikation des Maschinenschrift-Siegels.
---

**Status:** Abgeloest durch v6 (2026-05-24). Die Geometrie ist unveraendert, aber die Achsen heissen jetzt D/G/K (Diktion, *Geist*, Korrespondenz), und die binaere K-Achse verwendet `belegt`/`ausstehend` statt `verified`/`unverified`. Siehe die kanonische v6-Quelle unter [`_quellen/maschinenschrift-siegel-prompt-v6.md`](https://github.com/maschinenschrift/maschinenschrift-site) und [Foundation §7](/foundation/#7-seal-axis-semantics).

Diese Seite dokumentiert den v5-Stand fuer historische Referenz. Neue Implementationen sollen v6 folgen.

Die semantische Bedeutung der Achsen findet sich in der [Foundation](/foundation/) §7.

## Achsen

Das Siegel dokumentiert drei Achsen der Entstehung eines Textes:

- **Obere Zeile — Form (F).** Null bis fuenf Punkte. Grad der Substratvermittlung an der sprachlichen Oberflaeche.
- **Mittlere Zeile — Substanz (S).** Null bis fuenf Punkte. Grad der Substratvermittlung am Inhalt selbst.
- **Untere Zeile — Verifikation (V).** Binaer. Kein Strich: bibliographisch verifiziert. Halbstrich rechts: Verifikation steht aus.

Punkte bedeuten Substratvermittlung. Die Abwesenheit bedeutet den Autor allein. Der Halbstrich ist Marker fuer ausstehende Verifikation, nicht Wertung.

## Parameter

Drei Eingaben:

- `form` — ganze Zahl von 0 bis 5. F-Punkte, obere Zeile.
- `substance` — ganze Zahl von 0 bis 5. S-Punkte, mittlere Zeile.
- `verification` — Enum `verified` oder `unverified`. V-Zustand, untere Zeile.

Optional:

- `strokeWidth` — Zahl, Standard `1.8`. Fuer Inline-Verwendung in laufendem Text empfiehlt sich `2.4`.

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

Alle Klammer-Elemente werden als `<rect>` gerendert, nicht als `<path>` oder `<line>`. Die Strichstaerke entspricht `strokeWidth`. Ecken exakt rechtwinklig — keine Abrundung.

### Punkte

Fuenf feste Slot-Positionen pro Zeile. Slot-Zentren: `40, 52, 64, 76, 88`. Abstand zwischen zwei benachbarten Slots: 12 Einheiten. Punkt-Radius: `2.2`.

Eine Zeile mit `n` Punkten fuellt die ersten `n` Slots von links. Position 1 ist belegt, wenn `n ≥ 1`; Position 5 nur bei `n = 5`. Keine zentrierten oder verteilten Punkte. Null Punkte bedeutet: die Zeile ist leer, nicht unsichtbar.

Y-Koordinaten der drei Zeilen:

- Form: `y = 36`
- Substanz: `y = 50`
- Verifikation: `y = 64`

### Verifikations-Halbstrich

Bei `verification = 'verified'`: keine Darstellung. Die Zeile bleibt leer.

Bei `verification = 'unverified'`: ein horizontales Rechteck, rechtsbuendig:

- Von `x = 70` bis `x = 92` (Breite 22 Einheiten)
- Zentriert auf `y = 64`
- Hoehe: `2.4`

Der Strich beginnt im Gap zwischen Slot 3 (x=64) und Slot 4 (x=76), nicht unter einem Punkt. Er endet 4 Einheiten nach Slot 5 (x=88) — symmetrisch zum Margin der Punkte zur Klammer.

Die Strichstaerke ist nicht *dicker* als die Klammer, sondern *gleich-gewichtig*. Damit dominiert er die Notation nicht.

## Rendering-Regeln

- `fill="currentColor"` fuer alle Elemente. Keine festen Farben. Das Siegel uebernimmt die Textfarbe seines Kontexts.
- Kein `stroke`. Alle Formen werden als gefuellte Rechtecke und Kreise gerendert.
- Keine Gradients, Schatten, Filter oder Effekte.
- Kein Rahmen um das Siegel, keine Hintergrundflaeche, kein Padding innerhalb der viewBox.
- Skalierung ueber CSS oder die aeusseren SVG-Attribute.
- Kein `<title>`, `<desc>`, keine ARIA-Attribute im SVG selbst. Die Semantik traegt der umgebende Kontext.

## Kanonische Zustaende

Ein korrekt erzeugtes Siegel muss diese Ausgaben pixelgleich reproduzieren:

- **Das leere Zeichen:** `buildSeal(0, 0, 'verified')` — zwei Klammern, nichts dazwischen.
- **Ein mittleres Zeichen:** `buildSeal(2, 3, 'verified')` — zwei Punkte oben, drei in der Mitte, keine Markierung unten.
- **Das volle Zeichen:** `buildSeal(5, 5, 'unverified')` — beide Punktzeilen voll, rechtsbuendiger Halbstrich.

## Referenz-Implementation

Eine Python-Referenz-Implementation, die diese Spec exakt einhaelt, liegt im Repo unter `siegel-generator/src/siegel.py`. Eine portierte JavaScript-Implementation fuer Client-seitige Live-Preview liegt unter `siegel-generator/src/live-preview.js`.

## Was nicht zu tun ist

- Keine runden Klammern, keine geschweiften Klammern, keine spitzen Klammern.
- Keine Zahlen oder Ziffern neben oder statt der Punkte.
- Kein Gleichheitszeichen, kein Trennstrich zwischen den Zeilen.
- Keine Rahmung (Rechteck, Kreis, Oval) um das Siegel.
- Keine vertikale Balkengrafik, keine Sternebewertung, keine Prozent-Darstellung.
- Keine dekorativen Serifen am Glyph selbst, keine typografische Verzierung, keine Textur.
- Keine Farbunterscheidung zwischen den Zeilen. Alles in `currentColor`.
- Der Verifikations-Halbstrich darf nicht zentriert oder linksbuendig sein. Rechtsbuendigkeit ist Teil der Spec.

## Versionshistorie

- **v5** (2026-05-21): Verifikations-Marker geaendert von zentriertem Vollstrich (x=36..92, Hoehe 3.4) auf rechtsbuendigen Halbstrich (x=70..92, Hoehe 2.4). Achsen-Vokabular auf F/S/V harmonisiert.
- **v4**: Erste Fassung mit voller Achsen-Geometrie. Verifikations-Marker als zentrierter Vollstrich. Achsen-Vokabular K/T/R — abgeloest durch Foundation §7.
- **v1–v3**: Vorgaenger, durch v4 verworfen.
