import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import CartList from "../../components/Cart/CartList";
import CartSummary from "../../components/Cart/CartSummary";
import EmptyCart from "../../components/Cart/EmptyCart";

import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cartItems, loading } = useCart();

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center">
          <h1 className="text-lg font-medium text-gray-600">
            Loading your cart...
          </h1>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-[70vh] max-w-7xl px-6 py-12">
        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <CartList />
            </div>

            {/* Summary */}
            <div>
              <CartSummary />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default CartPage;