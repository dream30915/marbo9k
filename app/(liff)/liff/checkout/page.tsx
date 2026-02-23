"use client";

import { useState } from "react";
import Link from "next/link";
import liff from "@line/liff";
import { useCart } from "@/lib/context/cart-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Loader2, Receipt, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (items.length === 0) return;
    setLoading(true);
    
    try {
      let lineUserId: string | null = null;
      if (typeof window !== "undefined" && liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        lineUserId = profile.userId;
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          line_user_id: lineUserId ?? null,
          items: items.map((i) => ({
            product_id: i.productId,
            quantity: i.quantity,
            unit_price: i.price,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      
      setOrderId(data.order_id);
      clearCart();
      toast.success("Order placed successfully!", {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderId) {
    return (
      <main className="p-6 pb-32 min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-extrabold mb-2">Cart is Empty</h2>
        <Button asChild className="rounded-full mt-4">
          <Link href="/liff">Return to Shop</Link>
        </Button>
      </main>
    );
  }

  if (orderId) {
    return (
      <main className="p-6 pb-32 min-h-screen flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card w-full rounded-[3rem] p-10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-emerald-600" />
          
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          
          <h2 className="text-3xl font-black mb-2 text-gradient from-emerald-500 to-teal-500">Success!</h2>
          <p className="text-muted-foreground text-sm mb-6">Your order has been confirmed.</p>
          
          <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-4 mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Order ID</p>
            <p className="font-mono text-lg font-bold">#{orderId.slice(0, 8)}</p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full h-14 rounded-full font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white shadow-lg shadow-emerald-500/25">
              <Link href="/liff">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-14 rounded-full font-bold border-2 hover:bg-muted">
              <Link href="/liff/orders">View My Orders</Link>
            </Button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="p-5 pb-40">
      <div className="flex items-center mb-8 gap-4">
        <Link href="/liff/cart" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-105 transition-transform shrink-0">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <h1 className="text-2xl font-black text-gradient">Checkout</h1>
      </div>

      <div className="glass-card rounded-[2.5rem] p-6 mb-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Receipt className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-bold">Order Summary</h2>
        </div>

        <ul className="space-y-4">
          {items.map((i) => (
            <li key={i.productId} className="flex justify-between items-center text-sm group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 font-bold text-xs text-primary">
                  {i.quantity}x
                </div>
                <span className="font-semibold truncate">{i.name}</span>
              </div>
              <span className="font-bold shrink-0 pl-4">฿{(i.price * i.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-4 border-t border-dashed border-border flex justify-between items-end">
          <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Amount</span>
          <span className="text-3xl font-black text-gradient leading-none">
            ฿{totalAmount.toLocaleString()}
          </span>
        </div>
      </div>

      <Button
        className="fixed bottom-8 left-5 right-5 w-[calc(100%-40px)] mx-auto h-14 rounded-full font-bold text-lg bg-gradient-to-r from-primary to-accent text-white shadow-xl shadow-primary/25 transition-all flex items-center justify-center gap-2 z-40"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <span>Confirm Order</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </Button>
    </main>
  );
}
