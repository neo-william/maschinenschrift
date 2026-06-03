#!/usr/bin/env bash
# Rastert alle SVGs in einem Ziel-Verzeichnis zu PNGs in 512/1024/2048 px Breite.
#
# Setzt rsvg-convert voraus (Ubuntu: apt-get install librsvg2-bin).
# Auf Cloudflare-Pages-CI per Build-Command vorgeschaltet:
#   apt-get update && apt-get install -y librsvg2-bin && bash src/build-pngs.sh static/siegel/assets
#
# Verwendung:
#   bash build-pngs.sh <asset_dir>
#
# Argument: Verzeichnis mit *.svg-Dateien. PNG-Output landet im selben Verzeichnis.

set -euo pipefail

ASSET_DIR="${1:-../output}"
SIZES=(512 1024 2048)

if ! command -v rsvg-convert >/dev/null 2>&1; then
  echo "Error: rsvg-convert not found. Install via: apt-get install librsvg2-bin" >&2
  exit 1
fi

if [[ ! -d "$ASSET_DIR" ]]; then
  echo "Error: directory $ASSET_DIR does not exist" >&2
  exit 1
fi

count=0
for svg in "$ASSET_DIR"/*.svg; do
  [[ -f "$svg" ]] || continue
  base="$(basename "$svg" .svg)"
  for size in "${SIZES[@]}"; do
    out="$ASSET_DIR/${base}-${size}.png"
    rsvg-convert -w "$size" "$svg" -o "$out"
    count=$((count + 1))
  done
done

echo "$count PNG files written to $ASSET_DIR"
