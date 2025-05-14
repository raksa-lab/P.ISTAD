import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import phone from "../../assets/PopularCategories/phoneCategory.png";
import laptop from "../../assets/PopularCategories/laptopCategory.png";
import headphone from "../../assets/PopularCategories/headPhoneCategory.png";
import mouse from "../../assets/PopularCategories/mouseCategory.png";
import keyboard from "../../assets/PopularCategories/keyboardCategory.png";

const products = [
  { name: "Phone", image: phone },
  { name: "Laptop", image: laptop },
  { name: "Headphone", image: headphone },
  { name: "Mouse", image: mouse },
  { name: "Keyboard", image: keyboard },
];

export default function PopularCategories() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const loaderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setIsLoading(false); // Simulate data load completion after 2 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
  };

  const loadMore = () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    // Simulate fetching more products
    setTimeout(() => {
      setIsFetching(false);
      // You can add additional logic here to load more products
    }, 2000);
  };

  return (
    <>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-primary text-center font-OpenSanBold mb-8 pt-[30px]">
        Popular Categories
      </h1>

      <div className="flex justify-center w-full px-[50px] pt-[30px]">
        {isLoading ? (
          <div className="flex justify-center animate-pulse text-6xl py-20">
            Loading...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 w-full">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center transition-transform transform duration-500 ease-in-out hover:scale-110 w-full cursor-pointer"
                  onClick={() => handleCategoryClick(product.name)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 2xl:w-64 2xl:h-64 object-contain drop-shadow-xl"
                  />
                  <h3 className="mt-4 text-gray-700 font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                    {product.name}
                  </h3>
                </div>
              ))}
            </div>

            {hasMore && (
              <div
                ref={loaderRef}
                className="h-20 flex items-center justify-center my-4"
                onClick={loadMore}
              >
                {isFetching ? (
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
