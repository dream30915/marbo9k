import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, ShoppingCart, TrendingUp, Plus, ExternalLink, MapPin } from "lucide-react";

export default async function AdminPage() {
  let products: any[] = [];
  let orders: any[] = [];
  let error: string | null = null;

  try {
    const supabase = await createClient();
    const [pRes, oRes] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*, order_items(count)").order("created_at", { ascending: false }).limit(10)
    ]);
    products = pRes.data || [];
    orders = oRes.data || [];
  } catch (e) {
    error = "เชื่อมต่อฐานข้อมูลไม่ได้";
  }

  return (
    <div className="space-y-8 p-2">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="glass-card p-6 rounded-[2rem]">
          <TrendingUp className="w-6 h-6 text-primary mb-2" />
          <p className="text-xs font-bold opacity-60 uppercase">สินค้าทั้งหมด</p>
          <p className="text-3xl font-black text-gradient">{products.length}</p>
        </div>
        <div className="glass-card p-6 rounded-[2rem]">
          <ShoppingCart className="w-6 h-6 text-secondary mb-2" />
          <p className="text-xs font-bold opacity-60 uppercase">ออเดอร์ใหม่</p>
          <p className="text-3xl font-black text-gradient">{orders.filter(o => o.status === 'pending').length}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-gradient flex items-center gap-2">
          <Package className="w-6 h-6" /> สต็อกสินค้า
        </h2>
        <Button asChild className="rounded-full bg-primary text-white font-bold">
          <Link href="/admin/products/new"><Plus className="w-4 h-4 mr-1" /> เพิ่มสินค้า</Link>
        </Button>
      </div>

      {/* Product List */}
      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p.id} className="glass-card p-5 rounded-[2rem] flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                {p.stock}
              </div>
              <div>
                <p className="font-bold text-base">{p.name}</p>
                <p className="text-xs opacity-60">฿{Number(p.price).toLocaleString()} · {p.is_active ? 'เปิดขายอยู่' : 'ปิดอยู่'}</p>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${p.stock < 10 ? 'bg-destructive animate-pulse' : 'bg-emerald-500'}`} />
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-gradient flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" /> ออเดอร์ล่าสุด
        </h2>
        <div className="grid gap-4">
          {orders.map((o) => (
            <div key={o.id} className="glass-card p-6 rounded-[2.5rem] relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase">#{o.id.slice(0,8)}</p>
                  <p className="font-bold text-lg">{o.customer_name || 'ลูกค้าทั่วไป'}</p>
                  <p className="text-xs text-primary font-bold">{o.customer_phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-gradient">฿{Number(o.total_amount).toLocaleString()}</p>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase">{o.status}</span>
                </div>
              </div>
              
              <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl text-xs space-y-2">
                <p className="flex items-start gap-2 opacity-80">
                  <MapPin className="w-3 h-3 mt-0.5 shrink-0" /> {o.shipping_address}
                </p>
                {o.customer_lat && (
                  <a 
                    href={`https://www.google.com/maps?q=${o.customer_lat},${o.customer_lng}`} 
                    target="_blank"
                    className="flex items-center gap-1 text-primary font-bold hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" /> ดูตำแหน่งบน Google Maps
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
