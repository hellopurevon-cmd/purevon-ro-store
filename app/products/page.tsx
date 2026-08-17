"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SearchBar from "@/components/SearchBar";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_price: number | null;
  image_url: string | null;
  short_description: string | null;
  featured: boolean;
  category: string | null;
  stock: number;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

function ProductsContent() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      // 1. Categories load karo
      const { data: categoriesData } = await supabase
        .from("categories")
        .select("id, name, slug")
        .eq("active", true)
        .order("name");

      if (categoriesData) {
        setCategories(categoriesData);
      }

      // 2. Products load karo
      let query = supabase
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
          featured,
          category,
          stock
          `
        )
        .eq("active", true);

      // Search filter
      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }

      // Category filter
      if (selectedCategory !== "all") {
        const selectedCategoryObj = categoriesData?.find(
          (cat) => cat.slug === selectedCategory
        );

        if (selectedCategoryObj) {
          query = query.eq("category", selectedCategoryObj.name);
        }
      }

      // Sort
      switch (sortBy) {
        case "newest":
          query = query.order("created_at", { ascending: false });
          break;

        case "oldest":
          query = query.order("created_at", { ascending: true });
          break;

        case "price_low":
          query = query.order("price", { ascending: true });
          break;

        case "price_high":
          query = query.order("price", { ascending: false });
          break;

        case "name_asc":
          query = query.order("name", { ascending: true });
          break;

        default:
          query = query.order("created_at", { ascending: false });
      }

      const { data: productsData } = await query;

      setProducts((productsData as Product[]) || []);
      setLoading(false);
    }

    loadData();
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header with Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold">RO Spare Parts</h1>

            <p className="text-zinc-400 mt-1">
              Original compatible RO filters and spare parts for your purifier.
            </p>
          </div>

          <SearchBar />
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-6 bg-zinc-900 rounded-2xl border border-zinc-800 p-4">

          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-zinc-400">
              Category:
            </label>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white outline-none focus:border-yellow-400 min-w-[150px]"
            >
              <option value="all">All Categories</option>

              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-zinc-400">
              Sort:
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white outline-none focus:border-yellow-400 min-w-[150px]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(selectedCategory !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                window.history.pushState({}, "", "/products");
              }}
              className="text-zinc-400 hover:text-white text-sm underline ml-auto"
            >
              Clear All Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <p className="text-zinc-500 text-sm mb-6">
          {products.length} product
          {products.length !== 1 ? "s" : ""} found
          {searchQuery && ` for "${searchQuery}"`}
        </p>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20 text-zinc-400">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-zinc-500">
              No products found
            </p>

            <p className="text-zinc-600 mt-2">
              Try adjusting your filters or search.
            </p>
          </div>
        ) : (
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
                  {product.category && (
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">
                      {product.category}
                    </span>
                  )}

                  <h2 className="font-semibold text-lg line-clamp-2 mt-1">
                    {product.name}
                  </h2>

                  <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                    {product.short_description}
                  </p>

                  <div className="flex items-center gap-3 mt-5">
                    <span className="text-2xl font-bold">
                      ₹{product.price}
                    </span>

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
        )}
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-zinc-950 text-white">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center py-20 text-zinc-400">
              Loading products...
            </div>
          </div>
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}