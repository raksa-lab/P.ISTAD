import React, { useEffect, useState, useRef } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import Filter from "../Filter";
import CardDisCom from "../card/CardDisCom";
import BannerDis from "./BannerDis";
import ScrollToTopButton from "../ScrollToTopButton";
import { FiFilter } from "react-icons/fi";

export default function DiscountPage() {
  const [fetchProducts, { data, isLoading, isError, error, isFetching }] =
    useLazyGetAllQuery();
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  // State for filter criteria
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(4950);
  const [minPrice, setMinPrice] = useState(0);

  // Mobile filter state
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Fetch all products on component mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Fetch all products from the API
  const fetchAllProducts = async () => {
    try {
      const response = await fetchProducts({
        page: 0,
        size: 12,
      }).unwrap();

      if (response?.content && response.content.length > 0) {
        const discounted = response.content.filter(
          (product) => product.discount && product.discount > 0
        );
        setDiscountedProducts(discounted);
        setHasMore(!response.last);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch more products for infinite scroll
  const fetchMoreProducts = async () => {
    if (!hasMore || isFetching) return;

    try {
      const response = await fetchProducts({
        page: page + 1,
        size: 12,
      }).unwrap();
      if (response?.content && response.content.length > 0) {
        const discounted = response.content.filter(
          (product) => product.discount && product.discount > 0
        );
        setDiscountedProducts((prev) => [...prev, ...discounted]);
        setPage((prev) => prev + 1);
        setHasMore(!response.last);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more products:", error);
      setHasMore(false);
    }
  };

  // Filter products based on selected brands, categories, and price range
  useEffect(() => {
    const filtered = discountedProducts.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand?.uuid);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category?.uuid);
      const matchesPrice =
        product.priceOut >= minPrice && product.priceOut <= priceRange;
      const matchesSearch =
        product.name.toUpperCase().includes(searchQuery.toUpperCase());
      return matchesBrand && matchesCategory && matchesPrice && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [
    selectedBrands,
    selectedCategories,
    priceRange,
    minPrice,
    discountedProducts,
    searchQuery,
  ]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          fetchMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.disconnect();
      }
    };
  }, [hasMore, isFetching, page]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };

  if (isLoading && discountedProducts.length === 0) {
    return (
      <div className="flex justify-center animate-pulse text-6xl py-20">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center text-2xl text-red-500 py-20">
        Error loading products: {error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <>
      <main className="w-full min-h-screen pt-8 md:pt-14">
        <BannerDis />
        <div className="py-2 w-full px-4 sm:px-6 lg:px-8">
          <h2 className="font-bold text-center mb-10 text-primary text-2xl sm:text-3xl md:text-4xl py-2">
            Best Price Products
          </h2>

          <div className="flex flex-col w-full lg:flex-row gap-10 lg:gap-5 xl:gap-5">
            {/* Mobile Filter Button */}
            <button
              onClick={toggleMobileFilter}
              className="lg:hidden flex items-center justify-center gap-2 bg-primary text-white py-2 px-4 rounded-md mb-4"
            >
              <FiFilter /> Filter Products
            </button>

            {/* Sidebar Filter - Mobile */}
            {showMobileFilter && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
                <div className="bg-white h-full w-4/5 max-w-sm overflow-y-auto p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Filters</h3>
                    <button
                      onClick={toggleMobileFilter}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <Filter
                    setSelectedBrands={setSelectedBrands}
                    setSelectedCategories={setSelectedCategories}
                    setPriceRange={setPriceRange}
                    setMinPrice={setMinPrice}
                  />
                  <button
                    onClick={toggleMobileFilter}
                    className="w-full bg-primary text-white py-2 rounded-md mt-4"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Sidebar Filter - Desktop */}
            <div className="hidden lg:block lg:w-[300px] sticky top-24 h-fit">
              <Filter
                setSelectedBrands={setSelectedBrands}
                setSelectedCategories={setSelectedCategories}
                setPriceRange={setPriceRange}
                setMinPrice={setMinPrice}
              />
            </div>

            {/* Product Grid */}
            <div className="w-full">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search your product..."
                  className="w-full py-2 h-[40px] pl-12 pr-4 text-black_50 font-OpenSan text-base border-[1px] rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
                  autoFocus
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-4">
                {filteredProducts.length === 0 ? (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-lg text-gray-600">No products found</p>
                  </div>
                ) : (
                  filteredProducts.map((e) => (
                    <CardDisCom
                      key={e?.uuid}
                      uuid={e?.uuid}
                      thumbnail={e?.thumbnail}
                      name={e?.name}
                      brand={e?.brand?.name}
                      priceOut={e?.priceOut}
                      dis={e?.discount}
                      disPrice={(e.priceOut - e.discount * e.priceOut).toFixed(
                        2
                      )}
                    />
                  ))
                )}
              </div>

              {/* Loading indicator */}
              {hasMore && (
                <div
                  ref={loaderRef}
                  className="h-20 flex items-center justify-center my-4"
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
                    "Loading more products..."
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <ScrollToTopButton />
      </main>
    </>
  );
}