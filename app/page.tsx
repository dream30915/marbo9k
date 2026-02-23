import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Marbo9k E-Commerce</h1>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/liff">หน้าร้าน (LIFF)</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin">Admin Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
