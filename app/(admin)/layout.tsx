import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, User, Bell, Search, LogOut, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex text-foreground selection:bg-primary selection:text-white">
      {/* Professional Sidebar */}
      <aside className="w-72 hidden lg:flex flex-col border-r border-border/50 bg-white/50 dark:bg-black/20 backdrop-blur-xl sticky top-0 h-screen p-6">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Settings className="w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter">Marbo<span className="text-primary font-black">Admin</span></span>
        </div>

        <nav className="space-y-2 flex-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 transition-all">
            <LayoutDashboard className="w-5 h-5" />
            <span>ภาพรวม</span>
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 font-bold opacity-60 hover:opacity-100 transition-all group">
            <Package className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span>สินค้า</span>
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 font-bold opacity-60 hover:opacity-100 transition-all group">
            <ShoppingCart className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span>ออเดอร์</span>
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 font-bold opacity-60 hover:opacity-100 transition-all group">
            <User className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span>ลูกค้า</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-border/50 space-y-2">
          <Link href="/liff" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl w-full font-bold hover:bg-primary/10 text-primary transition-all">
            <ShoppingCart className="w-5 h-5" />
            <span>ดูหน้าร้าน</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-3.5 rounded-2xl w-full text-destructive font-bold hover:bg-destructive/5 transition-all">
            <LogOut className="w-5 h-5" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Modern Header */}
        <header className="h-20 border-b border-border/50 bg-background/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
          <div className="flex items-center gap-4 lg:hidden">
            <span className="text-xl font-black tracking-tighter">Marbo<span className="text-primary font-black">Admin</span></span>
          </div>

          <div className="flex-1 max-w-xl hidden sm:block">
            <div className="relative group">
              <Search className="absolute left-4 top-3 w-4 h-4 opacity-30 group-focus-within:text-primary group-focus-within:opacity-100 transition-all" />
              <input
                placeholder="ค้นหาข้อมูล..."
                className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:ring-2 ring-primary transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center relative transition-all">
              <Bell className="w-5 h-5 opacity-60" />
              <span className="absolute top-2.5 right-3 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-secondary to-primary p-[2px]">
              <div className="w-full h-full rounded-[9px] bg-background flex items-center justify-center font-black text-xs">
                AD
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-mesh relative">
          <div className="p-8 relative z-10 w-full max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
