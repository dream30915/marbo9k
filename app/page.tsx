import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-grid bg-mesh flex flex-col items-center justify-center gap-12 p-6">
      <div className="text-center space-y-3">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-foreground">
          Marbo9k
        </h1>
        <p className="text-muted-foreground text-lg">E-Commerce · LINE LIFF & Admin</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 w-full max-w-md">
        <Link
          href="/liff"
          className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-8 shadow-sm transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          style={{ backgroundColor: '#ecfdf5', borderColor: '#34d399' }}
        >
          <span className="text-4xl" aria-hidden>🛒</span>
          <span className="font-semibold text-lg" style={{ color: '#065f46' }}>หน้าร้าน (LIFF)</span>
          <span className="text-sm" style={{ color: '#047857' }}>ลูกค้า · มือถือ</span>
        </Link>
        <Link
          href="/admin"
          className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-8 shadow-sm transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
          style={{ backgroundColor: '#f0f9ff', borderColor: '#38bdf8' }}
        >
          <span className="text-4xl" aria-hidden>⚙️</span>
          <span className="font-semibold text-lg" style={{ color: '#0c4a6e' }}>Admin</span>
          <span className="text-sm" style={{ color: '#0369a1' }}>หลังบ้าน · จัดการสินค้า</span>
        </Link>
      </div>
    </main>
  );
}
