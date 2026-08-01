import { useState } from "react";
import { ShoppingBag, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Cart from "../pages/Cart/Cart";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  console.log(user);
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold tracking-[0.35em] text-black"
        >
          4X<span className="font-light">COLLECTION</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link
            to="/products"
            className="border-b-2 border-black pb-1 text-sm font-medium uppercase tracking-wider"
          >
            All
          </Link>

          <Link
            to="/products?category=women"
            className="text-sm font-medium uppercase tracking-wider text-gray-600 transition hover:text-black"
          >
            Women
          </Link>

          <Link
            to="/products?category=men"
            className="text-sm font-medium uppercase tracking-wider text-gray-600 transition hover:text-black"
          >
            Men
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button
            className="text-gray-700 transition hover:text-black"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative text-gray-700 transition hover:text-black"
            aria-label="Cart"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>

      

          {isAuthenticated ? (
            <>
              <span className="text-sm font-medium">Hi, {user.fullName}</span>

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-md border border-black px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white lg:block"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hidden rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 lg:block"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onItemCountChange={setCartCount}
      />
    </header>
  );
}

export default Navbar;
