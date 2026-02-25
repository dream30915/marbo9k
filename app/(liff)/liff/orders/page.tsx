"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import liff from "@line/liff";
import { PackageOpen, Loader2, Clock, CheckCircle2, Truck, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        if (!res.ok) throw new Error();
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending": return { color: "text-amber-500", bg: "bg-amber-500/10", icon: Clock, label: "รอดำเนินการ" };
      case "confirmed": return { color: "text-blue-500", bg: "bg-blue-500/10", icon: CheckCircle2, label: "ยืนยันแล้ว" };
      case "shipped": return { color: "text-indigo-500", bg: "bg-indigo-500/10", icon: Truck, label: "กำลังจัดส่ง" };
      case "delivered": return { color: "text-emerald-500", bg: "bg-emerald-500/10", icon: PackageOpen, label: "จัดส่งแล้ว" };
      case "cancelled": return { color: "text-destructive", bg: "bg-destructive/10", icon: XCircle, label: "ยกเลิก" };
      default: return { color: "text-muted-foreground", bg: "bg-muted", icon: Clock, label: status };
    }
  };

  return (
    <main className="p-5 pb-8 min-h-screen">
      <div className="mb-6 mt-2">
        <h1 className="text-xl font-extrabold">คำสั่งซื้อของฉัน</h1>
        <p className="text-muted-foreground text-sm mt-0.5">ติดตามสถานะคำสั่งซื้อทั้งหมด</p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="font-bold text-sm text-muted-foreground">กำลังโหลด...</p>
        </div>
      )}

      {!loading && orders.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-10 text-center mt-8 border border-dashed border-muted-foreground/15"
        >
          <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-5">
            <PackageOpen className="w-8 h-8 text-primary opacity-50" />
          </div>
          <h2 className="text-lg font-bold mb-1">ยังไม่มีคำสั่งซื้อ</h2>
          <p className="text-muted-foreground text-sm mb-5">เริ่มช้อปสินค้ากันเลย!</p>
          <Link href="/liff" className="inline-block font-bold text-primary bg-primary/10 px-6 py-2.5 rounded-full text-sm hover:bg-primary/15 transition-colors">
            ไปหน้าร้าน
          </Link>
        </motion.div>
      )}

      {!loading && orders.length > 0 && (
        <ul className="space-y-4">
          <AnimatePresence>
            {orders.map((order, index) => {
              const status = getStatusConfig(order.status);
              const StatusIcon = status.icon;

              return (
                <motion.li
                  key={order.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="glass-card rounded-2xl p-4 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <div>
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1.5 ${status.bg} ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </div>
                      <p className="font-mono text-[10px] text-muted-foreground/60 tracking-widest">#{order.id.slice(0, 8)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-lg text-foreground leading-none">
                        ฿{Number(order.total_amount).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {new Date(order.created_at).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-3 relative z-10">
                    <ul className="space-y-1.5 text-sm">
                      {order.items.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex justify-between items-center">
                          <span className="truncate pr-3 text-foreground/80 text-xs">{item.products?.name || "สินค้า"}</span>
                          <span className="shrink-0 text-[10px] font-bold text-muted-foreground px-2 py-0.5 rounded-md bg-muted/50">x{item.quantity}</span>
                        </li>
                      ))}
                      {order.items.length > 3 && (
                        <li className="text-[10px] text-primary pt-1.5 border-t border-muted/50 font-bold">
                          +{order.items.length - 3} รายการอื่นๆ
                        </li>
                      )}
                    </ul>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </main>
  );
}
