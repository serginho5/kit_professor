#!/bin/bash
# Uso: ./render.sh build-guia.js nome  → preview/nome.html, preview/nome.pdf e relatório de estouro de texto
set -e
cd "$(dirname "$0")"
mkdir -p preview
PREVIEW=1 node "$1" "preview/$2.html" >/dev/null
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
URL="file:///$(cygpath -m "$PWD/preview/$2.html")"
OUT="$(cygpath -w "$PWD/preview/$2.pdf")"
"$EDGE" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 --dump-dom "$URL" 2>/dev/null \
  | grep -A300 'id="report">OVERFLOW' | sed '/END_REPORT/q' | sed 's/.*id="report">//'
"$EDGE" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 --print-to-pdf="$OUT" "$URL" 2>/dev/null
ls -la "preview/$2.pdf" | awk '{print $5, $9}'
