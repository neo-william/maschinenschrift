---
title: Submit
description: How a work is declared in the Maschinenschrift standard and added to the curated catalog.
url: /submit/
aliases:
  - /contribute/
---

Maschinenschrift is an open standard. Inclusion in the
[catalog](/works/) happens by self-declaration. There is no gatekeeping,
no review committee, no fee — curation only checks formal completeness,
spec conformance, and that the declared seal is visibly present on the
work itself.

## Procedure in four steps

### 1. Determine axis values

First read [Foundation](/foundation/) §7. The three axes are:

- **D (Diktion, 0–5):** degree of substrate contribution to the linguistic surface
- **G (Geist, 0–5):** degree of substrate contribution to the work's spirit — content, ideas, structure. *Geist* is German, untranslated; an occasional gloss is *Ghost from the Machine*. The project's diagnostic formula is *Geist aus der Maschine*.
- **K (Korrespondenz / Correspondence):** `belegt` or `ausstehend`

Assign D and G according to the scales in §7. For new entries,
`korrespondenz` defaults to `ausstehend`.

### 2. Write the YAML

A work entry is a YAML file following this schema:

```yaml
slug: a-short-unique-identifier
title: The work's title
author: Author name (real or pseudonymous)
year: 2026
language: en              # ISO 639-1 code
genre: Novel              # free-form
zeichen:
  diktion: 4
  geist: 2
  korrespondenz: ausstehend
narration:
  en: |
    An honest, brief account of the genesis. What role did the
    language substrate play in diction and in the work's spirit?
    Which decisions were the author's, which were the substrate's?
  de: |
    Optional German translation. At least one language is required;
    others are encouraged.
links:
  canonical: https://example.com/work
  author_site: https://example.com
declared_at: "2026-06-01"  # date of declaration, ISO format
```

The `slug` becomes the URL: `maschinenschrift.com/works/<slug>/` on the
English tree, `maschinenschrift.com/de/werke/<slug>/` on the German tree.
It should use lowercase letters, digits, and hyphens.

The `narration` is the explanatory text on the work's detail page.
Recommended length: two to four sentences. Substance over marketing.
Multiple language keys are supported; the site falls back to `en` when a
visitor's language is unavailable.

### 3. Place the seal on the work

Catalog inclusion requires that the declared seal is visibly present on
the work itself. Generate the seal in the [generator](/seal/) using the
D/G/K values from step 1 and apply it before submitting.

Acceptable placements:

- **Preferred:** front cover (books), title page (essays), about page or
  footer (websites), documentation header (software).
- **Alternative, inside the work:** back cover, inside flap, colophon,
  imprint page, editorial note. For digital works: about page,
  imprint page, or metadata block.

Not acceptable: seal only on the author's website, publisher page, or
external platforms without a direct artifact link.

The seal is available in SVG and PNG (512 / 1024 / 2048) under
`/seal/assets/d<D>-g<G>-<K>.<ext>` — choose the resolution your medium
needs.

### 4. Pull request against the catalog repository

The catalog repository is public on GitHub:
[github.com/maschinenschrift/maschinenschrift-site](https://github.com/maschinenschrift/maschinenschrift-site).

1. Fork the repository.
2. Place the YAML file under `works/<slug>.yaml`.
3. Open a pull request against `main`.

The editorial check covers:

- formal completeness (all required fields present)
- spec conformance (D/G/K values interpretable per Foundation §7)
- plausibility of the narration
- visible seal on the work, in the declared values — provide a URL,
  cover screenshot, or photograph as evidence (link in the PR description
  or commit a small evidence file alongside the YAML)

There is **no** check of the work's quality, literary relevance, or
commercial success. The editorial body is not a publisher.

## Alternative: email

If you don't have a GitHub account, send the YAML data informally to
`contact [at] maschinenschrift [dot] com`, attached with the seal-placement
evidence (URL, screenshot, or photograph). The editorial body then opens
the pull request on your behalf.

## Cryptographic timestamping (optional, external)

Maschinenschrift does not operate a timestamp register. If you want a cryptographically reliable time anchor for your manuscript states — proving that a specific file existed at a specific date — you can use the independent service [OpenTimestamps](https://opentimestamps.org). It is free, browser-based, and anchors your file's hash in a Bitcoin block. The resulting `.ots` proof file stays with you; Maschinenschrift never sees it. You can present it in any legal context where you need such evidence. None of this is required for inclusion in the catalog.

## What happens after inclusion

With the merge of the pull request:

- Cloudflare Pages rebuilds the site.
- The entry becomes reachable at `maschinenschrift.com/works/<slug>/`
  (and `/de/werke/<slug>/`).
- The work automatically participates in the daily
  [work-of-the-day rotation](/) — at *n* works in the catalog,
  approximately one in every *n* days.
- The work's seals become available in four resolutions (SVG, PNG
  512/1024/2048) under `/seal/assets/d<D>-g<G>-<K>.<ext>`.

## What an entry does *not* imply

- No quality claim.
- No publishing activity, no distribution, no commercial relationship.
- No exclusion from other catalogs or standards.
- No commitment of D/G/K values for future works by the same author.

## Changes, revisions, withdrawal

- Changes to an existing entry: pull request with the modified YAML file.
- Confirming the correspondence of an `ausstehend` entry: set `korrespondenz: belegt`
  once the bibliographic data (ISBN, publication date, publisher) is settled.
- Withdrawal: pull request that deletes the YAML file.

The version history of all entries is permanently traceable via Git.

## License of your contribution

By the pull request, you agree that your submitted YAML file is
licensed under [CC BY 4.0](/licenses/content/) — like all other catalog
contents. Rights to the work itself remain with you.
