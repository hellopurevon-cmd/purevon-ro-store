import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditCategoryForm from "@/components/admin/EditCategoryForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  // Category fetch karo
  const { data: category, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Edit Category</h1>
            <p className="text-zinc-400 mt-2">Update category details</p>
          </div>
          <a
            href="/admin/categories"
            className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
          >
            ← Back
          </a>
        </div>

        {/* Form */}
        <EditCategoryForm category={category} />
      </div>
    </div>
  );
}