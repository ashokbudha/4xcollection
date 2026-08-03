import Navbar from "../../components/Navbar/Navbar"
import Hero from "../../components/Hero"
import Footer from "../../components/Footer"
import FeaturedProduct  from "../../components/FeaturedProduct"
import { useEffect, useState } from "react";
import { getProducts } from "../../services/product.service";

const Home = () => {
const [featuredProducts, setFeaturedProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchFeaturedProducts = async () => {
    try {
      const response = await getProducts({
        featured: true,
      });
           setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchFeaturedProducts();
}, []);

console.log("featuredProducts:", featuredProducts);
console.log("loading:", loading);

  return (
    <div>
      <Navbar/>
      <Hero/>
      <FeaturedProduct  products={featuredProducts} loading={loading} />
      <h1>hello</h1>
      <Footer/>
    </div>
  )
}

export default Home
