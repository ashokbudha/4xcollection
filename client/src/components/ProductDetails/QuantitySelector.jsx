import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({
  quantity,
  setQuantity,
}) => {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">
        Quantity
      </h3>

      <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">
        <button
          onClick={decreaseQuantity}
          disabled={quantity === 1}
          className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Minus size={18} />
        </button>

        <span className="flex h-12 w-14 items-center justify-center border-x border-gray-300 text-lg font-semibold">
          {quantity}
        </span>

        <button
          onClick={increaseQuantity}
          className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;