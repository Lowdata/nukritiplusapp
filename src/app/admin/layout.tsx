import Link from "next/link";
import { AdminGuard } from "@/components/auth/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen">
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6">
          <Link href="/" className="text-2xl font-black text-primary tracking-tighter">
            NUKRITI+ Admin
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Dashboard</Link>
          <Link href="/admin/videos" className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Manage Videos</Link>
          <Link href="/admin/uploads" className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Upload</Link>
          <Link href="/admin/categories" className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Categories</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
      </div>
    </AdminGuard>
  );
}
