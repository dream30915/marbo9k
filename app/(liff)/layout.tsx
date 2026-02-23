/**
 * Layout สำหรับ LIFF (มือถือ) — เปิดจาก LINE OA
 */
import { LiffProvider } from "@/components/liff/LiffProvider";
import { CartProvider } from "@/lib/context/cart-context";
import { CartHeader } from "@/components/liff/CartHeader";

export default function LiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LiffProvider>
      <CartProvider>
        <div className="min-h-screen w-full max-w-md mx-auto bg-background/50 relative overflow-hidden bg-mesh">
          {/* Animated Background Elements */}
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-64 h-64 bg-secondary/20 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-10%] left-[20%] w-64 h-64 bg-accent/20 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000" />

          {/* Glass Navbar */}
          <header className="sticky top-0 z-50 glass px-5 py-4 flex items-center justify-between transition-all duration-300 rounded-b-3xl">
            <h1 className="text-xl font-extrabold tracking-tight text-gradient">
              Marbo9k
            </h1>
            <CartHeader />
          </header>

          {/* Main Content Area */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </CartProvider>
    </LiffProvider>
  );
}
