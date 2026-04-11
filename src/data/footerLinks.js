import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
export const footerLinks = {
  myAccount: [
    { label: "My Account", path: "/account/dashboard" },
    { label: "Order History", path: "/account/orders" },
    { label: "Shopping Cart", path: "/cart" },
    { label: "Wishlist", path: "/account/wishlist" },
  ],
  help: [
    { label: "Contact", path: "/contact" },
    { label: "FAQs", path: "/faq" },
    { label: "Terms & Condition", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
  ],
  proxy: [
    { label: "About", path: "/about" },
    { label: "Shop", path: "/products" },
    { label: "Product", path: "/products" },
    { label: "Track Order", path: "/account/orders" },
  ],
  categories: [
    {
      label: "Computer Laptop",
      path: "/products?category=Computer+%26+Laptop",
    },
    { label: "Headphone", path: "/products?category=Headphone" },
    { label: "Gaming Console", path: "/products?category=Gaming+Console" },
    {
      label: "Tv & Home Appliances",
      path: "/products?category=TV+%26+Homes+Appliances",
    },
  ],
};

export const socialLinks = [
  { icon: FaFacebook, path: "https://facebook.com", label: "Facebook" },
  { icon: FaTwitter, path: "https://twitter.com", label: "Twitter" },
  { icon: FaPinterest, path: "https://pinterest.com", label: "Pinterest" },
  { icon: FaInstagram, path: "https://instagram.com", label: "Instagram" },
];
