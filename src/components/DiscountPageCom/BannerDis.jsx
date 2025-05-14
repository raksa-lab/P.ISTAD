import React from "react";

export default function BannerDis() {
  return (
    <main className="flex justify-center pt-[32px] py-7.5 ">
      <section className="mt-9  w-full  px-4 sm:px-6 lg:px-8">
        <div className="flex lg:flex-row 2xl:gap-10 xl:gap-8 lg:gap-6 md:gap-4 sm:gap-4 ">
          <HeadphonePromo />
          <SpeakerPromo />
        </div>
      </section>
    </main>
  );
}

function HeadphonePromo() {
  return (
    <article className="relative overflow-hidden bg-gray-200 rounded-3xl  lg:h-[480px] md:h-[310px] sm:h-[200px] w-full lg:w-3/4 sm:w-[70%]  sm:basis-[70%] max-md:h-auto max-md:min-h-[300px] max-sm:min-h-[50px]">
      <div className="p-8 ">
        <h2 className="text-4xl lg:text-[32px] md:text-2xl sm:text-xl font-bold text-black max-md:text-3xl max-sm:text-2xl">
          Beat Solo
        </h2>
        <h3 className="text-8xl lg:text-7xl xl:mt-7 md:text-5xl  sm:text-4xl font-extrabold text-black max-md:text-6xl max-sm:text-5xl">
          Wireless
        </h3>
        <div className="mt-6">
          <span className="text-xl lg:text-[25px]    md:text-[18px] sm:text-[13px] font-bold text-black">
            Up to
          </span>
          <span className="ml-4  text-9xl  md:text-4xl sm:text-3xl  font-bold text-blue-400 max-md:text-6xl max-sm:text-5xl">
            30%
          </span>
          <span className="ml-4  text-xl lg:text-[25px]  md:text-[18px] sm:text-[13px] font-bold text-black">
            Off
          </span>
        </div>
        <p className="mt-6 2xl:mt-20 2xl:text-14xl  xl:text-9xl  lg:text-8xl md:text-7xl sm:text-[57px] font-extrabold text-white max-md:text-7xl max-sm:text-5xl">
          HEADPHONE
        </p>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/69a5bc490837e9a80ba63f758730f85c232a0aef"
        className="absolute 2xl:top-[-50px] 2xl:left-40 xl:top-[-70px] xl:left-40 2xl:h-[580px] xl:h-[580px] h-[580px] lg:top-[-50px] lg:left-40 lg:h-[500px] md:top-[-36px] md:left-24 md:h-[370px]  top-[36px] left-24 sm:h-[400px] w-auto max-md:h-auto max-md:w-full"
        alt="Wireless Headphones"
      />
    </article>
  );
}

function SpeakerPromo() {
  return (
    <article className="relative overflow-hidden bg-gray-200 rounded-3xl h-[600px] lg:h-[480px] md:h-[310px] sm:h-[180px] w-full 2xl:w-1/4  xl:w-1/4  lg:w-1/4 md:w-1/4 sm:w-[30%] sm:basis-[30%] hidden sm:block max-md:h-auto max-md:min-h-[300px] max-sm:min-h-[50px] flex flex-col justify-between p-6">
      <div className="flex items-center gap-3 text-red-600 text-base font-semibold">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/d8062fa0e11c492cba1ae1f699040999/9539f2029241c3f37a0fdc8e126a1d2b542e31d414d41c9e4780c9f65a7bf5e0?placeholderIfAbsent=true"
          alt="Hot offer icon"
          className="w-8 h-8 lg:w-6 lg:h-6 md:w-5 md:h-5  sm:w-4 sm:h-4 "
        />
        <p className="sm:text-sm">Hot Offer</p>
      </div>

      <div className="text-5xl md:text-3xl pt-6 sm:text-2xl font-bold text-blue-400">
        <span>50%</span>
        <span className="ml-3  text-xl md:text-[16px] sm:text-[13px] text-black">
          Off
        </span>
      </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/85247679f97bd96fb65974684a17eba25c476c4a"
        className="h-[200px] lg:h-[170px] sm:h-[90px] mx-auto"
        alt="JBL Speaker"
      />

      <h2 className="text-6xl lg:text-4xl md:text-3xl  sm:text-[28px] font-extrabold text-white max-md:text-5xl max-sm:text-4xl text-center">
        SPEAKER
      </h2>

      <footer className="text-center">
        <h3 className="text-base md:text-[14px] font-bold text-gray-800">
          Home Speaker
        </h3>
        <p className="text-sm  md:text-[13px] text-gray-500">JBL</p>
        <div className="flex justify-center  gap-4 mt-2 md:mt-0">
          <p className="text-2xl lg:text-xl md:text-[16px]  sm:text-[13px] md:mb-2 font-bold  text-gray-800">
            $666.00
          </p>
          <p className="text-[18px] lg:text-[16px] md:text-[14px] sm:mt-1.5 sm:text-[13px] md:mt-1 my-1 md:my-0 text-accent_1 line-through">
            $1332.00
          </p>
        </div>
      </footer>
    </article>
  );
}
