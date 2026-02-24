import Link from "next/link";
import { ShoppingBag, Settings, ArrowRight, Sparkles, Zap, ShieldCheck, Star, Globe, ZapIcon } from "lucide-react";

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
            Redefining the shopping experience for the next generation. <br className="hidden md:block" />
            Seamlessly integrated with <span className="text-white font-bold">LINE LIFF</span>.
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
                <h3 className="text-4xl font-black mb-4 tracking-tight">Customer Portal</h3>
                <p className="text-white/50 text-lg leading-relaxed">Experience our premium mobile shop within LINE. Browse, cart, and track with ease.</p>
              </div>
              <div className="mt-12 flex items-center gap-3 text-primary font-black text-sm uppercase tracking-widest">
                <span>Enter Store</span>
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
                <h3 className="text-4xl font-black mb-4 tracking-tight">Enterprise Admin</h3>
                <p className="text-white/50 text-lg leading-relaxed">Manage your global inventory, track high-precision logistics, and analyze growth.</p>
              </div>
              <div className="mt-12 flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-widest">
                <span>Control Center</span>
                <div className="w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Global Features Section */}
        <div className="mt-32 pt-20 border-t border-white/5 w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="space-y-3">
            <ZapIcon className="w-6 h-6 text-primary" />
            <h4 className="font-black text-sm uppercase tracking-widest">High Speed</h4>
            <p className="text-xs text-white/30 leading-relaxed">Powered by Next.js 14 for lightning fast interactions.</p>
          </div>
          <div className="space-y-3">
            <Globe className="w-6 h-6 text-secondary" />
            <h4 className="font-black text-sm uppercase tracking-widest">Global Ready</h4>
            <p className="text-xs text-white/30 leading-relaxed">Scalable infrastructure built on Supabase Cloud.</p>
          </div>
          <div className="space-y-3">
            <ShieldCheck className="w-6 h-6 text-accent" />
            <h4 className="font-black text-sm uppercase tracking-widest">Secure Core</h4>
            <p className="text-xs text-white/30 leading-relaxed">Enterprise-grade security for every transaction.</p>
          </div>
          <div className="space-y-3">
            <Star className="w-6 h-6 text-amber-400" />
            <h4 className="font-black text-sm uppercase tracking-widest">Premium UX</h4>
            <p className="text-xs text-white/30 leading-relaxed">Designed for ultimate user satisfaction and retention.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
