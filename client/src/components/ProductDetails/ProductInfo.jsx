import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";

import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";

const ProductInfo = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log({
      productId: product._id,
      selectedColor,
      selectedSize,
      quantity,
    });
  };

  const handleWishlist = () => {
    console.log("Wishlist");
  };

  return (
    <div className="space-y-8">
      {/* Category */}
      <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
        {product.categoryId?.name}
      </p>

      {/* Product Name */}
      <h1 className="text-4xl font-bold text-gray-900">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        <span className="text-gray-500">
          (128 Reviews)
        </span>
      </div>

      {/* Price */}
      <div>
        <span className="text-4xl font-bold">
          Rs. {product.variants?.[0]?.price}
        </span>
      </div>

      {/* Description */}
      <p className="leading-7 text-gray-600">
        {product.description}
      </p>

      <hr />

      {/* Color */}
      <ColorSelector
        variants={product.variants}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      {/* Size */}
      <SizeSelector
        variants={product.variants}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

      {/* Quantity */}
      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
      />

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-gray-800"
        >
          <ShoppingBag size={20} />
          Add to Cart
        </button>

        <button
          onClick={handleWishlist}
          className="rounded-xl border border-gray-300 p-4 transition hover:border-red-500 hover:text-red-500"
        >
          <Heart size={22} />
        </button>
      </div>

      {/* Additional Info */}
      <div className="space-y-3 border-t pt-6 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>SKU</span>
          <span>{product.sku || "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span>Category</span>
          <span>{product.categoryId?.name}</span>
        </div>

        <div className="flex justify-between">
          <span>Availability</span>
          <span className="font-medium text-green-600">
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;