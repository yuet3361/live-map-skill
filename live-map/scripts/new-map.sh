#!/usr/bin/env bash
# Usage: new-map.sh <project-folder> [--no-open]
# Copies the map into <project-folder>/docs/live-map (never overwrites),
# serves it on a free local port, and opens the browser.
set -euo pipefail
HERE="$(cd "$(dirname "$0")/.." && pwd)"
[[ $# -ge 1 ]] || { echo "Usage: new-map.sh <project-folder> [--no-open]"; exit 1; }
mkdir -p "$1"
PROJ="$(cd "$1" && pwd)"
DEST="$PROJ/docs/live-map"
if [[ -e "$DEST" ]]; then
  echo "Using existing $DEST (not overwritten)"
else
  mkdir -p "$PROJ/docs"
  cp -R "$HERE/template" "$DEST"
fi
LOG="$DEST/.serve.log"
nohup python3 "$DEST/serve.py" > "$LOG" 2>&1 &
PID=$!
URL=""
for _ in $(seq 1 25); do URL="$(head -1 "$LOG" 2>/dev/null || true)"; [[ "$URL" == http* ]] && break; sleep 0.2; done
[[ "$URL" == http* ]] || { echo "Server did not start. See $LOG"; exit 1; }
echo "Map:  $URL"
echo "Edit: $DEST/data.js (the page reloads on save)"
echo "Stop: kill $PID"
if [[ "${2:-}" != "--no-open" ]]; then
  if command -v open >/dev/null; then open "$URL"
  elif command -v xdg-open >/dev/null; then xdg-open "$URL" >/dev/null 2>&1
  fi
fi
