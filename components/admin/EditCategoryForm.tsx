"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  image_url: string | null;
};

type Props = {
  category: Category;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function EditCategoryForm({ category }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description || "");
  const [active, setActive] = useState(category.active);
  const [imageUrl, setImageUrl] = useState(category.image_url || "");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `categories/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("products") // same bucket use kar rahe hain
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("products").getPublicUrl(fileName);
      setImageUrl(data.publicUrl);
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeImage() {
    setImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const slug = slugify(name);

    const { error } = await supabase
      .from("categories")
      .update({
        name,
        slug,
        description: description || null,
        active,
        image_url: imageUrl || null,
      })
      .eq("id", category.id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
      {/* Name */}
      <div>
        <label className="block mb-2 text-sm font-semibold">Category Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 outline-none focus:border-yellow-400"
          required
        />
        <p className="text-xs text-zinc-500 mt-1">Slug: {slugify(name)}</p>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 text-sm font-semibold">Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 outline-none focus:border-yellow-400"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-2 text-sm font-semibold">Category Image</label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {imageUrl ? (
          <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-zinc-700 bg-white">
            <Image src={imageUrl} alt={name} fill className="object-contain p-2" unoptimized />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs hover:bg-red-500"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-6 py-3 rounded-xl border-2 border-dashed border-zinc-700 hover:border-yellow-400 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        )}
      </div>

      {/* Active Checkbox */}
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        Active Category
      </label>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t border-zinc-800">
        <button
          type="button"
          onClick={() => router.push("/admin/categories")}
          className="px-6 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-xl disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}