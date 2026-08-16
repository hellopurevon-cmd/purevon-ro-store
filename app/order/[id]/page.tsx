"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle } from "lucide-react";

type Order = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  total: number;
  status: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  created_at: string;
};

export default function OrderConfirmationPage() {
  const params = useParams();
  const id = params.id as string;
  const supabase = createClient();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setOrder(data);
      }
      setLoading(false);
    }

    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-zinc-400">Loading order details...</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold">Order Not Found</h1>
          <p className="text-zinc-400 mt-4">We couldn't find your order.</p>
          <Link href="/products" className="inline-block mt-6 bg-yellow-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold">Order Placed! 🎉</h1>
          <p className="text-zinc-400 mt-2">Thank you for your order, {order.full_name}!</p>
          <p className="text-zinc-500 text-sm mt-1">Order #{order.id.slice(0, 8).toUpperCase()}</p>
        </div>

        {/* Order Details */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
          {/* Status */}
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <span className="text-zinc-400">Status</span>
            <span className="bg-yellow-500/20 text-yellow-400 px-4 py-1 rounded-full text-sm font-semibold">
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-zinc-400 text-sm mb-3">Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-800 pt-3 mt-3 flex justify-between font-bold">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="border-t border-zinc-800 pt-4">
            <h3 className="text-zinc-400 text-sm mb-2">Shipping Details</h3>
            <p className="text-sm">{order.full_name}</p>
            <p className="text-sm text-zinc-400">{order.address}</p>
            <p className="text-sm text-zinc-400">
              {order.city}, {order.state} - {order.pincode}
            </p>
            <p className="text-sm text-zinc-400 mt-1">📞 {order.phone}</p>
            <p className="text-sm text-zinc-400">✉️ {order.email}</p>
          </div>

          {/* Date */}
          <div className="border-t border-zinc-800 pt-4 text-sm text-zinc-500">
            Ordered on: {new Date(order.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/products">
            <button className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-xl hover:bg-yellow-300 transition">
              Continue Shopping
            </button>
          </Link>
          <Link href={`/order/${order.id}/invoice`}>
            <button className="border border-zinc-700 px-8 py-3 rounded-xl hover:border-yellow-400 transition">
              Download Invoice
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}