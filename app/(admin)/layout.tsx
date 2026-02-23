/**
 * Layout สำหรับ Admin Dashboard
 * ออกแบบสำหรับแสดงผลบนจอคอมพิวเตอร์
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background px-6 py-4">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
