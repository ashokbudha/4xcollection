import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const {
    cartSubtotal,
    cartItems,
  } = useCart();

  return (
    <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Items
          </span>

          <span>{cartItems.length}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal
          </span>

          <span>
            Rs. {cartSubtotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Shipping
          </span>

          <span className="text-green-600">
            FREE
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span>
            Rs. {cartSubtotal}
          </span>
        </div>

        <Link
          to="/checkout"
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-black py-4 font-semibold text-white transition hover:bg-gray-800"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;