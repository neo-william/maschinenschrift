---
title: "Siegel-Spec v5"
description: Canonical geometric specification of the Maschinenschrift seal.
---

**Status:** Superseded by v6 (2026-05-24). The geometry is unchanged, but the axes are now D/G/K (Diktion, *Geist*, Korrespondenz) and the binary K-axis uses `belegt`/`ausstehend` instead of `verified`/`unverified`. See the canonical v6 source under [`_quellen/maschinenschrift-siegel-prompt-v6.md`](https://github.com/maschinenschrift/maschinenschrift-site) and the project's [Foundation §7](/foundation/#7-seal-axis-semantics).

This page documents the v5 state for historical reference. New implementations should follow v6.

The semantic meaning of the axes is found in the [Foundation](/foundation/) §7.

## Axes

The seal documents three axes of the genesis of a text:

- **Top row — Form (F).** Zero to five dots. Degree of substrate mediation of the linguistic surface.
- **Middle row — Substance (S).** Zero to five dots. Degree of substrate mediation of the content itself.
- **Bottom row — Verification (V).** Binary. No bar: bibliographically verified. Right-aligned half-stroke: verification pending.

Dots mean substrate mediation. Their absence means the author alone. The half-stroke is a marker for pending verification, not a judgment.

## Parameters

Three inputs:

- `form` — integer from 0 to 5. F dots, top row.
- `substance` — integer from 0 to 5. S dots, middle row.
- `verification` — enum `verified` or `unverified`. V state, bottom row.

Optional:

- `strokeWidth` — number, default `1.8`. For inline use in running text, `2.4` is recommended.

## Geometry

Coordinate system: `viewBox="0 0 130 100"`. All units refer to this system.

### Brackets

Two square brackets with inward serifs. Serif depth: 8 units inward.

| Element | Coordinates |
|---|---|
| Left vertical shaft | `x = 16`, `y = 26..74` |
| Left top serif | from `x = 16` to `x = 24`, `y = 26` |
| Left bottom serif | from `x = 16` to `x = 24`, `y = 74` |
| Right vertical shaft | `x = 114`, `y = 26..74` |
| Right top serif | from `x = 106` to `x = 114`, `y = 26` |
| Right bottom serif | from `x = 106` to `x = 114`, `y = 74` |

All bracket elements are rendered as `<rect>`, not as `<path>` or `<line>`. Stroke width matches `strokeWidth`. Corners exactly right-angled — no rounding.

### Dots

Five fixed slot positions per row. Slot centers: `40, 52, 64, 76, 88`. Distance between two adjacent slots: 12 units. Dot radius: `2.2`.

A row with `n` dots fills the first `n` slots from the left. Position 1 is occupied when `n ≥ 1`; position 5 only when `n = 5`. No centered or distributed dots. Zero dots means: the row is empty, not invisible.

Y coordinates of the three rows:

- Form: `y = 36`
- Substance: `y = 50`
- Verification: `y = 64`

### Verification half-stroke

With `verification = 'verified'`: no rendering. The row stays empty.

With `verification = 'unverified'`: a horizontal rectangle, right-aligned:

- From `x = 70` to `x = 92` (width 22 units)
- Centered on `y = 64`
- Height: `2.4`

The stroke starts in the gap between slot 3 (x=64) and slot 4 (x=76), not under a dot. It ends 4 units past slot 5 (x=88) — symmetrical to the margin of the dots to the bracket.

The stroke weight is not *thicker* than the bracket, but *equally weighted*. So it does not dominate the notation.

## Rendering rules

- `fill="currentColor"` for all elements. No fixed colors. The seal inherits its context's text color.
- No `stroke`. All shapes are rendered as filled rectangles and circles.
- No gradients, shadows, filters, or effects.
- No frame around the seal, no background fill, no padding inside the viewBox.
- Scaling via CSS or the outer SVG attributes.
- No `<title>`, `<desc>`, no ARIA attributes in the SVG itself. Semantics are carried by the surrounding context.

## Canonical states

A correctly generated seal must reproduce these outputs pixel-perfectly:

- **The empty mark:** `buildSeal(0, 0, 'verified')` — two brackets, nothing between them.
- **A middle mark:** `buildSeal(2, 3, 'verified')` — two dots top, three middle, no mark bottom.
- **The full mark:** `buildSeal(5, 5, 'unverified')` — both dot rows full, right-aligned half-stroke.

## Reference implementation

A Python reference implementation that adheres to this spec exactly lives in the repo under `scripts/siegel.py`. A ported JavaScript implementation for client-side live preview lives under `scripts/live-preview.js` (or `static/js/live-preview.js` after deploy).

## What not to do

- No round brackets, no curly brackets, no angle brackets.
- No numbers or digits next to or instead of the dots.
- No equals sign, no separator line between rows.
- No frame (rectangle, circle, oval) around the seal.
- No vertical bar graphic, no star rating, no percent display.
- No decorative serifs on the glyph itself, no typographic embellishment, no texture.
- No color distinction between rows. Everything in `currentColor`.
- The verification half-stroke must not be centered or left-aligned. Right-alignment is part of the spec.

## Version history

- **v5** (2026-05-21): Verification marker changed from centered full-stroke (x=36..92, height 3.4) to right-aligned half-stroke (x=70..92, height 2.4). Axis vocabulary harmonized to F/S/V.
- **v4**: First version with full axis geometry. Verification marker as centered full-stroke. Axis vocabulary K/T/R — superseded by Foundation §7.
- **v1–v3**: Predecessors, discarded by v4.
