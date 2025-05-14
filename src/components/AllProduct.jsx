import React, { useState, useEffect, useRef } from "react";
import BannerAllPro from "./AllProductCom/BannerAllPro"
import CardCom from "../components/cart/CardCom";
import FilterDis from "../components/AllProductCom/FilterDis";
import { useLazyGetAllQuery } from "../redux/service/product/productSlice";

export default function AllProductPage() {
  // State for products, pagination, and infinite scrolling
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // Lazy query for fetching products
  const [fetchProducts, { isFetching, isLoading, error }] = useLazyGetAllQuery();

  // State for filters
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showDiscountedItems, setShowDiscountedItems] = useState(false);
  const [priceRange, setPriceRange] = useState(4950);

  // Initial fetch of products
  useEffect(() => {
    fetchMoreProducts();
  }, []);

  // Fetch more products for infinite scrolling
  const fetchMoreProducts = async () => {
    if (!hasMore || isFetching) return;

    try {
      const response = await fetchProducts({ page, size: 12 }).unwrap();

      // Check if we got valid data
      if (response?.content && response.content.length > 0) {
        setProducts((prev) => [...prev, ...response.content]);
        setPage((prev) => prev + 1);
        setHasMore(!response.last); // Stop fetching when it's the last page
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMore(false);
    }
  };

  // Filter products based on selected brands, categories, discount, and price range
  const filteredProducts = products.filter((product) => {
    const matchesBrand =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.brand?.uuid);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category?.uuid);
    const matchesDiscount = !showDiscountedItems || product.discount > 0;
    const matchesPrice = product.priceOut <= priceRange;
    return matchesBrand && matchesCategory && matchesDiscount && matchesPrice;
  });

  // Set up Intersection Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          fetchMoreProducts();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.disconnect();
      }
    };
  }, [hasMore, isFetching]);

  // Loading state handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state handling
  if (error) {
    return <div>Error fetching products.</div>;
  }

  return (
    <main className="w-full min-h-screen pt-8 md:pt-16">
      <BannerAllPro />

      <div className="py-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full lg:flex-row gap-10 lg:gap-5 xl:gap-5">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-[300px] sticky top-20 h-fit">
            <FilterDis
              setSelectedBrands={setSelectedBrands}
              setSelectedCategories={setSelectedCategories}
              setShowDiscountedItems={setShowDiscountedItems}
              setPriceRange={setPriceRange}
              priceRange={priceRange}
            />
          </div>

          {/* Product Grid */}
          <div className="w-full">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] mb-8">
              {filteredProducts.length === 0 ? (
                <div className="h-auto flex justify-center items-center w-full md:w-[1020px] mx-auto">
                  <p className="text-sm md:text-xl lg:text-2xl font-OpenSanBold text-center text-primary">
                    No products found.
                  </p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <CardCom
                    key={product.uuid}
                    thumbnail={product.thumbnail}
                    name={product.name}
                    brand={product.brand?.name}
                    price={product.priceOut}
                    discount={product.discount}
                  />
                ))
              )}
            </div>

            {/* Infinite Scroll Loader */}
            <div ref={loaderRef} className="flex justify-center py-4">
              {isFetching && <p>Loading more products...</p>}
              {!hasMore && <p>No more products to load.</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}