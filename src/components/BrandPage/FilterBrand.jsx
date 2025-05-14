import React, { useState, useEffect, useRef } from "react";
import { useLazyGetAllQuery } from "../../redux/service/product/productSlice";
import { useGetAllBrandQuery } from "../../redux/features/brand/brandSlice";
import Banner from "../../components/BrandPage/Banner";
import Filter from "../../components/Filter"
import CardCom from "../../components/cart/CardCom";
import LogoBrand from "../../components/BrandPage/LogoBrand";

export default function Brand() {
  // State for products, pagination, and infinite scrolling
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // Lazy query for fetching products
  const [fetchProducts, { isFetching, error, isLoading }] = useLazyGetAllQuery();

  // Fetch brand data
  const {
    data: brandData,
    isLoading: isBrandLoading,
    error: brandError,
  } = useGetAllBrandQuery();

  // State for filtered products and filter criteria
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
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

  // Filter products based on selected brands, categories, and price range
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand?.uuid);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category?.uuid);
      const matchesPrice = product.priceOut <= priceRange;
      return matchesBrand && matchesCategory && matchesPrice;
    });
    setFilteredProducts(filtered);
  }, [selectedBrands, selectedCategories, priceRange, products]);

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
  if (isLoading || isBrandLoading) {
    return <div>Loading...</div>;
  }

  // Error state handling
  if (error || brandError) {
    return <div>Error fetching data.</div>;
  }

  return (
    <>
      <main className="w-full min-h-screen pt-8 md:pt-16">
        <Banner />

        <div className="py-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col w-full lg:flex-row gap-10 lg:gap-5 xl:gap-5">
            {/* Sidebar Filter (Sticky) */}
            <div className="w-full lg:w-[300px] sticky top-24 h-fit">
              <Filter
                setSelectedBrands={setSelectedBrands}
                setSelectedCategories={setSelectedCategories}
                setPriceRange={setPriceRange}
                brandData={brandData} // Pass brand data to Filter component
              />
            </div>

            {/* Product Grid */}
            <div className="w-full">
              <div className="grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[30px] mb-8">
                {/* Display filtered products */}
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
                    />
                  ))
                )}
              </div>

              {/* Infinite Scroll Loader */}
              <div ref={loaderRef} className="flex justify-center py-4">
                {isFetching && <p>Loading more products...</p>}
                {!hasMore && <p></p>}
              </div>

              <br />
              <div>
                <LogoBrand />
                <br />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 