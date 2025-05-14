import React, { useEffect, useRef, useState } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import { useLocation } from "react-router-dom";
import CardDisCom from "../card/CardDisCom";
import ScrollToTopButton from "../ScrollToTopButton";
import BannerAllPro from "./BannerAllPro";
import FilterDis from "./FilterDis";
import useDebounce from "./hooks";

export default function AllProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const [fetchProducts, { isFetching }] = useLazyGetAllQuery();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(4950);
  const [minPrice, setMinPrice] = useState(0);
  const [showDiscountedItems, setShowDiscountedItems] = useState(false);

  // Get category from query parameter
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  useEffect(() => {
    if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
      setSelectedCategories((prev) => [...prev, selectedCategory]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchMoreProducts();
  }, []);

  const fetchMoreProducts = async () => {
    if (!hasMore || isFetching) return;

    try {
      const response = await fetchProducts({ page, size: 12 }).unwrap();
      if (response?.content?.length > 0) {
        setProducts((prev) => [...prev, ...response.content]);
        setPage((prev) => prev + 1);
        setHasMore(!response.last);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMore(false);
    }
  };

  // Filtering logic
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand?.uuid);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category?.uuid);
      const matchesPrice =
        product.priceOut >= minPrice && product.priceOut <= priceRange;
      const matchesDiscount =
        !showDiscountedItems || (product.discount && product.discount > 0);
      const matchesSearch =
        product.name.toUpperCase().includes(debouncedSearchQuery.toUpperCase());

      return matchesBrand && matchesCategory && matchesPrice && matchesDiscount && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [
    selectedBrands,
    selectedCategories,
    priceRange,
    minPrice,
    showDiscountedItems,
    products,
    debouncedSearchQuery,
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

  return (
    <main className="min-h-screen pt-8 md:pt-20">
      <BannerAllPro />
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full lg:flex-row gap-6 py-6">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-[300px]">
            <FilterDis
              setSelectedBrands={setSelectedBrands}
              setSelectedCategories={setSelectedCategories}
              setPriceRange={setPriceRange}
              setMinPrice={setMinPrice}
              setShowDiscountedItems={setShowDiscountedItems}
              selectedCategories={selectedCategories}
            />
          </div>

          {/* Product Grid */}
          <div className="w-full relative z-0">
            {/* Search Input */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-3 pl-12 pr-4 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full py-12 text-center">
                  <p className="text-lg text-gray-600">No products found</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <CardDisCom
                    key={product.uuid}
                    uuid={product.uuid}
                    thumbnail={product.thumbnail}
                    name={product.name}
                    brand={product.brand?.name}
                    priceOut={product.priceOut}
                    disPrice={(product.priceOut - product.priceOut * (product.discount || 0)).toFixed(2)}
                    dis={product.discount || 0}
                  />
                ))
              )}
            </div>

            {/* Loading indicator */}
            {hasMore && (
              <div ref={loaderRef} className="py-8 flex justify-center">
                {isFetching ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                ) : (
                  <button
                    onClick={fetchMoreProducts}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  );
}