"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-yellow-400 hover:scale-105 transition">
          PUREVON
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 md:gap-6 flex-wrap">
          <Link href="/products" className="hover:text-yellow-400 transition text-sm md:text-base">
            Products
          </Link>
          <Link href="/recommend" className="hover:text-yellow-400 transition font-semibold text-yellow-400 text-sm md:text-base">
            🔍 RO Doctor
          </Link>
          <Link href="/cart" className="hover:text-yellow-400 transition relative text-sm md:text-base">
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-yellow-400 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400 hidden sm:block">
                {user.email?.split("@")[0]}
              </span>
              <button
                onClick={signOut}
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}