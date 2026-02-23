"use client";

import Link from "next/link";
import { useCart } from "@/lib/context/cart-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, ShoppingBag, Plus, Minus, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <main className="p-6 pb-32 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 shadow-inner">
          <ShoppingBag className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-extrabold mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8 text-sm">Looks like you haven't added anything yet.</p>
        <Button asChild className="rounded-full px-8 h-12 bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30 text-white font-bold hover:scale-105 transition-transform">
          <Link href="/liff">Start Shopping</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="p-5 pb-40">
      <div className="flex items-center justify-between mb-8">
        <Link href="/liff" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-105 transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <h1 className="text-2xl font-black text-gradient">My Cart</h1>
        <div className="w-10 h-10" /> {/* Spacer */}
      </div>

      <ul className="space-y-4">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.li
              key={item.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-[2rem] p-4 flex gap-4 items-center relative overflow-hidden group"
            >
              {/* Decorative background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="w-24 h-24 rounded-[1.5rem] bg-gradient-to-br from-muted to-muted/50 shrink-0 overflow-hidden relative shadow-sm">
                {item.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 py-1 flex flex-col justify-between h-24 relative z-10">
                <div className="flex justify-between items-start gap-2">
                  <p className="font-bold text-base truncate leading-tight">{item.name}</p>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-2 -mr-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-lg font-black text-primary">฿{Number(item.price).toLocaleString()}</p>

                <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 w-fit rounded-full p-1">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-7 h-7 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white shadow-sm hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Floating Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background via-background/95 to-transparent pb-8 z-40">
        <div className="max-w-md mx-auto glass-card rounded-[2.5rem] p-5 shadow-2xl border border-white/20">
          <div className="flex items-end justify-between mb-4 px-2">
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total</span>
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground line-through opacity-50 mb-0.5">฿{(totalAmount * 1.1).toLocaleString()}</span>
              <span className="text-2xl font-black text-gradient leading-none">
                ฿{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
          <Button asChild className="w-full h-14 rounded-full font-bold text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg shadow-primary/25 transition-all flex justify-between px-6">
            <Link href="/liff/checkout">
              <span>Checkout</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
