"use client";

import Link from "next/link";
import { Heart, Package } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useFavorites } from "@/lib/store";

export function Header() {
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/98 backdrop-blur-sm">
      <div className="container flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground no-underline transition-opacity hover:opacity-80"
        >
          <Package className="h-6 w-6 text-accent" aria-hidden />
          <span className="text-lg font-semibold tracking-tight">ProductHub</span>
        </Link>

        <div className="flex items-center gap-6">
          {favorites.length > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-foreground">
              <Heart className="h-4 w-4 fill-accent text-accent" aria-hidden />
              <span>{favorites.length}</span>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
