"use client";

import MultiImageUpload, {
  ProductImage,
} from "@/components/admin/MultiImageUpload";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Category = {
  id: string;
  name: string;
  slug: string;
};
type ProductForm = {
  name: string;
  brand: string;
  category: string;
  price: string;
  compare_price: string;
  stock: string;
  sku: string;
  short_description: string;
  description: string;
  image_url: string;
  featured: boolean;
  active: boolean;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateSku(name: string) {
  const base = slugify(name).toUpperCase().slice(0, 8) || "PV";
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `${base}-${random}`;
}

export default function AddProductPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    brand: "Purevon",
    category: "RO Spare Parts",
    price: "",
    compare_price: "",
    stock: "0",
    sku: "",
    short_description: "",
    description: "",
    image_url: "",
    featured: false,
    active: true,
  });
  useEffect(() => {

    async function loadCategories() {
  
      const { data } = await supabase
        .from("categories")
        .select("*")
        .eq("active", true)
        .order("name");
  
      if (data) {
        setCategories(data);
      }
  
    }
  
    loadCategories();
  
  }, []);

  function updateField<K extends keyof ProductForm>(
    key: K,
    value: ProductForm[K]
  ) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    setError(null);

    try {
      const name = formData.name.trim();

      if (!name) {
        throw new Error("Product name is required.");
      }

      const sellingPrice = Number(formData.price);

      if (!sellingPrice || sellingPrice <= 0) {
        throw new Error("Selling price is required.");
      }

      const payload = {
        name,
        slug: slugify(name),

        brand: formData.brand || null,

        category: formData.category || null,

        price: sellingPrice,

        compare_price:
          formData.compare_price !== ""
            ? Number(formData.compare_price)
            : null,

        stock:
          formData.stock !== ""
            ? Number(formData.stock)
            : 0,

        sku:
          formData.sku.trim() ||
          generateSku(name),

        short_description:
          formData.short_description.trim() ||
          null,

        description:
          formData.description.trim() ||
          null,

          image_url:
          productImages.find((img) => img.is_main)?.image_url || null,
        featured: formData.featured,

        active: formData.active,
      };

      const { data: insertedProduct, error } = await supabase
  .from("products")
  .insert(payload)
  .select("id")
  .single();

if (error) throw error;

if (productImages.length > 0) {

  const imagesPayload = productImages.map((img, index) => ({
    product_id: insertedProduct.id,
    image_url: img.image_url,
    is_main: img.is_main,
    sort_order: index,
  }));

  const { error: imagesError } = await supabase
    .from("product_images")
    .insert(imagesPayload);

  if (imagesError) throw imagesError;
}

console.log("Insert Success");

      router.push("/admin/products");

      router.refresh();

    } catch (err) {
      console.error(err);

      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong.";

      alert(message);

      setError(message);

    } finally {
      setLoading(false);
    }
    
    }
    
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
        <div className="mx-auto max-w-5xl">

          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Purevon Admin
            </p>

            <h1 className="mt-3 text-4xl font-bold text-yellow-400 md:text-5xl">
              Add New Product
            </h1>

            <p className="mt-3 text-zinc-400">
              Create a new product for the Purevon catalogue.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
          >

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Product Name
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  updateField("name", e.target.value)
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none"
                placeholder="Product Name"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Brand
                </label>

                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) =>
                    updateField("brand", e.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none"
                />
              </div>

              <div>

  <label className="mb-2 block text-sm font-semibold">
    Category
  </label>

  <select
    value={formData.category}
    onChange={(e) =>
      updateField("category", e.target.value)
    }
    className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none"
  >

    <option value="">
      Select Category
    </option>

    {categories.map((category) => (

      <option
        key={category.id}
        value={category.name}
      >
        {category.name}
      </option>

    ))}

  </select>

</div>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  MRP
                </label>

                <input
                  type="number"
                  value={formData.compare_price}
                  onChange={(e) =>
                    updateField(
                      "compare_price",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Selling Price
                </label>

                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    updateField("price", e.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Stock
                </label>

                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    updateField("stock", e.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none"
                />
              </div>

            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">
                SKU (Optional)
              </label>

              <input
                type="text"
                value={formData.sku}
                onChange={(e) =>
                  updateField("sku", e.target.value)
                }
                placeholder="Leave blank for auto SKU"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Short Description
              </label>

              <textarea
                rows={3}
                value={formData.short_description}
                onChange={(e) =>
                  updateField(
                    "short_description",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Description
              </label>

              <textarea
                rows={7}
                value={formData.description}
                onChange={(e) =>
                  updateField(
                    "description",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <label className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    updateField(
                      "featured",
                      e.target.checked
                    )
                  }
                />

                Featured Product

              </label>

              <label className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) =>
                    updateField(
                      "active",
                      e.target.checked
                    )
                  }
                />

                Active Product

              </label>

              <div>
  <label className="mb-2 block text-sm font-semibold text-zinc-200">
    Product Image
  </label>

  <MultiImageUpload
  value={productImages}
  onChange={setProductImages}
/>
</div>

</div>

            <div className="flex justify-end gap-4 pt-4">

              <button
                type="button"
                onClick={() => router.push("/admin/products")}
                className="rounded-xl border border-zinc-700 px-6 py-3 transition hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-yellow-500 px-8 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Product"}
              </button>

            </div>

          </form>

        </div>
      </div>
    );
}