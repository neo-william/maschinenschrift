"""Erzeugt alle 72 Siegel-SVGs (6 Diktion-Werte * 6 Geist-Werte * 2 K-States).

Spec v6 (seit 2026-05-24). Ausgabe-Verzeichnis per Argument oder Default ../output/.

Verwendung:
    python build-assets.py                  # -> ../output/
    python build-assets.py path/to/static/siegel/assets

Filenames folgen dem Schema d{D}-g{G}-{K}.svg, also z. B. d4-g2-ausstehend.svg.
"""

from __future__ import annotations

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from siegel import build_seal  # noqa: E402


def main(argv: list[str]) -> int:
    if len(argv) > 2:
        print('Usage: python build-assets.py [output_dir]', file=sys.stderr)
        return 2
    out_dir = Path(argv[1]) if len(argv) == 2 else HERE.parent / 'output'
    out_dir.mkdir(parents=True, exist_ok=True)
    count = 0
    for diktion in range(6):
        for geist in range(6):
            for korrespondenz in ('belegt', 'ausstehend'):
                svg = build_seal(diktion, geist, korrespondenz)
                name = f'd{diktion}-g{geist}-{korrespondenz}.svg'
                (out_dir / name).write_text(svg + '\n', encoding='utf-8')
                count += 1
    print(f'{count} SVG files written to {out_dir}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv))
