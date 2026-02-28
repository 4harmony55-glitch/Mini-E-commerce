/**
 * ProductCard Component
 * Design: Minimalist E-Commerce - Clean card with subtle hover effects
 */

import { Product, formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart!`);
    setQuantity(1);
  };

  return (
    <div className="product-card overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 bg-secondary overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-3">
        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-accent-warm uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-foreground line-clamp-2" style={{ fontFamily: "Playfair Display" }}>
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="text-xl font-bold text-foreground">
          {formatPrice(product.price)}
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex gap-2 items-center">
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              +
            </button>
          </div>
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-accent-warm hover:bg-[#C85A3A] text-white gap-2"
          >
            <ShoppingCart size={16} />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
