---
title: "Das Feld, vermessen"
description: "Rund zwanzig Ansätze erklären inzwischen, wie viel Sprachmodell in einem Text steckt. In ein gemeinsames Raster übersetzt, zeigt sich, wo ein Buch keine eigene Angabe findet."
seotitle: "Das Feld, vermessen — KI-Kennzeichnung für Bücher im Vergleich: Etiketten, Stufenleitern, Klassifikationen"
date: 2026-11-04
bucket: lineage
stile:
  - feld.css
skripte:
  - feld.js
deklaration:
  wortlaut: 5
  geist: 3
  beleg: belegt
sources:
  - title: "Recommendations for a Classification of AI Use in Academic Manuscript Preparation"
    author: "STM, Task & Finish Group on AI Labelling Terminology"
    date: "2025-09"
    type: report
    url: https://s3.eu-west-2.amazonaws.com/stm.offloadmedia/wp-content/uploads/2025/04/23020709/STM_AI_Classification_Recs_19_Sept2025-1.pdf
    note: "Neun Tätigkeiten mit Beispielen und Ausschlüssen; Kategorie 2 „part or all of the manuscript text“, Ideen als Teil des Forschungsprozesses außerhalb, Sprachverbesserung nach den STM-Leitlinien 2023 nicht offenzulegen. Grundlage der STM-Tafel, am Original geprüft."
  - title: "Human Authored FAQ"
    author: "The Authors Guild"
    date: "2026"
    type: guidelines
    url: https://authorsguild.org/human-authored/faq/
    note: "Höchstens geringfügiger KI-Text, Rechtschreibhilfe erlaubt, Brainstorming nur „at a very high level“, Figuren- und Plotentwicklung mit KI ausgeschlossen; Lizenzvertrag, 10 $ je Titel für Nichtmitglieder. Grundlage der Grenze W 0–1 · G 0–1 in der Etikett-Tafel."
  - title: "Von Menschen · geschrieben · gestaltet · geprüft"
    author: "Arbeitsgemeinschaft von Jugendbuchverlagen (avj)"
    date: "2026-10-22"
    type: statement
    url: https://avj-online.de/themen/von-menschen/
    note: "Der kreative Kern als Kriterium; Selbstverpflichtung der beteiligten Verlage, ohne Prüfung, kein Verbandslabel."
  - title: "Human-made book labels gain ground as publisher drops novelist at centre of French AI row"
    author: "Connexion"
    type: article
    url: https://www.connexionfrance.com/news/human-made-book-labels-gain-ground-as-publisher-drops-novelist-at-centre-of-french-ai-row/823665
    note: "Books By People (Organic Literature) mit Entwurfsprüfung und Beitrag der Verlage; Librinova."
  - title: "Détection de l'IA : les nouveaux éditeurs déploient le label Création humaine de Librinova"
    author: "Livres Hebdo"
    type: article
    url: https://www.livreshebdo.fr/article/detection-de-lia-les-nouveaux-editeurs-deploient-le-label-creation-humaine-de-librinova
    note: "Label nach Detektor-Analyse und Gespräch mit einer Prüferin."
  - title: "Not By AI 90% Rule"
    author: "Not By AI"
    date: "2026-10-10"
    type: guidelines
    url: https://notbyai.fyi/not-by-ai-90-rule
    note: "Mindestens 90 Prozent menschlich; Ideenfindung und Rechtschreibhilfe zählen nicht; KI darf Kernaussage und kreative Richtung nicht bestimmen. Kommerzielle Nutzung nur im Abonnement (notbyai.fyi/pricing)."
  - title: "Certifying a Book"
    author: "Books By People"
    type: website
    url: https://www.booksbypeople.org/
    note: "Kurze Prüfung anhand von Entstehungsangaben, Manuskriptverlauf und Signaturanalyse; Gebühren nach Umsatz und Titelzahl."
  - title: "Badges"
    author: "Credtent"
    type: website
    url: https://credtent.org/badges/
    note: "Creative Origin: Human Composed, AI-Assisted, AI-Generated, Legacy Creation; Selbstauskunft-Abzeichen frei, Zertifizierung kostenpflichtig. Grundlage der Credtent-Tafel (Grenzen als Lesart)."
  - title: "FAIA — Framework for AI Attribution"
    author: "Liccium, Universität Leiden, GO FAIR Foundation"
    date: "2025"
    type: website
    url: https://faia.liccium.com/technology/vocabulary/faia-flags.md
    note: "Definitionen der drei Flaggen: Human-Created ohne jede generative KI, AI-Generated mit der KI als hauptsächlichem kreativem Akteur, dazwischen AI-Assisted. Grundlage der FAIA-Tafel."
  - title: "Content Guidelines: Artificial intelligence (AI)-generated content"
    author: "Amazon Kindle Direct Publishing"
    type: guidelines
    url: https://kdp.amazon.com/en_US/help/topic/G200672390
    note: "Von KI erzeugter Text gilt als KI-generiert, „even if you applied substantial edits afterwards“; Ideenfindung und Überarbeitung eigener Texte gelten als unterstützt und sind nicht anzugeben. Grundlage der KDP-Tafel (Grenze W 3/4 als Lesart)."
