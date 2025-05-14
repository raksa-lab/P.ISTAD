import React from "react";
import { useGetAllQuery } from "../../redux/service/product/productSlice";
import BannerPh from "./BannerPh";
import FilterDis from "../DiscountPageCom/FilterCom";
import CardCom from "../cart/CardCom";

export default function ProductPhone() {
  const { data: proPro, isLoading, isError } = useGetAllQuery();
  console.log("Data:", proPro);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <>
      <main className="min-h-screen px-[32px]">
        <BannerPh />

        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-20">
          <h2 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl">
            Phone
          </h2>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filter */}

            <FilterDis />
            {/* Product Grid */}
            <div className="w-full lg:w-3/4 mx-[50px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {proPro?.content?.map((e) => (
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
    </>
  );
}
