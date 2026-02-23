"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import liff from "@line/liff";

interface OrderWithItems {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  items: Array<{
    quantity: number;
    unit_price: number;
    products: { name: string } | null;
  }>;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        let lineUserId: string | null = null;
        if (typeof window !== "undefined" && liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          lineUserId = profile.userId;
        }
        const params = new URLSearchParams();
        if (lineUserId) params.set("line_user_id", lineUserId);
        const res = await fetch(`/api/orders?${params}`);
        if (!res.ok) throw new Error("โหลดออเดอร์ไม่สำเร็จ");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "เกิดข้อผิดพลาด");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const statusLabel: Record<string, string> = {
    pending: "รอดำเนินการ",
    confirmed: "ยืนยันแล้ว",
    shipped: "จัดส่งแล้ว",
    delivered: "ได้รับแล้ว",
    cancelled: "ยกเลิก",
  };

  return (
    <main className="p-4 pb-12">
      <Link href="/liff" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        ← กลับหน้าร้าน
      </Link>
      <h2 className="mt-5 text-lg font-bold">ออเดอร์ของฉัน</h2>

      {loading && (
        <p className="mt-6 text-center text-muted-foreground text-sm">กำลังโหลด...</p>
      )}
      {error && (
        <p className="mt-6 text-center text-destructive text-sm">{error}</p>
      )}
      {!loading && !error && orders.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground text-sm">ยังไม่มีออเดอร์</p>
          <Link href="/liff" className="inline-block mt-4 text-sm font-medium text-primary hover:underline">
            ไปเลือกสินค้า
          </Link>
        </div>
      )}
      {!loading && !error && orders.length > 0 && (
        <ul className="mt-4 space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="rounded-xl border bg-card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{order.id.slice(0, 8)}...</p>
                  <p className="text-sm mt-1">{statusLabel[order.status] || order.status}</p>
                </div>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">
                  ฿{Number(order.total_amount).toLocaleString()}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(order.created_at).toLocaleDateString("th-TH")}
              </p>
              {order.items?.length > 0 && (
                <ul className="mt-2 text-sm text-muted-foreground">
                  {order.items.slice(0, 3).map((item, i) => (
                    <li key={i}>
                      {item.products?.name || "สินค้า"} x {item.quantity}
                    </li>
                  ))}
                  {order.items.length > 3 && (
                    <li>และอีก {order.items.length - 3} รายการ</li>
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
