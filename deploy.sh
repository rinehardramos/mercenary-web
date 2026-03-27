#!/bin/bash
set -e

echo "🚀 Deploying Mercenary Web to Vercel..."

cd "$(dirname "$0")"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to production
echo "📦 Building and deploying..."
vercel --prod --yes

echo "✅ Deployment complete!"
echo "🌐 https://mercs.tech"
