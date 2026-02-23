export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border/80 bg-background/80 backdrop-blur-xl px-6 py-4">
        <h1 className="text-lg font-bold tracking-tight">Admin · Marbo9k</h1>
      </header>
      <main className="p-6 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}
