#!/bin/bash

# CI/CD Setup Script for CareerPad
# This script helps set up the CI/CD pipeline

echo "🚀 Setting up CI/CD pipeline for CareerPad..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
else
    echo "✅ Firebase CLI is already installed"
fi

# Check if user is logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Please login to Firebase..."
    firebase login
else
    echo "✅ Already logged in to Firebase"
fi

# Check if firebase.json exists
if [ ! -f "firebase.json" ]; then
    echo "❌ firebase.json not found. Please run 'firebase init' first"
    exit 1
fi

# Check if .github/workflows directory exists
if [ ! -d ".github/workflows" ]; then
    echo "📁 Creating .github/workflows directory..."
    mkdir -p .github/workflows
fi

# Check if deploy.yml exists
if [ ! -f ".github/workflows/deploy.yml" ]; then
    echo "❌ GitHub Actions workflow not found"
    echo "Please ensure .github/workflows/deploy.yml exists"
    exit 1
fi

echo "✅ CI/CD setup check completed!"
echo ""
echo "📋 Next steps:"
echo "1. Generate Firebase service account key from Firebase Console"
echo "2. Run 'firebase login:ci' to get deployment token"
echo "3. Add secrets to GitHub repository:"
echo "   - FIREBASE_SERVICE_ACCOUNT"
echo "   - FIREBASE_TOKEN"
echo "4. Push your code to GitHub"
echo "5. Check the Actions tab for deployment status"
echo ""
echo "📖 For detailed instructions, see CI_CD_SETUP.md" 