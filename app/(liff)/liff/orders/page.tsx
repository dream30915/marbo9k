"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import liff from "@line/liff";
import { ArrowLeft, PackageOpen, Loader2, Clock, CheckCircle2, Truck, XCircle } from "lucide-react";
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
      case "pending": return { color: "text-amber-500", bg: "bg-amber-500/10", icon: Clock, label: "Pending" };
      case "confirmed": return { color: "text-blue-500", bg: "bg-blue-500/10", icon: CheckCircle2, label: "Confirmed" };
      case "shipped": return { color: "text-indigo-500", bg: "bg-indigo-500/10", icon: Truck, label: "Shipped" };
      case "delivered": return { color: "text-emerald-500", bg: "bg-emerald-500/10", icon: PackageOpen, label: "Delivered" };
      case "cancelled": return { color: "text-destructive", bg: "bg-destructive/10", icon: XCircle, label: "Cancelled" };
      default: return { color: "text-muted-foreground", bg: "bg-muted", icon: Clock, label: status };
    }
  };

  return (
    <main className="p-5 pb-32 min-h-screen">
      <div className="flex items-center mb-8 gap-4">
        <Link href="/liff" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-105 transition-transform shrink-0">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <h1 className="text-2xl font-black text-gradient">My Orders</h1>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 opacity-50">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="font-bold text-sm uppercase tracking-wider">Loading Orders</p>
        </div>
      )}

      {!loading && orders.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-[3rem] p-12 text-center mt-10 border border-dashed border-primary/30"
        >
          <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6">
            <PackageOpen className="w-10 h-10 text-primary opacity-50" />
          </div>
          <h2 className="text-xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-muted-foreground text-sm mb-6">You haven't made any purchases.</p>
          <Link href="/liff" className="inline-block font-bold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-6 py-3 rounded-full text-sm">
            Start Shopping
          </Link>
        </motion.div>
      )}

      {!loading && orders.length > 0 && (
        <ul className="space-y-5">
          <AnimatePresence>
            {orders.map((order, index) => {
              const status = getStatusConfig(order.status);
              const StatusIcon = status.icon;
              
              return (
                <motion.li 
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-[2rem] p-5 relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 rounded-full blur-[40px] opacity-20 ${status.bg.replace('/10', '')}`} />
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${status.bg} ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </div>
                      <p className="font-mono text-xs text-muted-foreground opacity-70 uppercase tracking-widest">#{order.id.slice(0, 8)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-xl text-foreground leading-none">
                        ฿{Number(order.total_amount).toLocaleString()}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                        {new Date(order.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-4 relative z-10 border border-black/5 dark:border-white/5">
                    <ul className="space-y-2 text-sm font-medium">
                      {order.items.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex justify-between items-center">
                          <span className="truncate pr-4 opacity-90">{item.products?.name || "Product"}</span>
                          <span className="shrink-0 text-xs px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 opacity-70">x{item.quantity}</span>
                        </li>
                      ))}
                      {order.items.length > 2 && (
                        <li className="text-xs text-primary pt-2 border-t border-black/5 dark:border-white/10 font-bold">
                          +{order.items.length - 2} more items
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
