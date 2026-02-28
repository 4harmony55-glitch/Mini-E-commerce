/**
 * Product catalog and utilities for the mini store
 * Design: Minimalist E-Commerce - Clean, professional, warm terracotta accents
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Sample product catalog
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Coffee Beans",
    price: 12.99,
    category: "Beverages",
    description: "Freshly roasted single-origin arabica beans",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=500&h=500&fit=crop",
  },
  {
    id: "2",
    name: "Artisan Chocolate",
    price: 8.50,
    category: "Sweets",
    description: "Handcrafted dark chocolate with sea salt",
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd33c4f?w=500&h=500&fit=crop",
  },
  {
    id: "3",
    name: "Organic Tea Set",
    price: 24.99,
    category: "Beverages",
    description: "Assorted organic herbal tea collection",
    image: "https://images.unsplash.com/photo-1597318972826-3e4a1b5e5c5b?w=500&h=500&fit=crop",
  },
  {
    id: "4",
    name: "Honey Jar",
    price: 15.99,
    category: "Condiments",
    description: "Raw, unfiltered wildflower honey",
    image: "https://images.unsplash.com/photo-1587049633312-d628fb40c321?w=500&h=500&fit=crop",
  },
  {
    id: "5",
    name: "Spice Collection",
    price: 19.99,
    category: "Spices",
    description: "Premium spices from around the world",
    image: "https://images.unsplash.com/photo-1596040707263-e5c43f4b1e5d?w=500&h=500&fit=crop",
  },
  {
    id: "6",
    name: "Olive Oil",
    price: 18.50,
    category: "Oils",
    description: "Extra virgin cold-pressed olive oil",
    image: "https://images.unsplash.com/photo-1474619827506-67a64c8f0def?w=500&h=500&fit=crop"
  },
];

export const CATEGORIES = Array.from(new Set(PRODUCTS.map((p) => p.category)));

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Generate WhatsApp message for order
 * Format: Product name x quantity, price
 */
export function generateWhatsAppMessage(items: CartItem[], total: number): string {
  const itemsList = items
    .map((item) => `${item.product.name} x${item.quantity} - ${formatPrice(item.product.price * item.quantity)}`)
    .join("\n");

  return `Hi! I'd like to place an order:\n\n${itemsList}\n\nTotal: ${formatPrice(total)}\n\nPlease confirm availability and delivery details.`;
}

/**
 * Generate email subject and body for order
 */
export function generateEmailContent(
  items: CartItem[],
  total: number,
  customerEmail: string
) {
  const itemsList = items
    .map((item) => `- ${item.product.name} x${item.quantity}: ${formatPrice(item.product.price * item.quantity)}`)
    .join("\n");

  const subject = "New Order from Mini Store";
  const body = `
Customer Email: ${customerEmail}

Order Details:
${itemsList}

Total: ${formatPrice(total)}

Please confirm this order and provide delivery information.
  `.trim();

  return { subject, body };
}
