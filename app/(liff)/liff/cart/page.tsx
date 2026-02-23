"use client";

import Link from "next/link";
import { useCart } from "@/lib/context/cart-context";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <main className="p-4 pb-12">
        <Link href="/liff" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors -ml-1">
          ← กลับหน้าร้าน
        </Link>
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground text-sm">ตะกร้าว่าง</p>
          <Button asChild className="mt-4">
            <Link href="/liff">ไปเลือกสินค้า</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 pb-24">
      <Link href="/liff" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors -ml-1">
        ← กลับหน้าร้าน
      </Link>
      <h2 className="mt-5 text-lg font-bold">ตะกร้าสินค้า</h2>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex gap-4 rounded-xl border bg-card p-4"
          >
            {item.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image_url}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover shrink-0"
              />
            ) : (
              <div className="h-20 w-20 rounded-lg bg-muted shrink-0 flex items-center justify-center text-xs text-muted-foreground">
                ไม่มีรูป
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.name}</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold">฿{Number(item.price).toLocaleString()}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg border bg-background hover:bg-muted text-sm font-medium"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg border bg-background hover:bg-muted text-sm font-medium"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="ml-2 text-xs text-destructive hover:underline"
                >
                  ลบ
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto p-4 border-t bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between mb-3">
          <span className="text-muted-foreground">รวม</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            ฿{totalAmount.toLocaleString()}
          </span>
        </div>
        <Button asChild className="w-full rounded-xl h-12 font-semibold">
          <Link href="/liff/checkout">ดำเนินการชำระเงิน</Link>
        </Button>
      </div>
    </main>
  );
}
