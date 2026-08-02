---
title: Specifications
description: Canonical technical specifications of the Maschinenschrift standard.
---

This page collects the technical specifications that are binding for a
spec-conformant implementation of the Maschinenschrift seal and its
axis semantics.

## Current spec

- [**Siegel-Spec v7**](/spec/siegel-v7/) — geometry and rendering rules of
  the seal SVG. As of 2026-08-02. Current canonical version. Axis
  vocabulary W/G/B (Wortlaut / *Geist* / Beleg), glossed *Wording*,
  *Geist*, *Record*.

## Superseded versions

- [Siegel-Spec v6](/spec/siegel-v6/) — frozen historical record. Same
  geometry as v7; axis vocabulary D/G/K (Diktion / *Geist* /
  Korrespondenz). Numeric values are identical to v7.
- [Siegel-Spec v5](/spec/siegel-v5/) — frozen historical record. Same
  geometry as v7; axis vocabulary F/S/V (Form / Substance / Verification)
  with binary values `verified` / `unverified`.

## Related documents

- [**Foundation**](/foundation/) — linguistic basis and axis semantics
  (W, G, B). Non-technical, but precedes every spec implementation.
- [Data-model schema](/contribute/#2-write-the-yaml) — YAML structure of
  a catalog entry. Part of the [Contribution guide](/contribute/).

## Version discipline

Changes to a spec happen exclusively against a new version number. A
published spec version remains reachable at its URL.

The historical predecessors of the current seal spec (v1–v4) are not
publicly published. Their differences from v5, v6 and v7 are summarized in
the [version history of the v7 page](/spec/siegel-v7/#version-history).

## Implementations

The reference implementation of the seal generator is written in Python
and found in the site repository under `siegel-generator/src/siegel.py`.
A spec-identical JavaScript implementation for client-side live preview
lives under `static/js/live-preview.js`.

Implementations in other languages are welcome. A correctly implemented
variant must reproduce the three canonical states from
[Spec v7](/spec/siegel-v7/#canonical-states) byte-for-byte.
