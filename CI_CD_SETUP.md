# CI/CD Pipeline Setup for CareerPad

This guide will help you set up a complete CI/CD pipeline for your CareerPad project using GitHub Actions and Firebase.

## 🚀 Overview

The CI/CD pipeline will automatically:
- Run tests and linting on every push
- Build the application
- Deploy to Firebase Hosting and Functions
- Only deploy from the main/master branch

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be in a GitHub repository
2. **Firebase Project**: You need a Firebase project set up
3. **Firebase CLI**: Installed locally for initial setup

## 🔧 Setup Steps

### 1. Initialize Firebase (if not done already)

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting
firebase init functions
```

### 2. Generate Firebase Service Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate new private key**
5. Save the JSON file securely

### 3. Generate Firebase Token

```bash
# Login to Firebase
firebase login:ci

# This will give you a token to use in GitHub Secrets
```

### 4. Set up GitHub Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

#### Required Secrets:

- **`FIREBASE_SERVICE_ACCOUNT`**: The entire JSON content from the service account file
- **`FIREBASE_TOKEN`**: The token generated from `firebase login:ci`

#### Optional Secrets:

- **`FIREBASE_PROJECT_ID`**: Your Firebase project ID (if different from careerpad-09)

### 5. Update Project Configuration

The following files have been created/updated:

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `firebase.json` - Updated with hosting configuration

## 🔄 How It Works

### Workflow Triggers:
- **Push to main/master**: Full deployment
- **Pull Request**: Test and build only (no deployment)

### Pipeline Steps:

1. **Test Job**:
   - Checkout code
   - Setup Node.js 18
   - Install dependencies
   - Run linting
   - Build application
   - Verify build output

2. **Deploy Job** (only on main/master):
   - Deploy to Firebase Hosting
   - Deploy Firebase Functions

## 🛠️ Manual Deployment

If you need to deploy manually:

```bash
# Deploy everything
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions
```

## 🔍 Troubleshooting

### Common Issues:

1. **Build fails**: Check if all dependencies are in package.json
2. **Deployment fails**: Verify Firebase secrets are correct
3. **Functions deployment fails**: Check if functions/package.json exists

### Debug Commands:

```bash
# Test build locally
npm run build

# Test Firebase deployment locally
firebase deploy --dry-run

# Check Firebase project
firebase projects:list
```

## 📊 Monitoring

- **GitHub Actions**: View workflow runs in the Actions tab
- **Firebase Console**: Monitor deployments in the Hosting and Functions sections
- **Firebase CLI**: Use `firebase hosting:channel:list` to see deployment channels

## 🔒 Security Notes

- Never commit Firebase service account keys to your repository
- Use GitHub Secrets for all sensitive information
- Regularly rotate Firebase tokens
- Monitor deployment logs for any security issues

## 🚀 Next Steps

After setup:

1. Push your code to the main branch
2. Check the Actions tab in GitHub
3. Verify deployment in Firebase Console
4. Test your application at your Firebase hosting URL

## 📝 Environment Variables

If you need to add environment variables for your application:

1. Add them to GitHub Secrets
2. Update the workflow to pass them to the build process
3. Use them in your application via `import.meta.env.VITE_*`

## 🔄 Branch Strategy

- **main/master**: Production deployments
- **develop**: Development and testing
- **feature branches**: Individual features

The pipeline will only deploy from main/master to ensure production stability. 