---
title: "Siegel-Spec v7"
description: "Current canonical specification of the AI disclosure seal, since 2026-08-02: geometry, rendering rules, and the axes Wortlaut, Geist, Beleg (W/G/B)."
seotitle: "Siegel-Spec v7 — Current Seal Specification (W/G/B)"
---

**Status:** Current canonical (since 2026-08-02). Geometry is unchanged from v5; the axes are now **W/G/B — Wortlaut, *Geist*, Beleg** (in English contexts glossed *Wording*, *Geist*, *Record*), and the binary B-axis uses `belegt` / `ausstehend`. The letters follow the German canon, as *Geist* always has. The semantic basis lives in [Foundation §7](/foundation/#7-seal-axis-semantics). The predecessors v6 and v5 are frozen at [/spec/siegel-v6/](/spec/siegel-v6/) and [/spec/siegel-v5/](/spec/siegel-v5/).

## Axes

The seal documents three axes of the genesis of a text:

- **Top row — Wortlaut (W).** Zero to five dots. Degree of substrate mediation of the linguistic surface.
- **Middle row — Geist (G).** Zero to five dots. Degree of substrate mediation of the *Geist* — the content, the ideas, the structure. *Geist* is German, untranslated; an occasional gloss is *Ghost from the Machine*. The project's diagnostic formula is *Geist aus der Maschine*: how much of what appears as the work's spirit was imported from the machine?
- **Bottom row — Beleg (B).** Binary, glossed *Record* in English. No bar: the bibliographic record is documented. Right-aligned half-stroke: the record is pending.

Dots mean substrate mediation. Their absence means the author alone. The half-stroke is a marker for a pending bibliographic record, not a judgment of the work.

**Textual notation.** A pending record is marked on two layers: in the glyph by the half-stroke, on the textual identifier by a trailing `†` (for instance `W 4 · G 2 · B ausstehend †`). The dagger stands beside the notation, not on the mark itself; the negative list below is unaffected. Basis: [Foundation §7](/foundation/#7-seal-axis-semantics).

## Parameters

Three inputs:

- `wortlaut` — integer from 0 to 5. W dots, top row.
- `geist` — integer from 0 to 5. G dots, middle row.
- `beleg` — enum `belegt` or `ausstehend`. B state, bottom row.

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

- Wortlaut: `y = 36`
- Geist: `y = 50`
- Beleg: `y = 64`

### Beleg half-stroke

With `beleg = 'belegt'`: no rendering. The row stays empty.

With `beleg = 'ausstehend'`: a horizontal rectangle, right-aligned:

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

- **The empty mark:** `buildSeal(0, 0, 'belegt')` — two brackets, nothing between them.
- **A middle mark:** `buildSeal(2, 3, 'belegt')` — two dots top, three middle, no mark bottom.
- **The full mark:** `buildSeal(5, 5, 'ausstehend')` — both dot rows full, right-aligned half-stroke.

## Reference implementation

A Python reference implementation that adheres to this spec exactly lives in the repo under `siegel-generator/src/siegel.py`. A ported JavaScript implementation for client-side live preview lives under `static/js/live-preview.js`.

## What not to do

- No round brackets, no curly brackets, no angle brackets.
- No numbers or digits next to or instead of the dots.
- No equals sign, no separator line between rows.
- No frame (rectangle, circle, oval) around the seal.
- No vertical bar graphic, no star rating, no percent display.
- No decorative serifs on the glyph itself, no typographic embellishment, no texture.
- No color distinction between rows. Everything in `currentColor`.
- The Beleg half-stroke must not be centered or left-aligned. Right-alignment is part of the spec.

## Version history

- **v7** (2026-08-02): Axis vocabulary changed from D/G/K (Diktion, *Geist*, Korrespondenz) to **W/G/B (Wortlaut, *Geist*, Beleg)**. Geometry unchanged; the binary values `belegt`/`ausstehend` unchanged. *Geist* keeps both its name and its letter. Asset filenames changed from `d{D}-g{G}-{state}.svg` to `w{W}-g{G}-{state}.svg`; the `works/*.yaml` field names changed from `diktion`/`korrespondenz` to `wortlaut`/`beleg`. Numeric values are unchanged, so a D 4 · G 2 declaration is a W 4 · G 2 declaration. The change makes the axes readable without a glossary (ADR 0032). **This is a breaking change to the notation**; the reference implementation keeps `build_seal_v6()` and `build_seal_v5()` shims, and the Hugo partial still accepts the v6 and v5 dict keys.
- **v6** (2026-05-24): Axis vocabulary changed from F/S/V (Form, Substance, Verification) to D/G/K (Diktion, *Geist*, Correspondence). Binary K-axis values renamed from `verified`/`unverified` to `belegt`/`ausstehend`. Geometry unchanged. *Geist* is untranslated in English, analogous to *Maschinenschrift*. The shift reflects the move from a verification-language to a documentation-language (ADR 0008).
- **v5** (2026-05-21): Verification marker changed from centered full-stroke (x=36..92, height 3.4) to right-aligned half-stroke (x=70..92, height 2.4). Axis vocabulary harmonized to F/S/V. Frozen historical record at [/spec/siegel-v5/](/spec/siegel-v5/).
- **v4**: First version with full axis geometry. Verification marker as centered full-stroke. Axis vocabulary K/T/R — superseded by Foundation §7.
- **v1–v3**: Predecessors, discarded by v4.
