import React from "react";
import { Link } from "react-router";

export default function NoCartCom() {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-100 opacity-30">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/027/381/351/small_2x/shopping-cart-icon-shopping-trolley-icon-shopping-cart-logo-container-for-goods-and-products-economics-symbol-design-elements-basket-symbol-silhouette-retail-design-elements-vector.jpg"
            alt="Empty Cart"
            className="w-[300px] lg:w-full h-full object-contain"
          />
        </div>
        <p className="text-lg font-semibold text-gray-800">
          Your cart is Empty
        </p>
        <Link
          to="/products"
          className="mt-4 px-6 py-2 lg:py-3 border border-orange-400 text-orange-400 rounded-lg hover:bg-orange-100 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
