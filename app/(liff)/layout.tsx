/**
 * Layout สำหรับ Customer Frontend (LIFF App)
 * ออกแบบสำหรับแสดงผลบนมือถือ
 */
export default function LiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen max-w-lg mx-auto bg-background">
      {children}
    </div>
  );
}
