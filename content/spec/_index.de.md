---
title: Spezifikationen
description: "Technische Spezifikationen des Maschinenschrift-Siegels zur KI-Kennzeichnung: Geometrie, Rendering-Regeln, Achsensemantik. Aktuell v8, v7 bis v5 eingefroren."
seotitle: "Spezifikationen — Geometrie und Achsen des KI-Siegels"
---

Diese Seite versammelt die technischen Spezifikationen, die für eine
Spec-konforme Implementierung des Maschinenschrift-Siegels und seiner
Achsensemantik verbindlich sind.

## Aktuelle Spec

- [**Siegel-Spec v8**](/de/spec/siegel-v8/) — Geometrie und Rendering-Regeln
  des Siegel-SVGs. Stand 2026-08-24. Aktuelle kanonische Fassung.
  Achsen-Vokabular W/G/B (Wortlaut / *Geist* / Beleg). Die B-Achse hält
  fest, ob die Faktenaussagen des Werks gegen Quellen außerhalb des
  Substrats geprüft wurden.

## Abgeloeste Fassungen

- [Siegel-Spec v7](/de/spec/siegel-v7/) — eingefrorener historischer Stand.
  Geometrie, Buchstaben und Werte identisch mit v8; die B-Achse notierte
  stattdessen die bibliografische Auffindbarkeit. **Ein `belegt` nach v7
  ist kein `belegt` nach v8.**
- [Siegel-Spec v6](/de/spec/siegel-v6/) — eingefrorener historischer Stand.
  Geometrie identisch mit v8; Achsen-Vokabular D/G/K (Diktion / *Geist* /
  Korrespondenz). Die Zahlenwerte für W und G sind zu v8 identisch.
- [Siegel-Spec v5](/de/spec/siegel-v5/) — eingefrorener historischer Stand.
  Geometrie identisch mit v8; Achsen-Vokabular F/S/V (Form / Substanz /
  Verifikation) mit binären Werten `verified` / `unverified`.

## Verbundene Dokumente

- [**Foundation**](/de/foundation/) — linguistische Grundlage und Achsensemantik
  (W, G, B). Nicht-technisch, aber jeder Spec-Implementation vorangestellt.
- [Eintragen](/de/eintragen/) — wie ein Werk in den Katalog kommt: per Mail,
  auf Selbstdeklaration. Die Schlüssel der Datenschicht (`wortlaut`, `geist`,
  `beleg`) stehen in [Foundation §9](/de/foundation/#9-data-layer-directives).

## Versionsdisziplin

Änderungen an einer Spec passieren ausschließlich gegen eine neue
Versionsnummer. Eine bereits veröffentlichte Spec-Fassung bleibt unter
ihrem URL erreichbar.

Die historischen Vorgänger der aktuellen Siegel-Spec (v1–v4) sind
nicht öffentlich publiziert. Ihre Änderungen gegenüber v5 bis v8
sind in der [Versionshistorie der v8-Seite](/de/spec/siegel-v8/#versionshistorie)
zusammengefasst.

## Implementationen

Die Referenz-Implementation des Siegel-Generators ist in Python
geschrieben und im Site-Repository unter `siegel-generator/src/siegel.py`
zu finden. Eine zur Spec identische JavaScript-Implementation für
Client-seitige Live-Preview liegt unter `static/js/live-preview.js`.

Implementationen in anderen Sprachen sind willkommen. Eine korrekt
implementierte Variante muss die drei kanonischen Zustände aus
[Spec v8](/de/spec/siegel-v8/#kanonische-zustaende) byte-genau reproduzieren.
