import { Banknote } from "lucide-react";

const PaymentMethod = ({
  selectedPayment,
  setPaymentMethod,
}) => {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">
        Payment Method
      </h2>

      <button
        type="button"
        onClick={() => setPaymentMethod("cod")}
        className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition ${
          selectedPayment === "cod"
            ? "border-black bg-gray-50"
            : "border-gray-300 hover:border-gray-500"
        }`}
      >
        {/* Radio */}
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
            selectedPayment === "cod"
              ? "border-black"
              : "border-gray-400"
          }`}
        >
          {selectedPayment === "cod" && (
            <div className="h-2.5 w-2.5 rounded-full bg-black" />
          )}
        </div>

        <Banknote size={24} />

        <div>
          <p className="font-semibold">
            Cash on Delivery
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Pay when your order is delivered.
          </p>
        </div>
      </button>

      {/* Future Payment Methods */}
      <p className="mt-4 text-sm text-gray-400">
        More payment methods coming soon.
      </p>
    </section>
  );
};

export default PaymentMethod;