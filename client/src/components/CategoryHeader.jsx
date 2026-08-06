const CategoryHeader = ({
  title,
  productCount,
}) => {
  return (
    <div className="mb-10 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-semibold capitalize">
          {title}
        </h1>

        <p className="mt-2 text-gray-500">
          {productCount} Products
        </p>
      </div>
{/* 
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded border border-gray-300 px-4 py-2 outline-none"
      >
        <option value="featured">Featured</option>
        <option value="newest">Newest</option>
        <option value="priceLow">Price Low → High</option>
        <option value="priceHigh">Price High → Low</option>
      </select> */}
    </div>
  );
};

export default CategoryHeader;