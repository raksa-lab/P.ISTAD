import React from "react";

const Banner = () => {
  return (
    <section className="overflow-hidden rounded-3xl bg-neutral-100 min-w-[300px] mx-[20px] sm:mx-[20px] 2xl:ps-3 sm:p-1 md:p-2 lg:p-3 xl:p-3">
      <div className="flex gap-3 2xl:gap-8 sm:gap-0 flex-row max-md:flex-row items-center">
        <div className="w-[65%] 2xl:w-[60%]   max-md:w-[55%] 2xl:ps-20   sm:me-[15px] max-md:ml-0">
          <BannerContent />
        </div>
        <div className="w-[35%] max-md:w-[45%] max-md:flex max-md:justify-center">
          <BannerImage />
        </div>
      </div>
    </section>
  );
};

function BannerContent() {
  return (
    <article className="flex flex-col justify-center items-start self-stretch 2xl:h-[400px] xl:h-[400px] lg:h-[290px] md:h-[250px] sm:h-auto w-full max-md:mt-1 max-md:max-w-full">
      <h1 className="self-stretch font-OpenSanBold 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl ps-4 font-bold text-blue-950 max-md:max-w-full">
        Welcome to iShop – Your Ultimate Tech Destination!
      </h1>
      <p className="mt-2 text-gray-600 xl:text-[20px] lg:text-[20px] 2xl:text-[20px] sm:text-[12px] text-[10px] font-OpenSan md:text-base max-md:max-w-full ps-4">
        At iShop, we are passionate about technology and innovation. Our goal is
        to make the latest and best electronic products accessible to everyone
        at affordable prices.
      </p>
      <button className="bg-primary text-white  sm:ps-4 sm:px-3  sm:py-2 md:text-lg md:text-[16px] sm:text-[10px] font-OpenSan rounded-md font-semibold hover:bg-secondary  max-md:px-4 max-md:py-2 max-md:text-[10px]  sm:my-5  sm:mx-7 mb-4 mx-4 ">
        Shop Now
      </button>
    </article>
  );
}

function BannerImage() {
  return (
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/63da7c2c8aa5825125e7a0bf0d77c5612bebf4d4141bd3e5132ae5ce72d84387?placeholderIfAbsent=true&apiKey=5cd3de3f08094ca3afe2694744931c58"
      alt="Tech products showcase"
      className="object-contain 2xl:w-[80%] xl:w-[80%] lg:w-[80%] md:w-[80%] sm:w-[90%] max-md:w-[100%] max-md:h-auto max-md:max-w-[200px]"
    />
  );
}

export default Banner;
