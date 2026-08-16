import DeleteProductButton from "@/components/admin/DeleteProductButton";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_price: number | null;
  category: string | null;
  brand: string | null;
  stock: number;
  sku: string;
  featured: boolean;
  active: boolean;
  image_url: string | null;
  created_at: string;
};

export default async function ProductsPage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-red-400 text-xl">
        Failed to load products.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Products
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage every product available on Purevon.
          </p>
        </div>

        <Link href="/admin/products/new">
          <button className="rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 font-bold transition">
            + Add Product
          </button>
        </Link>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <p className="text-zinc-400 text-sm">
            Total Products
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {products?.length ?? 0}
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <p className="text-zinc-400 text-sm">
            Active
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {products?.filter((p) => p.active).length}
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <p className="text-zinc-400 text-sm">
            Featured
          </p>

          <h2 className="text-3xl font-bold mt-2 text-yellow-400">
            {products?.filter((p) => p.featured).length}
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <p className="text-zinc-400 text-sm">
            Out Of Stock
          </p>

          <h2 className="text-3xl font-bold mt-2 text-red-400">
            {products?.filter((p) => p.stock <= 0).length}
          </h2>
        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">

        <table className="w-full">

          <thead className="bg-zinc-800">

            <tr className="text-left">

              <th className="px-6 py-4">Image</th>

              <th className="px-6 py-4">Product</th>

              <th className="px-6 py-4">Category</th>

              <th className="px-6 py-4">Price</th>

              <th className="px-6 py-4">Stock</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4">Featured</th>

              <th className="px-6 py-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {products && products.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-16 text-zinc-500"
                >
                  No products found.
                </td>
              </tr>
            )}
            {products?.map((product: Product) => (
                <tr
                  key={product.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/40 transition"
                >
                  <td className="px-6 py-5">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-zinc-700"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 text-xs">
                        No Image
                      </div>
                    )}
                  </td>
  
                  <td className="px-6 py-5">
                    <div className="font-semibold text-white">
                      {product.name}
                    </div>
  
                    <div className="text-xs text-zinc-500 mt-1">
                      SKU : {product.sku}
                    </div>
  
                    <div className="text-xs text-zinc-500">
                      {product.brand || "No Brand"}
                    </div>
                  </td>
  
                  <td className="px-6 py-5">
                    <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                      {product.category || "-"}
                    </span>
                  </td>
  
                  <td className="px-6 py-5">
  
                    <div className="font-semibold">
                      ₹{product.price}
                    </div>
  
                    {product.compare_price && (
                      <div className="text-sm text-zinc-500 line-through">
                        ₹{product.compare_price}
                      </div>
                    )}
  
                  </td>
  
                  <td className="px-6 py-5">
  
                    {product.stock > 10 ? (
                      <span className="text-green-400 font-semibold">
                        {product.stock}
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="text-yellow-400 font-semibold">
                        {product.stock}
                      </span>
                    ) : (
                      <span className="text-red-400 font-semibold">
                        Out
                      </span>
                    )}
  
                  </td>
  
                  <td className="px-6 py-5">
  
                    {product.active ? (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                        Inactive
                      </span>
                    )}
  
                  </td>
  
                  <td className="px-6 py-5">
  
                    {product.featured ? (
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                        Featured
                      </span>
                    ) : (
                      <span className="text-zinc-500">
                        —
                      </span>
                    )}
  
                  </td>
  
                  <td className="px-6 py-5">
  
                    <div className="flex gap-3">
                    <Link
  href={`/admin/products/view/${product.id}`}
>
  <button className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm font-medium">
    View
  </button>
</Link>
                      <Link
                        href={`/admin/products/${product.id}`}
                      >
                        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium">
                          Edit
                        </button>
                      </Link>
  
                      
                      <DeleteProductButton
  id={product.id}
  name={product.name}
/>
  
                    </div>
  
                  </td>
  
                </tr>
              ))}
              </tbody>

              </table>
      
            </div>
      
          </div>
        );
      }