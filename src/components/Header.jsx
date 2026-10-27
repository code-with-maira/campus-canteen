import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { totalQuantity } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Campus Canteen home" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">cc</span>
          <span>
            <strong>campus canteen</strong>
            <small>GOOD FOOD. GOOD DAYS.</small>
          </span>
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <NavLink
            to="/menu"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            onClick={closeMenu}
          >
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => `nav-link cart-link${isActive ? " active" : ""}`}
            onClick={closeMenu}
            aria-label={`Cart, ${totalQuantity} ${totalQuantity === 1 ? "item" : "items"}`}
          >
            <span aria-hidden="true">🛒</span> Cart
            <span className="cart-count" aria-live="polite">{totalQuantity}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
