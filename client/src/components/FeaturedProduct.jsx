import ProductGrid from "./ProductGrid";
import ProductSection from "./ProductSection";

function FeaturedProductSection({ products, loading }) {
  if (loading) {
    return (
      <section className="py-24 text-center">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading featured products...
        </p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          No featured products found.
        </h2>
        <p className="mt-2 text-gray-500">Please check back later.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      {/* Header */}
      <ProductSection productCount={products.length}/>

      {/* Divider */}
      <div className="my-10 border-b border-gray-200" />

      {/* Products */}
      <ProductGrid products={products} />
    </section>
  );
}

export default FeaturedProductSection;
