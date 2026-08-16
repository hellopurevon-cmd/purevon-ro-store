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
};

type Props = {
  product: Product;
};

export default function EditProductForm({
  product,
}: Props) {
  const router = useRouter();

  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);

  const [form, setForm] = useState({
   
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    brand: product.brand ?? "",
    category: product.category ?? "",
    price: product.price,
    compare_price: product.compare_price ?? 0,
    stock: product.stock,
    short_description: product.short_description ?? "",
    description: product.description ?? "",
    active: product.active,
    featured: product.featured,
  });

  useEffect(() => {async function loadImages() {
    const { data } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", product.id)
      .order("sort_order", { ascending: true });
  
    if (data) {
      setProductImages(data);
    }
  }
  
  loadImages();

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

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  }
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("products")
      .update({
        name: form.name,
        slug: form.slug,
        sku: form.sku,
        brand: form.brand,
        category: form.category,
        price: Number(form.price),
        compare_price: Number(form.compare_price),
        stock: Number(form.stock),
        short_description: form.short_description,
        description: form.description,
        active: form.active,
        featured: form.featured,
      })
      .eq("id", product.id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }
    await supabase
  .from("product_images")
  .delete()
  .eq("product_id", product.id);

if (productImages.length > 0) {

  const imagesPayload = productImages.map((img, index) => ({
    product_id: product.id,
    image_url: img.image_url,
    is_main: img.is_main,
    sort_order: index,
  }));

  const { error: imageError } = await supabase
    .from("product_images")
    .insert(imagesPayload);

  if (imageError) {
    alert(imageError.message);
    return;
  }

  await supabase
    .from("products")
    .update({
      image_url:
        productImages.find((img) => img.is_main)?.image_url ?? null,
    })
    .eq("id", product.id);
}

    alert("Product updated successfully.");

    router.push("/admin/products");

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="Slug"
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <input
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="SKU"
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

<div>

<label className="mb-2 block text-sm font-semibold">
  Category
</label>

<select
  name="category"
  value={form.category}
  onChange={(e) =>
    setForm((prev) => ({
      ...prev,
      category: e.target.value,
    }))
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

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <input
            type="number"
            name="compare_price"
            value={form.compare_price}
            onChange={handleChange}
            placeholder="Compare Price"
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
          />

        </div>

      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

        <textarea
          name="short_description"
          value={form.short_description}
          onChange={handleChange}
          rows={3}
          placeholder="Short Description"
          className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 mb-5"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={8}
          placeholder="Full Description"
          className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
        />

      </div>

      <div className="flex items-center gap-8">

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />

          Active

        </label>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />

          Featured

        </label>

      </div>

<div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

  <h2 className="text-2xl font-semibold mb-6">
    Product Images
  </h2>

  <MultiImageUpload
    value={productImages}
    onChange={setProductImages}
  />

</div>
      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-xl"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

    </form>
  );
}