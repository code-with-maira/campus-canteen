import Cart from "../components/Cart.jsx";

export default function CartPage() {
  return (
    <main className="page-shell cart-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">YOUR GOOD STUFF</span>
          <h1>Your cart<span className="heading-period">.</span></h1>
          <p>Almost time for something delicious.</p>
        </div>
      </div>
      <Cart />
    </main>
  );
}
