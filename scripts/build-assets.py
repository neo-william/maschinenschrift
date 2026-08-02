"""Erzeugt alle 72 Siegel-SVGs (6 Wortlaut-Werte * 6 Geist-Werte * 2 B-States).

Spec v7 (seit 2026-08-02). Ausgabe-Verzeichnis per Argument oder Default ../output/.

Verwendung:
    python build-assets.py                  # -> ../output/
    python build-assets.py path/to/static/siegel/assets

Filenames folgen dem Schema w{W}-g{G}-{B}.svg, also z. B. w4-g2-ausstehend.svg.
Vor v7 lautete das Schema d{D}-g{G}-{K}.svg; die alten Dateien werden beim
Schreiben nicht automatisch entfernt (siehe `make clean`).
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
    for wortlaut in range(6):
        for geist in range(6):
            for beleg in ('belegt', 'ausstehend'):
                svg = build_seal(wortlaut, geist, beleg)
                name = f'w{wortlaut}-g{geist}-{beleg}.svg'
                (out_dir / name).write_text(svg + '\n', encoding='utf-8')
                count += 1
    print(f'{count} SVG files written to {out_dir}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv))
