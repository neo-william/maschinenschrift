# maschinenschrift-site — Build- und Dev-Pipeline.
#
# Verwendung:
#   make dev      Pipeline vorbereiten + Hugo-Dev-Server starten
#   make build    Statischer Production-Build nach public/
#   make assets   Nur Siegel-Assets generieren (SVGs + PNGs)
#   make svgs     Nur SVGs (Windows-kompatibel ohne rsvg-convert)
#   make pngs     Nur PNGs (braucht librsvg2-bin)
#   make content  Werke-Content-Stubs aus works/*.yaml erzeugen
#   make verify   Golden-File-Test gegen scripts/siegel.py
#   make clean    Hugo-Output und generierte Assets entfernen
#   make help     Liste aller Targets
#
# Voraussetzungen:
#   - Hugo Extended (>= 0.158): winget install Hugo.Hugo.Extended
#   - Python 3.9+
#   - librsvg2-bin (Linux/Mac) fuer PNG-Generation; auf Windows entfaellt das

HUGO ?= hugo
PYTHON ?= python
ASSET_DIR := static/siegel/assets

.PHONY: help dev build assets svgs pngs content verify clean

help:
	@echo "Targets: dev | build | assets | svgs | pngs | content | verify | clean"

dev: content svgs
	$(HUGO) server --bind 127.0.0.1 --port 1313

build: content assets
	$(HUGO) --minify

assets: svgs pngs

svgs:
	$(PYTHON) scripts/build-assets.py $(ASSET_DIR)

pngs:
	bash scripts/build-pngs.sh $(ASSET_DIR)

content:
	$(PYTHON) scripts/build-content.py

verify:
	$(PYTHON) scripts/build-assets.py /tmp/maschinenschrift-verify
	@echo "(Golden-File-Test laeuft in siegel-generator/tests/verify.py)"

clean:
	rm -rf public/
	rm -f $(ASSET_DIR)/*.svg $(ASSET_DIR)/*.png
	rm -f content/werke/*.md
