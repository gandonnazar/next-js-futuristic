# Deploying to Vercel via GitHub

This guide will help you deploy your Next.js application to Vercel using GitHub.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Git installed on your computer

## Step-by-Step Deployment

### 1. Initialize Git Repository (if not already done)

```bash
cd c:\Users\Heyselcuk\next-js-futuristic\next-js-futuristic
git init
```

### 2. Create .gitignore (already created)

Make sure the following are in your `.gitignore`:
```
node_modules/
.next/
out/
.env*.local
```

### 3. Add and Commit Your Files

```bash
git add .
git commit -m "Initial Next.js conversion - Step 1 complete"
```

### 4. Create GitHub Repository

1. Go to https://github.com
2. Click the `+` icon in the top right
3. Select "New repository"
4. Name it: `next-js-futuristic` (or your preferred name)
5. Keep it **Public** or **Private** (your choice)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 5. Push to GitHub

GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/next-js-futuristic.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 6. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Sign in (use "Continue with GitHub" for easier integration)
3. Click "Add New..." → "Project"
4. Click "Import" next to your GitHub repository
5. Vercel will automatically detect Next.js settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
6. Click "Deploy"
7. Wait 2-3 minutes for deployment to complete
8. Your site will be live at: `https://your-project-name.vercel.app`

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Post-Deployment

### Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables (If needed later)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. Add any needed variables (API keys, etc.)

## Automatic Deployments

After initial setup, Vercel will automatically deploy when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Updated home page"
git push

# Vercel automatically deploys your changes!
```

## Vercel Configuration (Optional)

Create `vercel.json` in your project root for custom configuration:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Make sure `npm run build` works locally first
- Ensure all dependencies are in `package.json`

### 404 Errors
- Verify your pages are in `src/app/` directory
- Check file naming (must be `page.tsx` or `page.js`)

### Styling Issues
- Ensure CSS files are properly imported
- Check that assets are in the `public/` folder

## Next Steps

Once deployed, you can:
- View deployment logs
- Set up preview deployments for branches
- Configure analytics
- Add custom domains
- Set up continuous deployment

## Your Deployment URLs

After deployment, you'll get:
- **Production:** `https://next-js-futuristic.vercel.app` (or your custom domain)
- **Preview:** Automatic preview URLs for each commit

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- GitHub Help: https://docs.github.com
