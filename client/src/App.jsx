import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/";

const productDetails = {
  pant: { category: "Bottomwear", color: "#dbeafe", accent: "#1d4ed8", description: "Comfortable, easy-to-style essentials for every day." },
  shirt: { category: "Topwear", color: "#fef3c7", accent: "#b45309", description: "Versatile layers designed to work with your whole wardrobe." },
  shoe: { category: "Footwear", color: "#dcfce7", accent: "#15803d", description: "Everyday footwear that carries you from morning to night." },
};

function getProductInfo(product) {
  const name = typeof product === "string" ? product : product.name;
  const knownInfo = productDetails[name?.toLowerCase()];

  return {
    id: typeof product === "string" ? product : product.id ?? product.name,
    name: name ?? "Untitled product",
    category: product.category ?? knownInfo?.category ?? "Essential",
    color: product.color ?? knownInfo?.color ?? "#e5e7eb",
    accent: product.accent ?? knownInfo?.accent ?? "#374151",
    description: product.description ?? knownInfo?.description ?? "A thoughtful addition to your everyday collection.",
  };
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [savedProducts, setSavedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function fetchProducts() {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL);
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (requestError) {
      console.error(requestError);
      setError("We could not load the collection. Check that the backend is running, then try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isCurrentRequest = true;

    axios
      .get(API_URL)
      .then((response) => {
        if (isCurrentRequest) {
          setProducts(Array.isArray(response.data) ? response.data : []);
        }
      })
      .catch((requestError) => {
        console.error(requestError);
        if (isCurrentRequest) {
          setError("We could not load the collection. Check that the backend is running, then try again.");
        }
      })
      .finally(() => {
        if (isCurrentRequest) {
          setLoading(false);
        }
      });

    return () => {
      isCurrentRequest = false;
    };
  }, []);

  const collection = useMemo(() => products.map(getProductInfo), [products]);
  const categories = useMemo(
    () => ["All", ...new Set(collection.map((product) => product.category))],
    [collection],
  );

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return collection.filter((product) => {
      const belongsToCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = !query || `${product.name} ${product.category}`.toLowerCase().includes(query);

      return belongsToCategory && matchesSearch;
    });
  }, [activeCategory, collection, searchQuery]);

  function toggleSavedProduct(productId) {
    setSavedProducts((currentProducts) =>
      currentProducts.includes(productId)
        ? currentProducts.filter((id) => id !== productId)
        : [...currentProducts, productId],
    );
  }

  return (
    <main className="app-shell">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onShowAll={() => {
          setSearchQuery("");
          setActiveCategory("All");
        }}
      />

      <section className="hero" id="top">
        <p className="eyebrow">Curated essentials</p>
        <h1>Pieces you will reach for, every day.</h1>
        <p>Discover a small, versatile collection built around comfort and simple, lasting style.</p>
        <a className="primary-button" href="#collection">Shop collection <span aria-hidden="true">↓</span></a>
      </section>

      <section className="collection-section" id="collection">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The collection</p>
            <h2>Explore the collection</h2>
          </div>
          <button className="refresh-button" type="button" onClick={fetchProducts} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="controls" aria-label="Collection filters">
          <label className="search-field">
            <span className="sr-only">Search products</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search the collection"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
          <div className="filter-list">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? "filter-button is-active" : "filter-button"}
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="status-message">Loading products from the backend...</p>}
        {error && (
          <div className="error-state" role="alert">
            <p>{error}</p>
            <button type="button" onClick={fetchProducts}>Try again</button>
          </div>
        )}

        {!loading && !error && visibleProducts.length === 0 && (
          <div className="empty-state">
            <h3>No products found.</h3>
            <p>Try a different search or category.</p>
            <button type="button" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>
              Reset filters
            </button>
          </div>
        )}

        {!loading && !error && visibleProducts.length > 0 && (
          <div className="product-grid">
            {visibleProducts.map((product) => {
              const isSaved = savedProducts.includes(product.id);
              const displayName = product.name.charAt(0).toUpperCase() + product.name.slice(1);

              return (
                <article className="product-card" key={product.id}>
                  <button
                    className="product-art"
                    style={{ backgroundColor: product.color }}
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    aria-label={`View ${displayName}`}
                  >
                    <span style={{ color: product.accent }}>{displayName.slice(0, 1)}</span>
                    <small>{product.category}</small>
                  </button>
                  <div className="product-content">
                    <div>
                      <p className="product-category">{product.category}</p>
                      <h3>{displayName}</h3>
                    </div>
                    <button
                      className={isSaved ? "save-icon is-saved" : "save-icon"}
                      type="button"
                      onClick={() => toggleSavedProduct(product.id)}
                      aria-label={`${isSaved ? "Remove" : "Save"} ${displayName}`}
                      aria-pressed={isSaved}
                    >
                      {isSaved ? "♥" : "♡"}
                    </button>
                  </div>
                  <button className="details-button" type="button" onClick={() => setSelectedProduct(product)}>
                    View details
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {selectedProduct && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelectedProduct(null)}>
          <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Close details">×</button>
            <div className="modal-art" style={{ backgroundColor: selectedProduct.color }}>
              <span style={{ color: selectedProduct.accent }}>{selectedProduct.name.slice(0, 1).toUpperCase()}</span>
            </div>
            <p className="product-category">{selectedProduct.category}</p>
            <h2 id="product-title">{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <button className="primary-button" type="button" onClick={() => toggleSavedProduct(selectedProduct.id)}>
              {savedProducts.includes(selectedProduct.id) ? "Remove from saved" : "Save this piece"}
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
