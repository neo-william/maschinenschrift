---
title: Entscheidungen
description: "Wie Maschinenschrift entstanden ist, welche Bauformen der KI-Kennzeichnung es selbst gebaut und verworfen hat und wo es unter Detektoren, Labels und Taxonomien steht."
seotitle: "Entscheidungen — Maschinenschrift neben Detektoren, Buch-Labels und KI-Kennzeichnungen"
aliases:
  - /motivation/
deklaration:
  wortlaut: 5
  geist: 3
  beleg: belegt
---

Wer über die maschinelle Beteiligung an einem Text Auskunft geben will, findet ein volles Feld vor. Rund zwanzig Ansätze stehen nebeneinander, mehrere davon älter als Maschinenschrift, die meisten für ein anderes Feld gebaut als die Literatur und dort gut gebaut. Diese Seite ordnet sie nach der Frage, die sie beantworten, begründet jeden Verzicht, führt ein Buch durch alle Bauformen und erzählt, welche davon Maschinenschrift selbst erprobt und wieder aufgegeben hat.

1. [**1. Das Problem**](#das-problem)\
   *Wer offen sagt, wie viel aus dem Modell kommt, riskiert mehr als wer schweigt.*
2. [**2. Die Antworten im Feld**](#die-antworten-im-feld)\
   *Rund zwanzig Ansätze beantworten acht Fragen. Maschinenschrift beantwortet eine neunte.*
3. [**3. Die Verzichte**](#die-verzichte)\
   *Dreizehnmal fehlt hier, was anderswo richtig ist, jedes Mal mit Grund.*
4. [**4. Der Probefall**](#der-probefall)\
   *Dasselbe Buch durch alle Bauformen geführt: die meisten schweigen, ebnen ein oder sagen die Hälfte.*
5. [**5. Was gebaut und verworfen wurde**](#was-gebaut-und-verworfen-wurde)\
   *Das Naheliegende wurde mehrfach gebaut und wieder aufgegeben, und jede Entscheidung dagegen ist datiert.*
6. [**6. Der Einwand**](#der-einwand)\
   *Eine Notation normalisiert, was sie notiert. Die Alternative ist nicht weniger Vermittlung, sondern unsichtbare.*

## Das Problem

Viele Autorinnen schreiben mit Sprachmodellen: zur Recherche, zur Glättung, für Entwürfe, manchmal für den größten Teil der Sätze. Die meisten sagen es nicht. Eine offene Auskunft kann einen Vertrag kosten, einen Preis, einen Ruf, und wer schweigt, kommt in aller Regel durch. An die Stelle der fehlenden Auskunft tritt der Verdacht, und er trifft bevorzugt die, deren Prosa nicht in der Mitte der Kurve liegt.

Es fehlt eine Form, in der die Autorin selbst sagt, wie viel der Sätze und wie viel der Gedanken ihres Buchs aus einem Sprachmodell kommen, ohne dass die Antwort sie ausliefert. Viele haben eine solche Form gesucht. Die Antworten unterscheiden sich vor allem darin, welche Frage sie beantworten.

## Die Antworten im Feld

Das Register ordnet die Ansätze nach der Frage, die sie beantworten, und beschreibt jeden mit den Angaben seiner eigenen Veröffentlichungen. Stand: 28. Oktober 2026. Es wird gepflegt; Ergänzungen und Korrekturen gehen an contact [at] maschinenschrift [dot] com.

<table class="nachbarn">
<thead><tr><th scope="col"><span class="sr-only">Bauform</span></th><th scope="col">Ansatz</th><th scope="col">Träger</th><th scope="col">Was er erklärt</th></tr></thead>
<tbody>
<tr><th scope="rowgroup">A</th><th scope="rowgroup" colspan="3">Detektion <span class="frage">Sieht dieser Text maschinell aus?</span></th></tr>
<tr><td></td><td><a href="https://www.pangram.com/">Pangram</a></td><td>Unternehmen</td><td>Wahrscheinlichkeit, dass ein Text maschinell erzeugt ist</td></tr>
<tr><td></td><td><a href="https://gptzero.me/">GPTZero</a></td><td>Unternehmen</td><td>Wahrscheinlichkeit, dass ein Text maschinell erzeugt ist</td></tr>
</tbody>
<tbody>
<tr><th scope="rowgroup">B</th><th scope="rowgroup" colspan="3">Prozessaufzeichnung <span class="frage">Lässt sich die Entstehung vorzeigen?</span></th></tr>
<tr><td></td><td><a href="https://www.grammarly.com/blog/company/grammarly-launches-grammarly-authorship/">Grammarly Authorship</a></td><td>Grammarly</td><td>Zeichnet das Schreiben im Dokument auf und ordnet den Text ein: getippt, eingefügt, von KI erzeugt oder bearbeitet; mit Wiedergabe der Entstehung</td></tr>
</tbody>
<tbody>
<tr><th scope="rowgroup">C</th><th scope="rowgroup" colspan="3">Herkunftssignatur <span class="frage">Welche Erklärung gehört zu dieser Datei, und wer hat sie signiert?</span></th></tr>
<tr><td></td><td><a href="https://c2pa.org/">C2PA / Content Credentials</a></td><td>Coalition for Content Provenance and Authenticity</td><td>Signierte Herkunftsangaben, an eine Mediendatei gebunden</td></tr>
<tr><td>C, E</td><td><a href="https://cv.iptc.org/newscodes/digitalsourcetype/">IPTC Digital Source Type</a></td><td>IPTC</td><td>Vokabular für Mediendateien, darunter <em>Created using Generative AI</em> und <em>Edited using Generative AI</em></td></tr>
<tr><td>C, E</td><td><a href="https://faia.liccium.com/">FAIA</a></td><td>Liccium mit der Universität Leiden und der GO FAIR Foundation</td><td>Erklärung mit drei Flaggen (<em>Human-Created</em>, <em>AI-Assisted</em>, <em>AI-Generated</em>), über einen ISCC-Code an den Inhalt gebunden, optional signiert</td></tr>
<tr><td>C, G</td><td><a href="https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content">Verhaltenskodex zu KI-generierten Inhalten</a></td><td>Europäische Kommission, Art. 50 KI-Verordnung</td><td>Freiwilliger Kodex, endgültig seit 10. Juni 2026: maschinenlesbare Markierung durch Anbieter, Kennzeichnung bestimmter Inhalte durch Betreiber; Art. 50 gilt seit 2. August 2026</td></tr>
</tbody>
<tbody>
<tr><th scope="rowgroup">D</th><th scope="rowgroup" colspan="3">Etikett <span class="frage">Ist das Buch von Menschen gemacht?</span></th></tr>
<tr><td></td><td><a href="https://authorsguild.org/human-authored/faq/">Human Authored</a></td><td>Authors Guild</td><td>Selbstzertifizierung per Vertrag für in den USA erschienene Bücher, mit öffentlicher Datenbank; Rechtschreibhilfen zulässig, maschinell erzeugter Text höchstens in geringstem Umfang</td></tr>
<tr><td></td><td><a href="https://avj-online.de/themen/von-menschen/">Von Menschen · geschrieben · gestaltet · geprüft</a></td><td>Kinder- und Jugendbuchverlage der avj</td><td>Selbstverpflichtung der Verlage: der kreative Kern eines Buchs stammt von Menschen; ausdrücklich kein generelles Urteil über KI</td></tr>
<tr><td></td><td><a href="https://www.connexionfrance.com/news/human-made-book-labels-gain-ground-as-publisher-drops-novelist-at-centre-of-french-ai-row/823665">Organic Literature</a></td><td>Books By People</td><td>Zertifizierungsmarke für Bücher, deren Text von der Autorin stammt; Rechtschreib- und Grammatikprüfung zulässig; Verlage zahlen einen Beitrag</td></tr>
<tr><td>A, D</td><td><a href="https://www.livreshebdo.fr/article/detection-de-lia-les-nouveaux-editeurs-deploient-le-label-creation-humaine-de-librinova">Création humaine</a></td><td>Librinova</td><td>Label nach einer Analyse durch Detektor-Software und einem Gespräch mit einer Prüferin</td></tr>
<tr><td></td><td><a href="https://notbyai.fyi/">Not By AI</a></td><td>Not By AI</td><td>Abzeichen für Inhalte, die nach eigener Schätzung zu mindestens 90 Prozent von Menschen stammen</td></tr>
</tbody>
<tbody>
<tr><th scope="rowgroup">E</th><th scope="rowgroup" colspan="3">Stufenleiter <span class="frage">In welche Klasse fällt es?</span></th></tr>
<tr><td></td><td><a href="https://www.newsfilecorp.com/release/229662">Content Origin Badges</a></td><td>Credtent</td><td>Drei Abzeichen zur Offenlegung, ob und wie KI an einem Inhalt beteiligt war</td></tr>
<tr><td></td><td><a href="https://arxiv.org/abs/2412.09029">AI Assessment Scale</a></td><td>Perkins, Roe, Furze u. a.</td><td>Fünf Stufen der KI-Nutzung in Prüfungen, seit der Überarbeitung in neutralen Farben</td></tr>
</tbody>
<tbody>
<tr><th scope="rowgroup">F</th><th scope="rowgroup" colspan="3">Prozess-Taxonomie <span class="frage">Welche Aufgaben hat ein Werkzeug übernommen, und wie?</span></th></tr>
<tr><td></td><td><a href="https://arxiv.org/abs/2303.03886">AI Usage Cards</a></td><td>Wahle, Ruas, Mohammad, Meuschke, Gipp</td><td>Formular für die Angabe von KI-Nutzung in wissenschaftlicher Arbeit</td></tr>
<tr><td></td><td><a href="https://niso.org/niso-io/2025/09/stm-releases-recommendations-classification-ai-use-manuscript-preparation">STM-Klassifikation</a></td><td>STM, Verband wissenschaftlicher Verlage</td><td>Neun Kategorien der KI-Nutzung bei der Manuskripterstellung, als Grundlage für Verlagsrichtlinien</td></tr>
<tr><td></td><td><a href="https://www.leidenmadtrics.nl/articles/gaidet-a-practical-taxonomy-for-declaring-ai-use-in-research-and-publishing">GAIDeT</a></td><td>Nazarovets, Tsybuliak, Teixeira da Silva, Suchikova</td><td>Angabe, welche Forschungsaufgaben in welcher Phase an generative KI delegiert wurden; Verantwortung beim Menschen</td></tr>
<tr><td></td><td><a href="https://subjectguides.uwaterloo.ca/AIDFramework">AID Framework</a></td><td>Kari D. Weaver, University of Waterloo</td><td>Erklärung am Ende eines Aufsatzes, gegliedert nach Arbeitsphasen; CC BY-SA 4.0</td></tr>
<tr><td></td><td><a href="https://www.research.ibm.com/blog/AI-attribution-toolkit">AI Attribution Toolkit</a></td><td>IBM Research</td><td>Fragebogen, aus dem eine Angabe entsteht: Anteil der Arbeit, Beitrag der KI, wer das Ergebnis geprüft hat</td></tr>
<tr><td></td><td><a href="https://arxiv.org/abs/2604.25346">Facettierte Attribution</a></td><td>Geraldo Xexéo, Universidade Federal do Rio de Janeiro</td><td>Sechs Facetten von der Bearbeitung bis zur Nachvollziehbarkeit, anwendbar bis zum Absatz</td></tr>
</tbody>
<tbody>
<tr><th scope="rowgroup">G</th><th scope="rowgroup" colspan="3">Plattformfeld <span class="frage">Was weiß der Händler?</span></th></tr>
<tr><td>E, G</td><td><a href="https://kdp.amazon.com/en_US/help/topic/G200672390">KI-Angabe bei KDP</a></td><td>Amazon Kindle Direct Publishing</td><td>Pflichtangabe bei Veröffentlichung, wenn Text, Bilder oder Übersetzung von einem KI-Werkzeug erzeugt wurden; KI-unterstützte Inhalte sind nicht anzugeben</td></tr>
</tbody>
<tbody>
<tr><th scope="rowgroup">H</th><th scope="rowgroup" colspan="3">Mitautorschaft <span class="frage">Steht das Modell auf dem Umschlag?</span></th></tr>
<tr><td></td><td><em>Pharmako-AI</em></td><td>K Allado-McDowell mit GPT-3, 2020</td><td>Ein Buch, das das Modell als Mitwirkenden führt</td></tr>
</tbody>
</table>

Maschinenschrift beantwortet eine neunte Frage: was die Autorin mit ihrem Namen darüber sagt, wie viel der Sätze und wie viel der Ideen dieses Buchs aus einem Sprachmodell kommen.

Am nächsten liegen die Etiketten und die Prozess-Taxonomien. Mit den Etiketten teilt Maschinenschrift Ort und Adresse: eine Selbstauskunft am Werk, gerichtet an Leserinnen. Mit den Taxonomien teilt es die Abstufung und die Verantwortung beim Menschen. Von beiden lässt es etwas weg; was und warum, steht unter *Die Verzichte*.

Außerhalb dieses Vergleichs liegt die Frage, ob ein Text zum Training von Modellen verwendet werden darf. Dafür gibt es eigene Signale und Register. Maschinenschrift adressiert sie nicht.

Einen Überblick über das ganze Feld gibt Rachel So, [*A Survey on Artificial Intelligence Attribution Badges*](https://project-rachel.4open.science/Rachel.So.A.Survey.on.Artificial.Intelligence.Attribution.Badges.pdf).

## Die Verzichte

Jede Bauform leistet etwas, und jede fehlt bei Maschinenschrift aus einem Grund. Die Buchstaben verweisen auf die Tabelle oben.

**1. Kein Detektor** (A). Ein Detektor antwortet schnell und ohne Mitwirkung der Autorin; bei Massenware ist das ein Hinweis. Er liest aber nur die Oberfläche und sagt nichts darüber, woher Ideen und Aufbau kommen. Wo er als Beweis gilt, kehrt sich die Beweislast um: die Autorin muss zeigen, dass sie etwas nicht getan hat. Bei Maschinenschrift kommt die Auskunft von der, die es weiß.

**2. Keine Aufzeichnung des Schreibens** (B). Eine Aufzeichnung stützt Behauptungen, und in Prüfungen an Schule und Hochschule ist sie am richtigen Ort. Maschinenschrift hat sie als Genese-Register beschlossen und zurückgenommen. Dazu kommt ein Grundsatz: die Werkstatt einer Autorin ist privat. Eine Aufzeichnung ändert die Frage von *wofür stehst du ein* zu *was kannst du vorlegen*. Wer eine Zeitspur der eigenen Manuskripte will, legt sie außerhalb des Standards an.

**3. Keine Signatur an einer Datei** (C). Eine Signatur sichert, dass eine Erklärung unverändert ist und von wem sie stammt; für Bilder, Agenturmeldungen und maschinelle Weiterverarbeitung ist das das richtige Werkzeug. Ein Buch erscheint als E-Book, Taschenbuch, Neuauflage, Übersetzung und Hörbuch, und jede Fassung ist eine andere Datei. Die Erklärung gilt dem Werk. Eine Signatur belegt außerdem, wer erklärt hat, und nicht, ob es stimmt. Und die Leserin sieht sie nicht: sie steht in einem Register, nicht auf der Titelseite.

**4. Keine Prüfinstanz, keine Zertifizierung, keine Gebühr** (B, D). Wo ein Dritter mit Vertrag, Gespräch oder Prüfung hinter einem Zeichen steht, entsteht eine Hürde für Täuschung. Ein freiwilliges Zeichen kann niemanden draußen halten; es kann den Ehrlichen ein Merkmal geben. Gebühren und Verfahren treffen zuerst die, die am meisten zu deklarieren haben: Selbstverlegerinnen. Und wer prüft, hat Macht über die Geprüften. Der Standard ist so gebaut, dass niemand ihn einhegen kann, auch sein Gründer nicht; wo dafür eine Selbstbindung nötig ist, ist sie ausgewiesen.

**5. Kein Ja oder Nein** (D). Ein Etikett ist eine Haltung, offen und mit Namen erklärt, und es hat das richtige Verfahren gewählt: Zusicherung statt Messung. Wer Kinderbücher für einen Ort hält, der aus Menschenhand kommen soll, darf das auf den Umschlag schreiben. Die Autorin, deren Gliederung ein Modell geglättet oder deren Sätze es mitformuliert hat, findet auf einem Etikett aber keinen Ort; ihr bleiben Schweigen oder Abrunden. Die Skala enthält das Etikett: ein Buch, das es zu Recht trägt, steht bei W 0 · G 0 und verliert nichts.

**6. Keine Prozentschwelle** (D). Eine Schwelle wie *mindestens neun Zehntel von Menschen* ist einfach und lässt Spielraum. Sie setzt aber eine Messbarkeit voraus, die es nicht gibt: ein Anteil von Wörtern, von Ideen oder von Arbeitsstunden ist jeweils etwas anderes. Maschinenschrift zählt Stufen auf zwei getrennten Achsen, und die Autorin erklärt in eigenen Worten, was die Zahl bedeutet.

**7. Keine Stufenleiter** (E). Drei Stufen sortieren schnell, und für Plattformen und Filter genügt das. Die Fälle liegen aber nicht auf einer Linie. Ein Buch mit menschlichen Sätzen und maschinellem Aufbau und eines mit menschlichem Aufbau und maschinellen Sätzen landen auf derselben Sprosse. Zwei Achsen ohne Gesamtnote sagen, wo das Modell war, und ergeben zusammen keinen Rang.

**8. Keine Aufgabenliste** (F). Wo eine Gutachterin wissen muss, ob die Literaturrecherche oder die Datenanalyse maschinell war, ist eine Liste der Arbeitsschritte genau richtig. Die Leserin eines Romans fragt nach dem Ergebnis: wessen Sätze sie liest, wessen Gedanken. Ob ein Prompt kurz oder ausführlich war, ändert am Buch nichts, und mit jedem weiteren Feld wächst die Scheingenauigkeit.

**9. Keine Auflösung bis zum Absatz** (F). Bei Texten aus klar getrennten Teilen ist sie präzise. Ein Roman ist ein Ganzes, seine Sätze und Gedanken sind über alle Kapitel verflochten. Die Deklaration gilt dem Werk; wo Teile sich unterscheiden, sagt es die Narration.

**10. Kein Modellname in der Notation** (C, F). Wer Werkzeuge vergleicht, braucht den Namen. Modelle veralten aber schneller als Bücher, und ein Produktname auf der Titelseite wirbt nebenbei. Vor allem ist das Substrat Medium und nicht Akteur: die Notation zählt, was aus ihm kam. Wer das Werkzeug nennen will, tut es in der Narration.

**11. Keine Farbe, die wertet** (C, E). Farben machen ein Zeichen auf einen Blick erkennbar. Grün, Gelb und Rot liest aber jede als Ampel, und eine Ampel urteilt. Eine Stufenleiter aus der Bildung hat ihre Ampel aus diesem Grund durch neutrale Farben ersetzt. Das Siegel ist schwarz-weiß, eine typografische Notation wie ein Feingehaltsstempel: es bezeugt eine Zusammensetzung und keinen Wert.

**12. Keine Pflichterfüllung als Zweck** (C, G). Anbieter und Plattformen brauchen Rechtssicherheit, und dafür sind Kennzeichnungspflichten und Plattformfelder gebaut. Maschinenschrift dokumentiert und vertritt keine Rechtsposition; wer es benutzt, erfüllt damit keine Pflicht. Eine Auskunft, die nur an die Plattform geht, erreicht außerdem die Leserin nicht.

**13. Keine Mitautorschaft für das Modell** (H). Ein Modell auf dem Umschlag ist die weitestgehende Offenheit, die es gibt, und eine künstlerische Position. Eine Verfasserzeile ist aber eine Anschrift: sie sagt, wer für das Werk einsteht. Maschinenschrift gibt es, weil die Verfasserzeile für diese Auskunft das falsche Instrument ist.

Mit den Nachbarn teilt Maschinenschrift mehr, als es weglässt: die Selbstauskunft statt der Messung, ein öffentliches Verzeichnis, die Verantwortung beim Menschen, die Abstufung statt des Ja oder Nein, die offene Nutzung ohne Lizenzverhandlung und den Verzicht auf den Detektor als Grundlage. Was übrig bleibt, ist eine Kombination und kein Alleinstellungsmerkmal: eine Selbstauskunft am Werk, sichtbar auf dem Buch, für Leserinnen, auf zwei getrennten Achsen für Oberfläche und Bau, mit einer eigenen Zeile für die Faktenprüfung, mit einem Nullpunkt, der die Etiketten einschließt, ohne Prüfinstanz, Gebühr oder Infrastruktur, gebaut für Literatur.

## Der Probefall

*La Scuola dei Silenzi* ist der erste Eintrag im Verzeichnis und das Buch des Gründers, erschienen unter dem Namen I.O. Vargas. Deklariert ist es mit **W 5 · G 3 · ausstehend**: die Sätze weitgehend aus dem Modell; Ausgangsgedanke, Figuren, Regeln und alle Entscheidungen vom Autor; die Recherche über das Modell strukturiert und nicht gegengeprüft. Dasselbe Buch, durch die Bauformen des Feldes geführt, Stand 28. Oktober 2026, jede Zeile nach der Definition, die das jeweilige System selbst veröffentlicht:

| Bauform | Was sie über dieses Buch sagen kann |
|---|---|
| Detektor (A) | Er liest die Oberfläche, und die ist **weitgehend maschinell**. Über Ausgangsgedanke, Figuren und Entscheidungen **sagt er nichts**. |
| Prozessaufzeichnung (B) | **Nichts.** Das Schreiben wurde nicht aufgezeichnet, und nachträglich lässt es sich nicht aufzeichnen. |
| Etiketten (D) | **Keine Angabe.** Die Etiketten lassen maschinell erzeugten Text höchstens in geringem Umfang zu; **das Buch muss schweigen**. |
| Plattformabfrage von KDP (E, G) | ***KI-generiert***: Text, den ein Werkzeug erzeugt hat, gilt dort als generiert, auch nach umfangreicher Bearbeitung. Es ist **dieselbe Angabe wie für einen Text, an dem niemand etwas entschieden hat**, und sie geht an die Plattform. |
| Drei Flaggen von FAIA (C, E) | **Jede Flagge trifft nur eine Hälfte.** *KI-unterstützt* passt zum Bau, den der Autor verantwortet, *KI-generiert* zu den Sätzen, die überwiegend aus dem Modell kommen. Wer eine Flagge wählt, **verschweigt die andere Hälfte**. |
| Prozess-Taxonomien (F) | **Ausdrückbar, als Liste von Arbeitsschritten.** Wessen Sätze und wessen Gedanken vorliegen, **muss die Leserin daraus erschließen**. |
| Maschinenschrift | **W 5 · G 3 · ausstehend**, dazu acht Sätze Narration in den Worten des Autors, im [Katalog](/de/werke/la-scuola-dei-silenzi/). |

## Was gebaut und verworfen wurde

Maschinenschrift ist selbst mit einem Sprachmodell entstanden. Der größte Teil der Sätze dieser Site kam aus dem Substrat, wie bei dem Roman, mit dem das Projekt begann. Die Entstehungsgeschichte zeigt deshalb nicht, dass ohne Modell gearbeitet wurde. Sie zeigt die Entscheidungen, also das, was die Achse *Geist* meint: welcher Vorschlag gilt und welcher fällt.

Mehrere Bauformen aus dem Feld hat das Projekt selbst gebaut oder beschlossen und wieder aufgegeben.

| 2026 | Entscheidung | Grund |
|---|---|---|
| 21. Mai | Eine **Zertifizierungsmarke** nach dem Vorbild von Gütesiegeln wird verworfen, ebenso ein fertig gebautes und getestetes **Register mit Prüfinstanz**: Anmeldeformular, Bestätigungsmail, Redaktionsfreigabe, laufende Nummern, Verschlüsselung, Jahresprüfung. An ihre Stelle tritt ein offener Standard mit Verzeichnis. | Ein Standard, der um Erlaubnis bitten lässt, wird nicht angenommen. Ein Medium braucht keine Aufsichtsbehörde, es braucht eine Sprache. |
| 24. Mai | Maschinenschrift wird **Registerführer, nicht Prüfstelle**: jede Angabe ist eine Aussage der Autorin. | Das Projekt kann die Werte nicht prüfen, also bescheinigt es sie nicht. |
| 24. Mai | Ein **Genese-Register** wird beschlossen und am selben Tag zurückgenommen: Anmeldetag, Prüfsummen von Zwischenständen, ein wöchentlicher Zeitanker. | Es bleibt zu überlisten, es zwingt Autorinnen in Bestätigungsmails, und jede solche Mail ist eine Vorlage für Phishing. |
| 3. Juni | Ein **Verlagsname** unter dem Namen des Standards wird aufgegeben. | Wer den Standard betreibt, gibt unter diesem Namen keine Bücher heraus, die nach ihm deklarieren. |
| Mai bis August | Die **Achsen** werden dreimal umbenannt, bis ihre Namen sagen, was die Zahlen messen: Wortlaut, Geist, Beleg. Die Werte bleiben dabei, wie sie waren. | Ein Name, der etwas anderes verspricht, als die Zahl misst, wird ersetzt. |
| 2. August | Das erste Buch wird **neu bewertet**, von W 4 · G 2 auf W 5 · G 3. | Die fertige Fassung war stärker vermittelt als die erste Erklärung. Die Deklaration folgt dem Werk. |
| 11. August | **Keine Stichproben.** | Eine Stichprobe ohne Prüfmittel wäre eine leere Geste oder Detektion durch die Hintertür. |
| 24. August | Die Achse **Beleg** fragt seitdem, ob die Faktenaussagen gegen Quellen außerhalb des Modells geprüft wurden. | Die Faktenschicht ist die, die ein Modell am sichersten füllt und am wenigsten verlässlich. |
| 29. September | Das Modell bekommt **keine Mitwirkendenzeile**, auf keiner Plattform. | Eine Verfasserzeile sagt, wer für das Werk einsteht, und ein Modell kann nicht einstehen. |

Das Naheliegende ist in diesem Feld die Infrastruktur: ein Register, eine Prüfung, eine Leiter mit drei Stufen. Maschinenschrift hat das Naheliegende mehrfach gebaut. Was es von den Nachbarn unterscheidet, steht dort, wo dagegen entschieden wurde, und jede dieser Entscheidungen ist datiert.

**Diese Seite deklariert sich selbst**, als einzige der Kernseiten: **W 5 · G 3 · belegt**. Die Sätze kamen überwiegend aus dem Substrat. Ein erheblicher Teil der Ordnung kam als Vorschlag von dort; welcher Vorschlag galt, welcher Name fiel und was die Seite nicht behauptet, entschied der Gründer. Jede Aussage über einen Nachbarn ist an dessen eigenen Veröffentlichungen geprüft, Stand 28. Oktober 2026. Das Siegel steht am Ende der Seite.

## Der Einwand

Wer eine Form bereitstellt, macht das Geformte sichtbarer. Eine saubere Notation für vermittelte Literatur normalisiert vermittelte Literatur, auch ohne dass jemand für sie wirbt. Aus der Sicht der Etiketten, die eine Haltung erklären, wiegt dieser Einwand schwer, und er wird hier nicht ausgeräumt.

Das Projekt nimmt ihn in Kauf, weil die Alternative nicht die Abwesenheit der Vermittlung ist. Die Alternative ist ihre Unsichtbarkeit. Verglichen wird nicht ein Zeichen mit nichts, sondern **Auskunft mit Verschweigen**. Die Größe der unausgewiesenen Masse ist inzwischen vermessen: [Die Flut und ihr Bett](/de/notizen/2026-08-die-flut-und-ihr-bett/).

Wie das Siegel gelesen wird, steht im [Einstieg](/de/einstieg/); zusammenstellen lässt es sich im [Siegel-Generator](/de/siegel/), und die Bedeutung der Achsen regelt die [Foundation](/de/foundation/).
