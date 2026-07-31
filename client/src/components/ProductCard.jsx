import { Heart, Star, ChevronDown, ShoppingBag } from "lucide-react";
import trouser from "../assets/images/trouser.jpg";
import pant from "../assets/images/pant.jpg";
import shirt from "../assets/images/shirt.jpg";
import tshirt from "../assets/images/tshirt.jpg";

const handleAddToCart = () => {
  alert("Product added to cart");
};

const products = [
  {
    id: 1,
    title: "Classic Linen Trouser",
    category: "Pants",
    price: "Rs.1000",
    oldPrice: "Rs.1500",
    rating: "4.8",
    reviews: "234",
    badge: "BESTSELLER",
    badgeColor: "bg-orange-500",
    image: trouser,
  },
  {
    id: 2,
    title: "Modern Jeans Pant",
    category: "Pants",
    price: "Rs.1850",
    oldPrice: "Rs.2500",
    rating: "4.9",
    reviews: "89",
    badge: "SALE -23%",
    badgeColor: "bg-red-500",
    image: pant,
  },
  {
    id: 3,
    title: "Vintage Shirt's",
    category: "Tops",
    price: "Rs.1250",
    oldPrice: "Rs.1500",
    rating: "4.7",
    reviews: "56",
    badge: "NEW",
    badgeColor: "bg-green-500",
    image: shirt,
  },
  {
    id: 4,
    title: "Summer T-Shirt",
    category: "tops",
    price: "Rs.750",
    oldPrice: "Rs.1000",
    rating: "4.6",
    reviews: "178",
    badge: "SALE -20%",
    badgeColor: "bg-red-500",
    image: tshirt,
  },
];

function ProductCard() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">
            Featured Collection
          </h2>

          <p className="text-gray-500 mt-2">4 Products</p>
        </div>

        <div className="relative">
          <select className="border border-gray-300 px-5 py-3 pr-10 uppercase text-sm outline-none appearance-none bg-white">
            <option>Featured</option>
            <option>Newest</option>
            <option>Popular</option>
          </select>

          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-10">
        <button className="bg-gray-900 text-white px-6 py-3 text-sm uppercase font-medium">
          All
        </button>

        <button className="border px-6 py-3 text-sm uppercase hover:bg-gray-100">
          Women
        </button>

        <button className="border px-6 py-3 text-sm uppercase hover:bg-gray-100">
          Men
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="group">
            {/* Image */}
            <div className="relative overflow-hidden">
              <div className="h-[420px] bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[420px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 cursor-pointer"
                />

                <div class="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer">
                  <button
                    onClick={() => handleAddToCart()}
                    class="w-full bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-400 transition-colors flex gap-4 justify-center"
                  >
                    Add to Cart
                    <ShoppingBag />
                  </button>
                </div>
              </div>

              {/* Badge */}
              <span
                className={`absolute top-4 left-4 ${product.badgeColor} text-white text-xs px-3 py-1 uppercase`}
              >
                {product.badge}
              </span>

              {/* Wishlist */}
              <button className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white shadow flex items-center justify-center hover:bg-pink-500 hover:text-white transition">
                <Heart size={18} />
              </button>
            </div>

            {/* Product Info */}
            <div className="mt-5">
              <h3 className="font-medium text-lg">{product.title}</h3>

              <p className="uppercase text-sm text-gray-500 mt-1">
                {product.category}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <span className="font-bold text-lg">{product.price}</span>

                {product.oldPrice && (
                  <span className="text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 mt-2 text-sm">
                <Star size={14} fill="#facc15" className="text-yellow-400" />

                <span>{product.rating}</span>

                <span className="text-gray-500">({product.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductCard;
