import { useEffect, useState } from "react";

const ProductGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (product?.thumbnail) {
      setSelectedImage(product.thumbnail);
    }
  }, [product]);

  // Later you'll replace this with product.images
  const images = [
    product.thumbnail,
    product.thumbnail,
    product.thumbnail,
    product.thumbnail,
  ];

  return (
    <div className="flex gap-5">
      {/* Thumbnails */}
      <div className="flex flex-col gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-xl border-2 transition ${
              selectedImage === image
                ? "border-black"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="h-24 w-20 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={selectedImage}
          alt={product.name}
          className="h-[700px] w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default ProductGallery;