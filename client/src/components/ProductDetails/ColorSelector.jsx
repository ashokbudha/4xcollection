const ColorSelector = ({
  variants,
  selectedColor,
  setSelectedColor,
}) => {
  // Get unique colors
  const colors = [
    ...new Set(
      variants.map((variant) => variant.color)
    ),
  ];

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">
        Color
      </h3>

      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`rounded-lg border px-5 py-2 transition ${
              selectedColor === color
                ? "border-black bg-black text-white"
                : "border-gray-300 hover:border-black"
            }`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;