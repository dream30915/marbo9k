import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Plus,
  ExternalLink,
  MapPin,
  Users,
  ChevronRight,
  MoreVertical,
  Clock,
  CheckCircle2,
  Eye,
  ImageIcon
} from "lucide-react";

export default async function AdminPage() {
  let products: any[] = [];
  let orders: any[] = [];
  let error: string | null = null;

  try {
    const supabase = await createClient();
    const [pRes, oRes] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(10)
    ]);
    products = pRes.data || [];
    orders = oRes.data || [];
    if (pRes.error || oRes.error) error = "เกิดข้อผิดพลาดในการดึงข้อมูล";
  } catch (e) {
    error = "การเชื่อมต่อฐานข้อมูลล้มเหลว";
  }

  const activeProducts = products.filter(p => p.is_active).length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total_amount), 0);

  return (
    <div className="space-y-10">
      {error && (
        <Card className="border-destructive/50 bg-destructive/5 rounded-2xl">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm text-destructive font-medium">
              ⚠️ {error} — โปรดตรวจสอบการตั้งค่า Supabase
            </p>
          </CardContent>
        </Card>
      )}

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">ภาพรวมระบบ</h1>
          <p className="text-muted-foreground font-medium">ยินดีต้อนรับกลับสู่ระบบจัดการ Marbo9k</p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild className="h-12 rounded-2xl bg-primary text-white font-bold px-6 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Link href="/admin/products/new"><Plus className="w-5 h-5 mr-2" /> เพิ่มสินค้าใหม่</Link>
          </Button>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <TrendingUp className="w-8 h-8 text-primary mb-4" />
          <p className="text-sm font-black opacity-40 uppercase tracking-widest">สินค้าพร้อมขาย</p>
          <p className="text-5xl font-black text-gradient mt-1">{activeProducts}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-500">
            <CheckCircle2 className="w-3 h-3" /> <span>ระบบทำงานปกติ</span>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <ShoppingCart className="w-8 h-8 text-secondary mb-4" />
          <p className="text-sm font-black opacity-40 uppercase tracking-widest">ออเดอร์ใหม่</p>
          <p className="text-5xl font-black text-gradient mt-1">{pendingOrders}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-secondary">
            <Clock className="w-3 h-3" /> <span>รอดำเนินการ</span>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <Users className="w-8 h-8 text-accent mb-4" />
          <p className="text-sm font-black opacity-40 uppercase tracking-widest">ยอดขายรวม</p>
          <p className="text-5xl font-black text-gradient mt-1">฿{totalRevenue.toLocaleString()}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-accent">
            <TrendingUp className="w-3 h-3" /> <span>เติบโตต่อเนื่อง</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Stock Management Table */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <Package className="w-6 h-6 text-primary" /> จัดการสต็อกสินค้า
            </h2>
          </div>

          <div className="glass-card rounded-[2.5rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest opacity-40">สินค้า</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest opacity-40">ราคา</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest opacity-40">คงเหลือ</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest opacity-40">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {products.map((p) => (
                    <tr key={p.id} className="group hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 overflow-hidden flex items-center justify-center shrink-0">
                            {p.image_url ? (
                              <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            ) : (
                              <ImageIcon className="w-5 h-5 opacity-20" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-sm leading-tight">{p.name}</p>
                            <p className="text-[10px] font-bold opacity-40 uppercase mt-1">ID: {p.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="font-black">฿{Number(p.price).toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${p.stock < 10 ? 'bg-destructive animate-pulse' : 'bg-emerald-500'}`} />
                          <span className="font-bold">{p.stock}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${p.is_active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                          {p.is_active ? 'ออนไลน์' : 'ปิดการขาย'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Orders Side List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-secondary" /> ออเดอร์ล่าสุด
            </h2>
          </div>

          <div className="space-y-4">
            {orders.length === 0 && (
              <div className="p-8 text-center glass-card rounded-[2.5rem]">
                <ShoppingCart className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm font-medium">ยังไม่มีรายการสั่งซื้อ</p>
              </div>
            )}
            {orders.map((o) => (
              <div key={o.id} className="glass-card p-6 rounded-[2rem] hover:scale-[1.02] transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-black">
                      {o.customer_name?.[0] || '?'}
                    </div>
                    <div>
                      <p className="font-bold leading-tight truncate max-w-[120px]">{o.customer_name || 'ลูกค้าทั่วไป'}</p>
                      <p className="text-[10px] font-bold opacity-40 uppercase">#{o.id.slice(0, 8)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg">฿{Number(o.total_amount).toLocaleString()}</p>
                    <p className="text-[10px] font-bold text-primary uppercase">{o.status === 'pending' ? 'รอส่ง' : o.status}</p>
                  </div>
                </div>

                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl flex flex-col gap-3">
                  <div className="flex items-start gap-2 text-xs opacity-70">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="line-clamp-1 italic">{o.shipping_address || 'ไม่ระบุที่อยู่'}</span>
                  </div>
                  {o.customer_lat && (
                    <a
                      href={`https://www.google.com/maps?q=${o.customer_lat},${o.customer_lng}`}
                      target="_blank"
                      className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white dark:bg-black/20 font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                      <ExternalLink className="w-3 h-3" /> ดูตำแหน่งบนแผนที่
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
