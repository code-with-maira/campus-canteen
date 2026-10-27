import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import FoodImage from "./FoodImage.jsx";

export default function Cart() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="empty-cart">
        <span className="empty-icon" aria-hidden="true">🛍️</span>
        <h2>Your cart is taking a study break</h2>
        <p>Add something tasty from today&apos;s menu and it&apos;ll show up here.</p>
        <Link className="button button-primary" to="/menu">Continue shopping</Link>
      </section>
    );
  }

  return (
    <div className="cart-layout">
      <section className="cart-items" aria-label="Items in your cart">
        {items.map((item) => (
          <article className="cart-item" key={item.id}>
            <FoodImage className="food-image" src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h2>{item.name}</h2>
              <p>PKR {item.price.toLocaleString("en-PK")} each</p>
              <button
                className="text-button remove-button"
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                Remove
              </button>
            </div>
            <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
              <button
                type="button"
                aria-label={`Decrease ${item.name} quantity`}
                disabled={item.quantity <= 1}
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                −
              </button>
              <span aria-live="polite">{item.quantity}</span>
              <button
                type="button"
                aria-label={`Increase ${item.name} quantity`}
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <strong className="cart-item-subtotal">
              PKR {(item.price * item.quantity).toLocaleString("en-PK")}
            </strong>
          </article>
        ))}
      </section>

      <aside className="order-summary">
        <h2>Order summary</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>PKR {total.toLocaleString("en-PK")}</strong>
        </div>
        <div className="summary-row">
          <span>Campus pickup</span>
          <strong className="pickup-label">Free</strong>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <strong>PKR {total.toLocaleString("en-PK")}</strong>
        </div>
        <Link className="button button-primary checkout-button" to="/menu">
          Continue shopping
        </Link>
        <button className="text-button clear-button" type="button" onClick={clearCart}>
          Clear cart
        </button>
      </aside>
    </div>
  );
}
