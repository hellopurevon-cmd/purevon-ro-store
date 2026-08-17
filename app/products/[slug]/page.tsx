"use client";

import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_price: number | null;
  image_url: string | null;
  short_description: string | null;
  description: string | null;
  stock: number;
  category: string | null;
  brand: string | null;
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function ProductDetailsPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    async function loadProduct() {
      const { slug } = await params;
      const supabase = createClient();

      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (data) {
        setProduct(data);
      }
      setLoading(false);
    }

    loadProduct();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-zinc-400">Loading...</p>
      </main>
    );
  }

  if (!product) {
    notFound();
  }

  function handleAddToCart() {
    if (!product) {
      toast.error("Product not found.");
      return;
    }
  
    if (product.stock <= 0) {
      toast.error("out of stock!");
      return;
    }
  
    // 🔥 Add multiple quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image_url: product.image_url,
        stock: product.stock,
      });
    }
  
    toast.success(`${quantity} × ${product.name} added to cart!`);
  }

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseInt(e.target.value);
  
    if (!product) return;
  
    if (!isNaN(val) && val > 0) {
      setQuantity(Math.min(val, product.stock));
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-zinc-900 rounded-2xl overflow-hidden">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                width={700}
                height={700}
                className="w-full h-auto object-contain bg-white p-6"
                unoptimized
              />
            ) : (
              <div className="aspect-square flex items-center justify-center text-zinc-500">
                No Image Available
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.brand && (
              <span className="text-zinc-400 text-sm uppercase tracking-wider">
                {product.brand}
              </span>
            )}
            <h1 className="text-4xl font-bold mt-2">{product.name}</h1>

            <div className="flex items-center gap-4 mt-6">
              <span className="text-4xl font-bold text-yellow-400">
                ₹{product.price}
              </span>
              {product.compare_price && (
                <span className="text-2xl text-zinc-500 line-through">
                  ₹{product.compare_price}
                </span>
              )}
            </div>

            {product.stock > 0 ? (
              <span className="inline-block mt-3 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="inline-block mt-3 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                Out of Stock
              </span>
            )}

            <div className="mt-8 space-y-4">
              {product.short_description && (
                <p className="text-zinc-300 leading-relaxed">
                  {product.short_description}
                </p>
              )}
              {product.description && (
                <p className="text-zinc-400 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {product.category && (
              <p className="mt-4 text-sm text-zinc-500">
                Category: {product.category}
              </p>
            )}

            {/* Quantity + Add to Cart */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2">
                <label className="text-sm text-zinc-400">Qty:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 bg-transparent text-white text-center outline-none"
                />
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="bg-yellow-400 text-black font-semibold px-8 py-4 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>

              <button className="border border-zinc-700 px-8 py-4 rounded-xl hover:border-yellow-400 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}