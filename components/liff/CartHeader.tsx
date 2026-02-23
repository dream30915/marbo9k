"use client";

import Link from "next/link";
import { useCart } from "@/lib/context/cart-context";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CartHeader() {
  const { totalItems } = useCart();

  return (
    <Link href="/liff/cart" className="relative group">
      <div className="p-2.5 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-sm border border-white/20">
        <ShoppingBag className="w-5 h-5 text-foreground/80 group-hover:text-primary transition-colors" />
      </div>
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 min-w-[20px] h-[20px] rounded-full bg-gradient-to-tr from-primary to-accent text-white text-[10px] font-bold flex items-center justify-center px-1.5 shadow-lg border border-white/20"
          >
            {totalItems > 99 ? "99+" : totalItems}
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}
