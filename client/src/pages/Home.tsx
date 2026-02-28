/**
 * Home Page - Mini Store
 * Design: Minimalist E-Commerce - Clean, professional, warm terracotta accents
 */

import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { CartSidebar } from "@/components/CartSidebar";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  const displayedProducts = selectedCategory
    ? PRODUCTS.filter((p) => p.category === selectedCategory)
    : PRODUCTS;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-warm rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "Playfair Display" }}>
                M
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "Playfair Display" }}>
              Mini Store
            </h1>
          </div>

          {/* Cart Button */}
          <Button
            onClick={() => setCartOpen(true)}
            className="relative bg-accent-warm hover:bg-[#C85A3A] text-white gap-2"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-80 overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663379409142/DQQ4G4wteNitZPdtCV6cCZ/hero-banner-bM7bzdJqRy8NMXWxiGxcrb.webp"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
          <div className="container">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display" }}>
              Premium Products
            </h2>
            <p className="text-lg text-white/90 max-w-md">
              Carefully curated selection of the finest goods, delivered to your door.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Shop by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? "default" : "outline"}
              className={selectedCategory === null ? "bg-accent-warm hover:bg-[#C85A3A] text-white" : ""}
            >
              All Products
            </Button>
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-accent-warm hover:bg-[#C85A3A] text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {displayedProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              No products found in this category.
            </p>
            <Button
              onClick={() => setSelectedCategory(null)}
              className="bg-accent-warm hover:bg-[#C85A3A] text-white"
            >
              View All Products
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border mt-16">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h4 className="font-semibold text-foreground mb-3" style={{ fontFamily: "Playfair Display" }}>
                About Mini Store
              </h4>
              <p className="text-sm text-muted-foreground">
                We offer premium, carefully selected products with fast and reliable delivery.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-3" style={{ fontFamily: "Playfair Display" }}>
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Shop</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground mb-3" style={{ fontFamily: "Playfair Display" }}>
                Contact
              </h4>
              <p className="text-sm text-muted-foreground">
                Email: info@ministore.com<br />
                WhatsApp: +1 (555) 123-4567
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Mini Store. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}
