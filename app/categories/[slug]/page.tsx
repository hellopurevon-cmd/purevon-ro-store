import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// ✅ Dynamic Metadata Generate karo
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${category.name} — Purevon RO Spare Parts`,
    description: category.description || `Buy ${category.name} RO filters and spare parts at Purevon. Best prices, original quality.`,
    openGraph: {
      title: `${category.name} — Purevon`,
      description: category.description || `Shop ${category.name} RO spare parts.`,
      images: category.image_url ? [category.image_url, ...previousImages] : previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} — Purevon`,
      description: category.description || `Shop ${category.name} RO spare parts.`,
      images: category.image_url ? [category.image_url] : [],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  // 1. Category fetch karo
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!category) {
    notFound();
  }

  // 2. Is category ke products fetch karo
  const { data: products } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      price,
      compare_price,
      image_url,
      short_description,
      stock
      `
    )
    .eq("category", category.name)
    .eq("active", true)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Header */}
        <div className="mb-12">
          {category.image_url ? (
            <div className="relative w-full h-64 rounded-3xl overflow-hidden mb-6 bg-zinc-900 border border-zinc-800">
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h1 className="text-5xl font-bold">{category.name}</h1>
                {category.description && (
                  <p className="text-zinc-300 mt-3 text-lg max-w-2xl">
                    {category.description}
                  </p>
                )}
                <p className="text-zinc-400 mt-2">
                  {products?.length || 0} products
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-5xl font-bold">{category.name}</h1>
              {category.description && (
                <p className="text-zinc-300 mt-3 text-lg max-w-2xl">
                  {category.description}
                </p>
              )}
              <p className="text-zinc-400 mt-2">
                {products?.length || 0} products
              </p>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-yellow-400 transition"
              >
                <div className="aspect-square bg-zinc-800 overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-semibold text-lg line-clamp-2">
                    {product.name}
                  </h2>
                  <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                    {product.short_description}
                  </p>
                  <div className="flex items-center gap-3 mt-5">
                    <span className="text-2xl font-bold">₹{product.price}</span>
                    {product.compare_price && (
                      <span className="text-zinc-500 line-through">
                        ₹{product.compare_price}
                      </span>
                    )}
                  </div>
                  {product.stock <= 0 && (
                    <span className="mt-3 inline-block bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                      Out of Stock
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-2xl">No products in this category</p>
            <p className="mt-2">Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}