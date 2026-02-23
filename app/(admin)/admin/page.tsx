import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, price, stock, is_active, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">ยินดีต้อนรับสู่ระบบหลังบ้าน</h2>
        <Button asChild>
          <Link href="/admin/products/new">เพิ่มสินค้า</Link>
        </Button>
      </div>
      {error && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              ยังเชื่อมต่อ Supabase ไม่ได้ — ใส่ .env.local และรัน SQL ใน
              supabase/migrations/001_initial_schema.sql
            </p>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>สินค้าทั้งหมด</CardTitle>
        </CardHeader>
        <CardContent>
          {!error && (!products || products.length === 0) && (
            <p className="text-muted-foreground text-sm">ยังไม่มีสินค้า — กด เพิ่มสินค้า</p>
          )}
          {!error && products && products.length > 0 && (
            <ul className="divide-y">
              {products.map((p) => (
                <li key={p.id} className="flex items-center justify-between py-3 first:pt-0">
                  <div>
                    <span className="font-medium">{p.name}</span>
                    <span className="text-muted-foreground ml-2">
                      ฿{Number(p.price).toLocaleString()} · สต็อก {p.stock}
                    </span>
                  </div>
                  <span className={p.is_active ? "text-green-600" : "text-muted-foreground"}>
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
