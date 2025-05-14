import { useState, useEffect } from "react";
import firstCustomer from "../../assets/TeamsImage/Seyla.png";
import secondCustomer from "../../assets/TeamsImage/Nita.jpg";
import thirdCustomer from "../../assets/TeamsImage/Pisethi.jpg";
import fourCustomer from "../../assets/TeamsImage/Vanly.jpg";

const testimonials = [
  {
    name: "Seyla",
    location: "Phnom Penh",
    image: firstCustomer,
    text: "iShop is my go-to store for all things electronics! The prices are competitive, and the customer support is top-notch. Highly recommend!",
  },
  {
    name: "Nita",
    location: "Phnom Penh",
    image: secondCustomer,
    text: "I ordered a smartphone, and it arrived within 24 hours! Super fast delivery and well-packaged. I’m really impressed with iShop’s service.",
  },
  {
    name: "Pisethi",
    location: "Phnom Penh",
    image: thirdCustomer,
    text: "The gadgets I bought from iShop are 100% original and of excellent quality. No issues at all! Will definitely shop here again.",
  },
  {
    name: "Vanly",
    location: "Phnom Penh",
    image: fourCustomer,
    text: "I compared prices across different stores, and iShop had the best deals. Great value for money!",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (i) => {
    setIndex(i);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="w-full max-w-3xl lg:max-w-4xl relative">
        <h3 className="text-gray-600 text-center uppercase text-2xl">Testimonials</h3>
        <h2 className="text-4xl text-center font-bold text-gray-900 mt-4">What Customers Say About Us.</h2>
        <div className="relative h-[500px] sm:h-[450px] lg:h-[550px] flex items-center justify-center">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`border border-gray-300 absolute w-full bg-white shadow-lg rounded-xl transition-all duration-1000 transform ${
                i === index
                  ? "opacity-100 scale-100 z-10 p-6 sm:p-8 lg:p-10"
                  : "opacity-60 scale-90 z-0 p-4 sm:p-6 lg:p-8"
              }`}
            >
              <p className="text-gray-700 text-base sm:text-lg lg:text-xl 2xl:text-2xl">{testimonial.text}</p>
              <div className="flex items-center mt-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 2xl:h-20 2xl:w-20 rounded-full  mr-3"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg 2xl:text-xl">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm lg:text-base 2xl:text-xl text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-4 space-x-2 justify-center">
          {testimonials.map((_, i) => (
            <span
              key={i}
              onClick={() => handleDotClick(i)} // On dot click, navigate to the respective slide
              className={`h-2 w-2 2xl:h-3 2xl:w-3 rounded-full cursor-pointer ${
                i === index ? "bg-gray-900" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
