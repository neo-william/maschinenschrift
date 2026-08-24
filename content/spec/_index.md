---
title: Specifications
description: "Technical specifications of the Maschinenschrift AI disclosure seal: geometry, rendering rules, axis semantics. Current version v8; v7, v6 and v5 are frozen."
seotitle: "Specifications — Seal Geometry and Axes (v5 to v8)"
---

This page collects the technical specifications that are binding for a
spec-conformant implementation of the Maschinenschrift seal and its
axis semantics.

## Current spec

- [**Siegel-Spec v8**](/spec/siegel-v8/) — geometry and rendering rules of
  the seal SVG. As of 2026-08-24. Current canonical version. Axis
  vocabulary W/G/B (Wortlaut / *Geist* / Beleg), glossed *Wording*,
  *Geist*, *Record*. The B-axis records whether the work's factual
  statements were checked against sources outside the substrate.

## Superseded versions

- [Siegel-Spec v7](/spec/siegel-v7/) — frozen historical record. Same
  geometry, same letters, same values as v8; the B-axis notated
  bibliographic findability instead. **A `belegt` under v7 is not a
  `belegt` under v8.**
- [Siegel-Spec v6](/spec/siegel-v6/) — frozen historical record. Same
  geometry as v8; axis vocabulary D/G/K (Diktion / *Geist* /
  Korrespondenz). Numeric W and G values are identical to v8.
- [Siegel-Spec v5](/spec/siegel-v5/) — frozen historical record. Same
  geometry as v8; axis vocabulary F/S/V (Form / Substance / Verification)
  with binary values `verified` / `unverified`.

## Related documents

- [**Foundation**](/foundation/) — linguistic basis and axis semantics
  (W, G, B). Non-technical, but precedes every spec implementation.
- [Submission](/submit/) — how a work enters the catalog: by email, on
  self-declaration. The data-layer keys (`wortlaut`, `geist`, `beleg`) are
  defined in [Foundation §9](/foundation/#9-data-layer-directives).

## Version discipline

Changes to a spec happen exclusively against a new version number. A
published spec version remains reachable at its URL.

The historical predecessors of the current seal spec (v1–v4) are not
publicly published. Their differences from v5 through v8 are summarized in
the [version history of the v8 page](/spec/siegel-v8/#version-history).

## Implementations

The reference implementation of the seal generator is written in Python
and found in the site repository under `siegel-generator/src/siegel.py`.
A spec-identical JavaScript implementation for client-side live preview
lives under `static/js/live-preview.js`.

Implementations in other languages are welcome. A correctly implemented
variant must reproduce the three canonical states from
[Spec v8](/spec/siegel-v8/#canonical-states) byte-for-byte.
