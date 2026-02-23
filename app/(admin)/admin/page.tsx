import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminPage() {
  let products: { id: string; name: string; price: number; stock: number; is_active: boolean; created_at: string }[] | null = null;
  let error: Error | null = null;
  try {
    const supabase = await createClient();
    const result = await supabase
      .from("products")
      .select("id, name, price, stock, is_active, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    products = result.data;
    error = result.error as Error | null;
  } catch (e) {
    error = e instanceof Error ? e : new Error("Supabase connection failed");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-semibold">สินค้าทั้งหมด</h2>
        <Button asChild className="rounded-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600">
          <Link href="/admin/products/new">+ เพิ่มสินค้า</Link>
        </Button>
      </div>
      {error && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 rounded-2xl">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              ยังเชื่อมต่อ Supabase ไม่ได้ — ใส่ NEXT_PUBLIC_SUPABASE_URL และ
              NEXT_PUBLIC_SUPABASE_ANON_KEY ใน Vercel Environment Variables
              แล้ว Redeploy (และรัน SQL ใน supabase/migrations)
            </p>
          </CardContent>
        </Card>
      )}
      <Card className="rounded-2xl border shadow-sm overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">รายการสินค้า</CardTitle>
        </CardHeader>
        <CardContent>
          {!error && (!products || products.length === 0) && (
            <p className="text-muted-foreground text-sm py-6">ยังไม่มีสินค้า — กด + เพิ่มสินค้า</p>
          )}
          {!error && products && products.length > 0 && (
            <ul className="divide-y divide-border">
              {products.map((p) => (
                <li key={p.id} className="flex items-center justify-between py-4 first:pt-0">
                  <div>
                    <span className="font-medium">{p.name}</span>
                    <span className="text-muted-foreground ml-2 text-sm">
                      ฿{Number(p.price).toLocaleString()} · สต็อก {p.stock}
                    </span>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.is_active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                    {p.is_active ? "ขาย" : "ปิด"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
