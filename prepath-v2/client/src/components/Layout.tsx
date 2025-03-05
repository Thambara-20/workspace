import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)] pt-16">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            {children}
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}