"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, ShoppingCart, ClipboardList, MessageCircle } from "lucide-react";

const navItems = [
    { href: "/liff", label: "หน้าร้าน", icon: Store },
    { href: "/liff/cart", label: "ตะกร้า", icon: ShoppingCart },
    { href: "/liff/orders", label: "ออเดอร์", icon: ClipboardList },
    { href: "/liff/contact", label: "ติดต่อเรา", icon: MessageCircle },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50">
            <div className="max-w-md mx-auto">
                <div className="glass mx-3 mb-3 rounded-2xl px-2 py-2 flex items-center justify-around premium-shadow">
                    {navItems.map((item) => {
                        const isActive =
                            item.href === "/liff"
                                ? pathname === "/liff"
                                : pathname.startsWith(item.href);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-300 min-w-[60px] ${isActive
                                        ? "bg-primary/10 text-primary scale-105"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110" : ""}`} />
                                <span className="text-[10px] font-bold leading-none">{item.label}</span>
                                {isActive && (
                                    <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
