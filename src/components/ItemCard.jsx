import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import FoodImage from "./FoodImage.jsx";

export default function ItemCard({ item }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const { addItem } = useCart();

  return (
    <article className="food-card">
      <div className="food-image-wrap">
        <FoodImage className="food-image" src={item.image} alt={item.name} loading="lazy" />
        <span className="category-pill">{item.category}</span>
        <button
          className={`favourite-button${isFavourite ? " is-favourite" : ""}`}
          type="button"
          aria-label={`${isFavourite ? "Remove" : "Add"} ${item.name} ${isFavourite ? "from" : "to"} favourites`}
          aria-pressed={isFavourite}
          onClick={() => setIsFavourite((favourite) => !favourite)}
        >
          <span aria-hidden="true">{isFavourite ? "♥" : "♡"}</span>
        </button>
      </div>
      <div className="food-card-body">
        <div className="food-card-heading">
          <h2>{item.name}</h2>
          <span className={`availability${item.available ? "" : " unavailable"}`}>
            <span aria-hidden="true" />
            {item.available ? "Available" : "Unavailable"}
          </span>
        </div>
        <p className="food-description">{item.description}</p>
        <div className="food-card-bottom">
          <strong className="price">PKR {item.price.toLocaleString("en-PK")}</strong>
          <div className="card-actions">
            <Link className="button button-outline button-small" to={`/item/${item.id}`}>
              Details
            </Link>
            <button
              className="button button-primary button-small"
              type="button"
              onClick={() => addItem(item)}
              disabled={!item.available}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
