#!/usr/bin/env bash

echo "🚀 Dharam's Website Updater"
echo "=========================="

# Go to the website directory
cd "$(dirname "$0")"

# Add all changes
echo "📝 Adding your changes..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
  echo "✅ No changes to update. Your site is already up to date!"
  exit 0
fi

# Commit with a simple message
echo "💾 Saving your changes..."
git commit -m "Website update - $(date '+%Y-%m-%d %H:%M')"

# Push to GitHub (this makes it live!)
echo "🌐 Making your site live..."
git push origin main

echo ""
echo "✅ SUCCESS! Your website is now live!"
echo "🔗 Visit: https://dharamsambey90.github.io/"
echo ""
echo "Changes may take 1-2 minutes to appear."
