import { Link } from "react-router-dom";

import heroMain from "../assets/hero1.jfif";
import heroBag from "../assets/hero2.jfif";
import heroModel from "../assets/hero3.jfif";

const Hero = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-6 py-20 lg:px-10">
        {/* Left */}
        <div className="w-full lg:w-1/2">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gray-500">
            Summer Collection 2026
          </p>

          <h1 className="text-5xl font-light leading-tight text-gray-900 lg:text-7xl">
            Dress for
            <br />
            <span className="italic">the moment.</span>
          </h1>

          <p className="mt-8 max-w-md text-gray-500 leading-7">
            Curated pieces that move with you. Effortless style meets
            thoughtful craftsmanship for the modern wardrobe.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex gap-4">
            <Link
              to="/products"
              className="bg-black px-7 py-3 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-gray-800"
            >
              Shop Now
            </Link>

            <Link
              to="/lookbook"
              className="border border-gray-300 px-7 py-3 text-sm font-medium uppercase tracking-wider transition hover:border-black"
            >
              View Lookbook
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 border-t pt-8">
            <div>
              <h3 className="text-lg font-semibold">2.4k+</h3>
              <p className="text-sm text-gray-500">Products</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Free</h3>
              <p className="text-sm text-gray-500">
                Shipping over $150
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">30-Day</h3>
              <p className="text-sm text-gray-500">Returns</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative hidden h-[650px] w-1/2 lg:block">
          {/* Decorative circle */}
          <div className="absolute left-10 top-10 h-12 w-12 rounded-full border border-gray-300"></div>

          {/* Bag */}
          <img
            src={heroBag}
            alt="Bag"
            className="absolute left-12 top-32 h-56 w-48 rounded-lg object-cover shadow-lg"
          />

          {/* Main Model */}
          <img
            src={heroMain}
            alt="Model"
            className="absolute right-12 top-0 h-[420px] w-[300px] rounded-lg object-cover shadow-xl"
          />

          {/* Bottom Image */}
          <img
            src={heroModel}
            alt="Fashion"
            className="absolute bottom-0 left-0 h-72 w-56 rounded-lg object-cover shadow-xl"
          />

          {/* Decorative Dot */}
          <div className="absolute bottom-10 right-20 h-5 w-5 rounded-full bg-gray-900"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;