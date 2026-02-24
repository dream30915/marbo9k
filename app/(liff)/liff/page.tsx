import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PackageSearch, ChevronRight, Star, ShoppingBag, Sparkles } from "lucide-react";

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
      <div className="relative mb-12 py-10 rounded-[3rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10 -z-10" />
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest animate-pulse">
            <Sparkles className="w-3 h-3" /> New Season
          </div>
          <h2 className="text-5xl font-black tracking-tighter leading-[0.9]">
            Exquisite <br />
            <span className="text-gradient">Collections</span>
          </h2>
          <p className="text-muted-foreground text-sm font-medium opacity-70">Handpicked premium products just for you.</p>
        </div>
      </div>

      {error && (
        <div className="glass-card border-destructive/20 bg-destructive/5 p-6 rounded-3xl text-center space-y-2 mb-10">
          <p className="font-black text-destructive uppercase tracking-widest text-xs">Connection Error</p>
          <p className="text-muted-foreground text-sm">We're having trouble reaching the vault. Please try again.</p>
        </div>
      )}

      {!error && (!products || products.length === 0) && (
        <div className="glass-card rounded-[3rem] border-dashed border-primary/20 p-20 flex flex-col items-center justify-center text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6 shadow-inner">
            <ShoppingBag className="w-8 h-8 text-primary opacity-40" />
          </div>
          <p className="text-foreground font-black text-xl tracking-tight">The Boutique is Empty</p>
          <p className="text-muted-foreground text-sm mt-2 font-medium">Our curators are currently preparing new arrivals.</p>
        </div>
      )}

      {!error && products && products.length > 0 && (
        <div className="grid grid-cols-2 gap-6">
          {products.map((p, index) => (
            <Link key={p.id} href={`/liff/product/${p.id}`} className="group">
              <div className="flex flex-col h-full">
                <div className="aspect-[3/4] relative rounded-[2.5rem] overflow-hidden bg-black/5 dark:bg-white/5 shadow-sm group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <ShoppingBag className="w-12 h-12" />
                    </div>
                  )}
                  
                  {/* Premium Tag */}
                  <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-lg scale-90 origin-left">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Elite</span>
                  </div>

                  {/* Glass Bottom Bar */}
                  <div className="absolute bottom-4 left-4 right-4 glass py-3 px-4 rounded-[1.5rem] flex items-center justify-between backdrop-blur-3xl border-white/30">
                    <p className="font-black text-sm">฿{Number(p.price).toLocaleString()}</p>
                    <div className="w-7 h-7 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-2xl group-hover:bg-primary group-hover:text-white transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 px-2">
                  <p className="font-black text-base line-clamp-1 leading-tight tracking-tight uppercase group-hover:text-primary transition-colors">
                    {p.name}
                  </p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] mt-1">Available Now</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
