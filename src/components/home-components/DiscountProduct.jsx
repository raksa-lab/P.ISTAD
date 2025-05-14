import React, { useEffect, useState } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import CardDisCom from "../card/CardDisCom";

export default function DiscountProduct() {
  const [fetchProducts, { data, isLoading, isError, error, isFetching }] =
    useLazyGetAllQuery();
  const [discountedProducts, setDiscountedProducts] = useState([]);

  useEffect(() => {
    // Fetch products - we'll filter for discounts client-side
    fetchProducts({
      page: 0,
      size: 50, // Fetch more to ensure we can find 10 discounted products
    });
  }, [fetchProducts]);

  useEffect(() => {
    if (data?.content) {
      // Filter products that have a valid discount
      const productsWithDiscount = data.content.filter(
        (product) => product.discount && product.discount > 0
      );

      // Set only the first 12 discounted products
      setDiscountedProducts(productsWithDiscount.slice(0, 12));
    }
  }, [data]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center animate-pulse text-6xl py-20">
        Loading...
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center text-2xl text-red-500 py-20">
        Error loading products: {error?.message || "Unknown error"}
      </div>
    );
  }

  // Content state
  return (
    <main className="min-h-screen pt-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary text-center font-OpenSanBold mb-8">
        Discount Products
      </h1>

      <div className="w-full px-4 sm:px-6 lg:px-8">
        {discountedProducts.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px] text-gray-500 text-xl">
            No discounted products available
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
            {discountedProducts.map((e) => (
              <CardDisCom
                key={e?.uuid}
                uuid={e?.uuid}
                thumbnail={e?.thumbnail}
                name={e?.name}
                brand={e?.brand?.name}
                priceOut={e?.priceOut}
                dis={e?.discount}
                disPrice={(e.priceOut - e.priceOut * e.discount).toFixed(2)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Loading more products */}
      {isFetching && (
        <div className="h-20 flex items-center justify-center my-4">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
    </main>
  );
}
