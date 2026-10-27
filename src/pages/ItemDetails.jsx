import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import FoodImage from "../components/FoodImage.jsx";
import useMenuData from "../hooks/useMenuData.js";

export default function ItemDetails() {
  const { id } = useParams();
  const { menu, loading, error } = useMenuData();
  const { addItem } = useCart();
  const item = menu.find((menuItem) => String(menuItem.id) === id);

  if (loading) {
    return <main className="page-shell"><div className="message-panel" role="status">Finding that favourite...</div></main>;
  }

  if (error) {
    return (
      <main className="page-shell">
        <div className="message-panel error-message" role="alert">
          <h1>We couldn&apos;t load this item</h1>
          <p>{error}</p>
          <Link className="button button-outline" to="/menu">Back to menu</Link>
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="page-shell">
        <div className="message-panel">
          <span className="eyebrow">ITEM NOT FOUND</span>
          <h1>That bite isn&apos;t on our menu.</h1>
          <p>It may have moved on. Take a look at what&apos;s fresh today instead.</p>
          <Link className="button button-primary" to="/menu">Back to menu</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell details-page">
      <Link className="back-link" to="/menu"><span aria-hidden="true">←</span> Back to menu</Link>
      <article className="details-card">
        <div className="details-image-wrap">
          <FoodImage className="food-image" src={item.image} alt={item.name} />
          <span className="category-pill">{item.category}</span>
        </div>
        <div className="details-content">
          <span className="eyebrow">A CAMPUS FAVOURITE</span>
          <h1>{item.name}</h1>
          <p className="details-description">{item.description}</p>
          <div className={`details-availability${item.available ? "" : " unavailable"}`}>
            <span aria-hidden="true" /> {item.available ? "Available today" : "Currently unavailable"}
          </div>
          <div className="details-order-row">
            <strong className="details-price">PKR {item.price.toLocaleString("en-PK")}</strong>
            <button
              className="button button-primary"
              type="button"
              onClick={() => addItem(item)}
              disabled={!item.available}
            >
              {item.available ? "Add to cart" : "Unavailable"}
            </button>
          </div>
          <p className="pickup-note"><span aria-hidden="true">⌖</span> Available for easy campus pickup</p>
        </div>
      </article>
    </main>
  );
}
