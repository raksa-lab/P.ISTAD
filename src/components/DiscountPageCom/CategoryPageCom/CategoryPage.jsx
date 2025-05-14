import React, { useEffect } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import CardCom from "../card/CardCom";
import Banner from "./Banner";
import FilterDis from "../AllProductCom/FilterDis";

export default function CategoryPage() {
  // Fetch products
  const [fetchProducts, { data: proCate, isLoading, isError }] =
    useLazyGetAllQuery();

  useEffect(() => {
    fetchProducts({ page: 0, size: 12 });
  }, []);

  if (isLoading)
    return <p className="text-center text-xl">Loading products...</p>;
  if (isError)
    return (
      <p className="flex justify-center text-2xl text-red-500 py-20">
        Failed to load products.
      </p>
    );

  return (
    <main className="w-full min-h-screen pt-8 md:pt-16">
      <Banner />
      <div className="py-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Section - Left Side */}
          <div className="w-full lg:w-[300px] sticky top-24 h-fit">
            <FilterDis />
          </div>

          {/* Cards Section - Right Side */}
          <div className="w-full">
            <h1 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl py-7">
              Category Products
            </h1>
            <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] mb-8">
              {proCate?.content?.map((e) => (
                <CardCom
                  key={e?.uuid}
                  uuid={e?.uuid}
                  thumbnail={e?.thumbnail}
                  name={e?.name}
                  brand={e?.brand?.name}
                  price={e?.priceOut}
                />
              ))}
            </div>

            <h1 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl py-7">
              New Arrivals
            </h1>
            <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] mb-8">
              {proCate?.content?.map((e) => (
                <CardCom
                  key={e?.uuid}
                  uuid={e?.uuid}
                  thumbnail={e?.thumbnail}
                  name={e?.name}
                  brand={e?.brand?.name}
                  price={e?.priceOut}
                />
              ))}
            </div>

            <h1 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl py-7">
              Popular Product
            </h1>
            <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] mb-8">
              {proCate?.content?.map((e) => (
                <CardCom
                  key={e?.uuid}
                  uuid={e?.uuid}
                  thumbnail={e?.thumbnail}
                  name={e?.name}
                  brand={e?.brand?.name}
                  price={e?.priceOut}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}