"use client";

import { useState } from "react";
import Link from "next/link";
import liff from "@line/liff";
import { useCart } from "@/lib/context/cart-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Loader2, Receipt, ArrowRight, MapPin, Phone, User, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Shipping info state
  const [address, setShippingAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);

  const handleGetLocation = async () => {
    if (typeof window !== "undefined" && liff.isLoggedIn()) {
      try {
        toast.info("กำลังขอตำแหน่งที่ตั้ง...");
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
        });

        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        toast.success("ปักหมุดตำแหน่งปัจจุบันเรียบร้อย!");
      } catch (err) {
        toast.error("ไม่สามารถดึงตำแหน่งได้ กรุณาอนุญาตการเข้าถึง GPS");
      }
    }
  };

  const handleSubmit = async () => {
    if (items.length === 0) return;
    if (!address || !customerName || !customerPhone) {
      toast.error("กรุณากรอกข้อมูลที่อยู่และเบอร์ติดต่อให้ครบถ้วน");
      return;
    }

    setLoading(true);

    try {
      let lineUserId: string | null = null;
      if (typeof window !== "undefined" && liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        lineUserId = profile.userId;
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          line_user_id: lineUserId ?? null,
          customer_name: customerName,
          customer_phone: customerPhone,
          shipping_address: address,
          customer_lat: location?.lat ?? null,
          customer_lng: location?.lng ?? null,
          items: items.map((i) => ({
            product_id: i.productId,
            quantity: i.quantity,
            unit_price: i.price,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "เกิดข้อผิดพลาด");

      setOrderId(data.order_id);
      clearCart();
      toast.success("สั่งซื้อสำเร็จแล้ว!", {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "เกิดข้อผิดพลาดในการสั่งซื้อ");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderId) {
    return (
      <main className="p-6 pb-32 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-muted-foreground/30" />
        </div>
        <h2 className="text-2xl font-extrabold mb-2 text-gradient">ตะกร้าว่างเปล่า</h2>
        <p className="text-muted-foreground mb-8">คุณยังไม่มีสินค้าในตะกร้า ลองเลือกดูสินค้าใหม่ๆ ของเราสิ</p>
        <Button asChild className="rounded-full h-12 px-8 bg-primary text-white font-bold shadow-lg shadow-primary/20">
          <Link href="/liff">กลับไปเลือกสินค้า</Link>
        </Button>
      </main>
    );
  }

  if (orderId) {
    return (
      <main className="p-5 pb-32 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card w-full rounded-[3rem] p-10 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-4xl font-black mb-2 text-gradient from-emerald-500 to-teal-500">สำเร็จ!</h2>
          <p className="text-muted-foreground text-sm mb-8 font-medium">คำสั่งซื้อของคุณถูกส่งเรียบร้อยแล้ว</p>

          <div className="bg-black/5 dark:bg-white/5 rounded-[2rem] p-6 mb-10 border border-white/10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2 opacity-50">Order ID</p>
            <p className="font-mono text-xl font-bold">#{orderId.slice(0, 8).toUpperCase()}</p>
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full h-14 rounded-full font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/20">
              <Link href="/liff">หน้าแรก</Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-14 rounded-full font-bold border-2 hover:bg-muted/50 transition-colors">
              <Link href="/liff/orders">ดูสถานะออเดอร์</Link>
            </Button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="p-5 pb-40">
      <div className="flex items-center mb-10 gap-4">
        <Link href="/liff/cart" className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0 hover:scale-105 transition-transform shadow-lg">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Final Step</p>
          <h1 className="text-3xl font-black text-gradient leading-none">ชำระเงิน</h1>
        </div>
      </div>

      <div className="space-y-6">
        {/* Customer Info */}
        <div className="glass-card rounded-[2.5rem] p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            ข้อมูลผู้ติดต่อ
          </h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">ชื่อ-นามสกุล</label>
              <input
                placeholder="ระบุชื่อผู้รับสินค้า"
                className="w-full bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 ring-primary transition-all placeholder:font-medium"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">เบอร์โทรศัพท์</label>
              <div className="relative">
                <input
                  placeholder="08X-XXX-XXXX"
                  className="w-full bg-black/5 dark:bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 ring-primary transition-all placeholder:font-medium"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  type="tel"
                />
                <Phone className="absolute right-6 top-4 w-5 h-5 opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="glass-card rounded-[2.5rem] p-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              ที่อยู่จัดส่ง
            </h2>
            <button
              onClick={handleGetLocation}
              className="text-[10px] font-black text-white flex items-center gap-2 bg-primary px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              <MapPin className="w-3 h-3" /> {location ? "อัปเดตพิกัด" : "ปักหมุด GPS"}
            </button>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">ที่อยู่ปัจจุบัน</label>
            <textarea
              placeholder="บ้านเลขที่, ถนน, ตำบล, อำเภอ, จังหวัด..."
              className="w-full h-32 bg-black/5 dark:bg-white/5 border border-white/5 rounded-[2rem] px-6 py-5 text-sm font-bold focus:ring-2 ring-primary transition-all resize-none placeholder:font-medium"
              value={address}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
          </div>
          {location && (
            <div className="mt-4 px-4 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                GPS Verified: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="glass-card rounded-[2.5rem] p-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-accent" />
            </div>
            สรุปรายการ
          </h2>
          <ul className="space-y-4">
            {items.map((i) => (
              <li key={i.productId} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-bold text-sm truncate max-w-[180px] uppercase tracking-tight">{i.name}</span>
                  <span className="text-[10px] font-black text-muted-foreground uppercase opacity-50">จำนวน {i.quantity} ชิ้น</span>
                </div>
                <span className="font-black text-sm">฿{(i.price * i.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-6 border-t border-dashed border-white/10 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-50">Total Amount</p>
              <p className="text-xs font-bold text-primary">รวมภาษีมูลค่าเพิ่มแล้ว</p>
            </div>
            <span className="text-3xl font-black text-gradient">฿{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-5 right-5 z-40 max-w-md mx-auto">
        <Button
          className="w-full h-16 rounded-full font-black text-lg bg-gradient-to-r from-primary via-primary to-accent text-white shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] group"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>กำลังบันทึก...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span>ยืนยันการสั่งซื้อ</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </Button>
      </div>
    </main>
  );
}
