import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import iphone15SeriesPromo from "../../assets/apple_iphone_14_pro_max.png";

function PromoBanner() {
  return (
    <section className="w-full py-10 bg-linear-to-r from-[#DFE9F3] to-[#EEF4FB]">
      <div className="max-w-250 mx-auto">
        {/* Banner container */}
        <div className="relative w-full rounded-xl overflow-hidden flex items-center justify-between px-12 py-10 min-h-56">
          {/* ── LEFT — Text content ── */}
          <div className="flex flex-col gap-3 z-10">
            {/* Save badge */}
            <span className="w-fit bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded">
              SAVE UP TO $200.00
            </span>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              iPhone 15 Series
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Experience innovation like never before. Stay tuned for the big
              iPhone 15 sale.
            </p>

            {/* CTA Button */}
            <Link
              to="/products/7"
              className="mt-2 w-fit inline-flex items-center gap-2 bg-[#2966DC] text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              SHOP NOW <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ── RIGHT — Product image ── */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {/* Price badge */}
            <div className="absolute -top-4 right-0 w-16 h-16 bg-red-200 rounded-full border-2 border-white flex items-center justify-center shadow-md z-10">
              <span className="text-gray-700 font-bold text-sm">$1999</span>
            </div>

            <img
              src={iphone15SeriesPromo}
              alt="iPhone 15 Series"
              className="max-h-48 object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
