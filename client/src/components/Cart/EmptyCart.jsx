import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="rounded-2xl border border-dashed py-20 text-center">
      <ShoppingBag
        size={60}
        className="mx-auto text-gray-400"
      />

      <h2 className="mt-6 text-2xl font-semibold">
        Your cart is empty
      </h2>

      <p className="mt-3 text-gray-500">
        Looks like you haven't added anything yet.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block rounded-lg bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;