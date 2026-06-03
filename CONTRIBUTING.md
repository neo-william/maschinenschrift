# Beitragen

Maschinenschrift ist ein offener Standard mit kuratiertem Katalog.
Beiträge erfolgen über Pull Requests gegen `main`.

Die ausführliche, nutzerorientierte Anleitung steht auf der Live-Site:
**<https://maschinenschrift.com/beitragen/>**. Dieses Dokument richtet
sich an technische Mitwirkende und ergänzt die Live-Anleitung um
Repo-spezifische Details.

## Typen von Beiträgen

### Katalog-Einträge (`works/<slug>.yaml`)

Der häufigste Beitragsweg. Schema und Schritt-für-Schritt-Anleitung
unter [maschinenschrift.com/beitragen/](https://maschinenschrift.com/beitragen/).

Pflichtfelder: `slug`, `title`, `author`, `year`, `zeichen` (mit `form`,
`substance`, `verification`), `declared_at`.

Empfohlene Felder: `language`, `genre`, `narration`, `links.canonical`,
`links.author_site`.

### Spec-Erweiterungen

Spec-Änderungen ausschließlich gegen eine **neue Versionsnummer**.
Die aktuelle veröffentlichte Spec bleibt unter ihrem URL erreichbar.

Workflow:

1. Issue eröffnen mit Rationale und konkretem Änderungsvorschlag.
2. Neue Spec-Seite unter `content/spec/siegel-v<N>/_index.md` anlegen.
3. Implementation in `scripts/siegel.py` und `static/js/live-preview.js`
   anpassen, gegen Golden-Files in `tests/` testen.
4. Pull Request gegen `main` mit Bezug zum Issue.

### Code (Skripte, Layouts, CSS)

- Layout-Änderungen: Pull Request gegen `layouts/`.
- Skript-Änderungen: Pull Request gegen `scripts/`, Golden-File-Tests
  müssen weiterhin grün laufen.
- CSS: Pull Request gegen `static/css/main.css`. Bewusst zurückhaltend
  halten — der Standard ist die Aussage, nicht die Verpackung.

### Übersetzungen

Aktuell ist die Site auf Deutsch verfasst, mit der Foundation bilingual
(DE/EN). Übersetzungs-Pull-Requests für weitere Sprachen sind willkommen,
sobald Hugo-Multilanguage-Setup steht (ist nicht im aktuellen Scope).

## Build lokal

```bash
make dev          # Setup + Hugo server auf http://127.0.0.1:1313
make build        # Statischer Build nach public/
make verify       # Golden-File-Test gegen Siegel-Generator
make clean        # public/ und generierte Assets entfernen
```

Voraussetzungen:
- Hugo Extended ≥ 0.158 (`winget install Hugo.Hugo.Extended` auf Windows,
  `brew install hugo` auf macOS, `apt-get install hugo` ist meist zu alt)
- Python 3.9+
- `librsvg2-bin` für PNG-Rasterung (nur Linux/Mac; auf Windows reicht
  SVG-only für die lokale Vorschau)

## Pull-Request-Disziplin

- Eine Änderung pro PR, klare Commit-Messages.
- Bei Katalog-Einträgen: ein Werk pro PR.
- Bei Spec-Änderungen: Issue vorher, dann PR mit Issue-Bezug.
- Bei Code-Änderungen: CI muss grün sein (`verify-build.yml` läuft auf
  jedem PR).

## Verhalten

Sachlichkeit über Selbstdarstellung. Konkretheit über Floskeln. Niemandes
Werk ist hier wichtiger als das nächste — die Achsen-Notation ist
deskriptiv, nicht wertend.

## Lizenz

Mit Ihrem Pull Request stimmen Sie zu, dass Ihr Beitrag unter den
Lizenzen dieses Repositories veröffentlicht wird:

- Code unter Apache 2.0 (siehe `LICENSE`)
- Inhalte und Katalog-Einträge unter CC BY 4.0 (siehe `LICENSE-content.md`)
