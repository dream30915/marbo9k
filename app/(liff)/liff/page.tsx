import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function LiffPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, price, image_url, is_active")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <main className="p-4 pb-8">
      <h1 className="text-xl font-semibold mb-4">หน้าร้าน (LIFF)</h1>

      {error && (
        <p className="text-sm text-amber-600 dark:text-amber-400 mb-4">
          ยังเชื่อมต่อ Supabase ไม่ได้ — ตั้งค่า .env.local และรัน SQL ใน
          supabase/migrations
        </p>
      )}

      {!error && (!products || products.length === 0) && (
        <p className="text-muted-foreground text-sm">ยังไม่มีสินค้าในร้าน</p>
      )}

      {!error && products && products.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2">
          {products.map((p) => (
            <li key={p.id}>
              <Card>
                <CardContent className="p-0">
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="h-40 w-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="h-40 w-full bg-muted rounded-t-lg flex items-center justify-center text-muted-foreground text-sm">
                      ไม่มีรูป
                    </div>
                  )}
                  <div className="p-3">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ฿{Number(p.price).toLocaleString()}
                    </p>
                    <Button size="sm" className="mt-2 w-full" asChild>
                      <Link href={`/liff/product/${p.id}`}>ดูรายละเอียด</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