---

Wer heute angeben will, wie viel eines Texts aus einem Sprachmodell kommt, hat die Wahl: Etiketten für menschengemachte Bücher, Stufenleitern mit drei Flaggen, Formulare aus der Wissenschaft, Pflichtfelder bei Händlern, Detektoren. Das [Register der Nachbarn](/de/entscheidungen/) dieses Projekts führt zweiundzwanzig Ansätze. Nebeneinander gelesen, beantworten sie verschiedene Fragen.

Diese Notiz legt sie übereinander. Sie übersetzt die Klassen der Etiketten, Stufenleitern und Klassifikationen in das Raster, in dem Maschinenschrift deklariert. **Das Raster ist ein Messgerät dieses Projekts, nicht die Selbstbeschreibung der Nachbarn.** Wo eine Grenze eine Lesart ist, steht es dabei. Stand der Kodierung: 4. November 2026.

## Ein Buch, sieben Raster

Maschinenschrift ordnet ein Buch auf zwei Skalen von null bis fünf ein: *Wortlaut*, wie viel der Sätze aus dem Substrat kam, und *Geist*, wie viel der Ideen und des Baus. Dazu tritt der *Beleg*: ob die Faktenaussagen gegen Quellen außerhalb des Substrats geprüft sind. Zusammen ergibt das keinen Würfel, sondern zwei Platten mit je sechsunddreißig Zellen.

Jedes andere System schneidet diese Fläche auf seine Weise. Das Etikett gibt einer Ecke ein Zeichen und lässt den Rest schweigen. KDP zieht eine senkrechte Linie, die von Gedanken nichts weiß. STM fragt nach Tätigkeiten und lässt die Ideen ausdrücklich außen vor. Die Stufenleitern mit drei Klassen ziehen zwei Grenzen und legen fast alles in eine breite Mitte. Der Punkt ist in allen Tafeln dasselbe Buch: *La Scuola dei Silenzi*, das erste Werk im [Verzeichnis](/de/verzeichnis/), deklariert mit W 5 · G 3 †.

{{< feld "raster" >}}

**Ein Buch, dessen Sätze weitgehend aus dem Modell kommen, dessen Gedanken aber nicht, hat fast nirgends eine eigene Angabe.** Bei den Etiketten muss es schweigen. Bei FAIA und Credtent steht es unter *AI-Assisted*, in derselben Klasse wie ein Buch, an dem ein Modell nur einzelne Sätze geglättet hat. Bei KDP steht es in derselben Klasse wie ein vollständig generierter Text, bei STM in derselben Kategorie wie ein Buch mit einem einzigen generierten Absatz. Zum Beleg sagt keines der Systeme etwas.

Die Grenzen an jeder Tafel sind am 4. November an den Veröffentlichungen der Systeme geprüft; wo eine Grenze Lesart bleibt, steht es an der Tafel. Die übrigen Ansätze des Registers, Detektoren, Signaturen und Prozess-Taxonomien, beantworten andere Fragen und lassen sich nicht auf Wortlaut und Geist abbilden. Korrekturen nimmt das Register entgegen: contact [at] maschinenschrift [dot] com.

---

*Selbstdeklaration dieser Notiz: **W 5 · G 3**. Anlass beim Herausgeber, der das Feld sehen wollte, statt es beschrieben zu bekommen; Darstellung und Lesart der Raster im Gespräch zwischen Herausgeber und Substrat entwickelt; Programmierung und sprachliche Oberfläche substrat-vermittelt. Die Grenzen im Raster sind am 4. November an den Veröffentlichungen der Systeme geprüft. Auswahl und Verantwortung beim Herausgeber.*
