import React from "react";
import { useGetUserProfileQuery } from "../../services/api/apiSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ShoppingCart, Package, Heart, Clock } from "lucide-react";

const Dashboard = () => {
  const { data: user, isLoading, isError } = useGetUserProfileQuery();

  // User-specific data
  const orderHistory = [
    { date: "2024-01", orders: 4, total: 890 },
    { date: "2024-02", orders: 3, total: 650 },
    { date: "2024-03", orders: 5, total: 1200 },
    { date: "2024-04", orders: 2, total: 450 },
    { date: "2024-05", orders: 6, total: 1450 },
    { date: "2024-06", orders: 4, total: 980 },
  ];

  const StatCard = ({ icon, title, value, description }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {value}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading dashboard.</p>
      </div>
    );

  return (
    <section className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Welcome back, {user?.name || "User"} 👋
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Track your orders, wishlist, and shopping history here.
        </p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<ShoppingCart size={24} className="text-blue-500" />}
          title="Total Orders"
          value="24"
          description="Last 6 months"
        />
        <StatCard
          icon={<Package size={24} className="text-green-500" />}
          title="Total Spent"
          value="$5,620"
          description="Lifetime purchases"
        />
        <StatCard
          icon={<Heart size={24} className="text-red-500" />}
          title="Wishlist Items"
          value="12"
          description="Saved items"
        />
        <StatCard
          icon={<Clock size={24} className="text-purple-500" />}
          title="Pending Orders"
          value="2"
          description="Awaiting delivery"
        />
      </div>

      {/* Order History Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Order History
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={orderHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              name="Total Spent ($)"
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#82ca9d"
              name="Number of Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Recent Orders
        </h3>
        <div className="space-y-4">
          {[
            {
              id: "ORD-2024-001",
              date: "June 15, 2024",
              status: "Delivered",
              total: "$145.00",
            },
            {
              id: "ORD-2024-002",
              date: "June 10, 2024",
              status: "In Transit",
              total: "$89.00",
            },
            {
              id: "ORD-2024-003",
              date: "June 5, 2024",
              status: "Processing",
              total: "$234.00",
            },
          ].map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-3 border-b dark:border-gray-700 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {order.id}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {order.date}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  {order.total}
                </p>
                <p
                  className={`text-sm ${
                    order.status === "Delivered"
                      ? "text-green-500"
                      : order.status === "In Transit"
                      ? "text-blue-500"
                      : "text-orange-500"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
