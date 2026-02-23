import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <main className="p-4 pb-12">
      <Link href="/liff" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors -ml-1">
        ← กลับหน้าร้าน
      </Link>
      <Card className="mt-5 overflow-hidden rounded-2xl border bg-card shadow-sm">
        <CardContent className="p-0">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full aspect-video object-cover"
            />
          ) : (
            <div className="w-full aspect-video bg-muted flex items-center justify-center text-muted-foreground text-sm">
              ไม่มีรูป
            </div>
          )}
          <div className="p-5">
            <h1 className="text-xl font-bold tracking-tight">{product.name}</h1>
            {product.description && (
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                {product.description}
              </p>
            )}
            <p className="mt-4 text-2xl font-bold text-emerald-600 dark:text-emerald-400">฿{Number(product.price).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">สต็อก {product.stock}</p>
            <Button className="mt-6 w-full rounded-xl h-12 font-semibold bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600" size="lg">เพิ่มลงตะกร้า</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
