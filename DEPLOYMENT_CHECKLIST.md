# 🚀 Deployment Checklist

Use this checklist before pushing to main/master to ensure smooth deployments.

## ✅ Pre-Deployment Checks

### Code Quality
- [ ] All tests pass locally (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors in browser
- [ ] All imports are correct

### Firebase Configuration
- [ ] Firebase project is set to correct project ID
- [ ] Service account has necessary permissions
- [ ] Functions dependencies are up to date
- [ ] Environment variables are configured

### GitHub Setup
- [ ] Repository secrets are configured:
  - [ ] `FIREBASE_SERVICE_ACCOUNT`
  - [ ] `FIREBASE_TOKEN`
- [ ] Branch protection rules are set (recommended)
- [ ] Required status checks are enabled

## 🚀 Deployment Process

### 1. Final Testing
```bash
# Run full test suite
npm run test:ci

# Test build locally
npm run build

# Preview build
npm run preview
```

### 2. Commit and Push
```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: [describe your changes]"

# Push to main/master
git push origin main
```

### 3. Monitor Deployment
- [ ] Check GitHub Actions tab
- [ ] Verify test job passes
- [ ] Verify deploy job starts
- [ ] Check Firebase console for deployment
- [ ] Test deployed application

## 🔍 Post-Deployment Verification

### Application Health
- [ ] Homepage loads correctly
- [ ] Authentication works
- [ ] Core features function
- [ ] No console errors
- [ ] Mobile responsiveness

### Firebase Services
- [ ] Hosting is updated
- [ ] Functions are deployed
- [ ] Database connections work
- [ ] Authentication flows work

## 🚨 Troubleshooting

### Common Issues

**Build Fails:**
- Check Node.js version (should be 18+)
- Verify all dependencies are installed
- Check for syntax errors in code

**Deployment Fails:**
- Verify Firebase secrets are correct
- Check Firebase project permissions
- Ensure project ID matches configuration

**Functions Deployment Fails:**
- Check functions/package.json
- Verify Node.js version in functions
- Check Firebase CLI version

### Rollback Plan
If deployment fails:
1. Check GitHub Actions logs
2. Identify the issue
3. Fix locally and test
4. Re-deploy or rollback to previous version

## 📊 Monitoring

### GitHub Actions
- View workflow runs in Actions tab
- Check build and deployment logs
- Monitor execution time and success rates

### Firebase Console
- Monitor function execution
- Check hosting deployment status
- Review error logs and analytics

### Application Monitoring
- Set up error tracking (e.g., Sentry)
- Monitor performance metrics
- Track user interactions

## 🔒 Security Checklist

- [ ] No sensitive data in code
- [ ] Environment variables are secure
- [ ] Firebase rules are properly configured
- [ ] Authentication flows are secure
- [ ] API endpoints are protected

---

**Remember**: Always test locally before deploying to production!
