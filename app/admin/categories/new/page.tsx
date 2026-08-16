"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AddCategoryPage() {

  const router = useRouter();

  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [active, setActive] = useState(true);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("categories")
      .insert({
        name,
        slug: slugify(name),
        description,
        active,
      });

    if (error) {

      alert(error.message);

      setLoading(false);

      return;

    }

    router.push("/admin/categories");

    router.refresh();
    setLoading(false);

  }

  return (

    <div className="min-h-screen bg-zinc-950 text-white p-8">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Add Category
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
        >

          <div>

            <label className="block mb-2">
              Category Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
              required
            />

          </div>

          <div>

            <label className="block mb-2">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3"
            />

          </div>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={active}
              onChange={(e) =>
                setActive(e.target.checked)
              }
            />

            Active Category

          </label>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={() =>
                router.push("/admin/categories")
              }
              className="px-6 py-3 rounded-xl border border-zinc-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-xl"
            >
              {loading ? "Saving..." : "Save Category"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}