import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const NavbarItem = ({ category, children }) => {
  return (
    <div className="group relative">
      <Link
        to={`/category/${category.slug}`}
        className="flex items-center gap-1 py-2 text-sm font-medium uppercase tracking-wider hover:text-black"
      >
        {category.name}

        {children && (
          <ChevronDown
            size={16}
            className="transition group-hover:rotate-180"
          />
        )}
      </Link>

      {children}
    </div>
  );
};

export default NavbarItem;