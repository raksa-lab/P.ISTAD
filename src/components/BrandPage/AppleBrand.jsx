import React from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import FilterCom from "../DiscountPageCom/FilterCom";
import CardCom from "../cart/CardCom";
import CardDisCom from "../cart/CardDisCom";
import Banner from "./Banner";

export default function AppleBrand() {
  // const { data: proData, isLoading, isError } = useGetAllQuery();
  // console.log("Apple Brand Data: ", proData);

  const { data: product, isLoading, isError } = useLazyGetAllQuery();
  console.log("Data:", product);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  return (
    <>
      <main className="min-h-screen md:pt-16 ">
        <Banner />
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-10  ">
            <FilterCom />
            <div className="w-full lg:w-3/4 mx-[50px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {product?.content?.map((e) => (
                  <CardCom
                    key={e?.uuid}
                    thumbnail={e?.thumbnail}
                    name={e?.name}
                    brand={e?.brand?.name}
                    price={e?.priceOut}
                  />
                ))}
                {product?.content?.map((e) => (
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
            </div>
          </div>
        </div>
        <div min-h-screen md:pt-16>
          <h2 className="font-bold text-start mx-[590px] mb-10 text-primary text-3xl ">
            Best Price Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {product?.content?.map((e) => (
              <CardCom
                key={e?.uuid}
                thumbnail={e?.thumbnail}
                name={e?.name}
                brand={e?.brand?.name}
                price={e?.priceOut}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
