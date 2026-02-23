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
    <main className="p-4 pb-8">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/liff">← กลับหน้าร้าน</Link>
      </Button>
      <Card className="mt-4">
        <CardContent className="p-0">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full aspect-video object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full aspect-video bg-muted rounded-t-lg flex items-center justify-center text-muted-foreground">
              ไม่มีรูป
            </div>
          )}
          <div className="p-4">
            <h1 className="text-lg font-semibold">{product.name}</h1>
            {product.description && (
              <p className="text-muted-foreground text-sm mt-1">
                {product.description}
              </p>
            )}
            <p className="mt-2 text-lg">฿{Number(product.price).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">สต็อก {product.stock}</p>
            <Button className="mt-4 w-full">เพิ่มลงตะกร้า</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
