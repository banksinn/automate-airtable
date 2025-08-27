#!/bin/bash

# Script to clean and reinstall Playwright
echo "🧹 Cleaning Playwright installation..."

# Remove playwright folder if it exists
if [ -d "playwright" ]; then
    echo "📁 Removing existing playwright folder..."
    rm -rf playwright
    echo "✅ Playwright folder removed"
else
    echo "ℹ️  No playwright folder found"
fi

echo ""
echo "🔄 Installing Playwright..."
pnpm exec playwright install

echo ""
echo "✨ Playwright installation complete!"
echo ""
echo "You can now run your tests with:"
echo "  pnpm test"
echo "  pnpm run test:debug"
echo "  pnpm run test:report"
