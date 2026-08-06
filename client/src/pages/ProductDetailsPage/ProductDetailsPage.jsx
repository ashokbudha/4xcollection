import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";

import ProductGallery from "../../components/ProductDetails/ProductGallery";
import ProductInfo from "../../components/ProductDetails/ProductInfo";

import ProductDescription from "../../components/ProductDetails/ProductDescription";
import RelatedProducts from "../../components/ProductDetails/RelatedProducts";

import {
  getProductBySlug,
  getProducts,
} from "../../services/product.service";

const ProductDetailsPage = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
   const fetchProduct = async () => {
  try {
    const response = await getProductBySlug(slug);

    const productData = response.data;

    setProduct(productData);

    // Fetch related products
    const relatedResponse = await getProducts({
      categorySlug: productData.categoryId.slug,
      limit: 4,
    });

    const filteredProducts =
      relatedResponse.data.products.filter(
        (item) => item._id !== productData._id
      );

    setRelatedProducts(filteredProducts);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <h1 className="text-xl font-medium">
            Loading product...
          </h1>
        </div>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <h1 className="text-xl font-medium">
            Product not found.
          </h1>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
  <Navbar />

  <main className="mx-auto max-w-7xl px-6 py-12">
    <div className="grid gap-14 lg:grid-cols-2">
      <ProductGallery product={product} />
      <ProductInfo product={product} />
    </div>

    <ProductDescription
      description={product.description}
    />

    <RelatedProducts
      products={relatedProducts}
    />
  </main>

  <Footer />
</>
  );
};

export default ProductDetailsPage;