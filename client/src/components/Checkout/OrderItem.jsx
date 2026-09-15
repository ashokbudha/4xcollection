const OrderItem = ({ item }) => {
  const selectedVariant =
    item.productId?.variants?.find(
      (variant) =>
        variant._id?.toString() ===
        item.variantId?.toString()
    );

    console.log("item",item);
    console.log(" selected variant",selectedVariant)

  return (
    <div className="flex gap-4 border-b py-4 last:border-b-0">
      {/* Image */}
      <img
        src={item.productId?.thumbnail}
        alt={item.productId?.name}
        className="h-20 w-16 rounded-lg object-cover"
      />

      {/* Product */}
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-medium">
          {item.productId?.name}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {selectedVariant?.color || "Color"}{" "}
          /{" "}
          {selectedVariant?.size || "Size"}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Qty: {item.quantity}
        </p>
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="font-semibold">
          Rs. {item.unitPrice * item.quantity}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Rs. {item.unitPrice} each
        </p>
      </div>
    </div>
  );
};

export default OrderItem;