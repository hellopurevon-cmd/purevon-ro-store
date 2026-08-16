"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export interface ProductImage {
  id?: string;
  image_url: string;
  is_main: boolean;
  sort_order: number;
}

interface MultiImageUploadProps {
  value: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}

export default function MultiImageUpload({
  value,
  onChange,
}: MultiImageUploadProps) {
  const supabase = createClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleFiles(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploadedImages: ProductImage[] = [...value];

      for (const file of Array.from(files)) {
        const extension = file.name.split(".").pop();

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${extension}`;

        const filePath = `products/${fileName}`;

        const { error } = await supabase.storage
          .from("products")
          .upload(filePath, file);

        if (error) throw error;

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(filePath);

        uploadedImages.push({
          image_url: data.publicUrl,
          is_main: uploadedImages.length === 0,
          sort_order: uploadedImages.length,
        });
      }
      
      onChange(uploadedImages);
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }
  function setMainImage(index: number) {
    const updatedImages = value.map((image, i) => ({
      ...image,
      is_main: i === index,
    }));
  
    onChange(updatedImages);
  }
  function deleteImage(index: number) {
    const updatedImages = value.filter((_, i) => i !== index);
  
    if (updatedImages.length > 0) {
      const hasMain = updatedImages.some((img) => img.is_main);
  
      if (!hasMain) {
        updatedImages[0].is_main = true;
      }
    }
  
    onChange(updatedImages);
  }
  return (
    <div className="space-y-5">

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFiles}
        className="hidden"
      />

      <div className="rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900 p-8 text-center">

        <h3 className="text-lg font-semibold text-white">
          Product Images
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          Upload one or multiple product images.
        </p>

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="mt-5 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Select Images"}
        </button>

      </div>
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          {value.map((image, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900"
            >

              <div className="relative aspect-square">

                <Image
                  src={image.image_url}
                  alt={`Product ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />

              </div>

              <div className="space-y-2 p-3">

                {image.is_main && (
                  <div className="rounded-lg bg-yellow-400 py-1 text-center text-xs font-bold text-black">
                    ⭐ Main Image
                  </div>
                )}

                <p className="text-center text-xs text-zinc-400">
                  Image {index + 1}
                </p>

                <button
  type="button"
  onClick={() => setMainImage(index)}
  disabled={image.is_main}
  className="w-full rounded-lg border border-zinc-700 py-2 text-xs text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
>
  {image.is_main ? "Main Image" : "Set as Main"}
</button>

<button
  type="button"
  onClick={() => deleteImage(index)}
  className="w-full rounded-lg border border-red-500 py-2 text-xs text-red-400 transition hover:bg-red-500/10"
>
  Delete
</button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}