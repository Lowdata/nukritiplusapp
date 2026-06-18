"use client";

import Link from "next/link";
import { Search, Bell, User } from "lucide-react";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/70 backdrop-blur-xl shadow-lg border-b border-white/5" : "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-3xl font-black text-primary tracking-tighter drop-shadow-lg">
            NUKRITI+
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/80">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/browse" className="hover:text-foreground transition-colors">Browse</Link>
            <Link href="/year" className="hover:text-foreground transition-colors">By Year</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/search" className="text-foreground/80 hover:text-foreground transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          <button className="text-foreground/80 hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <Link href="/admin/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
