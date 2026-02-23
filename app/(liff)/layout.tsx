/**
 * Layout สำหรับ LIFF (มือถือ)
 */
export default function LiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen max-w-lg mx-auto bg-background">
      <header className="sticky top-0 z-10 border-b border-border/80 bg-background/80 backdrop-blur-xl px-4 py-3">
        <h1 className="text-center text-lg font-bold tracking-tight">Marbo9k</h1>
      </header>
      {children}
    </div>
  );
}
