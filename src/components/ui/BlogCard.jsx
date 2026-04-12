import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function BlogCard({ post }) {
  return (
    <div className="group bg-white rounded-tr-3xl rounded-bl-3xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* ── Image area ── */}
      <div className="relative overflow-hidden p-6">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Date badge — sits on top left of the image */}
        <div className="absolute top-10 left-10 bg-white/50 rounded-md px-2 py-1 text-center shadow-sm min-w-10">
          <span className="block text-lg font-bold text-gray-900 leading-none">
            {post.date}
          </span>
          <span className="block text-xs text-gray-500 uppercase">
            {post.month}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Category tag */}
        <span className="text-xs font-semibold text-[#2966DC] uppercase tracking-wide">
          {post.category}
        </span>

        {/* Title */}
        <Link
          to={`/blog/${post.slug}`}
          className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-[#2966DC] transition-colors"
        >
          {post.title}
        </Link>

        {/* Excerpt */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read More link */}
        <Link
          to={`/blog/${post.slug}`}
          className="mt-auto pt-2 inline-flex items-center justify-center self-end gap-1 px-4 py-2 text-sm font-bold text-[#2966DC] border border-blue-200 hover:gap-2 transition-all"
        >
          READ MORE <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
