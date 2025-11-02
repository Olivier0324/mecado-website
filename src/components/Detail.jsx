import React, { useState } from "react";
import NavBar from "./NavBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../services/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeftIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useGetProductByIdQuery, useGetRelatedProductsQuery } from "../services/api/apiSlice";
import Footer from "./Footer";

function Detail() {
    const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
    const { data: relatedProducts } = useGetRelatedProductsQuery(id);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);

  if (isLoading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error loading product.</p>;
  if (!product) return null;

  const openPreview = (index) => setSelectedIndex(index);
  const closePreview = () => setSelectedIndex(null);
  const prevImage = () => setSelectedIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1);
  const nextImage = () => setSelectedIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in to add items to your cart!");
      navigate("/login");
      return;
    }
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0],
      quantity: 1
    }));
  };

  const isInCart = items.some(item => item.id === product.id);

  return (
    <div className="dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen pb-32">
      <NavBar />
      <div className="p-6 max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/products"
          className="flex items-center gap-2 text-blue-500 hover:underline mb-6"
        >
          <ArrowLeftIcon size={22} />
          <span>Back to products</span>
        </Link>

        {/* Product Detail Section */}
        <div className="flex flex-col md:flex-row gap-10 bg-gray-100 dark:bg-gray-800 px-6 pt-6 py-6 mb-32 rounded-lg shadow-lg">
          {/* Thumbnail Gallery */}
          <div className="flex flex-col gap-3 md:w-1/4">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Preview ${index}`}
                onClick={() => openPreview(index)}
                className="w-full h-28 object-cover rounded-md cursor-pointer hover:opacity-80 border border-gray-300 dark:border-gray-700"
              />
            ))}
          </div>

          {/* Main Product Info */}
          <div className="flex-1">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-auto rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{product.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{product.description}</p>
            <p className="text-xl font-semibold mb-4">${product.price}</p>

            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`py-2 px-4 rounded-md text-sm font-medium transition ${
                isInCart
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-green-800 hover:bg-green-900 text-white"
              }`}
            >
              {isInCart ? "In Cart" : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    src={relatedProduct.images?.[0]}
                    alt={relatedProduct.title}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h4 className="font-semibold mb-2 truncate">{relatedProduct.title}</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    ${relatedProduct.price}
                  </p>
                  <Link
                    to={`/detail/${relatedProduct.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={closePreview}
            className="absolute top-5 right-5 text-white hover:text-gray-300"
          >
            <XIcon size={30} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 text-white hover:text-gray-300"
          >
            <ChevronLeftIcon size={40} />
          </button>

          <img
            src={product.images[selectedIndex]}
            alt="Preview"
            className="max-h-[80vh] max-w-auto rounded-lg shadow-lg"
          />

          <button
            onClick={nextImage}
            className="absolute right-6 text-white hover:text-gray-300"
          >
            <ChevronRightIcon size={40} />
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Detail;
