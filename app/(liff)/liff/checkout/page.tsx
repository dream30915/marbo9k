"use client";

import { useState } from "react";
import Link from "next/link";
import liff from "@line/liff";
import { useCart } from "@/lib/context/cart-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Loader2, Receipt, ArrowRight, MapPin, Phone, User } from "lucide-react";
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
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

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
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      
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
        <h2 className="text-2xl font-extrabold mb-2 text-gradient">ตะกร้าว่างเปล่า</h2>
        <Button asChild className="rounded-full mt-4 bg-primary text-white">
          <Link href="/liff">กลับไปเลือกสินค้า</Link>
        </Button>
      </main>
    );
  }

  if (orderId) {
    return (
      <main className="p-6 pb-32 min-h-screen flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card w-full rounded-[3rem] p-10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-emerald-600" />
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black mb-2 text-gradient from-emerald-500 to-teal-500">สำเร็จ!</h2>
          <p className="text-muted-foreground text-sm mb-6">คำสั่งซื้อของคุณถูกส่งเรียบร้อยแล้ว</p>
          <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-4 mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Order ID</p>
            <p className="font-mono text-lg font-bold">#{orderId.slice(0, 8)}</p>
          </div>
          <div className="space-y-3">
            <Button asChild className="w-full h-14 rounded-full font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
              <Link href="/liff">กลับหน้าหลัก</Link>
            </Button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="p-5 pb-40">
      <div className="flex items-center mb-8 gap-4">
        <Link href="/liff/cart" className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-black text-gradient">ชำระเงิน</h1>
      </div>

      <div className="space-y-6">
        {/* Customer Info */}
        <div className="glass-card rounded-[2.5rem] p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" /> ข้อมูลผู้รับ
          </h2>
          <div className="space-y-4">
            <input 
              placeholder="ชื่อ-นามสกุล" 
              className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 ring-primary transition-all"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <div className="relative">
              <input 
                placeholder="เบอร์โทรศัพท์" 
                className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 ring-primary transition-all"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
              <Phone className="absolute right-4 top-3 w-4 h-4 opacity-30" />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="glass-card rounded-[2.5rem] p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2 text-gradient">
              <MapPin className="w-5 h-5 text-primary" /> ที่อยู่จัดส่ง
            </h2>
            <button 
              onClick={handleGetLocation}
              className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-all"
            >
              <MapPin className="w-3 h-3" /> {location ? "อัปเดตโลเคชั่น" : "แชร์โลเคชั่น"}
            </button>
          </div>
          <textarea 
            placeholder="บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ, จังหวัด..." 
            className="w-full h-24 bg-black/5 dark:bg-white/5 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 ring-primary transition-all resize-none"
            value={address}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
          {location && (
            <p className="mt-2 text-[10px] text-emerald-500 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> บันทึกพิกัด GPS แล้ว: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="glass-card rounded-[2.5rem] p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" /> สรุปรายการ
          </h2>
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.productId} className="flex justify-between text-sm">
                <span className="opacity-80 truncate max-w-[200px]">{i.name} x {i.quantity}</span>
                <span className="font-bold">฿{(i.price * i.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-dashed flex justify-between items-end">
            <span className="text-sm font-bold opacity-60">ยอดรวมทั้งสิ้น</span>
            <span className="text-2xl font-black text-gradient">฿{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button
        className="fixed bottom-8 left-5 right-5 w-[calc(100%-40px)] mx-auto h-14 rounded-full font-bold text-lg bg-gradient-to-r from-primary to-accent text-white shadow-xl shadow-primary/25 z-40"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "ยืนยันการสั่งซื้อ"}
      </Button>
    </main>
  );
}
