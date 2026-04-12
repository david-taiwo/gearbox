import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryCard from "../ui/CategoryCard";
import { categorySlides } from "../../data/categorySlides";

function CategorySection() {
  // useRef gives us direct access to the scrollable div
  const scrollRef = useRef(null);

  // How many pixels to scroll per arrow click
  const SCROLL_AMOUNT = 300;

  function scrollLeft() {
    scrollRef.current.scrollBy({
      left: -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    scrollRef.current.scrollBy({
      left: SCROLL_AMOUNT,
      behavior: "smooth",
    });
  }

  return (
    <section className="w-full bg-white py-10 border-t border-gray-100">
      <div className="max-w-360 mx-auto px-15">
        {/* ── Section Header ── */}
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Shop with Categories
        </h2>

        {/* ── Carousel wrapper ── */}
        {/* relative here so the arrow buttons can be positioned against it */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center hover:bg-[#2966DC] hover:text-white hover:border-[#2966DC] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scrollable row */}
          {/* overflow-x-auto enables horizontal scroll */}
          {/* scrollbar-hide hides the scrollbar visually */}
          {/* flex + gap lays out the cards in a row */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth px-2 py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categorySlides.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center hover:bg-[#2966DC] hover:text-white hover:border-[#2966DC] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
