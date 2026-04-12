import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={category.path}
      className="group flex flex-col items-center gap-3 flex-shrink-0"
    >
      {/* Image container */}
      <div className="w-32 h-32 border-1 border-gray-200 transition-colors duration-300 overflow-hidden bg-gray-50 flex items-center justify-center p-3">
        <img
          src={category.image}
          alt={category.label}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Label */}
      <span className="text-sm font-medium text-gray-700 group-hover:text-[#2966DC] transition-colors text-center">
        {category.label}
      </span>
    </Link>
  );
}

export default CategoryCard;
