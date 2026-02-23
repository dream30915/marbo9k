import Link from "next/link";
import { ShoppingBag, Settings, ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden bg-mesh selection:bg-primary selection:text-white">
      {/* Animated background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-multiply filter blur-[120px] animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest">Next-Gen E-Commerce</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          Marbo<span className="text-gradient">9k</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
          The ultimate shopping experience integrated with <span className="text-foreground font-bold">LINE LIFF</span>. 
          Fast, beautiful, and built for the next generation.
        </p>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <Link href="/liff" className="group">
            <div className="glass-card p-8 rounded-[2.5rem] h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShoppingBag className="w-24 h-24" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">หน้าร้าน (LIFF)</h3>
              <p className="text-muted-foreground text-sm mb-6">สำหรับลูกค้า สั่งซื้อง่ายผ่าน LINE พร้อมระบบตะกร้าสุดล้ำ</p>
              <div className="flex items-center gap-2 text-primary font-bold">
                <span>เข้าชมร้านค้า</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link href="/admin" className="group">
            <div className="glass-card p-8 rounded-[2.5rem] h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Settings className="w-24 h-24" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Settings className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">ระบบหลังบ้าน</h3>
              <p className="text-muted-foreground text-sm mb-6">จัดการสต็อกสินค้า ดูออเดอร์ และควบคุมทุกอย่างในที่เดียว</p>
              <div className="flex items-center gap-2 text-secondary font-bold">
                <span>จัดการระบบ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Features Footer */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl opacity-50">
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-widest">Ultra Fast</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-widest">Secure Pay</span>
          </div>
          <div className="flex flex-col items-center gap-2 hidden md:flex">
            <Sparkles className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-widest">Modern UI</span>
          </div>
        </div>
      </div>
    </main>
  );
}
