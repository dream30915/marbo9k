"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context/cart-context";
import { useState } from "react";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface AddToCartButtonProps {
  productId: string;
  name: string;
  price: number;
  image_url: string | null;
  stock: number;
}

export function AddToCartButton({
  productId,
  name,
  price,
  image_url,
  stock,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (stock <= 0) {
      toast.error("ขออภัย สินค้าหมดแล้ว!");
      return;
    }

    addItem({ productId, name, price, image_url, quantity: 1 });
    toast.success(
      <div className="flex flex-col">
        <span className="font-bold text-sm">เพิ่มลงตะกร้าแล้ว</span>
        <span className="text-xs opacity-90">{name}</span>
      </div>,
      {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      }
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Button
      className="w-full h-13 rounded-full font-bold text-base shadow-xl shadow-primary/20 transition-all overflow-hidden relative"
      onClick={handleAdd}
      disabled={stock <= 0}
      variant={stock <= 0 ? "secondary" : "default"}
      style={stock > 0 && !added ? {
        background: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))"
      } : {}}
    >
      <AnimatePresence mode="wait">
        {stock <= 0 ? (
          <motion.span key="out" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
            สินค้าหมด
          </motion.span>
        ) : added ? (
          <motion.div key="added" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> เพิ่มแล้ว!
          </motion.div>
        ) : (
          <motion.div key="add" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-2 text-white">
            <ShoppingCart className="w-5 h-5" /> เพิ่มลงตะกร้า
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
