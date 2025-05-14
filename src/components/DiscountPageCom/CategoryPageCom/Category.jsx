import React, { useState } from "react";
// import { useGetAllCategoriesQuery } from "../redux/service/category/categorySlice";
import {useGetAllCategoriesQuery} from "../../redux/service/category/categorySlice"
import { HiOutlineFilter, HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function Filter({
  setSelectedCategories,
  setPriceRange,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [price, setPrice] = useState(4950); // State to track the current price value

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useGetAllCategoriesQuery();

  // Handle category checkbox changes
  const handleCategoryChange = (uuid) => {
    setSelectedCategories((prev) =>
      prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
    );
  };

  // Handle price range changes
  const handlePriceChange = (e) => {
    const value = Number(e.target.value); // Ensure the value is a number
    setPrice(value); // Update the local price state
    setPriceRange(value); // Update the priceRange state in the parent component
  };

  if (isCategoryLoading)
    return <aside className="w-1/4 rounded-lg">Loading...</aside>;
  if (isCategoryError)
    return (
      <aside className="w-1/4 rounded-lg text-red-500">
        Error loading categories
      </aside>
    );

  return (
    <div className="relative">
      {/* Filter Button (For Small Screens) */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden flex items-center bg-primary text-white py-2 px-4 rounded-md text-lg font-semibold"
        aria-label="Toggle filter menu"
      >
        <HiOutlineFilter className="text-xl mr-2" />
        <span>Filter</span>
        {isFilterOpen ? (
          <HiChevronUp className="ml-2 text-xl" />
        ) : (
          <HiChevronDown className="ml-2 text-xl" />
        )}
      </button>

      {/* Filter Sidebar/Dropdown */}
      <aside
        className={`fixed lg:sticky top-0 left-0 w-[240px] bg-white rounded-lg p-5 z-50 transition-all duration-300 ${
          isFilterOpen ? "block" : "hidden"
        } lg:block lg:relative lg:top-20 lg:w-64 lg:max-w-[300px] lg:h-fit lg:overflow-y-auto`}
      >
        {/* Product Categories */}
        <h3 className="font-bold text-[20px] text-primary mb-3">
          Product Categories
        </h3>
        <ul className="space-y-2 text-[16px] text-gray-600">
          {categoryData?.content?.map((category) => (
            <li key={category.uuid} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.uuid}`}
                onChange={() => handleCategoryChange(category.uuid)}
                className="mr-2 h-4 w-4 checked:bg-primary"
              />
              <label htmlFor={`category-${category.uuid}`}>
                {category.name}
              </label>
            </li>
          ))}
        </ul>

        {/* Price Range */}
        <h3 className="font-bold text-[20px] text-primary mt-5 mb-3">
          Choose Price
        </h3>
        <input
          type="range"
          min="20"
          max="4950"
          value={price} // Use the local price state
          onChange={handlePriceChange}
          className="w-full accent-primary"
          aria-label="Price range slider"
        />
        <div className="flex justify-between font-bold mt-2 text-gray-700">
          <span>$20</span>
          <span>${price}</span> {/* Display the current price value */}
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}