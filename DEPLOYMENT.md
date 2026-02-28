# Deployment Guide - Mini Store on Vercel

This guide walks you through deploying your Mini Store to Vercel with custom domain support.

## Prerequisites

- GitHub account with your repository pushed
- Vercel account (free at [vercel.com](https://vercel.com))
- Your WhatsApp number configured
- Formspree account for email (optional)

## Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Mini Store"

# Add remote repository
git remote add origin https://github.com/yourusername/mini-store.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Method 1: Using Vercel Dashboard (Easiest)

1. Visit [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Select your `mini-store` repository
4. Vercel will auto-detect:
   - Framework: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`
5. Click "Deploy"
6. Wait for deployment to complete (usually 2-3 minutes)

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project directory
cd /path/to/mini-store
vercel

# Follow the prompts:
# - Link to existing project? (No for first deployment)
# - Set project name? (mini-store)
# - Which scope? (Your account)
# - Link to Git repository? (Yes)
```

## Step 3: Configure Environment Variables

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `VITE_ANALYTICS_ENDPOINT` | Your analytics URL | Optional, leave empty if not using |
| `VITE_ANALYTICS_WEBSITE_ID` | Your website ID | Optional, leave empty if not using |

4. Click "Save"
5. Redeploy: Click "Deployments" → Select latest → Click "Redeploy"

## Step 4: Configure WhatsApp

1. Open `client/src/components/CartSidebar.tsx`
2. Find this line:
   ```typescript
   const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
   ```
3. Replace `1234567890` with your WhatsApp number (country code + number, no + or spaces)
4. Commit and push:
   ```bash
   git add client/src/components/CartSidebar.tsx
   git commit -m "Update WhatsApp number"
   git push
   ```
5. Vercel will auto-deploy

## Step 5: Configure Email (Optional)

1. Visit [formspree.io](https://formspree.io) and create an account
2. Create a new form and copy the form ID
3. Open `client/src/components/CartSidebar.tsx`
4. Find this line:
   ```typescript
   const response = await fetch("https://formspree.io/f/xyzabc123", {
   ```
5. Replace `xyzabc123` with your Formspree form ID
6. Commit and push:
   ```bash
   git add client/src/components/CartSidebar.tsx
   git commit -m "Update Formspree form ID"
   git push
   ```

## Step 6: Custom Domain (Optional)

### Using a Vercel Domain

1. Go to Vercel project → "Settings" → "Domains"
2. Click "Add Domain"
3. Enter your desired domain (e.g., `mystore.vercel.app`)
4. Click "Add"

### Using Your Own Domain

1. Purchase a domain from any registrar (GoDaddy, Namecheap, etc.)
2. Go to Vercel project → "Settings" → "Domains"
3. Click "Add Domain"
4. Enter your custom domain
5. Vercel will show DNS records to add
6. Go to your domain registrar's DNS settings
7. Add the DNS records provided by Vercel
8. Wait 24-48 hours for DNS propagation

## Verification

After deployment:

1. Visit your Vercel URL (e.g., `https://mini-store-abc123.vercel.app`)
2. Test the store:
   - Browse products
   - Add items to cart
   - Click "Order via WhatsApp" (should open WhatsApp)
   - Try "Order via Email" (should send email)
3. Check console for any errors (F12 → Console)

## Continuous Deployment

Once connected to GitHub, Vercel automatically deploys when you:

- Push to `main` branch → Production deployment
- Create pull request → Preview deployment
- Merge pull request → Production deployment

## Rollback

If something breaks:

1. Go to Vercel project → "Deployments"
2. Find the previous working deployment
3. Click the three dots → "Promote to Production"

## Monitoring

### View Logs

1. Go to Vercel project → "Deployments"
2. Click the deployment
3. Scroll down to see build logs and runtime logs

### Performance

1. Go to Vercel project → "Analytics"
2. Monitor Core Web Vitals, traffic, and errors

## Troubleshooting

### Deployment Failed

1. Check build logs in Vercel dashboard
2. Common issues:
   - Missing dependencies: Run `pnpm install` locally
   - TypeScript errors: Run `pnpm check` locally
   - Environment variables: Verify in Vercel settings

### Site Shows 404

1. Verify `vercel.json` rewrites are correct
2. Check that `dist/` folder is generated
3. Redeploy: Go to "Deployments" → "Redeploy"

### Images Not Loading

1. Verify image URLs are accessible from the internet
2. Check CORS headers on image server
3. Use CDN-hosted images (Unsplash, Pexels, etc.)

### WhatsApp Not Opening

1. Verify phone number format (no +, no spaces)
2. Test locally first: `https://wa.me/YOUR_NUMBER`
3. Ensure WhatsApp Web is accessible in your region

## Performance Optimization

### Image Optimization

1. Use WebP format when possible
2. Compress images before uploading
3. Use responsive images with `srcset`

### Bundle Size

```bash
# Check bundle size
pnpm build

# Analyze what's in the bundle
npm install -g source-map-explorer
source-map-explorer 'dist/**/*.js'
```

### Caching

Vercel automatically caches:
- Static assets (images, CSS, JS)
- API responses (if applicable)

## Security

1. Never commit `.env` files
2. Use Vercel environment variables for secrets
3. Keep dependencies updated: `pnpm update`
4. Enable HTTPS (automatic with Vercel)

## Next Steps

1. Add more products to `client/src/lib/products.ts`
2. Customize colors in `client/src/index.css`
3. Update store information in `client/src/pages/Home.tsx`
4. Monitor analytics in Vercel dashboard
5. Collect customer feedback and iterate

## Support

- Vercel Docs: https://vercel.com/docs
- Formspree Support: https://formspree.io/help
- WhatsApp API: https://www.whatsapp.com/business/api

---

**Your store is now live!** 🚀
