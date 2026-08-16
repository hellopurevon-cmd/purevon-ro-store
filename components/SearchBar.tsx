"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(searchParams.get("q") || "");

  // 🔥 Debounce — 300ms baad search karega
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        router.push(`/products?q=${encodeURIComponent(query.trim())}`);
      } else {
        router.push("/products");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, router]);

  function clearSearch() {
    setQuery("");
    router.push("/products");
    inputRef.current?.focus();
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-12 pr-12 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-yellow-400 transition"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}