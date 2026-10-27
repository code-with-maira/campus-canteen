import ItemCard from "./ItemCard.jsx";

export default function MenuList({ items }) {
  if (items.length === 0) {
    return (
      <div className="empty-results" role="status">
        <span className="empty-icon" aria-hidden="true">🍽️</span>
        <h2>No bites found</h2>
        <p>Try a different search or reset your filters to see the full menu.</p>
      </div>
    );
  }

  return (
    <div className="menu-grid">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
