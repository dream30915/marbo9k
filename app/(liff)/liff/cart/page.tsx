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
      <main className="p-6 pb-32 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
          <ShoppingBag className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-xl font-extrabold mb-2">ตะกร้าว่างเปล่า</h2>
        <p className="text-muted-foreground mb-6 text-sm">ยังไม่มีสินค้าในตะกร้าของคุณ</p>
        <Button asChild className="rounded-full px-8 h-12 bg-gradient-to-r from-primary to-accent text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20">
          <Link href="/liff">เลือกซื้อสินค้า</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="p-5 pb-40">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold">ตะกร้าสินค้า</h1>
        <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">
          {items.length} รายการ
        </span>
      </div>

      <ul className="space-y-3">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.li
              key={item.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.08 }}
              className="glass-card rounded-2xl p-3 flex gap-3 items-center relative overflow-hidden group"
            >
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-muted to-muted/50 shrink-0 overflow-hidden shadow-sm">
                {item.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 py-0.5 flex flex-col justify-between h-20 relative z-10">
                <div className="flex justify-between items-start gap-2">
                  <p className="font-bold text-sm truncate leading-tight">{item.name}</p>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-1.5 -mr-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-base font-extrabold text-primary">฿{Number(item.price).toLocaleString()}</p>

                <div className="flex items-center gap-1 bg-muted/50 w-fit rounded-full p-0.5">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-6 h-6 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-7 text-center text-xs font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-sm hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Floating Checkout Bar — NO FAKE DISCOUNT */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent z-40">
        <div className="max-w-md mx-auto glass-card rounded-2xl p-4 premium-shadow">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-sm font-bold text-muted-foreground">ยอดรวม</span>
            <span className="text-2xl font-black text-gradient leading-none">
              ฿{totalAmount.toLocaleString()}
            </span>
          </div>
          <Button asChild className="w-full h-12 rounded-full font-bold text-base bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-lg shadow-primary/20 transition-all flex justify-between px-5">
            <Link href="/liff/checkout">
              <span>สั่งซื้อเลย</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
