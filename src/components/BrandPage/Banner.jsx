import React from "react";
import Allphone from "../../assets/Apple/AllApple.png";
import Headphone from "../../assets/Apple/Headphone.png";
import LogoApple from "../../assets/Apple/Logo-Apple.png";
import MacBook from "../../assets/Apple/Macbook.png";

// Reusable Title Component
const SectionTitle = ({ children }) => (
  <h1 className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
    {children}
  </h1>
);

const SectionSubtitle = ({ children }) => (
  <h2 className="mb-4 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-[#EF7D34] text-center">
    {children}
  </h2>
);

// Reusable Shop Card Component
const ShopCard = ({ image, altText, title }) => (
  <div className="flex flex-col items-center bg-[#1E2A44] p-5 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 w-[90px] sm:w-[100px] md:w-[120px] lg:w-[140px]">
    <img
      src={image}
      alt={altText}
      className="h-[50px] sm:h-[60px] md:h-[70px] lg:h-[80px] w-auto mb-3 object-contain"
    />
    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white mb-2 text-center">
      {title}
    </h3>
    <button className="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 bg-transparent border border-orange-400 text-orange-400 rounded-lg font-semibold text-xs sm:text-sm md:text-base lg:text-lg hover:bg-orange-400 hover:text-white transition duration-300 whitespace-nowrap">
      Shop Now
    </button>
  </div>
);

// Apple Section
const AppleSection = () => (
  <aside className="flex flex-col items-center mb-6">
    <div className="flex justify-center items-center rounded-full bg-gray-300 h-[70px] sm:h-[90px] md:h-[110px] lg:h-[130px] w-[70px] sm:w-[90px] md:w-[110px] lg:w-[130px] mb-4">
      <img
        src={LogoApple}
        alt="Apple Logo"
        className="h-[50px] sm:h-[70px] md:h-[90px] lg:h-[110px] w-auto object-contain"
      />
    </div>
    <button className="flex gap-2 items-center text-xs sm:text-sm md:text-base font-bold text-orange-400 cursor-pointer hover:underline hover:text-orange-500 transition duration-300">
      <span>Go to Shop</span>
    </button>
  </aside>
);

// Banner Component
const Banner = () => {
  const cardData = [
    { image: Headphone, altText: "Headphones", title: "Headphones" },
    { image: Allphone, altText: "All Items", title: "All Items" },
    { image: MacBook, altText: "Laptop", title: "Laptop" },
  ];

  return (
    <section className="relative p-4 sm:p-6 md:p-8 lg:p-10 pt-[24px] rounded-2xl bg-[#0E1F48] min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] flex flex-col mx-0 sm:mx-6 md:mx-12 lg:mx-24 items-center">
      <div className="w-full max-w-[1100px] text-center">
        <header className="mb-6">
          <SectionTitle>Find Your Perfect Laptop</SectionTitle>
          <SectionSubtitle>– Shop Now with Ease</SectionSubtitle>
        </header>

        <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-4 flex-wrap">
          <AppleSection />
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full sm:w-auto">
            {cardData.map((card, index) => (
              <ShopCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
