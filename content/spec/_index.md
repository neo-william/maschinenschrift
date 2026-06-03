---
title: Specifications
description: Canonical technical specifications of the Maschinenschrift standard.
---

This page collects the technical specifications that are binding for a
spec-conformant implementation of the Maschinenschrift seal and its
axis semantics.

## Current spec

- [**Siegel-Spec v6**](/spec/siegel-v6/) — geometry and rendering rules of
  the seal SVG. As of 2026-05-24. Current canonical version.

## Superseded versions

- [Siegel-Spec v5](/spec/siegel-v5/) — frozen historical record. Same
  geometry as v6; axis vocabulary F/S/V (Form / Substance / Verification)
  with binary values `verified` / `unverified`.

## Related documents

- [**Foundation**](/foundation/) — linguistic basis and axis semantics
  (D, G, K). Non-technical, but precedes every spec implementation.
- [Data-model schema](/contribute/#2-write-the-yaml) — YAML structure of
  a catalog entry. Part of the [Contribution guide](/contribute/).

## Version discipline

Changes to a spec happen exclusively against a new version number. A
published spec version remains reachable at its URL.

The historical predecessors of the current seal spec (v1–v4) are not
publicly published. Their differences from v5 and v6 are summarized in
the [version history of the v6 page](/spec/siegel-v6/#version-history).

## Implementations

The reference implementation of the seal generator is written in Python
and found in the site repository under `scripts/siegel.py`. A
spec-identical JavaScript implementation for client-side live preview
lives under `static/js/live-preview.js`.

Implementations in other languages are welcome. A correctly implemented
variant must reproduce the three canonical states from
[Spec v6](/spec/siegel-v6/#canonical-states) byte-for-byte.
