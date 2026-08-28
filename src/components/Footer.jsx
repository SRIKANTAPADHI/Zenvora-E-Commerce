import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-white mt-10">

      {/* Back to Top */}
      <button
        onClick={backToTop}
        className="w-full bg-gray-800 hover:bg-gray-700 py-4 text-sm font-medium transition"
      >
        Back to Top
      </button>

      {/* Footer Main */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Get to Know Us */}
        <div>
          <h2 className="text-lg font-bold mb-4">
            Get to Know Us
          </h2>

          <ul className="space-y-3 text-gray-400">
            <li>
              <Link
                to="/about"
                className="hover:text-white transition"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/careers"
                className="hover:text-white transition"
              >
                Careers
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-white transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h2 className="text-lg font-bold mb-4">
            Connect with Us
          </h2>

          <div className="space-y-4 text-gray-400">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <FaFacebookF />
              Facebook
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <FaInstagram />
              Instagram
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <FaLinkedinIn />
              LinkedIn
            </a>

          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-lg font-bold mb-4">
            Customer Service
          </h2>

          <ul className="space-y-3 text-gray-400">

            <li>
              <Link
                to="/help"
                className="hover:text-white transition"
              >
                Help
              </Link>
            </li>

            <li>
              <Link
                to="/returns"
                className="hover:text-white transition"
              >
                Returns
              </Link>
            </li>

            <li>
              <Link
                to="/privacy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                to="/terms"
                className="hover:text-white transition"
              >
                Terms
              </Link>
            </li>

          </ul>
        </div>

        {/* Zenvora */}
        <div>
          <h2 className="text-2xl font-bold">
            Zenvora
          </h2>

          <p className="text-gray-400 mt-4 leading-6">
            Your trusted online shopping destination.
            Discover quality products at great prices.
          </p>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-center">

        <p className="text-gray-400 text-sm">
          © 2026 Zenvora.com. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;