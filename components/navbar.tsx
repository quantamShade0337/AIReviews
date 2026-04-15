"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/leaderboard/overall", label: "Overall" },
  { href: "/leaderboard/business", label: "Business" },
  { href: "/leaderboard/developer", label: "Developer" },
  { href: "/leaderboard/consumer", label: "Consumer" },
  { href: "/articles", label: "Articles" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-bg/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="text-base font-semibold tracking-tight">
          AI Reviews
        </Link>
        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                  isActive
                    ? "border-zinc-500 bg-zinc-900 text-text"
                    : "border-transparent text-zinc-300 hover:border-border hover:bg-zinc-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
