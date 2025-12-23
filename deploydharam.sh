#!/usr/bin/env bash
set -e

NOW=$(date "+%Y-%m-%d %H:%M IST")

echo "📦 Stashing local changes (if any)..."
git stash push -u -m "autostash before deploy $NOW" || true

echo "🔄 Pulling latest changes (rebase)..."
git pull --rebase origin main

echo "📤 Re-applying stashed changes..."
git stash pop || true

echo "📦 Staging all changes..."
git add .

if git diff --cached --quiet; then
  echo "⚠️  No changes to commit. Exiting."
  exit 0
fi

read -p "📝 Short description (optional): " note

if [ -z "$note" ]; then
  msg="Website update — $NOW"
else
  msg="$note — $NOW"
fi

git commit -m "$msg"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Deployed successfully at $NOW"

