import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Categories</h1>
          <p className="text-zinc-400 mt-2">Manage all product categories.</p>
        </div>
        <Link href="/admin/categories/new">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold">
            + Add Category
          </button>
        </Link>
      </div>

      <div className="rounded-2xl border border-zinc-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="text-left px-6 py-4">Image</th>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Slug</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category.id} className="border-t border-zinc-800 hover:bg-zinc-900">
                <td className="px-6 py-4">
                  {category.image_url ? (
                    <img
                      src={category.image_url}
                      alt={category.name}
                      className="w-12 h-12 rounded-xl object-cover border border-zinc-700 bg-white"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 text-xs">
                      No img
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium">{category.name}</td>
                <td className="px-6 py-4 text-zinc-400">{category.slug}</td>
                <td className="px-6 py-4">
                  {category.active ? (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <Link href={`/admin/categories/${category.id}`}>
                      <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium">
                        Edit
                      </button>
                    </Link>
                    <DeleteCategoryButton id={category.id} name={category.name} />
                  </div>
                </td>
              </tr>
            ))}

            {categories?.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-zinc-500">
                  No Categories Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}