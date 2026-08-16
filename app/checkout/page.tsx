"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const { items, totalPrice, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold">Checkout</h1>
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // 1. Order create karo
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        total: totalPrice,
        status: "pending",
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      })
      .select()
      .single();

    if (error) {
      alert("Failed to place order: " + error.message);
      setLoading(false);
      return;
    }

    // 2. Cart clear karo
    clearCart();

    // 3. Order confirmation page par redirect karo
    router.push(`/order/${order.id}`);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  required
                  value={form.full_name}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">Address *</label>
                <textarea
                  name="address"
                  required
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-zinc-800 pb-4">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain p-1"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
                        No img
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-zinc-400 text-sm">₹{item.price} × {item.quantity}</p>
                  </div>
                  <p className="font-bold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t border-zinc-800">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}