import Link from "next/link";
import { Navbar } from "@/components/navbar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-5 py-10 md:px-8">{children}</main>
      <footer className="mx-auto w-full max-w-5xl px-5 pb-10 pt-4 text-sm text-muted md:px-8">
        <p>
          Built for static publishing with Next.js. <Link href="/articles" className="underline">Start writing</Link>.
        </p>
      </footer>
    </div>
  );
}
