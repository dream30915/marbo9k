/**
 * Layout สำหรับ LIFF (มือถือ) — เปิดจาก LINE OA
 * พร้อม Bottom Navigation Bar ตรงกับ Rich Menu
 */
import { LiffProvider } from "@/components/liff/LiffProvider";
import { CartProvider } from "@/lib/context/cart-context";
import { CartHeader } from "@/components/liff/CartHeader";
import { BottomNav } from "@/components/liff/BottomNav";

export default function LiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LiffProvider>
      <CartProvider>
        <div className="min-h-screen w-full max-w-md mx-auto bg-background relative overflow-hidden">
          {/* Subtle Background Accents */}
          <div className="fixed top-[-15%] left-[-15%] w-72 h-72 bg-primary/10 rounded-full filter blur-[100px] animate-blob pointer-events-none" />
          <div className="fixed top-[30%] right-[-15%] w-72 h-72 bg-secondary/10 rounded-full filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none" />
          <div className="fixed bottom-[-10%] left-[20%] w-72 h-72 bg-accent/10 rounded-full filter blur-[100px] animate-blob animation-delay-4000 pointer-events-none" />

          {/* Premium Header */}
          <header className="sticky top-0 z-50 glass px-5 py-3 flex items-center justify-between rounded-b-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white text-xs font-extrabold">M9</span>
              </div>
              <div>
                <h1 className="text-lg font-extrabold tracking-tight leading-none">
                  Marbo<span className="text-gradient">9k</span>
                </h1>
                <p className="text-[9px] font-semibold text-muted-foreground tracking-widest uppercase leading-none">Premium Store</p>
              </div>
            </div>
            <CartHeader />
          </header>

          {/* Main Content Area */}
          <div className="relative z-10 pb-24">
            {children}
          </div>

          {/* Bottom Navigation */}
          <BottomNav />
        </div>
      </CartProvider>
    </LiffProvider>
  );
}
