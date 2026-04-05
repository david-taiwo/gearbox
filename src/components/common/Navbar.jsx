import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  ChevronRight,
  Phone,
} from "lucide-react";
import gearbox_logo from "../../assets/gearbox_logo.png";
// ─── DATA ──────────
import { categories, navLinks } from "../../data/categories";

// ─── MEGA MENU COMPONENT ─────────────────────────────────────────────────────
// We pull the mega menu out into its own component to keep Navbar clean.
// It receives the categories data as a prop.

function MegaMenu() {
  // These two states track WHICH category and subcategory the user is hovering.
  // null means nothing is hovered yet.
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  // Find the full category object that matches the currently hovered label
  const activeCategoryData = categories.find((c) => c.label === activeCategory);

  // Find the full subcategory object that matches the currently hovered label
  const activeSubcategoryData = activeCategoryData?.subcategories.find(
    (s) => s.label === activeSubcategory,
  );

  return (
    <div className="absolute top-full left-0 bg-white text-gray-800 shadow-2xl z-50 flex">
      {/* ── LEVEL 1: Main Categories ── */}
      <ul className="w-56 py-2 border-r border-gray-100">
        {categories.map((cat) => (
          <li
            key={cat.label}
            // When the mouse enters a category row, set it as active
            // and reset the subcategory so Level 3 closes
            onMouseEnter={() => {
              setActiveCategory(cat.label);
              setActiveSubcategory(null);
            }}
            className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors
              ${
                activeCategory === cat.label
                  ? "bg-blue-50 text-[#2966DC] font-semibold"
                  : "hover:bg-blue-50 hover:text-[#2966DC] "
              }`}
          >
            <Link
              to={`/products?category=${encodeURIComponent(cat.label)}`}
              className="flex-1"
            >
              {cat.label}
            </Link>
            {cat.subcategories.length > 0 && (
              <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
            )}
          </li>
        ))}
        {/* View all link at the bottom */}
        <li className="border-t border-gray-100 mt-1">
          <Link
            to="/products"
            className="block px-4 py-2 text-sm text-[#2966DC] font-semibold hover:bg-blue-50"
          >
            View all
          </Link>
        </li>
      </ul>

      {/* ── LEVEL 2: Subcategories ── */}
      {/* Only shows when a category is being hovered */}
      {activeCategoryData && (
        <ul className="w-52 py-2 border-r border-gray-100">
          {activeCategoryData.subcategories.map((sub) => (
            <li
              key={sub.label}
              onMouseEnter={() => setActiveSubcategory(sub.label)}
              className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors
                ${
                  activeSubcategory === sub.label
                    ? "bg-blue-50 text-[#2966DC] font-semibold"
                    : "hover:bg-blue-50 hover:text-[#2966DC]"
                }`}
            >
              <Link
                to={`/products?category=${encodeURIComponent(activeCategoryData.label)}&sub=${encodeURIComponent(sub.label)}`}
                className="flex-1"
              >
                {sub.label}
              </Link>
              {sub.items.length > 0 && (
                <ChevronRight className="w-4 h-4 opacity-50" />
              )}
            </li>
          ))}
          {/* View all for this category */}
          <li className="border-t border-gray-100 mt-1">
            <Link
              to={`/products?category=${encodeURIComponent(activeCategoryData.label)}`}
              className="block px-4 py-2 text-sm text-[#2966DC] font-semibold hover:bg-blue-50"
            >
              View all
            </Link>
          </li>
        </ul>
      )}

      {/* ── LEVEL 3: Items ── */}
      {/* Only shows when a subcategory is being hovered */}
      {activeSubcategoryData && (
        <ul className="w-52 py-2">
          {activeSubcategoryData.items.map((item) => (
            <li key={item}>
              <Link
                to={`/products?category=${encodeURIComponent(activeCategoryData.label)}&sub=${encodeURIComponent(activeSubcategory)}&item=${encodeURIComponent(item)}`}
                className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-[#2966DC] transition-colors"
              >
                {item}
              </Link>
            </li>
          ))}
          {/* See more at the bottom */}
          <li className="border-t border-gray-100 mt-1">
            <Link
              to={`/products?category=${encodeURIComponent(activeCategoryData.label)}&sub=${encodeURIComponent(activeSubcategory)}`}
              className="block px-4 py-2 text-sm text-[#2966DC] font-semibold hover:bg-blue-50"
            >
              See more
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

// ─── NAVBAR COMPONENT ────────────────────────────────────────────────────────

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  }

  return (
    <header className="w-full shadow-md sticky top-0 z-50 bg-white">
      {/* ── TOP ROW ── */}
      <div className="max-w-360 mx-auto px-15 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={gearbox_logo} alt="Gearbox Logo" className="h-8" />
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-xl mx-auto">
          <div className="relative flex-1 flex items-center border border-gray-300 rounded-l-md px-3">
            <Search
              className="text-gray-400 w-4 h-4 shrink-0"
              strokeWidth={1.5}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 px-3 py-2 text-sm text-gray-600 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#2966DC] text-white px-6 py-2 rounded-r-md text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-5 shrink-0">
          <Link
            to="/cart"
            className="text-gray-700 hover:text-[#2966DC] transition-colors"
          >
            <ShoppingCart strokeWidth={1.5} />
          </Link>
          <Link
            to="/account/wishlist"
            className="text-gray-700 hover:text-[#2966DC] transition-colors"
          >
            <Heart strokeWidth={1.5} />
          </Link>
          <Link
            to="/login"
            className="text-gray-700 hover:text-[#2966DC] transition-colors"
          >
            <User strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="bg-[#1a1a2e] text-white">
        <div className="max-w-360 mx-auto px-15 py-0 flex items-center justify-between">
          <nav className="flex items-center">
            {/* Home */}
            <Link
              to="/"
              className="px-4 py-3 text-sm font-medium text-[#2966DC] border-b-2 border-[#2966DC]"
            >
              Home
            </Link>

            {/* Products dropdown — the whole div tracks hover */}
            <div
              className="relative"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <button className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                Products <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
              </button>

              {/* MegaMenu renders here, still inside the hover zone */}
              {showMegaMenu && <MegaMenu />}
            </div>

            {/* Rest of nav links */}
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Phone */}
          <span className="text-sm text-gray-300 flex gap-2 items-center">
            <Phone className="w-4 h-4" strokeWidth={1.5} />
            (+234) 901 237 9054
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
