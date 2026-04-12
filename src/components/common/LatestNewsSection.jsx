import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import BlogCard from "../ui/BlogCard";
import { blogPosts } from "../../data/blogPosts";

function LatestNewsSection() {
  // Show only the first 3 posts on the homepage
  const visiblePosts = blogPosts.slice(0, 3);

  return (
    <section className="w-full bg-gray-50 py-10 border-t border-gray-100">
      <div className="max-w-360 mx-auto px-15">
        {/* ── Section Header ── */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Latest News</h2>
          <Link
            to="/blog"
            className="text-sm text-[#2966DC] font-medium flex items-center gap-1 hover:underline"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Blog Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visiblePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestNewsSection;
