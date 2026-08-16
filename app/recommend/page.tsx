"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string | null;
  short_description: string | null;
};

// 🔥 RO Type Detection Rules (Expert System)
const RO_RULES = [
  {
    keywords: ["kent", "grand", "pearl", "kent grand"],
    compatible: ["Nexus Membrane", "spun filter", "Carbon Filter", "Sediment Filter"],
    label: "Kent Grand / Pearl"
  },
  {
    keywords: ["aquaguard", "aqua", "guard", "ravissant"],
    compatible: ["Aquaguard Membrane", "Carbon Filter", "Sediment Filter"],
    label: "Aquaguard"
  },
  {
    keywords: ["pureit", "pure it", "classic", "advanced"],
    compatible: ["Pureit Membrane", "spun filter", "Carbon Filter"],
    label: "Pureit"
  },
  {
    keywords: ["livpure", "liv pure", "smart", "bolt"],
    compatible: ["Livpure Membrane", "Carbon Filter", "Sediment Filter"],
    label: "Livpure"
  },
  {
    keywords: ["ro", "water", "purifier", "filter"],
    compatible: ["Nexus Membrane", "spun filter", "Carbon Filter", "Sediment Filter"],
    label: "Generic RO"
  }
];

// 🔥 Default recommendations (when no match found)
const DEFAULT_COMPATIBLE = ["Nexus Membrane", "spun filter", "Carbon Filter", "Sediment Filter"];

export default function RecommendPage() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedRO, setDetectedRO] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const ext = file.name.split(".").pop();
      const fileName = `ro-photos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("products").getPublicUrl(fileName);
      setImageUrl(data.publicUrl);

      // 🔥 Detect RO from image
      await detectRO(file.name);

    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function detectRO(fileName: string) {
    setLoading(true);
    setError(null);

    try {
      // 🔥 Step 1: RO type detect karo (from filename)
      let detectedType = "Generic RO";
      let compatibleNames = DEFAULT_COMPATIBLE;

      const lowerFileName = fileName.toLowerCase();

      for (const rule of RO_RULES) {
        for (const keyword of rule.keywords) {
          if (lowerFileName.includes(keyword)) {
            detectedType = rule.label;
            compatibleNames = rule.compatible;
            break;
          }
        }
        if (detectedType !== "Generic RO") break;
      }

      setDetectedRO(detectedType);

      // 🔥 Step 2: Sirf compatible products fetch karo
      const { data: products } = await supabase
        .from("products")
        .select("id, name, slug, price, image_url, short_description")
        .eq("active", true)
        .in("name", compatibleNames)
        .limit(6);

      if (products && products.length > 0) {
        setRecommendations(products);
      } else {
        // 🔥 Fallback: Saare products dikhao agar koi match na ho
        const { data: fallback } = await supabase
          .from("products")
          .select("id, name, slug, price, image_url, short_description")
          .eq("active", true)
          .limit(6);
        setRecommendations(fallback || []);
      }

    } catch (err: any) {
      setError(err.message || "Detection failed");
    } finally {
      setLoading(false);
    }
  }

  function resetDetection() {
    setImageUrl(null);
    setRecommendations([]);
    setDetectedRO(null);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">🔍 RO Doctor</h1>
          <p className="text-zinc-400 mt-4 text-lg max-w-2xl mx-auto">
            Upload your RO photo and get compatible filter recommendations instantly.
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />

            {!imageUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-700 rounded-2xl p-12 cursor-pointer hover:border-yellow-400 transition"
              >
                <p className="text-6xl mb-4">📸</p>
                <p className="text-xl font-semibold">Upload RO Photo</p>
                <p className="text-zinc-500 mt-2">Click or drag to upload</p>
                {uploading && <p className="text-yellow-400 mt-4">Uploading...</p>}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative w-48 h-48 mx-auto bg-white rounded-2xl overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt="RO Photo"
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
                <button
                  onClick={resetDetection}
                  className="text-zinc-400 hover:text-white text-sm underline"
                >
                  Upload Different Photo
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                {error}
              </div>
            )}
          </div>

          {/* Detected RO */}
          {detectedRO && !loading && (
            <div className="mt-6 text-center">
              <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold">
                🎯 Detected: {detectedRO}
              </span>
            </div>
          )}

          {/* Recommendations */}
          {loading && (
            <div className="mt-8 text-center text-zinc-400">
              <p>🔍 Analyzing your RO...</p>
            </div>
          )}

          {recommendations.length > 0 && !loading && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                🎯 Recommended Filters for Your RO
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-yellow-400 transition group"
                  >
                    <div className="aspect-square bg-zinc-800">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                      <p className="text-zinc-400 text-sm line-clamp-2 mt-1">
                        {product.short_description}
                      </p>
                      <p className="text-yellow-400 font-bold mt-3">₹{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!loading && !imageUrl && (
            <div className="mt-8 text-center text-zinc-500 text-sm">
              <p>Upload a clear photo of your RO to get started.</p>
              <p className="mt-1">📷 Front + Side photos work best.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}