import "./Navbar.css";
import { useState } from "react";
import { Search, X } from "lucide-react";

function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleSearch = () => {
        if (isSearchOpen) {
            setSearchQuery("");
        }
        setIsSearchOpen((prev) => !prev);
    };

    return (
        <div className="navbar">
            <a className="brand" href="#top">
                4X<span>COLLECTION</span>
            </a>

            <div className="nav-links">
                <a href="#top">ALL</a>
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
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                <button className="login-button">Login</button>
                <button className="signup-button">Sign Up</button>
            </div>
        </div>
    );
}

export default Navbar;