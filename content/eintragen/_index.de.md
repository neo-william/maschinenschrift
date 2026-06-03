---
title: Eintragen
description: Wie ein Werk im Maschinenschrift-Standard deklariert und in den kuratierten Katalog aufgenommen wird.
aliases:
  - /beitragen/
---

Maschinenschrift ist ein offener Standard. Aufnahme in den
[Katalog](/werke/) erfolgt durch Selbstdeklaration. Es gibt kein
Gatekeeping, keine Pruefkommission, keine Gebuehr — kuratiert wird
ausschliesslich auf formale Vollstaendigkeit, Spec-Konformitaet und
sichtbare Anbringung des deklarierten Siegels am Werk selbst.

## Vorgehen in vier Schritten

### 1. Achsenwerte bestimmen

Lesen Sie zunaechst [Foundation](/foundation/) §7. Die drei Achsen sind:

- **D (Diktion, 0–5):** Substrat-Beitrag zur sprachlichen Oberflaeche
- **G (Geist, 0–5):** Substrat-Beitrag zum Geist des Werks — Ideen, Argumente, strukturelle Entscheidungen, Inhalt. Diagnose-Formel des Projekts: *Geist aus der Maschine*.
- **K (Korrespondenz):** `belegt` oder `ausstehend`

Vergeben Sie D und G nach den Skalen in §7. `korrespondenz` startet
fuer neue Eintraege standardmaessig auf `ausstehend`.

### 2. YAML schreiben

Ein Werks-Eintrag ist eine YAML-Datei nach dem folgenden Schema:

```yaml
slug: ein-kurzer-eindeutiger-bezeichner
title: Der Werktitel
author: Verfassername (Klar- oder Pseudonym)
year: 2026
language: de              # ISO 639-1 Kuerzel
genre: Roman              # frei waehlbar
zeichen:
  diktion: 4
  geist: 2
  korrespondenz: ausstehend
narration: >
  Eine kurze, ehrliche Beschreibung der Entstehung. Welche Rolle
  hatte das Sprachsubstrat in der Diktion und am Geist? Welche
  Entscheidungen traf der Autor, welche das Substrat?
links:
  canonical: https://example.com/werk
  author_site: https://example.com
declared_at: "2026-06-01"  # Datum der Deklaration im ISO-Format
```

Der `slug` wird zur URL: `maschinenschrift.com/werke/<slug>/`. Er
sollte Kleinbuchstaben, Ziffern und Bindestriche verwenden.

Die `narration` ist der erklaerende Text auf der Werks-Detail-Seite.
Empfohlene Laenge: zwei bis vier Saetze. Substanz-Aussagen sind
willkommener als Marketing-Sprache.

### 3. Siegel am Werk anbringen

Die Aufnahme in den Katalog setzt voraus, dass das deklarierte Siegel
am Werk sichtbar angebracht ist. Erzeugen Sie das Siegel im
[Generator](/siegel/) mit den D/G/K-Werten aus Schritt 1 und bringen Sie
es vor der Einreichung an.

Zulaessige Platzierungen:

- **Bevorzugt:** Front-Cover (Buecher), Titelblatt (Aufsaetze), About-Seite
  oder Footer (Websites), Dokumentations-Header (Software).
- **Alternativ, im Inneren des Werks:** Back-Cover, Innenklappe, Kolophon,
  Impressum, Editorial-Notiz. Bei digitalen Werken: About-Seite,
  Impressum-Seite oder Metadaten-Block.

Nicht ausreichend: Siegel ausschliesslich auf der Autoren-Website,
Verlags-Seite oder externen Plattformen ohne direkten Werks-Bezug.

Das Siegel liegt in SVG und PNG (512 / 1024 / 2048) unter
`/siegel/assets/d<D>-g<G>-<K>.<ext>` bereit — waehlen Sie die Aufloesung,
die Ihr Medium braucht.

### 4. Pull Request gegen das Katalog-Repository

