import React from "react";
import NavBar from "../components/NavBar";
import Products from "../components/Products";
import Footer from "../components/Footer";

function ProdutListPage() {
  return (
    <>
      <NavBar />
      <div className="px-4 md:px-32 min-h-screen dark:bg-gray-900 pt-5">
        <Products />
      </div>
      <Footer />
    </>
  );
}

export default ProdutListPage;
