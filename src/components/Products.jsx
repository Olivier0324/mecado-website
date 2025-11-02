import React, { useState } from "react";
import { useGetProductsQuery } from "../services/api/apiSlice";
import Product from "./Product";

function Products() {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  
  // Local state for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page

  // Handle loading state
  if (isLoading) {
    return <p className="text-center mt-4">Loading products...</p>;
  }

  // Handle error state
  if (isError) {
    return (
      <p className="text-center text-red-500 mt-4">
        Error fetching products:{" "}
        {error?.error || error?.data?.message || "Unknown error"}
      </p>
    );
  }

  if (!products || products.length === 0) {
    return <p className="text-center mt-4">No products found.</p>;
  }

  // Apply search and price filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const withinMin = minPrice === "" || product.price >= Number(minPrice);
    const withinMax = maxPrice === "" || product.price <= Number(maxPrice);

    return matchesSearch && withinMin && withinMax;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Pagination controls
  const Pagination = () => (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-blue-500 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-blue-500 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="p-4">
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="w-full md:w-1/3 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setCurrentPage(1); // Reset to first page on filter
            }}
            min={0}
            step={1}
            className="w-28 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setCurrentPage(1); // Reset to first page on filter
            }}
            min={0}
            step={1}
            className="w-28 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products match your filters.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-32">
            {currentProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && <Pagination />}
        </>
      )}
    </div>
  );
}

export default Products;
