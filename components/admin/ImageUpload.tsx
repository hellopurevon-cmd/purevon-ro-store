"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({
  value,
  onChange,
}: ImageUploadProps) {
  const supabase = createClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const [preview, setPreview] = useState(value);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const extension = file.name.split(".").pop();

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${extension}`;

      const filePath = `products/${fileName}`;
      const { error } = await supabase.storage
        .from("products")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(filePath);

      const imageUrl = data.publicUrl;

      setPreview(imageUrl);

      onChange(imageUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  function removeImage() {
    setPreview("");
    onChange("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
    return (
      <div className="space-y-4">
  
        {preview ? (
          <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800">
  
            <Image
              src={preview}
              alt="Product Image"
              fill
              className="object-cover"
              unoptimized
            />
  
          </div>
        ) : (
          <div className="flex h-56 w-full items-center justify-center rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-800 text-zinc-500">
  
            No image selected
  
          </div>
        )}
  
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
  
        <div className="flex flex-wrap gap-3">
  
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Choose Image"}
          </button>
  
          {preview && (
            <button
              type="button"
              onClick={removeImage}
              className="rounded-xl border border-red-500 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              Remove
            </button>
          )}
  
        </div>
        </div>
  );
}