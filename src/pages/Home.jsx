import React from "react";
import HomeBanner from "../components/home-components/HomeBanner";
import AssuranceSection from "../components/home-components/AssuranceSection";
import PopularCategories from "../components/home-components/PopularCategories";
import NewArrivals from "../components/home-components/NewArrivals";
import BestSelling from "../components/home-components/BestSelling";
import DiscountProduct from "../components/home-components/DiscountProduct";

export default function Home() {
  return (
    <div className="pt-40 space-y-10">
      <HomeBanner />
      <main className="space-y-10 max-w-screen-2xl mx-auto md:px-[50px] xl:px-[100px]">
        <AssuranceSection />
        <PopularCategories />
        <NewArrivals />
        <BestSelling />
        <DiscountProduct />
      </main>
    </div>
  );
}
