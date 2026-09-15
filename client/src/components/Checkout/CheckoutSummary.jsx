import OrderItem from "./OrderItem";

const CheckoutSummary = ({
  cartItems,
  cartSubtotal,
}) => {
  const shipping = 0;

  const total = cartSubtotal + shipping;

  return (
    <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-semibold">
        Order Summary
      </h2>

      {/* Items */}
      <div className="divide-y">
        {cartItems.map((item) => (
          <OrderItem
            key={item._id}
            item={item}
          />
        ))}
      </div>

      {/* Price Summary */}
      <div className="mt-6 space-y-4 border-t pt-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>

          <span>
            Rs. {cartSubtotal}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>

          <span className="font-medium text-green-600">
            {shipping === 0
              ? "FREE"
              : `Rs. ${shipping}`}
          </span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>

            <span>
              Rs. {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;