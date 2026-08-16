"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Props = {
  id: string;
  name: string;
};

export default function DeleteProductButton({
  id,
  name,
}: Props) {
  const router = useRouter();

  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${name}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    setLoading(true);

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Product deleted successfully.");

    router.refresh();
}
return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-600 hover:bg-red-500 disabled:bg-red-400 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium text-white transition"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}