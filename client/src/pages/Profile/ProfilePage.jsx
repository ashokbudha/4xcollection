import {
  UserRound,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

const ProfilePage = () => {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto min-h-[70vh] max-w-5xl px-6 py-12">

        {/* ================= PAGE HEADER ================= */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account and orders.
          </p>
        </div>

        {/* ================================================= */}
        {/* LOGGED OUT */}
        {/* ================================================= */}

        {!isAuthenticated ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border bg-white p-8 shadow-sm">

            <div className="max-w-md text-center">

              {/* Icon */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <UserRound
                  size={36}
                  strokeWidth={1.5}
                  className="text-gray-600"
                />
              </div>

              <h2 className="mt-6 text-2xl font-semibold">
                Welcome to 4X Collection
              </h2>

              <p className="mt-2 text-gray-500">
                Sign in to view your profile, orders,
                wishlist and account information.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

                <Link
                  to="/login"
                  className="rounded-xl bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl border border-black px-8 py-3 font-semibold text-black transition hover:bg-black hover:text-white"
                >
                  Create Account
                </Link>

              </div>
            </div>
          </div>
        ) : (

        /* ================================================= */
        /* LOGGED IN */
        /* ================================================= */

          <div className="grid gap-8 lg:grid-cols-3">

            {/* ================= USER INFO ================= */}

            <section className="rounded-2xl border bg-white p-6 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <UserRound
                    size={30}
                    strokeWidth={1.5}
                    className="text-gray-600"
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-xl font-semibold">
                    {user?.fullName || "User"}
                  </h2>

                  <p className="text-sm text-gray-500">
                    My Account
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-4 border-t pt-6">

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail
                    size={18}
                    className="text-gray-500"
                  />

                  <span className="truncate text-sm text-gray-600">
                    {user?.email || "No email available"}
                  </span>
                </div>

                {/* Phone */}
                {user?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone
                      size={18}
                      className="text-gray-500"
                    />

                    <span className="text-sm text-gray-600">
                      {user.phone}
                    </span>
                  </div>
                )}

              </div>
            </section>

            {/* ================= ACCOUNT MENU ================= */}

            <section className="lg:col-span-2">

              <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

                {/* Orders */}
                <Link
                  to="/orders"
                  className="flex items-center justify-between border-b p-6 transition hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                      <ShoppingBag size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        My Orders
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        View your order history
                      </p>
                    </div>

                  </div>

                  <ChevronRight
                    size={20}
                    className="text-gray-400"
                  />
                </Link>

                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between border-b p-6 transition hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                      <Heart size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        My Wishlist
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        View your saved products
                      </p>
                    </div>

                  </div>

                  <ChevronRight
                    size={20}
                    className="text-gray-400"
                  />
                </Link>

                {/* Settings */}
                <Link
                  to="/profile/settings"
                  className="flex items-center justify-between border-b p-6 transition hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                      <Settings size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Account Settings
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Manage your account information
                      </p>
                    </div>

                  </div>

                  <ChevronRight
                    size={20}
                    className="text-gray-400"
                  />
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-between p-6 text-left transition hover:bg-red-50"
                >
                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                      <LogOut
                        size={20}
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-red-500">
                        Logout
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Sign out of your account
                      </p>
                    </div>

                  </div>

                  <ChevronRight
                    size={20}
                    className="text-red-400"
                  />
                </button>

              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProfilePage;