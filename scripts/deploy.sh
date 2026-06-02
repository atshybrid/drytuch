#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Building..."
npm run build

echo "Pushing to GitHub..."
git add -A
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "${1:-Update DRYTUCH frontend}"
fi

git push origin main

echo "Done. Vercel will auto-deploy from main branch."
