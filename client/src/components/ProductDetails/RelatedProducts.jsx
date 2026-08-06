import ProductGrid from "../ProductGrid";

const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 border-t pt-12">
      <h2 className="mb-8 text-3xl font-bold">
        You May Also Like
      </h2>

      <ProductGrid products={products} />
    </section>
  );
};

export default RelatedProducts;