import React from "react";
import { useParams } from "react-router";
import { useUserDataOfTokenQuery } from "../../redux/features/auth/authSlice"; // Adjust path as needed
import { useGetByUuidQuery } from "../../redux/service/product/productSlice";
import ProductDetail from "./ProductDetail"; // Adjust the import path as needed

export default function Detail() {
  const { uuid } = useParams();
  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
  } = useGetByUuidQuery(uuid);

  // Fetch user data using RTK Query
  const token = localStorage.getItem("accessToken");
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useUserDataOfTokenQuery(undefined, {
    skip: !token, // Skip if no token
  });

  // Determine if the user is logged in
  const isLoggedIn = !!token && !!userData && !userError;

  // Debugging logs
  console.log("UUID:", uuid);
  console.log("Product Loading:", productLoading);
  console.log("Product Error:", productError);
  console.log("User Data:", userData);
  console.log("User Error:", userError);
  console.log("Is Logged In:", isLoggedIn);

  if (productLoading || userLoading) {
    return <div>Loading...</div>;
  }

  if (productError || !productData) {
    return <div>Error loading product details or product not found.</div>;
  }

  const { name, description, stockQuantity, priceOut, discount, color, brand } =
    productData;

  const originalPrice = Number(priceOut);
  const price = discount > 0 ? originalPrice - (originalPrice *  discount) : originalPrice;

  console.log(originalPrice)
  console.log(price)

  return (
    <ProductDetail
      colorOptions={color}
      category= {productData?.category?.name}
      title={name}
      availability={stockQuantity > 0 ? "In Stock" : "Out of Stock"}
      brand={brand?.name}
      price={price}
      originalPrice={originalPrice}
      description={description}
      sizes={productData?.computerSpec?.screenSize}
      memoryOptions={[]}
      storageOptions={[]}
      isLoggedIn={isLoggedIn}
      userUuid={userData?.uuid} 
      productUuid={uuid} 
    />
  );
}
