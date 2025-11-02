import React from "react";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <div className="flex flex-col dark:bg-gray-800 p-4 rounded-lg shadow-lg relative">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-56 object-cover rounded-md mb-3 "
      />
      <h3 className="text-lg font-semibold mb-1 dark:text-gray-100 ">
        {product.title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-2">${product.price}</p>
      <Link
        to={`/detail/${product.id}`}
        className="text-blue-500 hover:underline font-medium mt-auto"
      >
        View Details
      </Link>
      <span className="bg-green-800 text-white text-center py-1 px-2 rounded absolute right-2 top-2 text-sm">
        {product.category?.name}
      </span>
    </div>
  );
}

export default Product;
