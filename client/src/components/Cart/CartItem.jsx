import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const {
    updateCartItem,
    removeCartItem,
  } = useCart();

  // Find the selected variant
  const selectedVariant = item.productId.variants.find(
    (variant) =>
      variant._id.toString() === item.variantId.toString()
  );

  const increaseQuantity = () => {
    updateCartItem(item._id, item.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateCartItem(item._id, item.quantity - 1);
    }
  };

  const removeItem = () => {
    removeCartItem(item._id);
  };

  return (
    <div className="flex gap-6 rounded-2xl border bg-white p-5 shadow-sm">
      {/* Product Image */}
      <img
        src={item.productId.thumbnail}
        alt={item.productId.name}
        className="h-36 w-28 rounded-xl object-cover"
      />

      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {item.productId.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {selectedVariant?.color} / {selectedVariant?.size}
          </p>

          <p className="mt-3 text-xl font-bold">
            Rs. {item.unitPrice}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center overflow-hidden rounded-lg border">
            <button
              onClick={decreaseQuantity}
              disabled={item.quantity === 1}
              className="p-3 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Minus size={16} />
            </button>

            <span className="px-5 font-medium">
              {item.quantity}
            </span>

            <button
              onClick={increaseQuantity}
              className="p-3 transition hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={removeItem}
            className="text-red-500 transition hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center">
        <span className="text-xl font-bold">
          Rs. {item.unitPrice * item.quantity}
        </span>
      </div>
    </div>
  );
};

export default CartItem;