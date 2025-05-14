import React from "react";
import { useGetAllBrandQuery } from "../../redux/features/brand/brandSlice";

function LogoBrand() {
  const selectedUUIDs = [
    "31011444-c796-4bbc-a818-0a6c556ea4ca",
    "2f3a7f65-6d47-4dcc-a56f-79e7b1ca1687",
    "7213d423-bd51-4c00-9eac-d9c3c036cf1d",
  ];

  const { data: ProductBrand, isLoading, error } = useGetAllBrandQuery();

  if (isLoading) return <div>Loading brands...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="my-6 text-center">
      <h2 className="font-bold text-3xl text-primary underline mb-6">
        Famous Brands
      </h2>
      <div className="grid grid-cols-3 gap place-items-center">
        {ProductBrand?.content &&
          ProductBrand.content
            .filter((e) => selectedUUIDs.includes(e?.uuid))
            .map((e) => (
              <img
                key={e?.uuid}
                src={e?.brandLogo}
                alt={e?.name}
                className="w-32 h-36 object-contain"
                onError={(e) => (e.target.src = "/fallback-logo.png")}
              />
            ))}
      </div>
    </div>
  );
}

export default LogoBrand;
