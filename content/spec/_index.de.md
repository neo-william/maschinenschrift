---
title: Spezifikationen
description: Kanonische technische Spezifikationen des Maschinenschrift-Standards.
---

Diese Seite versammelt die technischen Spezifikationen, die fuer eine
Spec-konforme Implementierung des Maschinenschrift-Siegels und seiner
Achsensemantik verbindlich sind.

## Aktuelle Spec

- [**Siegel-Spec v6**](/de/spec/siegel-v6/) — Geometrie und Rendering-Regeln
  des Siegel-SVGs. Stand 2026-05-24. Aktuelle kanonische Fassung.

## Abgeloeste Fassungen

- [Siegel-Spec v5](/de/spec/siegel-v5/) — eingefrorener historischer Stand.
  Geometrie identisch mit v6; Achsen-Vokabular F/S/V (Form / Substanz /
  Verifikation) mit binaeren Werten `verified` / `unverified`.

## Verbundene Dokumente

- [**Foundation**](/de/foundation/) — linguistische Grundlage und Achsensemantik
  (D, G, K). Nicht-technisch, aber jeder Spec-Implementation vorangestellt.
- [Datenmodell-Schema](/de/beitragen/#2-yaml-schreiben) — YAML-Struktur eines
  Katalog-Eintrags. Teil der [Beitrags-Anleitung](/de/beitragen/).

## Versionsdisziplin

Aenderungen an einer Spec passieren ausschliesslich gegen eine neue
Versionsnummer. Eine bereits veroeffentlichte Spec-Fassung bleibt unter
ihrem URL erreichbar.

Die historischen Vorgaenger der aktuellen Siegel-Spec (v1–v4) sind
nicht oeffentlich publiziert. Ihre Aenderungen gegenueber v5 und v6
sind in der [Versionshistorie der v6-Seite](/de/spec/siegel-v6/#versionshistorie)
zusammengefasst.

## Implementationen

Die Referenz-Implementation des Siegel-Generators ist in Python
geschrieben und im Site-Repository unter `scripts/siegel.py` zu finden.
Eine zur Spec gegenueber identische JavaScript-Implementation fuer
Client-seitige Live-Preview liegt unter `static/js/live-preview.js`.

Implementationen in anderen Sprachen sind willkommen. Eine korrekt
implementierte Variante muss die drei kanonischen Zustaende aus
[Spec v6](/de/spec/siegel-v6/#kanonische-zustaende) byte-genau reproduzieren.
