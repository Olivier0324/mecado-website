import { Outlet, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../services/slices/themeSlice";
import { logout } from "../../services/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, Home, User, Settings, LogOut, ShoppingBag, Package } from "lucide-react";

function UserDashboard() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => dispatch(setTheme());
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { icon: <Home size={20} />, label: "Home", path: "/dashboard" },
    { icon: <Package size={20} />, label: "Products", path: "/products" },
    { icon: <User size={20} />, label: "Profile", path: "profile" },
    { icon: <Settings size={20} />, label: "Settings", path: "settings" },
    { icon: <ShoppingBag size={20} />, label: "Cart", path: "cart" }
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.includes(path);
  };

  const getPageTitle = () => {
    const activeItem = menuItems.find(item => isActive(item.path));
    return activeItem ? activeItem.label : "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg p-5 transform transition-transform duration-300 z-40 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h2>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600 dark:text-gray-300"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive(item.path)
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div
          className="absolute bottom-5 left-5 flex items-center gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition"
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden dark:text-gray-200"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </header>

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default UserDashboard;
