#!/bin/bash
#
# Chatr Website — Local Development
#
# Starts the marketing website on https://localhost:3003
#
# Usage:  ./dev.sh

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "🌀 Starting Chatr Website..."
echo ""

# Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
  echo ""
fi

cleanup() {
  echo ""
  echo "🛝 Stopping website..."
  lsof -ti:3003 2>/dev/null | xargs kill -9 2>/dev/null || true
  echo "✅ Website stopped."
  exit 0
}
trap cleanup INT TERM

npm run dev &
WEBSITE_PID=$!

echo ""
echo "✓ Website started"
echo "  Website:  https://localhost:3003"
echo ""
echo "Press Ctrl+C to stop"
echo ""

wait $WEBSITE_PID
