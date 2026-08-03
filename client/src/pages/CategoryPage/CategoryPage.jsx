import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/product.service";
import ProductGrid from "../../components/ProductGrid";
import Navbar from "../../components/Navbar/Navbar";
import CategoryHeader from "../../components/CategoryHeader";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const { slug, "*": childSlug } = useParams();
  const title = childSlug ? `${slug} • ${childSlug}` : slug;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categorySlug = childSlug || slug;

        const response = await getProducts({ categorySlug });
        console.log(response.data.products);
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug, childSlug]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <CategoryHeader title={title} productCount={products.length} />
        <ProductGrid products={products} />
      </section>
    </>
  );
};

export default CategoryPage;
