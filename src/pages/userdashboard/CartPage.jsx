import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../services/slices/cartSlice";
import { Link } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const { items = [], totalAmount = 0, totalItems = 0 } = useSelector((state) => state.cart);

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleImageError = (e) => {
    e.target.src = '/placeholder-image.jpg';
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen dark:bg-gray-900 text-gray-700 dark:text-gray-100">
        <div className="flex flex-col items-center justify-center mt-20">
          <h2 className="text-xl font-semibold mb-4">Your cart is empty 🛍️</h2>
          <Link
            to="/products"
            className="text-blue-500 hover:underline font-medium"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen pb-32">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Shopping Cart 🛒</h2>
          <Link
            to="/products"
            className="text-blue-500 hover:underline font-medium flex items-center gap-2"
          >
            <span>←</span>
            Continue Shopping
          </Link>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <img
                src={item.image || item.images?.[0] || '/placeholder-image.jpg'}
                alt={item.title || 'Product image'}
                className="w-32 h-32 object-cover rounded-md"
                onError={handleImageError}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg truncate">{item.title || 'Untitled Product'}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  ${Number(item.price || 0).toFixed(2)}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="bg-gray-300 dark:bg-gray-700 px-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                  >
                    -
                  </button>
                  <span className="min-w-[2rem] text-center">{item.quantity || 1}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, (item.quantity || 1) + 1)
                    }
                    className="bg-gray-300 dark:bg-gray-700 px-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-semibold">
                  ${Number((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:underline mt-2 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-10 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
          <p className="text-lg font-semibold">
            Total ({totalItems} items): ${Number(totalAmount).toFixed(2)}
          </p>
          <div className="flex gap-3 mt-3 md:mt-0">
            {/* <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Continue Shopping
            </Link> */}
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) {
                  dispatch(clearCart());
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
            >
              Clear Cart
            </button>
            <button 
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md transition"
              disabled={items.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
