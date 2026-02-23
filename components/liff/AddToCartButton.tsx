"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/context/cart-context";
import { useState } from "react";

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
    if (stock <= 0) return;
    addItem({ productId, name, price, image_url, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Button
      className="mt-6 w-full rounded-xl h-12 font-semibold bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
      size="lg"
      onClick={handleAdd}
      disabled={stock <= 0}
    >
      {stock <= 0
        ? "หมดสต็อก"
        : added
          ? "✓ เพิ่มแล้ว"
          : "เพิ่มลงตะกร้า"}
    </Button>
  );
}
