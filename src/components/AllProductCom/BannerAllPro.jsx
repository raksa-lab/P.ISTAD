import React from "react";

export default function BannerAllPro() {
  return (
    <section className="flex justify-center px-4 sm:pt-14 max-sm:pt-20 md:pt-10  lg:pt-10 xl:pt-10 2xl:pt-10">
      <div className="w-full rounded-3xl bg-[#E2DEDB] p-8 flex flex-col sm:flex-row items-center sm:gap-4">
        {/* Left Section - Text */}
        <div className="w-full sm:w-[30%] text-center sm:text-left">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-700">
            You're choosing the{" "}
            <span className="text-orange-500 font-bold">Right</span> place to
            buy your favorite thing.
          </h2>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4">
            Apple iMac
          </h1>
        </div>

        {/* Right Section - iMac Image */}
        <div className="w-full sm:w-[70%] flex justify-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9abc4629e1f0fc8ace9ddce348de792b87d2f7e0bd14a9b5fa5c16c7fa600e76?placeholderIfAbsent=true&apiKey=5cd3de3f08094ca3afe2694744931c58"
            alt="Apple iMacs"
            className="w-full max-w-[400px] sm:max-w-none max-sm:pe-14 max-sm:pt-1.5"
          />
        </div>
      </div>
    </section>
  );
}
