import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";

const productDetails = {
  pant: { category: "Bottomwear", color: "#dbeafe", accent: "#1d4ed8" },
  shirt: { category: "Topwear", color: "#fef3c7", accent: "#b45309" },
  shoe: { category: "Footwear", color: "#dcfce7", accent: "#15803d" },
};

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/");
        setProducts(response.data);
      } catch (requestError) {
        console.error(requestError);
        setError("We could not load the collection. Please check that the server is running.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  function toggleSavedProduct(product) {
    setSavedProducts((currentProducts) =>
      currentProducts.includes(product)
        ? currentProducts.filter((item) => item !== product)
        : [...currentProducts, product],
    );
  }

  return (
    <div className="App">
      <Navbar />
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="product-grid">
          {products.map((product) => {
            const details = productDetails[product];
            return (
              <div
                key={product}
                className={`product-card ${savedProducts.includes(product) ? "saved" : ""}`}
                style={{ backgroundColor: details.color }}
                onClick={() => toggleSavedProduct(product)}
              >
                <h2>{product}</h2>
                <p>{details.category}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};  
export default App;
