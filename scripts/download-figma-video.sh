#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: $0 <figma-signed-video-url> [output-file]" >&2
  exit 1
fi

input_url="$1"
output_file="${2:-figma-video.mp4}"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_cmd python3
require_cmd curl
require_cmd ffmpeg

candidates=()
while IFS= read -r line; do
  candidates+=("$line")
done < <(
  python3 - "$input_url" <<'PY'
import sys
from urllib.parse import parse_qsl, urlencode, urlparse, urlunparse

raw = sys.argv[1]
parsed = urlparse(raw)
query = urlencode(parse_qsl(parsed.query, keep_blank_values=True))
path = parsed.path

seen = set()

def emit(url: str) -> None:
    if url not in seen:
        seen.add(url)
        print(url)

def with_path(new_path: str) -> str:
    return urlunparse((parsed.scheme, parsed.netloc, new_path, "", query, ""))

if path.endswith(".ts"):
    emit(with_path(path.rsplit("/", 1)[0] + ".m3u8"))
    emit(with_path(path.replace("_1_00001.ts", ".m3u8")))
    emit(with_path(path.replace("_00001.ts", ".m3u8")))
    emit(with_path(path.replace("_1_00001.ts", "_1.m3u8")))
    emit(with_path(path.replace("_00001.ts", "_video.m3u8")))
    emit(with_path(path.replace("_00001.ts", "_audio.m3u8")))
    emit(with_path(path.replace("_1_00001.ts", ".mp4")))
    emit(with_path(path.replace("_00001.ts", ".mp4")))
    emit(with_path(path.replace("_00001.ts", "_source.mp4")))
    emit(with_path(path.replace("_00001.ts", "_original.mp4")))
    emit(raw)
else:
    emit(raw)
PY
)

probe_url=""
for candidate in "${candidates[@]}"; do
  status="$(curl -L -s -o /dev/null -w '%{http_code}' "$candidate" || true)"
  if [[ "$status" == "200" ]]; then
    probe_url="$candidate"
    break
  fi
done

if [[ -z "$probe_url" ]]; then
  probe_url="$input_url"
fi

echo "Using: $probe_url"

if [[ "$probe_url" == *.m3u8* ]]; then
  ffmpeg -y -i "$probe_url" -c copy "$output_file"
elif [[ "$probe_url" == *.ts* ]]; then
  tmp_ts="${output_file%.*}.ts"
  curl -L --fail -o "$tmp_ts" "$probe_url"
  ffmpeg -y -i "$tmp_ts" -c copy "$output_file"
else
  curl -L --fail -o "$output_file" "$probe_url"
fi

echo "Saved: $output_file"
