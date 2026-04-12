import truckIcon from "../../assets/delivery_truck.png";
import headsetIcon from "../../assets/headphones.png";
import cartBagIcon from "../../assets/shopping_bag.png";
import boxIcon from "../../assets/package.png";

const trustBadges = [
  {
    id: 1,
    icon: truckIcon,
    title: "Free Shipping",
    description: "Free shipping on your first order",
  },
  {
    id: 2,
    icon: headsetIcon,
    title: "Customer Support 24/7",
    description: "Instant access to Support",
  },
  {
    id: 3,
    icon: cartBagIcon,
    title: "100% Secure Payment",
    description: "We ensure your money is safe",
  },
  {
    id: 4,
    icon: boxIcon,
    title: "Money-Back Guarantee",
    description: "7 Days Money-Back Guarantee",
  },
];

function TrustBadges() {
  return (
    <section className="w-full border-y border-gray-200 bg-white">
      <div className="max-w-360 mx-auto px-15 py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge) => (
            <div key={badge.id} className="flex items-center gap-4">
              {/* Icon */}
              <div className="shrink-0">
                <img
                  src={badge.icon}
                  alt={badge.title}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* Text */}
              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  {badge.title}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustBadges;
