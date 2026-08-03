import { Link } from "react-router-dom";

const CategoryDropdown = ({ parent, categories }) => {
  // Find all direct children of the parent category
  const childCategories = categories.filter(
    (category) => category.parentId === parent._id
  );

  return (
    <div className="invisible absolute left-0 top-full z-50 mt-2 w-56 rounded-md border border-gray-200 bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
      {/* All Category */}
      <Link
        to={`/category/${parent.slug}`}
        className="block px-5 py-3 text-sm font-medium uppercase text-gray-700 transition hover:bg-gray-100 hover:text-black"
      >
        All {parent.name}
      </Link>

      {/* Divider */}
      {childCategories.length > 0 && (
        <div className="my-1 border-t border-gray-200" />
      )}

      {/* Sub Categories */}
      {childCategories.map((category) => (
        <Link
          key={category._id}
          to={`/category/${parent.slug}/${category.slug}`}
          className="block px-5 py-3 text-sm uppercase text-gray-600 transition hover:bg-gray-100 hover:text-black"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryDropdown;