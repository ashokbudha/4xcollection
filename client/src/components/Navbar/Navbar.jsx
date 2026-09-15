import {
  ShoppingBag,
  Search,
  Heart,
  UserRound,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getCategories } from "../../services/category.service";

import NavbarItem from "./NavbarItem";
import CategoryDropdown from "./CategoryDropdown";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();

        setCategories(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const parentCategories = categories.filter(
    (category) => category.parentId === null
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-[0.35em] text-black"
        >
          4X<span className="font-light">COLLECTION</span>
        </Link>

        {/* ================= NAVIGATION ================= */}
        <nav className="hidden items-center gap-10 md:flex">

          {/* All */}
          <Link
            to="/"
            className="border-b-2 border-black pb-1 text-sm font-medium uppercase tracking-wider"
          >
            All
          </Link>

          {/* Categories */}
          <div className="flex items-center gap-8">
            {parentCategories.map((category) => (
              <NavbarItem
                key={category._id}
                category={category}
              >
                <CategoryDropdown
                  parent={category}
                  categories={categories}
                />
              </NavbarItem>
            ))}
          </div>
        </nav>

        {/* ================= ACTIONS ================= */}
        <div className="flex items-center gap-5">

          {/* Search */}
          <Link
            to="/search"
            className="text-gray-700 transition hover:text-black"
            aria-label="Search"
          >
            <Search
              size={20}
              strokeWidth={1.8}
            />
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="text-gray-700 transition hover:text-red-500"
            aria-label="Wishlist"
          >
            <Heart
              size={20}
              strokeWidth={1.8}
            />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="text-gray-700 transition hover:text-black"
            aria-label="Cart"
          >
            <ShoppingBag
              size={20}
              strokeWidth={1.8}
            />
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="text-gray-700 transition hover:text-black"
            aria-label="Profile"
          >
            <UserRound
              size={20}
              strokeWidth={1.8}
            />
          </Link>

          {/* Logout */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="hidden text-sm font-medium text-gray-600 transition hover:text-black lg:block"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;