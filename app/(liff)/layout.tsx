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
        <div className="min-h-screen max-w-lg mx-auto bg-background">
          <header className="sticky top-0 z-10 border-b border-border/80 bg-background/80 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
            <h1 className="flex-1 text-center text-lg font-bold tracking-tight">Marbo9k</h1>
            <div className="absolute right-4">
              <CartHeader />
            </div>
          </header>
          {children}
        </div>
      </CartProvider>
    </LiffProvider>
  );
}
