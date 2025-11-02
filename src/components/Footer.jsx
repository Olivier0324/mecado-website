import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin, ShoppingBag } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo / About */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            Mecado <ShoppingBag size={24} />
          </Link>
          <p className="text-sm leading-relaxed">
            Your trusted online marketplace for quality products. 
            Shop with confidence and discover amazing deals.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} />
            <span>123 Commerce St, NY 10001</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-500 transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/faq" className="hover:text-blue-500 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-blue-500 transition-colors">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-blue-500 transition-colors">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-blue-500 transition-colors">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Connect With Us</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>support@mecado.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="hover:text-blue-600 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-sky-500 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-500 transition-colors">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} Mecado. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-blue-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-blue-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
