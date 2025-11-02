import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  X,
  Moon,
  Sun,
  ShoppingBag,
  User,
  Home,
  Package,
  Info,
  Phone,
} from "lucide-react";
import { setTheme } from "../services/slices/themeSlice";

function NavBar() {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.includes(path);
  };

  const menuItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/products", label: "Products", icon: Package },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: Phone },
  ];

  const toggleTheme = () => dispatch(setTheme());
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="py-4 px-6 md:px-32 dark:bg-gray-900 bg-white dark:text-white text-gray-800 flex justify-between items-center border-b dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold flex items-center gap-2">
        Mecado <ShoppingBag size={24} />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`transition flex items-center gap-2 ${
              isActive(item.path)
                ? "text-blue-500 dark:text-blue-400"
                : "hover:text-blue-500"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
        {token && (
          <Link
            to="/dashboard/cart"
            className={`transition flex items-center gap-2 ${
              isActive("/dashboard/cart")
                ? "text-blue-500 dark:text-blue-400"
                : "hover:text-blue-500"
            }`}
          >
            <ShoppingBag size={18} />
            Cart
          </Link>
        )}
        {token ? (
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition flex items-center gap-2"
          >
            <User size={18} />
            My Account
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition flex items-center gap-2"
          >
            <User size={18} />
            Login
          </Link>
        )}
      </div>

      {/* Theme & Mobile Menu Buttons */}
      <div className="flex gap-3 items-center">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
        >
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Hamburger Button (Mobile only) */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-md md:hidden animate-slideDown">
          <div className="flex flex-col items-start px-6 py-4 space-y-3 text-sm font-medium">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full py-2 transition flex items-center gap-2 ${
                  isActive(item.path)
                    ? "text-blue-500 dark:text-blue-400"
                    : "hover:text-blue-500"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
            {token && (
              <>
                <Link
                  to="/dashboard/cart"
                  className={`w-full py-2 transition flex items-center gap-2 ${
                    isActive("/dashboard/cart")
                      ? "text-blue-500 dark:text-blue-400"
                      : "hover:text-blue-500"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <ShoppingBag size={18} />
                  Cart
                </Link>
                <Link
                  to="/dashboard"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition flex items-center justify-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <User size={18} />
                  My Account
                </Link>
              </>
            )}
            {!token && (
              <Link
                to="/login"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition flex items-center justify-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <User size={18} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
