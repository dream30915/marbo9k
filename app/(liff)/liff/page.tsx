import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PackageSearch, ChevronRight, Star, ShoppingBag, Sparkles, Flame, Truck } from "lucide-react";

export default async function LiffPage() {
  let products: any[] | null = null;
  let error: Error | null = null;
  try {
    const supabase = await createClient();
    const result = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(20);
    products = result.data;
    error = result.error as Error | null;
  } catch (e) {
    error = e instanceof Error ? e : new Error("Supabase connection failed");
  }

  return (
    <main className="p-6 pb-32">
      {/* Premium Hero Section */}
      <div className="relative mb-12 py-12 rounded-[3.5rem] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 -z-10 group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 animate-pulse" />

        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest animate-pulse">
            <Sparkles className="w-3 h-3" /> New Collection
          </div>
          <h2 className="text-6xl font-black tracking-tighter leading-[0.85] animate-in fade-in slide-in-from-bottom-4 duration-700">
            คอลเลกชัน <br />
            ที่<span className="text-gradient">ดีที่สุด</span>
          </h2>
          <p className="text-muted-foreground text-sm font-medium opacity-70 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            คัดสรรสินค้าพรีเมียมเพื่อคุณโดยเฉพาะ
          </p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center gap-3 mb-12 overflow-x-auto no-scrollbar py-2">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-card shrink-0 animate-in fade-in slide-in-from-right-4 duration-700">
          <Truck className="w-4 h-4 text-primary" />
          <span className="text-[11px] font-black uppercase tracking-widest text-foreground/80">จัดส่งฟรี</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-card shrink-0 animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
          <Star className="w-4 h-4 text-amber-400" />
          <span className="text-[11px] font-black uppercase tracking-widest text-foreground/80">ของแท้ 100%</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-card shrink-0 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
          <PackageSearch className="w-4 h-4 text-blue-400" />
          <span className="text-[11px] font-black uppercase tracking-widest text-foreground/80">คืนเงินง่าย</span>
        </div>
      </div>

      {error && (
        <div className="glass-card border-destructive/20 bg-destructive/5 p-8 rounded-[2.5rem] text-center space-y-3 mb-10 animate-in fade-in zoom-in duration-500">
          <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-2">
            <PackageSearch className="w-6 h-6 text-destructive" />
          </div>
          <p className="font-black text-destructive uppercase tracking-widest text-xs">ขออภัย เกิดข้อผิดพลาด</p>
          <p className="text-muted-foreground text-sm font-medium">ไม่สามารถเชื่อมต่อฐานข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง</p>
        </div>
      )}

      {!error && (!products || products.length === 0) && (
        <div className="glass-card rounded-[3rem] border-dashed border-primary/20 p-20 flex flex-col items-center justify-center text-center shadow-2xl animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6 shadow-inner">
            <ShoppingBag className="w-8 h-8 text-primary opacity-40" />
          </div>
          <p className="text-foreground font-black text-xl tracking-tight uppercase">ร้านค้ายังไม่มีสินค้า</p>
          <p className="text-muted-foreground text-sm mt-2 font-medium">เรากำลังเตรียมคอลเลกชันใหม่เพื่อคุณ เร็วๆ นี้</p>
        </div>
      )}

      {!error && products && products.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/40 italic">New Arrivals</h3>
            <span className="px-2 py-0.5 rounded-md bg-foreground/5 text-[10px] font-black text-foreground/30 uppercase tracking-widest">{products.length} Items</span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {products.map((p, index) => (
              <Link
                key={p.id}
                href={`/liff/product/${p.id}`}
                className="group animate-in fade-in slide-in-from-bottom-6 duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col h-full">
                  <div className="aspect-[3/4] relative rounded-[2.8rem] overflow-hidden bg-black/5 dark:bg-white/5 shadow-sm group-hover:shadow-2xl transition-all duration-700 group-hover:-translate-y-3 group-hover:rotate-1">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                    )}

                    {/* Premium Tag */}
                    <div className="absolute top-5 left-5 glass px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xl scale-90 origin-left">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">Elite</span>
                    </div>

                    {/* Price Glass Bar */}
                    <div className="absolute bottom-5 left-5 right-5 glass py-4 px-5 rounded-[1.8rem] flex items-center justify-between backdrop-blur-3xl border-white/40 shadow-2xl">
                      <p className="font-black text-base tracking-tighter">฿{Number(p.price).toLocaleString()}</p>
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-black text-foreground flex items-center justify-center shadow-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500 scale-90 group-hover:scale-100">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 px-3">
                    <p className="font-black text-lg line-clamp-1 leading-tight tracking-tight uppercase group-hover:text-primary transition-colors duration-300">
                      {p.name}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">In Stock</span>
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
