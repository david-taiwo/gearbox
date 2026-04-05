import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Phone } from "lucide-react";

import gearbox_logo from "../../assets/gearbox_logo.png";

// Product categories for the dropdown menu in the navbar
const categories = [
  "Computer & Laptop",
  "Computer Accessories",
  "SmartPhone",
  "Headphone",
  "Mobile Accessories",
  "Gaming Console",
  "Camera & Photo",
  "TV & Homes Appliances",
  "Watches & Accessories",
  "GPS & Navigation",
  "Wearable Technology",
];

// The main nav Links
const navLinks = [
  { label: "Home", path: "/" },
  { label: "Compare", path: "/compare" },
  { label: "Blog", path: "/blog" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact Us", path: "/contsct" },
];

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
      {/* -- Top Row -- */}
      <div className="max-w-[1440px] mx-auto px-15 py-3 flex items-center gap-4">
        {/* logo */}
        <Link to={"/"} className="flex items-center">
          <span className="">
            <img src={gearbox_logo} />
          </span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl mx-auto">
          <div className="relative flex-1 flex items-center">
            <Search className="text-gray-500" strokeWidth={1} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 px-4 py-2 text-md text-gray-500 outline-none focus:border-[#2966DC] "
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
    </header>
  );
}

export default Navbar;
