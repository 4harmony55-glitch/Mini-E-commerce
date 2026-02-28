# Mini Store - Online Shop

A minimalist, modern e-commerce store built with React, TypeScript, and Tailwind CSS. Perfect for selling premium products with easy WhatsApp and email ordering.

## Features

- **Product Catalog**: Display products with images, descriptions, and prices
- **Shopping Cart**: Add/remove items, adjust quantities
- **WhatsApp Integration**: One-click order via WhatsApp with pre-filled message
- **Email Orders**: Send orders via email (free using Formspree)
- **Category Filtering**: Browse products by category
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Minimalist Aesthetic**: Clean, professional design with warm terracotta accents

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Routing**: Wouter
- **Build Tool**: Vite
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mini-store.git
cd mini-store

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

## Configuration

### WhatsApp Integration

To enable WhatsApp ordering, update your WhatsApp number in `client/src/components/CartSidebar.tsx`:

```typescript
const whatsappLink = `https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(message)}`;
```

Replace `YOUR_PHONE_NUMBER` with your WhatsApp number (include country code, e.g., `1234567890` for +1 234-567-8900).

### Email Integration

The store uses Formspree for free email notifications. To set up:

1. Visit [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Update the email endpoint in `client/src/components/CartSidebar.tsx`:

```typescript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  // ...
});
```

### Product Catalog

Edit `client/src/lib/products.ts` to add, remove, or modify products:

```typescript
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Product Name",
    price: 19.99,
    category: "Category",
    description: "Product description",
    image: "https://image-url.com/image.jpg",
  },
  // Add more products...
];
```

## Building for Production

```bash
# Build the project
pnpm build

# Preview production build locally
pnpm preview
```

## Deployment on Vercel

### Option 1: Deploy from GitHub (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click "Deploy"

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Add these to your Vercel project settings (Settings → Environment Variables):

- `VITE_ANALYTICS_ENDPOINT`: Your analytics endpoint
- `VITE_ANALYTICS_WEBSITE_ID`: Your analytics website ID

## Project Structure

```
mini-store/
├── client/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React contexts (Cart)
│   │   ├── lib/             # Utilities (products, helpers)
│   │   ├── pages/           # Page components
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # React entry point
│   │   └── index.css        # Global styles
│   └── index.html           # HTML template
├── server/                  # Express server (static deployment)
├── vercel.json              # Vercel configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## Design Philosophy

This store follows a **Modern Minimalist E-Commerce** design:

- **Color Scheme**: Off-white backgrounds (#F8F7F5) with warm terracotta accents (#D97757)
- **Typography**: Playfair Display for headlines (elegant), Inter for body text (readable)
- **Spacing**: Generous whitespace for a premium feel
- **Interactions**: Smooth transitions and subtle hover effects

## Customization

### Change Store Name and Logo

Edit `client/src/pages/Home.tsx` header section:

```typescript
<h1 className="text-xl font-bold text-foreground">
  Your Store Name
</h1>
```

### Modify Colors

Update the CSS variables in `client/src/index.css`:

```css
:root {
  --primary: #D97757;        /* Main accent color */
  --background: #F8F7F5;     /* Background color */
  --foreground: #1A1A1A;     /* Text color */
  /* ... other colors ... */
}
```

### Add More Categories

Simply add products with new categories in `client/src/lib/products.ts`. Categories are auto-generated from the product list.

## Troubleshooting

### Images not loading

Make sure image URLs are accessible and CORS-enabled. Use Unsplash, Pexels, or similar free image services.

### WhatsApp not opening

Verify your phone number format includes the country code without `+` or spaces (e.g., `1234567890`).

### Email not sending

1. Check your Formspree form ID is correct
2. Verify the form is active on formspree.io
3. Check browser console for errors

## Performance Tips

- Use optimized images (WebP format when possible)
- Lazy load product images
- Minimize bundle size by removing unused dependencies
- Enable caching headers in Vercel

## Security

- Never commit `.env` files with real secrets
- Use Vercel's environment variables for sensitive data
- Validate user input on the frontend
- Consider adding rate limiting for email/WhatsApp endpoints

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub or contact the maintainer.

---

**Happy selling!** 🎉
