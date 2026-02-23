import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

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
    <main className="p-4 pb-12">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-5">สินค้า</p>

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40 p-4 text-sm text-amber-800 dark:text-amber-200">
          ยังเชื่อมต่อ Supabase ไม่ได้ — ใส่ NEXT_PUBLIC_SUPABASE_URL และ NEXT_PUBLIC_SUPABASE_ANON_KEY ใน Vercel แล้ว Redeploy
        </div>
      )}

      {!error && (!products || products.length === 0) && (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center text-muted-foreground text-sm">
          ยังไม่มีสินค้าในร้าน
        </div>
      )}

      {!error && products && products.length > 0 && (
        <ul className="grid gap-5 sm:grid-cols-2">
          {products.map((p) => (
            <li key={p.id}>
              <Link href={`/liff/product/${p.id}`}>
                <Card className="overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:shadow-lg hover:ring-2 active:scale-[0.98] hover:ring-emerald-300 dark:hover:ring-emerald-600/50">
                  <CardContent className="p-0">
                    {p.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="h-44 w-full object-cover"
                      />
                    ) : (
                      <div className="h-44 w-full bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-emerald-950/30 dark:to-sky-950/30 flex items-center justify-center text-muted-foreground text-xs">
                        ไม่มีรูป
                      </div>
                    )}
                    <div className="p-4">
                      <p className="font-semibold text-foreground line-clamp-2">{p.name}</p>
                      <p className="mt-1.5 text-emerald-600 dark:text-emerald-400 font-bold">฿{Number(p.price).toLocaleString()}</p>
                      <span className="inline-block mt-2 text-xs font-medium text-primary">ดูรายละเอียด →</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
