/**
 * CartSidebar Component
 * Design: Minimalist E-Commerce - Elegant cart with WhatsApp and email order options
 */

import { useCart } from "@/contexts/CartContext";
import { calculateTotal, formatPrice, generateWhatsAppMessage, generateEmailContent } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Trash2, MessageCircle, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CartSidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, clearCart, itemCount } = useCart();
  const [customerEmail, setCustomerEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState(""); // User should set this
  const total = calculateTotal(items);

  const handleWhatsAppOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const message = generateWhatsAppMessage(items, total);
    // Replace with your WhatsApp number
    const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
    clearCart();
    setCustomerEmail("");
    toast.success("Order sent via WhatsApp!");
  };

  const handleEmailOrder = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!customerEmail) {
      toast.error("Please enter your email");
      return;
    }

    const { subject, body } = generateEmailContent(items, total, customerEmail);

    try {
      // Using FormSubmit.co as a free email service
      const response = await fetch("https://formspree.io/f/xyzabc123", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: customerEmail,
          subject,
          message: body,
        }),
      });

      if (response.ok) {
        toast.success("Order sent via email!");
        clearCart();
        setCustomerEmail("");
      } else {
        toast.error("Failed to send email. Please try WhatsApp.");
      }
    } catch (error) {
      toast.error("Error sending email. Please try WhatsApp.");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-96 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl" style={{ fontFamily: "Playfair Display" }}>
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 pb-4 border-b border-border"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm" style={{ fontFamily: "Playfair Display" }}>
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(item.product.price)} each
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-1 py-0.5 text-xs border border-border rounded hover:bg-secondary"
                      >
                        −
                      </button>
                      <span className="text-xs font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-1 py-0.5 text-xs border border-border rounded hover:bg-secondary"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        {items.length > 0 && <div className="divider-thin" />}

        {/* Order Section */}
        {items.length > 0 && (
          <div className="space-y-4 py-4">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-accent-warm">
                {formatPrice(total)}
              </span>
            </div>

            {/* Email Input */}
            <Input
              type="email"
              placeholder="Your email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="text-sm"
            />

            {/* Order Buttons */}
            <div className="space-y-2">
              <Button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                <MessageCircle size={16} />
                Order via WhatsApp
              </Button>
              <Button
                onClick={handleEmailOrder}
                variant="outline"
                className="w-full gap-2"
              >
                <Mail size={16} />
                Order via Email
              </Button>
            </div>

            {/* Clear Cart */}
            <Button
              onClick={clearCart}
              variant="ghost"
              className="w-full text-destructive hover:text-destructive"
            >
              Clear Cart
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
