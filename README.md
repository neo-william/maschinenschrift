# maschinenschrift-site

Statischer Hugo-Site-Quellbaum fuer `maschinenschrift.com`. Wird als
eigenstaendiges GitHub-Repo (`maschinenschrift-site`) deployt und an
Cloudflare Pages gebunden. Aktueller Stand: lebt im Studio unter
`studio/projects/maschinenschrift/site/` und wird vor dem ersten Push in das
oeffentliche Repo verschoben.

## Verzeichnisstruktur

```
site/
  config.toml                  Hugo-Konfiguration
  content/
    _index.md                  Homepage-Text
    werke/                     Per-Werk-Content-Files (via scripts/build-content.py)
  layouts/
    _default/
      baseof.html              Base-Layout (Header/Footer/<main>-Block)
      list.html                Section-Listings
      single.html              Fallback-Single
    index.html                 Homepage mit Werk-des-Tages-Box
    werke/
      single.html              Werks-Detail-Template
    partials/
      header.html
      footer.html
      siegel.html              Inline-Siegel (Kopie von siegel-generator/src/)
  scripts/
    build-content.py           Bridge: works/*.yaml -> content/werke/*.md
  static/
    css/main.css               Basisformatierung
    siegel/assets/             Pre-generierte SVGs (via Generator)
  works/
    la-scuola-dei-silenzi.yaml Inauguraler Eintrag
```

## Build-Pipeline

Vier Schritte, in dieser Reihenfolge:

```bash
# 1. Siegel-Assets erzeugen (alle 72 SVGs)
python scripts/build-assets.py static/siegel/assets

# 2. PNGs rastern (braucht librsvg2-bin auf Linux)
bash scripts/build-pngs.sh static/siegel/assets

# 3. Content-Stubs aus works/*.yaml generieren
python scripts/build-content.py

# 4. Hugo bauen
hugo --minify
```

Lokal: Schritte 1 + 3 reichen fuer `hugo server`-Vorschau, Schritt 2 ist
optional (PNG-Download-Links auf der Atlas-Seite werden ohne PNGs ins Leere
zeigen).

## Cloudflare-Pages-Setup

Im Cloudflare-Dashboard das Pages-Projekt mit dem GitHub-Repo verbinden,
dann unter **Settings → Builds & deployments**:

- **Framework preset**: Hugo
- **Build command**:
  ```
  apt-get update && apt-get install -y librsvg2-bin && python scripts/build-assets.py static/siegel/assets && bash scripts/build-pngs.sh static/siegel/assets && python scripts/build-content.py && hugo --minify
  ```
- **Build output directory**: `public`
- **Environment variables**:
  - `HUGO_VERSION` = `0.161.1`
  - `PYTHON_VERSION` = `3.x` (Cloudflare-Default reicht)

Cloudflare Pages baut automatisch bei jedem Push auf `main`. Fuer die
**taegliche Werk-des-Tages-Rotation** zusaetzlich einen Deploy-Hook
einrichten (siehe [`.github/workflows/daily-rebuild.yml`](.github/workflows/daily-rebuild.yml)
fuer die Anleitung).

## GitHub-Actions-Workflows

- **`verify-build.yml`** — laeuft bei jedem Push und PR. Installiert Hugo,
  rsvg-convert, Python; baut die Site; verifiziert dass die Atlas-Seite
  72 inline-SVGs enthaelt und der inaugurale Werks-Eintrag gerendert wurde.
  Sicherheitsnetz vor dem Cloudflare-Versuch.
- **`daily-rebuild.yml`** — Cron um 00:05 UTC. Triggert den Cloudflare-Deploy-
  Hook, der einen Rebuild mit aktualisiertem `now.YearDay` ausloest und damit
  die Featured-Slot-Rotation vorantreibt. Benoetigt einmaligen Secret-Setup
  (Anleitung im Workflow-File).

## Werk-des-Tages-Rotation

Homepage `layouts/index.html` waehlt das Featured-Werk deterministisch:

```
idx = day_of_year(now) mod count(werke)
```

`now` ist die Build-Zeit. GitHub Actions Cron triggert taeglich um 00:05 UTC
einen Rebuild, sodass der Index taeglich um 1 inkrementiert (modulo Anzahl
der Werke). Bei einem Werk im Katalog steht *La Scuola dei Silenzi* immer im
Slot; bei n Werken jeweils 1/n der Tage. Self-Balancing: das Marketing-
Gewicht fuer das inaugurale Werk verduennt sich automatisch, wenn weitere
Werke beitreten.

## Adoption

Wer das Siegel selbst tragen will:

1. SVG/PNG aus `/siegel/` herunterladen
2. Optional: Pull Request gegen `works/` mit eigenem `<slug>.yaml`
   (Schema in [`../03 Datenmodell.md`](../03%20Datenmodell.md))

Adoption ist nicht voraussetzungs-, sondern selbstdeklarations-basiert.
Die Aufnahme in den kuratierten Katalog ist kein Gatekeeping, sondern
Sichtbarkeitsdienst.

## Lizenzen

- Code (Layouts, Skripte): Apache 2.0 — siehe `LICENSE` (am Repo-Root, vor erstem Push)
- Inhalte (Foundation, Konzept-Texte, Siegel-Spec, Siegel-Assets): CC BY 4.0
  — siehe `LICENSE-content.md` (am Repo-Root)
- Vollstaendige Lizenzlogik:
  [`../maschinenschrift-lizenzstrategie.md`](../maschinenschrift-lizenzstrategie.md)
