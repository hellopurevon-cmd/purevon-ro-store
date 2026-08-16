"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold">Your Cart</h1>
          <p className="text-zinc-400 mt-4">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-block mt-6 bg-yellow-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-4 items-center"
              >
                {/* Image */}
                <div className="w-24 h-24 bg-white rounded-xl overflow-hidden flex-shrink-0">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-contain p-2"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
                      No img
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="font-semibold hover:text-yellow-400 transition">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-yellow-400 font-bold">₹{item.price}</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="text-red-400 hover:text-red-300 text-sm underline"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 text-zinc-400">
              <div className="flex justify-between">
                <span>Items ({totalItems})</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-zinc-800 pt-3 mt-3">
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
            </div>

            {/* 🔥 YAHAN CHANGE HUA HAI — BUTTON AB LINK HAI */}
            <Link href="/checkout" className="w-full mt-6 block">
              <button className="w-full bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-300 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}