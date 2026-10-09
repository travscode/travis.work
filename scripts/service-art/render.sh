#!/bin/zsh
# Renders the "Series of Ten" service prints into public/assets/media/services.
# Usage: scripts/service-art/render.sh            (all ten)
#        scripts/service-art/render.sh brand seo  (just these)
# Needs Google Chrome and ffmpeg.
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$DIR/../.."
TMP="$(mktemp -d)"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# inline the site's PP Object Sans so the canvas can use it from file://
python3 - "$DIR/template.html" "$TMP/art.html" "$ROOT/app/fonts" <<'PY'
import base64, sys
t = open(sys.argv[1]).read()
f = sys.argv[3]
t = t.replace("__HEAVY__", base64.b64encode(open(f + "/PPObjectSans-Heavy.otf", "rb").read()).decode())
t = t.replace("__REG__", base64.b64encode(open(f + "/PPObjectSans-Regular.otf", "rb").read()).decode())
open(sys.argv[2], "w").write(t)
PY

typeset -A FILES
FILES=(web-design web-design-perth brand branding-perth seo seo-perth geo geo-ai-search-perth
  app-design app-design-perth app-development app-development-perth ai-development ai-development-perth
  ui-ux ui-ux-design-perth graphic-design graphic-design-perth wordpress wordpress-developer-perth)

names=("$@"); [ ${#names} -eq 0 ] && names=(${(k)FILES})
for n in $names; do
  png="$TMP/$n.png"
  "$CH" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1600,1600 \
    --virtual-time-budget=60000 --user-data-dir="$TMP/prof-$n" --screenshot="$png" "file://$TMP/art.html?n=$n" >/dev/null 2>&1 &
  pid=$!
  # headless Chrome doesn't always exit after a screenshot, so wait for the file then stop it
  for i in $(seq 1 240); do [ -s "$png" ] && sleep 1 && break; sleep 0.5; done
  kill $pid 2>/dev/null || true
  ffmpeg -loglevel error -y -i "$png" -vf scale=1200:1200:flags=lanczos -q:v 5 \
    "$ROOT/public/assets/media/services/${FILES[$n]}-travis-weerts.jpg"
  echo "✓ $n"
done
rm -rf "$TMP"
