import { Link, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import CartPage from "./pages/CartPage.jsx";
import ItemDetails from "./pages/ItemDetails.jsx";
import Menu from "./pages/Menu.jsx";

function NotFound() {
  return (
    <main className="page-shell">
      <section className="message-panel">
        <span className="eyebrow">Lost on campus?</span>
        <h1>We can&apos;t find that page.</h1>
        <p>Let&apos;s get you back to something delicious.</p>
        <Link className="button button-primary" to="/">
          Back to the menu
        </Link>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
