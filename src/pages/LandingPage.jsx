import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Star, Truck, Shield, Headphones } from 'lucide-react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative px-4 md:px-32 py-20 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Discover Amazing Products
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Shop the latest trends with exclusive deals and offers
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 md:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Free Shipping</h3>
                <p className="text-gray-600 dark:text-gray-400">Free shipping on all orders over $50</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Secure Payment</h3>
                <p className="text-gray-600 dark:text-gray-400">100% secure payment process</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <Headphones className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">24/7 Support</h3>
                <p className="text-gray-600 dark:text-gray-400">Dedicated customer support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4 md:px-32 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Electronics', 'Fashion', 'Home', 'Sports'].map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${category.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
                >
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700">
                    <div className="p-8 text-center">
                      <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                      <h3 className="text-lg font-semibold dark:text-white">{category}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 px-4 md:px-32">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Stay Updated</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Subscribe to our newsletter for exclusive deals and new products
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 px-4 md:px-32 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    "Great products and excellent customer service. Highly recommended!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full mr-3"></div>
                    <div>
                      <p className="font-semibold dark:text-white">John Doe</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default LandingPage
