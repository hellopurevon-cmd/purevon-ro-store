"use client";

import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

type ProductImage = {
  id: string;
  image_url: string;
  is_main: boolean;
  sort_order: number;
};

type Props = {
  images: ProductImage[];
};

export default function ProductGallery({
  images,
}: Props) {
  const [selectedImage, setSelectedImage] = useState(
    images.find((img) => img.is_main)?.image_url ??
      images[0]?.image_url ??
      ""
  );

  const [open, setOpen] = useState(false);

  const slides = images.map((image) => ({
    src: image.image_url,
  }));

  const currentIndex = Math.max(
    0,
    images.findIndex(
      (img) => img.image_url === selectedImage
    )
  );

  return (
    <div className="flex gap-4">

      {/* Thumbnails */}

      <div className="flex flex-col gap-3">

        {images.map((image) => (

          <button
            key={image.id}
            onClick={() =>
              setSelectedImage(image.image_url)
            }
            className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-white transition ${
              selectedImage === image.image_url
                ? "border-yellow-400"
                : "border-zinc-700"
            }`}
          >

<img
  src={image.image_url}
  alt=""
  className="w-full h-full object-contain bg-white p-1"
/>

          </button>

        ))}

      </div>

      {/* Main Image */}

      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        {selectedImage ? (

<img
src={selectedImage}
alt=""
onClick={() => setOpen(true)}
className="w-full aspect-square object-contain bg-white p-6 cursor-zoom-in"
/>

        ) : (

          <div className="aspect-square flex items-center justify-center text-zinc-500">

            No Image

          </div>

        )}

      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentIndex}
        plugins={[Zoom]}
      />

    </div>
  );
}