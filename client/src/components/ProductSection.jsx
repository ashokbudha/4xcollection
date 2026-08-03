import React from 'react'
import { ChevronDown } from "lucide-react";


const ProductSection = ({productCount}) => {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Featured
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            Featured Collection
          </h2>

          <p className="mt-3 max-w-2xl text-gray-500">
            Discover our hand-picked collection of premium products selected
            just for you.
          </p>

          <p className="mt-4 text-sm font-medium text-gray-400">
            {productCount} Products
          </p>
        </div>

        {/* Sort */}
        <div className="relative w-full md:w-52">
          <select
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-gray-300
              bg-white
              px-5
              py-3
              pr-10
              text-sm
              font-medium
              text-gray-700
              shadow-sm
              transition
              hover:border-gray-400
              focus:border-gray-900
              focus:outline-none
            "
          >
            <option>Featured</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>
  )
}

export default ProductSection
