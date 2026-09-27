#!/usr/bin/env bash
#
# Point git at the tracked hooks directory in this repo.
#
# core.hooksPath means the hook file itself lives in the repo and is version
# controlled — unlike .git/hooks, which git ignores. Run this once per clone.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
git config core.hooksPath scripts/hooks
echo "core.hooksPath -> scripts/hooks"
echo "checks installed:"
ls -1 scripts/hooks/checks/ 2>/dev/null | sed 's/^/  /' || echo "  (none)"