Das Katalog-Repository liegt oeffentlich auf GitHub:
[github.com/maschinenschrift/maschinenschrift-site](https://github.com/maschinenschrift/maschinenschrift-site).

1. Repository forken.
2. Die YAML-Datei unter `works/<slug>.yaml` ablegen.
3. Pull Request gegen `main` oeffnen.

Die Redaktion prueft:

- formale Vollstaendigkeit (alle Pflichtfelder ausgefuellt)
- Spec-Konformitaet (D/G/K-Werte interpretierbar nach Foundation §7)
- Plausibilitaet der Narration
- sichtbares Siegel am Werk in den deklarierten Werten — Nachweis durch
  URL, Cover-Screenshot oder Foto (Link in der PR-Beschreibung oder
  kleine Nachweis-Datei neben der YAML)

Es gibt **keine** Pruefung der Qualitaet des Werks, der literarischen
Relevanz oder des kommerziellen Erfolgs. Die Redaktion ist nicht Verlag.

## Alternative: Mail

Wer keinen GitHub-Account hat, kann die YAML-Daten formlos an
`contact [at] maschinenschrift [dot] com` senden, zusammen mit dem
Siegel-Nachweis (URL, Screenshot oder Foto). Die Redaktion legt den
Eintrag dann als Pull Request an.

## Kryptografische Zeitanker (optional, extern)

Maschinenschrift betreibt kein Zeitstempel-Register. Wer für eigene Manuskript-Staende eine kryptografisch verlaessliche Zeitspur wuenscht — den Beweis, dass eine bestimmte Datei an einem bestimmten Tag existierte —, kann den unabhaengigen Dienst [OpenTimestamps](https://opentimestamps.org) verwenden. Er ist kostenlos, browser-basiert und verankert den Hash der Datei in einem Bitcoin-Block. Die `.ots`-Beweisdatei bleibt bei Ihnen; Maschinenschrift speichert sie nicht. Sie kann unabhaengig in juristischen Kontexten vorgelegt werden. Fuer die Aufnahme in den Katalog ist davon nichts erforderlich.

## Was nach der Aufnahme passiert

Mit dem Merge des Pull Requests:

- Cloudflare Pages baut die Site neu.
- Der Eintrag ist unter `maschinenschrift.com/werke/<slug>/` erreichbar.
- Das Werk nimmt automatisch an der taeglichen
  [Werk-des-Tages-Rotation](/) teil — bei *n* Werken im Katalog
  jeweils etwa einen von *n* Tagen.
- Die Werks-Siegel werden in vier Aufloesungen (SVG, PNG 512/1024/2048)
  unter `/siegel/assets/d<D>-g<G>-<K>.<ext>` verfuegbar.

## Was ein Eintrag *nicht* impliziert

- Keine Qualitaetsaussage.
- Keine Verlagstaetigkeit, kein Vertrieb, keine kommerzielle Beziehung.
- Kein Ausschluss aus anderen Katalogen oder Standards.
- Keine Festlegung von D/G/K fuer kuenftige Werke desselben Autors.

## Aenderungen, Ueberarbeitungen, Rueckzug

- Aenderungen an einem bestehenden Eintrag: Pull Request mit der
  geaenderten YAML-Datei.
- Bestaetigung eines `ausstehend`-Eintrags: setzen Sie `korrespondenz: belegt`,
  sobald die bibliographischen Daten (ISBN, Publikationsdatum, Verlag) feststehen.
- Rueckzug: Pull Request, der die YAML-Datei loescht.

Die Versionshistorie aller Eintraege ist via Git permanent nachvollziehbar.

## Lizenz Ihres Beitrags

Mit dem Pull Request stimmen Sie zu, dass Ihre eingereichte YAML-Datei
unter der [CC BY 4.0](/licenses/content/) lizenziert wird — analog zu
allen anderen Katalog-Inhalten. Die Rechte am Werk selbst bleiben
selbstverstaendlich bei Ihnen.
