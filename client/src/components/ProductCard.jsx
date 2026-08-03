import { Heart, ShoppingBag, Star } from "lucide-react";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    alert("Product added to cart");
  };

  return (
    <div className="group overflow-hidden rounded-2xl bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Wishlist */}
        <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-red-500 hover:text-white">
          <Heart size={18} />
        </button>

        {/* Add To Cart Overlay */}
        <div className="absolute inset-0 flex items-end bg-black/10 p-5 opacity-0 transition duration-500 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-gray-900 transition hover:bg-orange-500 hover:text-white"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-3 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
            {product.categoryId?.name}
          </p>

          <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">
            Rs. {product.variants?.[0]?.price}
          </span>

          {/* Future Discount Price */}
          {/* <span className="text-gray-400 line-through">
              Rs. {product.oldPrice}
          </span> */}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Star
            size={15}
            className="fill-yellow-400 text-yellow-400"
          />

          <span>4.8</span>

          <span className="text-gray-400">(128)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;