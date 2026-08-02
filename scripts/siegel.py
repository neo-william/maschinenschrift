"""Maschinenschrift-Siegel Generator (Python reference implementation).

Quelle: ../_quellen/maschinenschrift-siegel-prompt-v6.md (Geometrie, unveraendert).

Erzeugt SVG-Strings nach Siegel-Spec v7 (seit 2026-08-02). Die Geometrie ist
seit v5 unveraendert; geaendert wurden zweimal nur die Achsen-Namen:

    v5 -> v6  form/substance/verification -> diktion/geist/korrespondenz
              verified/unverified         -> belegt/ausstehend
    v6 -> v7  diktion/korrespondenz       -> wortlaut/beleg   (geist bleibt)
              Notation D/G/K              -> W/G/B

Keine externen Abhaengigkeiten ausser der Python-Standardbibliothek.
Funktioniert in Python 3.9+.

Verwendung als Modul:
    from siegel import build_seal
    svg = build_seal(wortlaut=4, geist=2, beleg='ausstehend')

Verwendung als CLI:
    python siegel.py 4 2 ausstehend > seal.svg

Backwards-Compat: die aelteren Signaturen werden ueber build_seal_v6()
(diktion/geist/korrespondenz) und build_seal_v5() (form/substance/
verification) weiterhin unterstuetzt, geben aber DeprecationWarning aus.
Die numerischen Werte sind in allen drei Fassungen identisch.
"""

from __future__ import annotations

import sys
import warnings
from typing import Literal

BelegState = Literal['belegt', 'ausstehend']

# Deprecated alias, seit Spec v7. Nur fuer Fremdcode, der den v6-Namen importiert.
KorrespondenzState = BelegState

SLOT_CENTERS_X = (40, 52, 64, 76, 88)
DOT_RADIUS = 2.2

BRACKET_TOP_Y = 26
BRACKET_BOTTOM_Y = 74
BRACKET_LEFT_VERT_X = 16
BRACKET_LEFT_SERIF_END_X = 24
BRACKET_RIGHT_VERT_X = 114
BRACKET_RIGHT_SERIF_START_X = 106

ROW_WORTLAUT_Y = 36
ROW_GEIST_Y = 50
ROW_BELEG_Y = 64

PENDING_BAR_START_X = 70
PENDING_BAR_END_X = 92
PENDING_BAR_HEIGHT = 2.4

LABEL_X = 65
LABEL_Y = 86
LABEL_FONT_SIZE = 7

DEFAULT_STROKE_WIDTH = 1.8


def _fmt(value: float) -> str:
    # Compact formatting: integers as integers, floats without trailing zeros.
    if value == int(value):
        return str(int(value))
    return f'{value:g}'


def _rect(x: float, y: float, w: float, h: float) -> str:
    return (f'<rect x="{_fmt(x)}" y="{_fmt(y)}" '
            f'width="{_fmt(w)}" height="{_fmt(h)}" fill="currentColor"/>')


def _circle(cx: float, cy: float, r: float) -> str:
    return f'<circle cx="{_fmt(cx)}" cy="{_fmt(cy)}" r="{_fmt(r)}" fill="currentColor"/>'


def build_brackets(stroke_width: float) -> str:
    h = stroke_width / 2
    height = BRACKET_BOTTOM_Y - BRACKET_TOP_Y + stroke_width
    left_serif_width = BRACKET_LEFT_SERIF_END_X - BRACKET_LEFT_VERT_X + h
    right_serif_width = BRACKET_RIGHT_VERT_X - BRACKET_RIGHT_SERIF_START_X + stroke_width
    return ''.join([
        _rect(BRACKET_LEFT_VERT_X - h, BRACKET_TOP_Y - h, stroke_width, height),
        _rect(BRACKET_LEFT_VERT_X - h, BRACKET_TOP_Y - h, left_serif_width, stroke_width),
        _rect(BRACKET_LEFT_VERT_X - h, BRACKET_BOTTOM_Y - h, left_serif_width, stroke_width),
        _rect(BRACKET_RIGHT_VERT_X - h, BRACKET_TOP_Y - h, stroke_width, height),
        _rect(BRACKET_RIGHT_SERIF_START_X - h, BRACKET_TOP_Y - h, right_serif_width, stroke_width),
        _rect(BRACKET_RIGHT_SERIF_START_X - h, BRACKET_BOTTOM_Y - h, right_serif_width, stroke_width),
    ])


