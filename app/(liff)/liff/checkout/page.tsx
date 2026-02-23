"use client";

import { useState } from "react";
import Link from "next/link";
import liff from "@line/liff";
import { useCart } from "@/lib/context/cart-context";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);
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
      if (!res.ok) throw new Error(data.error || "เกิดข้อผิดพลาด");
      setOrderId(data.order_id);
      clearCart();
    } catch (e) {
      setError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderId) {
    return (
      <main className="p-4 pb-12">
        <Link href="/liff" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          ← กลับหน้าร้าน
        </Link>
        <div className="mt-12 text-center text-muted-foreground">ตะกร้าว่าง</div>
      </main>
    );
  }

  if (orderId) {
    return (
      <main className="p-4 pb-12">
        <div className="rounded-2xl border bg-card p-8 text-center">
          <p className="text-4xl mb-4">✓</p>
          <h2 className="text-xl font-bold">สั่งซื้อสำเร็จ</h2>
          <p className="mt-2 text-muted-foreground text-sm">เลขที่ออเดอร์: {orderId.slice(0, 8)}...</p>
          <Button asChild className="mt-6">
            <Link href="/liff">กลับหน้าร้าน</Link>
          </Button>
          <Button asChild variant="outline" className="mt-3 ml-2">
            <Link href="/liff/orders">ดูออเดอร์ของฉัน</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 pb-12">
      <Link href="/liff/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        ← กลับตะกร้า
      </Link>
      <h2 className="mt-5 text-lg font-bold">ยืนยันคำสั่งซื้อ</h2>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i.productId} className="flex justify-between text-sm">
            <span>{i.name} x {i.quantity}</span>
            <span>฿{(i.price * i.quantity).toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between text-lg font-bold">
        <span>รวม</span>
        <span className="text-emerald-600 dark:text-emerald-400">฿{totalAmount.toLocaleString()}</span>
      </div>
      {error && (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      )}
      <Button
        className="mt-6 w-full rounded-xl h-12 font-semibold"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "กำลังดำเนินการ..." : "ยืนยันสั่งซื้อ"}
      </Button>
    </main>
  );
}
