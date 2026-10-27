import { useMemo, useState } from "react";
import MenuList from "../components/MenuList.jsx";
import FoodImage from "../components/FoodImage.jsx";
import useMenuData from "../hooks/useMenuData.js";

export default function Menu() {
  const { menu, loading, error } = useMenuData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(menu.map((item) => item.category))],
    [menu],
  );
  const availableItems = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return menu.filter((item) => {
      const matchesSearch = item.name.toLocaleLowerCase().includes(normalizedSearch);
      const matchesCategory = category === "All" || item.category === category;
      return item.available && matchesSearch && matchesCategory;
    });
  }, [menu, search, category]);

  function resetFilters() {
    setSearch("");
    setCategory("All");
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow"><span aria-hidden="true">✦</span> YOUR CAMPUS, YOUR COMFORT FOOD</span>
          <h1>Big days deserve<br /> <em>good food.</em></h1>
          <p>Freshly made favourites for the in-between moments. Find your next campus craving.</p>
          <a className="button button-light" href="#today-menu">Explore today&apos;s menu <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-sun" />
          <FoodImage
            className="hero-food-image"
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85"
            alt=""
          />
          <span className="hero-note">made fresh<br />for you <span>♡</span></span>
          <span className="hero-sparkle sparkle-one">✳</span>
          <span className="hero-sparkle sparkle-two">✦</span>
        </div>
        <div className="hero-bottom">
          <span><span className="hero-dot" /> Serving the campus community</span>
          <span>Good food, no long detours <span aria-hidden="true">↗</span></span>
        </div>
      </section>

      <section className="menu-section page-shell" id="today-menu">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE GOOD STUFF</span>
            <h2>Today&apos;s menu<span className="heading-period">.</span></h2>
            <p>Made with care. Ready for your next break.</p>
          </div>
          {!loading && !error && (
            <span className="menu-count">{availableItems.length} delicious options</span>
          )}
        </div>

        <div className="menu-toolbar">
          <label className="search-field">
            <span className="visually-hidden">Search menu by food name</span>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for a craving..."
            />
          </label>
          <div className="filter-controls">
            <label htmlFor="category-filter">Category</label>
            <select
              id="category-filter"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((option) => (
                <option key={option} value={option}>{option === "All" ? "All categories" : option}</option>
              ))}
            </select>
            <button className="text-button reset-button" type="button" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>

        {loading ? (
          <div className="message-panel" role="status">Getting the good stuff ready...</div>
        ) : error ? (
          <div className="message-panel error-message" role="alert">
            <h2>We couldn&apos;t load the menu</h2>
            <p>{error} Please refresh the page to try again.</p>
          </div>
        ) : (
          <MenuList items={availableItems} />
        )}
      </section>
    </main>
  );
}
