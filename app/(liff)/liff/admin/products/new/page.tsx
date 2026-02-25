"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Package, Image as ImageIcon, Tag, Hash, Sparkles } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function LiffAdminNewProduct() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const supabase = createClient();

    useEffect(() => {
        async function checkAuth() {
            if (typeof window !== "undefined" && liff.isLoggedIn()) {
                const profile = await liff.getProfile();
                const { data } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("line_user_id", profile.userId)
                    .single();

                if (data?.role === "admin") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                    toast.error("ขออภัย คุณไม่มีสิทธิ์เข้าถึงหน้านี้");
                    router.push("/liff");
                }
            }
        }
        checkAuth();
    }, [router, supabase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !price || !stock) {
            toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from("products").insert({
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock),
                image_url: imageUrl || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
                is_active: true
            });

            if (error) throw error;

            toast.success("เพิ่มสินค้าใหม่สำเร็จ!");
            router.push("/liff");
        } catch (err) {
            toast.error("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
        } finally {
            setLoading(false);
        }
    };

    if (isAdmin === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isAdmin === false) return null;

    return (
        <main className="p-6 pb-20">
            <div className="flex items-center mb-8 gap-4">
                <Link href="/liff" className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0 shadow-lg">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">Admin Only</p>
                    <h1 className="text-2xl font-black text-gradient">เพิ่มสินค้าใหม่</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="glass-card rounded-[2.5rem] p-8 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2 flex items-center gap-2">
                            <Tag className="w-3 h-3" /> ชื่อสินค้า
                        </label>
                        <input
                            required
                            className="w-full bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-primary transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="เช่น Premium Coffee Bean"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2 flex items-center gap-2">
                            <ImageIcon className="w-3 h-3" /> URL รูปภาพ
                        </label>
                        <input
                            className="w-full bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-primary transition-all"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://..."
                        />
                        {imageUrl && (
                            <div className="mt-2 aspect-video rounded-xl overflow-hidden bg-black/5 border border-white/5">
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">ราคา (บาท)</label>
                            <input
                                required
                                type="number"
                                className="w-full bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-primary transition-all"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">สต็อก (ชิ้น)</label>
                            <input
                                required
                                type="number"
                                className="w-full bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-primary transition-all"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">รายละเอียด</label>
                        <textarea
                            className="w-full bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-primary transition-all h-24 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 rounded-full font-black text-lg bg-gradient-to-r from-primary to-accent text-white shadow-2xl shadow-primary/20 transition-all active:scale-95 flex items-center gap-3"
                >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                    บันทึกและขึ้นขายทันที
                </Button>
            </form>
        </main>
    );
}
