import { useState } from "react";
import { Search, X } from "lucide-react";
import "./Navbar.css";

function Navbar({ searchQuery, onSearchChange, onShowAll }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function toggleSearch() {
    if (isSearchOpen) {
      onSearchChange("");
    }

    setIsSearchOpen((current) => !current);
  }

  function showAllProducts(event) {
    event.preventDefault();
    onShowAll();
  }

  return (
    <div className="navbar">
      <a className="brand" href="#top">
        4X<span>COLLECTION</span>
      </a>

      <div className="nav-links">
        <a href="#collection" onClick={showAllProducts}>ALL</a>
        <a href="#collection">WOMEN</a>
        <a href="#about">MEN</a>
        <a href="#about">SELL</a>
      </div>

      <div className="nav-actions">
        <div className="search-container">
          {isSearchOpen ? (
            <>
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                autoFocus
              />
              <button
                type="button"
                className="search-toggle-button"
                onClick={toggleSearch}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <button
              type="button"
              className="search-toggle-button"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          )}
        </div>
        <button className="login-button" type="button">Login</button>
        <button className="signup-button" type="button">Sign Up</button>
      </div>
    </div>
  );
}

export default Navbar;
