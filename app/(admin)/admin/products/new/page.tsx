import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProductPage() {
  async function addProduct(formData: FormData) {
    "use server";
    const name = (formData.get("name") as string)?.trim();
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock")) || 0;
    const description = (formData.get("description") as string)?.trim() || null;
    if (!name || Number.isNaN(price) || price < 0) return;
    const supabase = await createClient();
    await supabase.from("products").insert({
      name,
      description,
      price,
      stock,
      is_active: true,
    });
    redirect("/admin");
  }

  return (
    <div className="max-w-lg space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/admin">← กลับ</Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>เพิ่มสินค้า</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={addProduct} className="space-y-4">
            <div>
              <label className="text-sm font-medium">ชื่อสินค้า</label>
              <input name="name" required className="mt-1 w-full rounded-md border px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium">คำอธิบาย</label>
              <textarea name="description" rows={2} className="mt-1 w-full rounded-md border px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium">ราคา (฿)</label>
              <input name="price" type="number" min={0} step={0.01} required className="mt-1 w-full rounded-md border px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium">สต็อก</label>
              <input name="stock" type="number" min={0} defaultValue={0} className="mt-1 w-full rounded-md border px-3 py-2" />
            </div>
            <Button type="submit">บันทึก</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
