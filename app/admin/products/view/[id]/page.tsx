import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductGallery from "@/components/admin/ProductGallery";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPreviewPage({
  params,
}: Props) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
    const { data: productImages } = await supabase
  .from("product_images")
  .select("*")
  .eq("product_id", id)
  .order("sort_order", { ascending: true });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto p-8">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Product Preview
            </h1>

            <p className="text-zinc-400 mt-2">
              Customer Preview
            </p>

          </div>

          <div className="flex gap-3">

            <Link
              href={`/admin/products/${product.id}`}
            >
              <button className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl">
                Edit Product
              </button>
            </Link>

            <Link
              href="/admin/products"
            >
              <button className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl">
                Back
              </button>
            </Link>

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

  {/* LEFT SIDE */}

  <div>

  <ProductGallery
    images={productImages ?? []}
  />

</div>

  {/* RIGHT SIDE */}

  <div>

    <div className="mb-3">

      <span className="text-zinc-400">

        {product.brand || "Purevon"}

      </span>

    </div>

    <h2 className="text-5xl font-bold leading-tight">

      {product.name}

    </h2>

    <div className="flex items-center gap-3 mt-6">

      <span className="text-4xl font-bold text-yellow-400">

        ₹{product.price}

      </span>

      {product.compare_price && product.compare_price > 0 && (

        <span className="text-xl text-zinc-500 line-through">

          ₹{product.compare_price}

        </span>

      )}

    </div>

    <div className="flex gap-3 mt-6">

      {product.active ? (

        <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">

          Active

        </span>

      ) : (

        <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full">

          Inactive

        </span>

      )}

      {product.featured && (

        <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full">

          Featured

        </span>

      )}

    </div>

    <div className="mt-10 space-y-4">

      <div className="flex justify-between border-b border-zinc-800 pb-4">

        <span className="text-zinc-400">

          Category

        </span>

        <span>

          {product.category || "-"}

        </span>

      </div>

      <div className="flex justify-between border-b border-zinc-800 pb-4">

        <span className="text-zinc-400">

          SKU

        </span>

        <span>

          {product.sku}

        </span>

      </div>

      <div className="flex justify-between border-b border-zinc-800 pb-4">

        <span className="text-zinc-400">

          Stock

        </span>

        <span>

          {product.stock}

        </span>

      </div>

    </div>

  </div>

</div>

</div>

    </div>

  );
}