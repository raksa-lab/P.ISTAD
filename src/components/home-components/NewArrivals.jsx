import React, { useEffect, useState } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import CardDisCom from "../card/CardDisCom";

export default function NewArrivals() {
  // Destructure fetchProducts and its result (data, isLoading, isError, error)
  const [fetchProducts, { data, isLoading, isError, error }] = useLazyGetAllQuery();
  const [newestProducts, setNewestProducts] = useState([]);

  useEffect(() => {
    // Trigger the lazy query to fetch products with sorting by creation date (newest first)
    fetchProducts({
      page: 0,
      size: 50,
      sort: "createdAt,desc", // Sort products by creation date in descending order
    });
  }, [fetchProducts]);

  useEffect(() => {
    if (data?.content) {
      // Assuming the API returns sorted data, take the top 12 products
      setNewestProducts(data.content.slice(0, 12));
    }
  }, [data]); // Update state when the data changes

  if (isLoading) {
    // Display loading spinner when data is being fetched
    return (
      <div className="flex justify-center animate-pulse text-6xl py-20">
        Loading...
      </div>
    );
  }

  if (isError) {
    // Display error message if there's an issue with the fetch
    return (
      <div className="flex justify-center text-2xl text-red-500 py-20">
        Error loading products: {error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <main className="px-4 lg:px-0">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-primary text-center font-OpenSanBold mb-8 pt-[30px]">
        New Arrivals Products
      </h1>
      {newestProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No new products available
        </div>
      ) : (
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {newestProducts.map((e) => (
            <CardDisCom
              key={e?.uuid}
              uuid={e?.uuid}
              thumbnail={e?.thumbnail}
              name={e?.name}
              brand={e?.brand?.name}
              priceOut={e?.priceOut}
              disPrice={(e.priceOut - e.discount * e.priceOut).toFixed(2)}
              dis={e?.discount || 0}
            />
          ))}
        </section>
      )}
    </main>
  );
}
