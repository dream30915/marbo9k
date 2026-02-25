"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
        <main className="p-5 pb-8 min-h-screen">
            <div className="mb-8 mt-4">
                <h2 className="text-2xl font-extrabold tracking-tight">ติดต่อเรา</h2>
                <p className="text-muted-foreground text-sm font-medium mt-1">เราพร้อมให้บริการคุณ</p>
            </div>

            <div className="space-y-4">
                {/* LINE OA Card */}
                <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -mr-6 -mt-6 blur-xl" />
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-4">
                            <MessageCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="font-bold text-lg mb-1">LINE Official Account</h3>
                        <p className="text-muted-foreground text-sm mb-4">แชทกับเราได้เลยผ่าน LINE OA</p>
                        <Button
                            className="rounded-full bg-green-500 hover:bg-green-600 text-white font-bold h-11 px-6 shadow-lg shadow-green-500/20"
                            onClick={() => window.open("https://line.me", "_blank")}
                        >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            แชทเลย
                        </Button>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="glass-card rounded-2xl p-4 text-center">
                        <p className="text-2xl mb-1">🕐</p>
                        <p className="font-bold text-sm">เวลาทำการ</p>
                        <p className="text-muted-foreground text-xs mt-1">09:00 - 21:00</p>
                    </div>
                    <div className="glass-card rounded-2xl p-4 text-center">
                        <p className="text-2xl mb-1">📦</p>
                        <p className="font-bold text-sm">จัดส่ง</p>
                        <p className="text-muted-foreground text-xs mt-1">ทุกวัน 1-3 วัน</p>
                    </div>
                </div>

                {/* FAQ */}
                <div className="glass-card rounded-2xl p-6">
                    <h3 className="font-bold mb-4">คำถามที่พบบ่อย</h3>
                    <div className="space-y-3">
                        <div className="pb-3 border-b border-border/50">
                            <p className="font-semibold text-sm">สินค้าเป็นของแท้ไหม?</p>
                            <p className="text-muted-foreground text-xs mt-1">ของแท้ 100% ทุกชิ้น พร้อมรับประกันคุณภาพ</p>
                        </div>
                        <div className="pb-3 border-b border-border/50">
                            <p className="font-semibold text-sm">จัดส่งกี่วัน?</p>
                            <p className="text-muted-foreground text-xs mt-1">จัดส่งภายใน 1-3 วันทำการ ทั่วประเทศไทย</p>
                        </div>
                        <div>
                            <p className="font-semibold text-sm">คืนสินค้าได้ไหม?</p>
                            <p className="text-muted-foreground text-xs mt-1">คืนสินค้าได้ภายใน 7 วัน หากสินค้ามีปัญหา</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