def build_dot_row(num_dots: int, y_center: float) -> str:
    if not 0 <= num_dots <= 5:
        raise ValueError(f'num_dots must be in 0..5, got {num_dots}')
    return ''.join(
        _circle(SLOT_CENTERS_X[i], y_center, DOT_RADIUS)
        for i in range(num_dots)
    )


def build_beleg_row(state: BelegState, y_center: float) -> str:
    if state == 'belegt':
        return ''
    if state != 'ausstehend':
        raise ValueError(f"beleg must be 'belegt' or 'ausstehend', got {state!r}")
    bar_width = PENDING_BAR_END_X - PENDING_BAR_START_X
    return _rect(
        PENDING_BAR_START_X,
        y_center - PENDING_BAR_HEIGHT / 2,
        bar_width,
        PENDING_BAR_HEIGHT,
    )


def build_entry_label(entry_id: str, beleg: BelegState) -> str:
    if not entry_id:
        return ''
    if beleg == 'ausstehend' and not entry_id.endswith('†'):
        label = entry_id + '†'
    else:
        label = entry_id
    return (
        f'<text x="{LABEL_X}" y="{LABEL_Y}" text-anchor="middle" '
        f'font-family="Source Serif 4, serif" font-size="{LABEL_FONT_SIZE}" '
        f'fill="currentColor">{label}</text>'
    )


def build_seal(
    wortlaut: int,
    geist: int,
    beleg: BelegState,
    stroke_width: float = DEFAULT_STROKE_WIDTH,
    entry_id: str = '',
) -> str:
    """Render Siegel als SVG-String nach Spec v7 (W/G/B, seit 2026-08-02).

    wortlaut: 0..5 — Substrat-Beitrag zur sprachlichen Oberflaeche.
    geist: 0..5 — Substrat-Beitrag zum Geist des Werks.
    beleg: 'belegt' oder 'ausstehend'.
    entry_id: optionale Registernummer; unter Pfad A meist leer, mit
        Genese-Register-Aktivierung (ADR 0009) wieder aktiv.
    """
    view_box_height = 110 if entry_id else 100
    inner = (
        build_brackets(stroke_width)
        + build_dot_row(wortlaut, ROW_WORTLAUT_Y)
        + build_dot_row(geist, ROW_GEIST_Y)
        + build_beleg_row(beleg, ROW_BELEG_Y)
        + build_entry_label(entry_id, beleg)
    )
    return (
        f'<svg viewBox="0 0 130 {view_box_height}" '
        f'xmlns="http://www.w3.org/2000/svg">{inner}</svg>'
    )


# Backwards-compat shims. Aufrufstellen sollten zur v7-API migrieren.
def build_seal_v6(diktion, geist, korrespondenz, **kwargs):
    """DEPRECATED. v6-API mit diktion/geist/korrespondenz. Auf build_seal() umstellen."""
    warnings.warn(
        'build_seal_v6() ist veraltet. Nutze build_seal(wortlaut, geist, beleg). '
        'Mapping: diktion->wortlaut, korrespondenz->beleg. Werte unveraendert.',
        DeprecationWarning,
        stacklevel=2,
    )
    return build_seal(diktion, geist, korrespondenz, **kwargs)


def build_seal_v5(form, substance, verification, **kwargs):
    """DEPRECATED. v5-API mit form/substance/verification. Auf build_seal() umstellen."""
    warnings.warn(
        'build_seal_v5() ist veraltet. Nutze build_seal(wortlaut, geist, beleg). '
        'Mapping: form->wortlaut, substance->geist, verified->belegt, unverified->ausstehend.',
        DeprecationWarning,
        stacklevel=2,
    )
    beleg = 'belegt' if verification == 'verified' else 'ausstehend'
    return build_seal(form, substance, beleg, **kwargs)


def main(argv: list[str]) -> int:
    if len(argv) < 4 or len(argv) > 6:
        print(
            'Usage: python siegel.py <wortlaut 0-5> <geist 0-5> <belegt|ausstehend> '
            '[stroke_width=1.8] [entry_id]',
            file=sys.stderr,
        )
        return 2
    wortlaut = int(argv[1])
    geist = int(argv[2])
    beleg = argv[3]
    if beleg not in ('belegt', 'ausstehend'):
        print(f'beleg must be belegt|ausstehend, got {beleg!r}', file=sys.stderr)
        return 2
    stroke_width = float(argv[4]) if len(argv) >= 5 else DEFAULT_STROKE_WIDTH
    entry_id = argv[5] if len(argv) >= 6 else ''
    svg = build_seal(wortlaut, geist, beleg, stroke_width=stroke_width, entry_id=entry_id)
    sys.stdout.write(svg + '\n')
    return 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv))
