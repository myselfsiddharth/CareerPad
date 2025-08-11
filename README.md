# 🚀 CareerPad

[![CI/CD Status](https://github.com/YOUR_GITHUB_USERNAME/CareerPad/workflows/Status%20Check/badge.svg)](https://github.com/YOUR_GITHUB_USERNAME/CareerPad/actions)
[![Deploy Status](https://github.com/YOUR_GITHUB_USERNAME/CareerPad/workflows/Deploy%20to%20Firebase/badge.svg)](https://github.com/YOUR_GITHUB_USERNAME/CareerPad/actions)

> **⚠️ IMPORTANT**: Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username before pushing!

A modern career planning and development platform built with React, Firebase, and Tailwind CSS.

## ✨ Features

- **Career Path Visualization**: Interactive career trees and development paths
- **User Authentication**: Secure login and signup with Firebase Auth
- **Responsive Design**: Beautiful UI built with Tailwind CSS
- **Cloud Functions**: Backend logic powered by Firebase Functions
- **Real-time Updates**: Live data synchronization

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase Functions
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd CareerPad
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd functions && npm install && cd ..
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your Firebase configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run linting and build
- `npm run preview` - Preview production build

## 🚀 CI/CD Pipeline

This project includes a fully automated CI/CD pipeline using GitHub Actions and Firebase.

### How It Works

1. **Push to main/master** → Automatic testing and deployment
2. **Pull Request** → Testing and build verification only
3. **Deployment** → Automatic deployment to Firebase Hosting and Functions

### Setup Instructions

See [CI_CD_SETUP.md](./CI_CD_SETUP.md) for detailed setup instructions.

### Required GitHub Secrets

- `FIREBASE_SERVICE_ACCOUNT` - Firebase service account JSON
- `FIREBASE_TOKEN` - Firebase CI token

## 📁 Project Structure

```
CareerPad/
├── src/                    # React source code
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── assets/           # Static assets
│   └── firebase.js       # Firebase configuration
├── functions/             # Firebase Cloud Functions
├── public/                # Public assets
├── .github/workflows/     # CI/CD workflows
└── scripts/               # Setup and utility scripts
```

## 🔒 Environment Variables

Create a `.env.local` file based on `env.example`:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=careerpad-09
# ... other variables
```

## 🚀 Deployment

### Manual Deployment

```bash
# Deploy everything
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions
```

### Automatic Deployment

The CI/CD pipeline automatically deploys on every push to the main branch.

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run tests and build
npm run test

# Run in CI mode
npm run test:ci
```

## 📊 Monitoring

- **GitHub Actions**: View workflow runs in the Actions tab
- **Firebase Console**: Monitor deployments and functions
- **Application**: Visit your deployed app at the Firebase hosting URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [CI/CD setup guide](./CI_CD_SETUP.md)
2. Review the Firebase console for deployment status
3. Check GitHub Actions for build/deployment logs
4. Open an issue in the repository

---

**Built with ❤️ using modern web technologies**
