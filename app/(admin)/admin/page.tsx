import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
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
  CheckCircle2
} from "lucide-react";

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
    error = "Database connection failed";
  }

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Overview</h1>
          <p className="text-muted-foreground font-medium">Welcome back to your command center.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild className="h-12 rounded-2xl bg-primary text-white font-bold px-6 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Link href="/admin/products/new"><Plus className="w-5 h-5 mr-2" /> Add New Product</Link>
          </Button>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <TrendingUp className="w-8 h-8 text-primary mb-4" />
          <p className="text-sm font-black opacity-40 uppercase tracking-widest">Active Inventory</p>
          <p className="text-5xl font-black text-gradient mt-1">{products.length}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-500">
            <CheckCircle2 className="w-3 h-3" /> <span>System Stable</span>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <ShoppingCart className="w-8 h-8 text-secondary mb-4" />
          <p className="text-sm font-black opacity-40 uppercase tracking-widest">New Orders</p>
          <p className="text-5xl font-black text-gradient mt-1">{orders.filter(o => o.status === 'pending').length}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-500">
            <Clock className="w-3 h-3" /> <span>Requires Attention</span>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <Users className="w-8 h-8 text-accent mb-4" />
          <p className="text-sm font-black opacity-40 uppercase tracking-widest">Total Revenue</p>
          <p className="text-5xl font-black text-gradient mt-1">
            ฿{products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}
          </p>
          <p className="mt-4 text-[10px] font-bold opacity-40 italic">* Estimated inventory value</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Inventory Table */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <Package className="w-6 h-6 text-primary" /> Stock Management
            </h2>
            <Link href="/admin" className="text-xs font-bold text-primary hover:underline">View All</Link>
          </div>
          
          <div className="glass-card rounded-[2.5rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest opacity-40">Product</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest opacity-40">Price</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest opacity-40">Stock</th>
                    <th className="px-8 py-6 text-xs font-black uppercase tracking-widest opacity-40">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {products.map((p) => (
                    <tr key={p.id} className="group hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-black/5 overflow-hidden shrink-0">
                            {p.image_url ? <img src={p.image_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] opacity-20">NO IMG</div>}
                          </div>
                          <span className="font-bold truncate max-w-[150px]">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 font-black text-emerald-500">฿{Number(p.price).toLocaleString()}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${p.stock < 10 ? 'bg-destructive animate-pulse' : 'bg-emerald-500'}`} />
                          <span className="font-bold">{p.stock}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${p.is_active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                          {p.is_active ? 'Live' : 'Hidden'}
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
              <ShoppingCart className="w-6 h-6 text-secondary" /> Recent Orders
            </h2>
          </div>

          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="glass-card p-6 rounded-[2rem] hover:scale-[1.02] transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-black">
                      {o.customer_name?.[0] || '?'}
                    </div>
                    <div>
                      <p className="font-bold leading-tight">{o.customer_name || 'Anonymous'}</p>
                      <p className="text-[10px] font-bold opacity-40 uppercase">#{o.id.slice(0,8)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg">฿{Number(o.total_amount).toLocaleString()}</p>
                    <p className="text-[10px] font-bold text-primary uppercase">{o.status}</p>
                  </div>
                </div>

                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl flex flex-col gap-3">
                  <div className="flex items-start gap-2 text-xs opacity-70">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{o.shipping_address || 'No address provided'}</span>
                  </div>
                  {o.customer_lat && (
                    <a 
                      href={`https://www.google.com/maps?q=${o.customer_lat},${o.customer_lng}`} 
                      target="_blank"
                      className="flex items-center justify-center gap-2 py-2 rounded-xl bg-white dark:bg-black/20 font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                      <ExternalLink className="w-3 h-3" /> Track Location
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
