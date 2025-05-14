import React from "react";
import phone from "../../assets/BestSellingImages/phone.png";
import laptop from "../../assets/BestSellingImages/laptop.png";
import speaker from "../../assets/BestSellingImages/speaker.png";

const BestSellingProducts = () => {
  return (
    <section className="max-w-screen-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl  text-primary text-center font-OpenSanBold mb-8  pt-[30px]">
        Best Selling Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 mt-6 pt-[30px]">
        {/* Laptop Section */}
        <div className="bg-gray-900 text-white rounded-lg p-4 sm:p-6 lg:p-10 flex flex-col items-start space-y-4 relative overflow-hidden w-full">
          <img
            src={laptop}
            alt="Laptop"
            className="w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[350px] mx-auto"
          />
          <p className="text-md sm:text-lg lg:text-xl font-semibold">
            Unleash Power & Performance – New Arrival Laptops Are Here!
          </p>
          <button className="bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-orange-600 text-sm sm:text-lg">
            Shop Now
          </button>
        </div>
        {/* Smartphone Section */}
        <div className="bg-gray-900 text-white rounded-lg p-4 sm:p-6 lg:p-10 flex flex-col items-start space-y-4 w-full">
          <img
            src={phone}
            alt="Smartphones"
            className="w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[450px] mx-auto"
          />
          <p className="text-md sm:text-lg lg:text-xl font-semibold">
            Experience Innovation – New Arrival Smartphones Are Here!
          </p>
          <button className="bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-orange-600 text-sm sm:text-lg">
            Shop Now
          </button>
        </div>
        {/* Speaker Section */}
        <div className="bg-blue-900 text-white rounded-lg p-4 sm:p-6 lg:p-10 flex flex-col items-center md:items-start space-y-4 md:col-span-2 w-full">
          <img
            src={speaker}
            alt="Speakers"
            className="w-full max-w-[400px] sm:max-w-[450px] lg:max-w-[500px] mx-auto"
          />
          <p className="text-md sm:text-lg lg:text-xl font-semibold text-center md:text-left">
            Unleash Powerful Sound – Experience the ultimate audio with our
            best-selling speakers.
          </p>
          <button className="bg-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-orange-600 text-sm sm:text-lg">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );  
};
export default BestSellingProducts;
