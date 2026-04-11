import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCcApplePay, FaCcMastercard, FaCcVisa } from "react-icons/fa6"; // Brands
import { FaCreditCard, FaLock } from "react-icons/fa6"; // Solid icons for "secure"

import { footerLinks, socialLinks } from "../../data/footerLinks";
import gearbox_logo from "../../assets/gearbox_logo.png";

// Payment Icons
// const paymentMethods = ["Apple Pay", "VISA", "Mastercard", "Secure Payment"];

function NewsletterBar() {
  return (
    <div className="bg-white py-6">
      <div className="max-w-360 mx-auto px-15 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Text */}
        <div>
          <h3 className="text-base font-semibold text-gray-800">
            Subscribe to our Newsletter
          </h3>
          <p className="text-sm text-gray-500">
            Subscribe and stay connected to the best of news from our company
          </p>
        </div>
        {/* Input + Button */}
        <div className="flex flex-1 max-w-md">
          <div className="flex flex-1 items-center border border-gray-300 rounded-l-md px-3 gap-2">
            <FaSearch className="text-gray-400" />
            <input
              type="email"
              placeholder="Enter Email Address"
              className="flex-1 py-2 text-sm text-gray-600 outline-none"
            />
          </div>
          <button className="bg-[#2966DC] text-white px-6 py-2 rounded-r-md text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0">
            Subscribe
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map(({ icon: Icon, path, label }) => (
            <a
              key={label}
              href={path}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-full text-[#1a1a2e] flex items-center justify-center hover:bg-[#2966DC] hover:text-white transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.path}
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <NewsletterBar />

      {/* Main dark section */}
      <div className="bg-[#1a1a2e] text-white">
        <div className="max-w-360 mx-auto px-15 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            <div className="lg:col-span-2">
              <span className="text-xl font-bold text-[#2966DC]">
                <img src={gearbox_logo} alt="Gearbox Logo" className="h-8" />
              </span>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-80">
                GearBox delivers the latest gadgets and accessories, to bring
                the best right to your doorstep.
              </p>
              <div className="mt-4 space-y-1">
                <p className="text-gray-400 text-sm flex flex-row gap-5">
                  <span className="text-white font-medium">
                    (+234) 901-3679-054
                  </span>{" "}
                  or{" "}
                  <a
                    href="mailto:Gearbox@gmail.com"
                    className="text-white font-medium underline hover:text-[#2966DC] transition-colors"
                  >
                    Gearbox@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <FooterColumn title="My Account" links={footerLinks.myAccount} />
            <FooterColumn title="Help" links={footerLinks.help} />
            <FooterColumn title="Proxy" links={footerLinks.proxy} />
            <FooterColumn title="Categories" links={footerLinks.categories} />
          </div>
          {/* Divider */}
          <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">© 2026. Gearbox Shop</p>

            {/* Payment methods */}
            <div className="flex items-center gap-2">
              <FaCcApplePay size={40} />
              <FaCcVisa size={40} color="#1a1f71" />
              <FaCcMastercard size={40} color="#eb001b" />
              <FaCcVisa size={40} color="#1a1f71" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
