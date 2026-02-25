import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AddToCartButton } from "@/components/liff/AddToCartButton";
import { ArrowLeft, Box, ShieldCheck, Truck, RotateCcw } from "lucide-react";

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
      {/* Back Button */}
      <Link
        href="/liff"
        className="fixed top-20 left-4 z-40 w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </Link>

      {/* Product Image */}
      <div className="w-full relative aspect-square bg-gradient-to-br from-muted/50 to-muted/30 overflow-hidden">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover animate-fadeIn"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
            <Box className="w-20 h-20 text-muted-foreground/15" />
          </div>
        )}

        {/* Stock Badge */}
        <div className="absolute top-20 right-4 glass px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <div className={`w-2 h-2 rounded-full animate-pulse ${product.stock > 0 ? "bg-emerald-500" : "bg-destructive"}`} />
          <span className="text-xs font-bold">{product.stock > 0 ? `มีสินค้า ${product.stock} ชิ้น` : "สินค้าหมด"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-6 relative z-10 -mt-6">
        <div className="glass-card p-5 rounded-3xl">
          <h1 className="text-xl font-extrabold tracking-tight leading-tight">{product.name}</h1>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gradient">฿{Number(product.price).toLocaleString()}</span>
          </div>

          {/* Trust Features */}
          <div className="grid grid-cols-3 gap-2 mt-5 py-4 border-y border-border/30">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground leading-tight">ของแท้<br />100%</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Truck className="w-4 h-4 text-secondary" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground leading-tight">จัดส่ง<br />รวดเร็ว</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <RotateCcw className="w-4 h-4 text-accent" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground leading-tight">คืนสินค้า<br />ได้ 7 วัน</span>
            </div>
          </div>

          {product.description && (
            <div className="mt-5">
              <h3 className="font-bold mb-2 text-sm text-muted-foreground">รายละเอียดสินค้า</h3>
              <p className="text-sm leading-relaxed text-foreground/80">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Add to Cart */}
      <div className="fixed bottom-20 left-0 right-0 p-4 z-40 bg-gradient-to-t from-background via-background/90 to-transparent">
        <div className="max-w-md mx-auto relative">
          <div className="absolute inset-0 bg-primary/15 blur-xl rounded-full translate-y-2" />
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
