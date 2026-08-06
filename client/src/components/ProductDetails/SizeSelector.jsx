const SizeSelector = ({
  variants,
  selectedColor,
  selectedSize,
  setSelectedSize,
}) => {
  // Filter variants by selected color
  const availableVariants = selectedColor
    ? variants.filter(
        (variant) => variant.color === selectedColor
      )
    : variants;

  // Get unique sizes
  const sizes = [
    ...new Set(
      availableVariants.map((variant) => variant.size)
    ),
  ];

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">
        Size
      </h3>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`flex h-12 w-12 items-center justify-center rounded-lg border transition ${
              selectedSize === size
                ? "border-black bg-black text-white"
                : "border-gray-300 hover:border-black"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;