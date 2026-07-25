import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/");
        const data = await res.data;
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>List of Products</h1>
      {products.map((product,index) => {
        return <p key={index}>{product}</p>;
      })}

      <h2 style={{ color: "blue" }}>what are the products?</h2>
    </>
  );
}

export default App;
