import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AddToCartButton } from "@/components/liff/AddToCartButton";
import { ArrowLeft, Box, ShieldCheck, Sparkles } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("id, name, description, price, image_url, stock, is_active")
    .eq("id", id)
    .single();

  if (error || !product || !product.is_active) notFound();

  return (
    <main className="pb-32 min-h-screen">
      {/* Fixed Back Button */}
      <Link 
        href="/liff" 
        className="fixed top-20 left-4 z-40 w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </Link>

      {/* Hero Image Section */}
      <div className="w-full relative aspect-[4/5] bg-gradient-to-br from-primary/10 to-accent/10 rounded-b-[3rem] overflow-hidden shadow-sm">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover animate-in fade-in zoom-in duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-muted-foreground/20" />
          </div>
        )}
        
        {/* Floating Stock Badge */}
        <div className="absolute top-20 right-4 glass px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <div className={`w-2 h-2 rounded-full animate-pulse ${product.stock > 0 ? "bg-emerald-500" : "bg-destructive"}`} />
          <span className="text-xs font-bold">{product.stock > 0 ? "In Stock" : "Sold Out"}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-8 relative z-10 -mt-10">
        <div className="glass-card p-6 rounded-[2.5rem]">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-extrabold tracking-tight leading-tight">{product.name}</h1>
          </div>
          
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gradient">฿{Number(product.price).toLocaleString()}</span>
          </div>

          {/* Quick Features */}
          <div className="flex gap-4 mt-6 py-4 border-y border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Box className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-foreground">Stock</p>
                <p className="text-muted-foreground">{product.stock} items</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-secondary" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-foreground">Secure</p>
                <p className="text-muted-foreground">Guarantee</p>
              </div>
            </div>
          </div>

          {product.description && (
            <div className="mt-6">
              <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-muted-foreground">Description</h3>
              <p className="text-sm leading-relaxed text-foreground/80 opacity-90">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-5 z-40 bg-gradient-to-t from-background via-background/90 to-transparent pb-8">
        <div className="max-w-md mx-auto relative">
          {/* Subtle glow behind button */}
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full translate-y-2" />
          <AddToCartButton
            productId={product.id}
            name={product.name}
            price={Number(product.price)}
            image_url={product.image_url}
            stock={product.stock}
          />
        </div>
      </div>
    </main>
  );
}
