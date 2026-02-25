import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Save, Sparkles, Package, Info, DollarSign, Database, ImageIcon, FileText } from "lucide-react";

export default function NewProductPage() {
  async function addProduct(formData: FormData) {
    "use server";
    const name = (formData.get("name") as string)?.trim();
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock")) || 0;
    const description = (formData.get("description") as string)?.trim() || null;
    const image_url = (formData.get("image_url") as string)?.trim() || null;

    if (!name || Number.isNaN(price) || price < 0) return;

    const supabase = await createClient();
    await supabase.from("products").insert({
      name,
      description,
      price,
      stock,
      image_url,
      is_active: true,
    });
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-background bg-mesh p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:scale-105 transition-transform group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-gradient">เพิ่มสินค้าใหม่</h1>
              <p className="text-muted-foreground text-sm font-medium">กรอกข้อมูลสินค้าเพื่อเพิ่มไปยังร้านค้าระดับโลกของคุณ</p>
            </div>
          </div>
        </div>

        <form action={addProduct} className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Basic Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">ข้อมูลทั่วไป</h2>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">ชื่อสินค้า</label>
                <div className="relative group">
                  <input
                    name="name"
                    required
                    placeholder="เช่น Marbo 9K Crystal Grape"
                    className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-base font-medium focus:ring-2 ring-primary transition-all shadow-inner pl-12"
                  />
                  <Package className="absolute left-4 top-4 w-5 h-5 text-primary opacity-40 group-focus-within:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">รายละเอียดสินค้า</label>
                <div className="relative group">
                  <textarea
                    name="description"
                    rows={5}
                    placeholder="บอกเล่าเรื่องราวที่น่าสนใจของสินค้านี้..."
                    className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-base font-medium focus:ring-2 ring-primary transition-all shadow-inner resize-none pl-12"
                  />
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-primary opacity-40 group-focus-within:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="w-5 h-5 text-secondary" />
                <h2 className="text-lg font-bold">รูปภาพสินค้า</h2>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">URL รูปภาพ</label>
                <div className="relative group">
                  <input
                    name="image_url"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-mono focus:ring-2 ring-secondary transition-all shadow-inner pl-12"
                  />
                  <Sparkles className="absolute left-4 top-4 w-5 h-5 text-secondary opacity-40 group-focus-within:opacity-100 transition-opacity" />
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 ml-1 italic">* กรุณาใส่ลิงก์รูปภาพโดยตรง (รองรับ JPG, PNG, WebP)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Inventory */}
          <div className="space-y-6">
            <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <h2 className="text-lg font-bold">ราคาขาย</h2>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">ราคา (฿)</label>
                <input
                  name="price"
                  type="number"
                  min={0}
                  step={0.01}
                  required
                  placeholder="0.00"
                  className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-2xl font-black text-emerald-500 focus:ring-2 ring-emerald-500 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold">สต็อกสินค้า</h2>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">จำนวนสินค้าคงเหลือ</label>
                <input
                  name="stock"
                  type="number"
                  min={0}
                  defaultValue={0}
                  className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-xl font-bold focus:ring-2 ring-amber-500 transition-all shadow-inner"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-20 rounded-[2rem] bg-gradient-to-r from-primary to-accent text-white font-black text-xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all group">
              <Save className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform" />
              บันทึกสินค้า
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
