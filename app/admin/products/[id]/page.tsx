import EditProductForm from "@/components/admin/EditProductForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: PageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-5xl mx-auto p-8">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Edit Product
            </h1>

            <p className="text-zinc-400 mt-2">
              Update your product information.
            </p>

          </div>

          <Link href="/admin/products">

            <button className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">

              ← Back

            </button>

          </Link>

        </div>

<EditProductForm product={product} />

</div>

</div>
);
}