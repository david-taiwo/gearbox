import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccessPage() {
  const navigate = useNavigate();

  // Auto redirect to dashboard after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/account/dashboard");
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 flex flex-col items-center text-center max-w-md w-full mx-4">
        {/* ── Animated checkmark ── */}
        <div className="relative mb-6">
          {/* Rays around the circle — purely decorative */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-4 bg-green-300 rounded-full"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-44px)`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>

          {/* Main checkmark icon */}
          <div className="relative z-10 w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center bg-white">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        {/* ── Text content ── */}
        <h1 className="text-xl font-bold text-gray-900 mb-3">
          Your order is successfully placed
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Thank you for shopping with Gearbox! Your order has been received and
          is being processed. You will receive a confirmation email shortly.
        </p>

        {/* ── Auto redirect notice ── */}
        <p className="text-xs text-gray-400 mb-6">
          You will be redirected to your dashboard in 10 seconds
        </p>

        {/* ── Buttons ── */}
        <div className="flex items-center gap-3 w-full">
          <Link
            to="/account/dashboard"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 py-2.5 rounded-md text-sm font-semibold hover:border-[#2966DC] hover:text-[#2966DC] transition-colors"
          >
            GO TO DASHBOARD
          </Link>
          <Link
            to="/account/orders"
            className="flex-1 flex items-center justify-center gap-2 bg-[#2966DC] text-white py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            VIEW ORDER →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
