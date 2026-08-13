import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const isLoggedIn = !!session;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar for logged in users */}
      {isLoggedIn && (
        <aside className="w-64 bg-gray-900 text-white flex flex-col">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-semut-gold">SEMUT Admin</h2>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-800">
              Dashboard
            </Link>
            <Link href="/admin/berita" className="block px-4 py-2 rounded hover:bg-gray-800">
              Kelola Berita
            </Link>
            <Link href="/admin/acara" className="block px-4 py-2 rounded hover:bg-gray-800">
              Kelola Acara
            </Link>
          </nav>
          <div className="p-4 border-t border-gray-800 text-sm">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Kembali ke Web
            </Link>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {isLoggedIn && (
          <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-end px-6">
            <form action="/api/auth/logout" method="POST">
              <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-700">
                Logout
              </button>
            </form>
          </header>
        )}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
