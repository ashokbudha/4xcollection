const ProductDescription = ({ description }) => {
  return (
    <section className="mt-20 border-t pt-12">
      <h2 className="mb-6 text-3xl font-bold">
        Product Description
      </h2>

      <div className="max-w-4xl leading-8 text-gray-600">
        {description ? (
          <p>{description}</p>
        ) : (
          <p className="italic text-gray-400">
            No description available.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductDescription;