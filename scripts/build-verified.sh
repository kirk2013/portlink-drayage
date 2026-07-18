#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec bash "${script_dir}/sites-env.sh" -- bash "$0" "$@"
fi

command -v timeout >/dev/null || {
  echo "build-verified.sh requires GNU timeout." >&2
  exit 69
}

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
if [[ ! -x "${vinext}" ]]; then
  echo "vinext is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
  exit 69
fi

echo "Running bounded vinext build..."
timeout \
  --signal=TERM \
  --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
  "${SITES_BUILD_TIMEOUT:-3m}" \
  "${vinext}" build

# Vinext can emit duplicate compatibility flags when Wrangler merges the
# generated deployment config. Cloudflare rejects duplicate flags with 10021.
node --input-type=module - "${SITES_PROJECT_ROOT}/dist/server/wrangler.json" <<'NODE'
import { readFile, writeFile } from "node:fs/promises";

const configPath = process.argv[2];
const config = JSON.parse(await readFile(configPath, "utf8"));
if (Array.isArray(config.compatibility_flags)) {
  config.compatibility_flags = [...new Set(config.compatibility_flags)];
}
await writeFile(configPath, JSON.stringify(config, null, 2) + "\n");
NODE

bash "${script_dir}/validate-artifact.sh"
