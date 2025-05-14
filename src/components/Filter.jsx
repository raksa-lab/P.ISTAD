import React, { useState } from "react";
import { useGetAllBrandQuery } from "../redux/features/brand/brandSlice";
import { useGetAllCategoriesQuery } from "../redux/service/category/categorySlice";
import { HiOutlineFilter, HiChevronDown, HiChevronUp, HiX } from "react-icons/hi";

export default function Filter({
  setSelectedBrands,
  setSelectedCategories,
  setPriceRange,
  setMinPrice,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [price, setPrice] = useState(4950);

  const { data: brandData, isLoading: isBrandLoading, isError: isBrandError } =
    useGetAllBrandQuery();
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useGetAllCategoriesQuery();

  const handleBrandChange = (uuid) => {
    setSelectedBrands((prev) =>
      prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
    );
  };

  const handleCategoryChange = (uuid) => {
    setSelectedCategories((prev) =>
      prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
    );
  };

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPrice(value);
    setPriceRange(value);
  };

  if (isBrandLoading || isCategoryLoading)
    return <div className="p-4">Loading filters...</div>;
  if (isBrandError || isCategoryError)
    return <div className="p-4 text-red-500">Error loading filters</div>;

  return (
    <div className="relative">
      {/* Mobile Filter Toggle Button */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden flex items-center justify-between w-full bg-primary text-white py-3 px-4 rounded-md mb-4"
      >
        <div className="flex items-center">
          <HiOutlineFilter className="mr-2" />
          <span>Filter Products</span>
        </div>
        {isFilterOpen ? <HiChevronUp /> : <HiChevronDown />}
      </button>

      {/* Overlay for Mobile */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[998] lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Filter Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-[999] overflow-y-auto transition-transform duration-300 ease-in-out lg:sticky lg:top-24 lg:z-10 lg:w-64 lg:transform-none lg:shadow-none ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5">
          {/* Mobile Close Button */}
          <button
            className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setIsFilterOpen(false)}
          >
            <HiX className="text-xl" />
          </button>

          <h2 className="text-xl font-bold text-primary mb-4">Filters</h2>

          {/* Categories Section */}
          <div className="mb-2">
            <h3 className="font-semibold text-primary mb-2">Categories</h3>
            <div className="space-y-1">
              {categoryData?.content?.map((category) => (
                <div key={category.uuid} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`cat-${category.uuid}`}
                    onChange={() => handleCategoryChange(category.uuid)}
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <label htmlFor={`cat-${category.uuid}`} className="ml-2 text-primary">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-1 border-gray-200" />

          {/* Brands Section */}
          <div className="mb-2">
            <h3 className="font-semibold text-primary mb-2">Brands</h3>
            <div className="space-y-1">
              {brandData?.content?.map((brand) => (
                <div key={brand.uuid} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand.uuid}`}
                    onChange={() => handleBrandChange(brand.uuid)}
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <label htmlFor={`brand-${brand.uuid}`} className="ml-2 text-primary">
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-1 border-gray-200" />

          {/* Price Range */}
          <div className="mb-2">
            <h3 className="font-semibold text-primary mb-2">Price Range</h3>
            <input
              type="range"
              min="20"
              max="4950"
              value={price}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">$20</span>
              <span className="text-sm font-medium text-gray-900">${price}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}