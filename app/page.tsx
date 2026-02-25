import Link from "next/link";
import { ShoppingBag, Settings, ArrowRight, Sparkles, Zap, ShieldCheck, Star, Globe, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden selection:bg-primary selection:text-white">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-primary/10 rounded-full mix-blend-screen filter blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-secondary/10 rounded-full mix-blend-screen filter blur-[150px] animate-pulse animation-delay-2000" />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
        <div className="bg-grid absolute inset-0 opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40 flex flex-col items-center">
        {/* Floating Premium Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-2xl">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">World Class E-Commerce</span>
        </div>

        {/* Massive Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mb-20">
          <h1 className="text-7xl md:text-[120px] font-black tracking-tighter leading-[0.85] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            MARBO<span className="text-gradient">9K</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/40 font-medium tracking-tight animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            ยกระดับประสบการณ์การช้อปปิ้งออนไลน์ที่เหนือระดับ <br className="hidden md:block" />
            เชื่อมต่อกับ <span className="text-white font-bold">LINE LIFF</span> อย่างสมบูรณ์แบบ
          </p>
        </div>

        {/* Professional Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <Link href="/liff" className="group relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="glass-card p-10 rounded-[3rem] border-white/10 bg-white/[0.02] h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-3 relative overflow-hidden active:scale-95">
              <div>
                <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center mb-8 shadow-2xl shadow-primary/40 group-hover:rotate-6 transition-transform">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-black mb-4 tracking-tight">หน้าร้านค้า</h3>
                <p className="text-white/50 text-lg leading-relaxed">สัมผัสประสบการณ์การเลือกซื้อสินค้าผ่าน LINE ที่สะดวก รวดเร็ว และพรีเมียมที่สุด</p>
              </div>
              <div className="mt-12 flex items-center gap-3 text-primary font-black text-sm uppercase tracking-widest">
                <span>เข้าชมร้านค้า</span>
                <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin" className="group relative">
            <div className="absolute inset-0 bg-secondary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="glass-card p-10 rounded-[3rem] border-white/10 bg-white/[0.02] h-full flex flex-col justify-between transition-all duration-500 hover:-translate-y-3 relative overflow-hidden active:scale-95">
              <div>
                <div className="w-16 h-16 rounded-3xl bg-secondary flex items-center justify-center mb-8 shadow-2xl shadow-secondary/40 group-hover:-rotate-6 transition-transform">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-black mb-4 tracking-tight">ระบบจัดการ</h3>
                <p className="text-white/50 text-lg leading-relaxed">จัดการสต็อก ติดตามออเดอร์ และวิเคราะห์ยอดขายผ่านแดชบอร์ดที่ทันสมัยที่สุด</p>
              </div>
              <div className="mt-12 flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-widest">
                <span>จัดการระบบ</span>
                <div className="w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Global Features Section */}
        <div className="mt-32 pt-20 border-t border-white/5 w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-12 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-700">
          <div className="space-y-3 group">
            <Zap className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-sm uppercase tracking-widest">High Speed</h4>
            <p className="text-xs text-white/30 leading-relaxed">ประสิทธิภาพสูงสุดด้วย Next.js 14 และ Edge Runtime</p>
          </div>
          <div className="space-y-3 group">
            <Globe className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-sm uppercase tracking-widest">Global Ready</h4>
            <p className="text-xs text-white/30 leading-relaxed">โครงสร้างพื้นฐานระดับสากลบนหน่วยประมวลผล Supabase</p>
          </div>
          <div className="space-y-3 group">
            <ShieldCheck className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-sm uppercase tracking-widest">Secure Core</h4>
            <p className="text-xs text-white/30 leading-relaxed">ความปลอดภัยระดับ Enterprise สำหรับทุกธุรกรรม</p>
          </div>
          <div className="space-y-3 group">
            <TrendingUp className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            <h4 className="font-black text-sm uppercase tracking-widest">Real-time</h4>
            <p className="text-xs text-white/30 leading-relaxed">อัปเดตสต็อกและสถานะออเดอร์แบบเรียลไทม์ 100%</p>
          </div>
        </div>
      </div>

      <footer className="relative z-10 py-12 border-t border-white/5 text-center">
        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} MARBO9K Premium E-Commerce Platform
        </p>
      </footer>
    </main>
  );
}
