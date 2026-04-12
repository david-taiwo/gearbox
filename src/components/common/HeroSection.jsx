import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { promoProduct } from "../../data/promoProduct";
import blue_brushstroke_texture_bg from "../../assets/blue_brushstroke_texture_bg.png";

function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 4000);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  function goToSlide(index) {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsAnimating(false);
    }, 300);
  }

  function goToNext() {
    const nextIndex = (activeIndex + 1) % promoProduct.length;
    goToSlide(nextIndex);
  }

  const slide = promoProduct[activeIndex];

  return (
    <section
      className={`w-full bg-gradient-to-r ${slide.bg} transition-all duration-700`}
    >
      <div className="max-w-360 mx-auto px-15 py-10 flex items-center justify-between relative min-h-105">
        {/* ── LEFT — Text content ── */}
        <div
          className={`flex-1 max-w-lg `}
          //   transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}
        >
          {/* Tag line */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-[#2966DC]"></span>
            <span className="text-[#2966DC] text-xs font-semibold tracking-widest uppercase">
              {slide.tag}
            </span>
          </div>

          {/* Main heading */}
          <h1
            className={`text-4xl font-bold text-gray-900 leading-tight mb-4 transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}
          >
            {slide.title}
          </h1>

          {/* Description */}
          <p
            className={`text-gray-600 text-base mb-8 leading-relaxed transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}
          >
            {slide.description}
          </p>

          {/* CTA Button */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#2966DC] text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            SHOP NOW <ArrowRight className="w-4 h-4" />
          </Link>

          {/* ── Dot indicators ── */}
          <div className="flex items-center gap-2 mt-10">
            {promoProduct.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 
                  ${
                    activeIndex === index
                      ? "w-3 h-3 bg-[#2966DC]" // active dot — bigger + filled
                      : "w-2 h-2 bg-gray-400 hover:bg-gray-500" // inactive dot
                  }`}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT — Product image + price badge ── */}
        <div
          className={`relative flex-1 flex justify-center items-center transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}
        >
          {/* Price badge — the blue circle */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#2966DC] rounded-full flex items-center justify-center z-10 shadow-lg">
            <span className="text-white font-bold text-lg">{slide.price}</span>
          </div>

          {/* Product image */}
          <div
            className="relative flex items-center justify-center bg-contain bg-no-repeat bg-center p-15"
            style={{ backgroundImage: `url(${blue_brushstroke_texture_bg})` }}
          >
            <img
              key={activeIndex} // key change forces React to re-render the image on slide change
              src={slide.image}
              alt={`Slide ${activeIndex + 1} product`}
              className="max-h-80 object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
