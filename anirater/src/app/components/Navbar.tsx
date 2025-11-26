'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SearchIcon, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Anime List', href: '/anime' },
    { name: 'Profile', href: '/profile' },
    { name: 'Credits', href: '/credits' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
  };

  if (!mounted) return null;

  return (
    <div
      className="
        flex justify-between items-center max-w-5xl mx-auto p-4 
        rounded-lg transition
        bg-pink-200 dark:bg-pink-200
      "
    >
      {/* Nav Links */}
      <div className="flex space-x-4">
        {links.map((link) => (
          <Link key={link.name} href={link.href}>
            <button
              onClick={() => setActiveTab(link.name)}
              className={`${
                activeTab === link.name
                  ? "text-white"
                  : "hover:text-white/60 dark:hover:text-pink-200"
              } relative rounded-full px-3 py-1.5 text-med font-medium transition`}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {activeTab === link.name && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-pink-300 dark:bg-pink-700 mix-blend-overlay"
                  style={{ borderRadius: 9999 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {link.name}
            </button>
          </Link>
        ))}
      </div>

      {/* Right: Search + Toggle */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative w-64">
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <SearchIcon className="h-5 w-5 text-pink-300 dark:text-pink-200" />
          </button>

          <input
            type="text"
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full pl-4 pr-10 py-2 rounded-full
              bg-pink-400 dark:bg-pink-500
              text-white placeholder-pink-200 dark:placeholder-pink-300
              focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500
            "
          />
        </form>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="
            p-2 rounded-full 
            bg-pink-300 dark:bg-pink-500 
            hover:scale-105 transition
          "
        >
          {theme === "light" ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-pink-100" />
          )}
        </button>
      </div>
    </div>
  );
}
