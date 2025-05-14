import React from "react";
import FilterDis from "../components/AllProductCom/FilterDis";
import Banner from "../components/BrandPage/Banner";
import LogoBrand from "../components/BrandPage/LogoBrand";
import CardCom from "../components/cart/CardCom";
import CardDisCom from "../components/cart/CardDisCom";
import { useLazyGetAllQuery } from "../redux/service/product/productSlice";

export default function AllProductPage() {
  const { data: productBrand } = useLazyGetAllQuery();

  return (
    <main className="min-h-screen pt-8 md:pt-28">
      <Banner />

      <div className="container mx-auto py-10 px-4 sm:px-8 md:px-[50px] lg:px-[80px] xl:px-[100px]">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-1/4 xl:w-1/5">
            <FilterDis />
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {productBrand?.content?.map((e) => (
                <CardCom
                  key={e?.uuid}
                  thumbnail={e?.thumbnail}
                  name={e?.name}
                  brand={e?.brand?.name}
                  price={e?.priceOut}
                />
              ))}
              {productBrand?.content?.map((e) => (
                <CardDisCom
                  key={e?.uuid}
                  thumbnail={e?.thumbnail}
                  name={e?.name}
                  brand={e?.brand?.name}
                  priceOut={e?.priceOut}
                  dis={e?.discount}
                  disPrice={(
                    e.priceOut -
                    (e.priceOut * e.discount) / 100
                  ).toFixed(2)}
                />
              ))}
            </div>
            <br />
            <div>
              <LogoBrand />
              <br />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
