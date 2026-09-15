const ShippingAddress = ({
  formData,
  handleChange,
}) => {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">
        Shipping Address
      </h2>

      <div className="space-y-5">
        {/* Address */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Address
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House number, street, area..."
            rows={3}
            required
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
          />
        </div>

        {/* City + Province */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Kathmandu"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Province
            </label>

            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-black"
            >
              <option value="">
                Select Province
              </option>

              <option value="Koshi">
                Koshi
              </option>

              <option value="Madhesh">
                Madhesh
              </option>

              <option value="Bagmati">
                Bagmati
              </option>

              <option value="Gandaki">
                Gandaki
              </option>

              <option value="Lumbini">
                Lumbini
              </option>

              <option value="Karnali">
                Karnali
              </option>

              <option value="Sudurpashchim">
                Sudurpashchim
              </option>
            </select>
          </div>
        </div>

        {/* Postal Code */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Postal Code
          </label>

          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="44600"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
          />
        </div>
      </div>
    </section>
  );
};

export default ShippingAddress;