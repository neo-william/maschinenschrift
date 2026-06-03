"""Erzeugt Hugo-Content-Stubs aus works/<slug>.yaml.

Pfad-A-Architektur: works/*.yaml ist die kanonische Datenquelle. Hugo
braucht Content-Files unter content/werke/, mit YAML als Front Matter.

Multilanguage: pro Werk werden ZWEI Content-Files erzeugt:
  - content/werke/<slug>.md      English-Version mit url: /works/<slug>/
  - content/werke/<slug>.de.md   Deutsche Version (Hugo praefixiert mit /de/)

Beide enthalten denselben YAML-Body (inkl. nested narration mit en/de-Keys).
Hugo-Templates picken die richtige Narration via `index .Params.narration .Site.Language.Lang`.

Vor jedem Hugo-Build laufen lassen:
    python scripts/build-content.py
"""

from __future__ import annotations

import sys
from pathlib import Path


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent
    works_dir = repo_root / 'works'
    content_dir = repo_root / 'content' / 'werke'

    if not works_dir.is_dir():
        print(f'Error: {works_dir} does not exist', file=sys.stderr)
        return 1

    content_dir.mkdir(parents=True, exist_ok=True)

    yamls = sorted(works_dir.glob('*.yaml'))
    if not yamls:
        print(f'Warning: no *.yaml files in {works_dir}', file=sys.stderr)
        return 0

    count = 0
    for yaml_path in yamls:
        slug = yaml_path.stem
        body = yaml_path.read_text(encoding='utf-8').strip()

        # English version: explicit url override to /works/<slug>/ (Hugo's
        # default language uses the root path; without override the URL would
        # use the section name 'werke').
        en_frontmatter = body + f'\nurl: /works/{slug}/'
        (content_dir / f'{slug}.md').write_text(
            f'---\n{en_frontmatter}\n---\n', encoding='utf-8'
        )

        # German version: no url override needed. Hugo generates /de/werke/<slug>/
        # automatically from section + defaultContentLanguageInSubdir=false.
        (content_dir / f'{slug}.de.md').write_text(
            f'---\n{body}\n---\n', encoding='utf-8'
        )

        count += 2

    print(f'{count} content stub(s) written to {content_dir} '
          f'({count // 2} works × 2 languages)')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
