import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { PackageSearch, ChevronRight } from "lucide-react";

export default async function LiffPage() {
  let products: { id: string; name: string; price: number; image_url: string | null; is_active: boolean }[] | null = null;
  let error: Error | null = null;
  try {
    const supabase = await createClient();
    const result = await supabase
      .from("products")
      .select("id, name, price, image_url, is_active")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(20);
    products = result.data;
    error = result.error as Error | null;
  } catch (e) {
    error = e instanceof Error ? e : new Error("Supabase connection failed");
  }

  return (
    <main className="p-5 pb-24">
      {/* Hero Section */}
      <div className="mb-8 mt-4 space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Find your <br />
          <span className="text-gradient">Favorite Items</span>
        </h2>
        <p className="text-muted-foreground text-sm font-medium">Discover top-tier products today.</p>
      </div>

      {error && (
        <div className="rounded-3xl border border-destructive/20 bg-destructive/10 p-5 text-sm text-destructive backdrop-blur-xl mb-6 shadow-xl">
          <p className="font-bold mb-1">Connection Error</p>
          <p className="opacity-90">Please check your Supabase credentials in Vercel.</p>
        </div>
      )}

      {!error && (!products || products.length === 0) && (
        <div className="rounded-[2rem] border border-dashed border-primary/30 bg-white/20 dark:bg-black/20 backdrop-blur-xl p-16 flex flex-col items-center justify-center text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <PackageSearch className="w-8 h-8 text-primary" />
          </div>
          <p className="text-foreground font-semibold text-lg">No Products Yet</p>
          <p className="text-muted-foreground text-sm mt-1">Check back later for new arrivals.</p>
        </div>
      )}

      {!error && products && products.length > 0 && (
        <ul className="grid grid-cols-2 gap-4">
          {products.map((p, index) => (
            <li key={p.id} className="group">
              <Link href={`/liff/product/${p.id}`} className="block h-full">
                <div 
                  className="glass-card h-full rounded-[2rem] overflow-hidden transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-2xl group-active:scale-95"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-[4/5] relative bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PackageSearch className="w-8 h-8 text-muted-foreground/30" />
                      </div>
                    )}
                    
                    {/* Glass price badge */}
                    <div className="absolute bottom-3 left-3 right-3 glass py-2 px-3 rounded-2xl flex items-center justify-between">
                      <p className="font-bold text-sm">฿{Number(p.price).toLocaleString()}</p>
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 pt-3">
                    <p className="font-semibold text-sm line-clamp-2 leading-tight">
                      {p.name}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
