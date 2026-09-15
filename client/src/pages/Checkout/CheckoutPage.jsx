import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

import CheckoutForm from "../../components/checkout/CheckoutForm";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";

import { useCart } from "../../context/CartContext";

const CheckoutPage = () => {
  const { cartItems, cartSubtotal, loading } = useCart();

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center">
          <h1 className="text-lg font-medium text-gray-600">
            Loading checkout...
          </h1>
        </main>

        <Footer />
      </>
    );
  }

  // Prevent checkout with empty cart
  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              Your cart is empty
            </h1>

            <p className="mt-2 text-gray-500">
              Add some products before proceeding to checkout.
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your order
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Order Summary */}
          <div>
            <CheckoutSummary
              cartItems={cartItems}
              cartSubtotal={cartSubtotal}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CheckoutPage;