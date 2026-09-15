import { useState } from "react";
import ShippingAddress from "./ShippingAddress";
import PaymentMethod from "./PaymentMethod";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      console.log("Checkout data:", formData);

      // TODO:
      // Connect this to POST /orders

      toast.success("Checkout information submitted.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Customer Information */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">
          Customer Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
            />
          </div>
        </div>
      </section>

      {/* Shipping Address */}
      <ShippingAddress
        formData={formData}
        handleChange={handleChange}
      />

      {/* Payment Method */}
      <PaymentMethod
        selectedPayment={formData.paymentMethod}
        setPaymentMethod={(paymentMethod) =>
          setFormData((prev) => ({
            ...prev,
            paymentMethod,
          }))
        }
      />

      {/* Place Order */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
};

export default CheckoutForm;