# NeonLights AI - Next.js Application

A futuristic AI-powered image and video generation platform built with Next.js 14.

## 🚀 Features

- ✨ Modern Next.js 14 with App Router
- 🎨 Stunning animated starfield background
- 💎 Glass morphism and holographic UI effects
- 📱 Fully responsive design
- ⚡ Fast and optimized performance
- 🎭 TypeScript support

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** CSS Modules + Global CSS
- **Deployment:** Vercel-ready

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Development

The development server runs on [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
next-js-futuristic/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout with Navbar & Starfield
│   │   ├── page.tsx      # Home page
│   │   └── page.module.css
│   ├── components/       # React components
│   │   ├── Navbar.tsx
│   │   └── Starfield.tsx
│   ├── styles/          # Global styles and CSS modules
│   │   ├── globals.css
│   │   └── navbar.module.css
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
│   └── assets/         # Images and media
└── old_html/           # Original HTML files (backup)
```

## 🚀 Deployment to Vercel

### Option 1: Deploy via GitHub

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial Next.js conversion"
git push origin main
```

2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📝 Next Steps

This is **Step 1** of the conversion - the foundation is now complete with:
- ✅ Next.js 14 setup with TypeScript
- ✅ Project structure organized
- ✅ Global styles migrated
- ✅ Navbar component created
- ✅ Starfield background animation
- ✅ Home page converted

### Remaining Pages to Convert:
- Image Generation page
- Video Generation page
- Upscale page
- Gallery page
- Pricing page
- Profile page

## 🎨 Styling

The application uses:
- CSS Variables for theming
- CSS Modules for component-scoped styles
- Global CSS for shared styles and animations
- Google Fonts: Orbitron, Audiowide, Rajdhani

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

Contact the repository owner for contribution guidelines.
