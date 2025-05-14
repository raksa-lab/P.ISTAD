import React from "react";

export default function BannerPh() {
  return (
    <main>
      <section className="flex justify-center pt-[32px] px-20 pb-19 rounded-[25px] bg-stone-950 max-md:px-5 max-md:pb-24 mt-[32px] mx-[100px]">
        <div className="flex gap-5 flex-rom max-md:flex-col">
          <div className="w-[26%] max-md:ml-0 max-md:w-full">
            <ProductImage
              imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/893f36fb49243b9de1c012f819bac46a33d8db1611019a37a69ea9f1dd539eb1?placeholderIfAbsent=true&apiKey=5cd3de3f08094ca3afe2694744931c58"
              className="object-contain shrink-0 mt-7 max-w-full aspect-[0.97] w-[360px] max-md:mt-10"
            />
          </div>
          <div className="ml-5 w-[74%] max-md:ml-0 max-md:w-full">
            <div className="grow max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                <ProductDetails />
                <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                  <ProductImage
                    imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/ef96ecc59e9cf7c59af0db71ebda0d02271841efde2754506f448002d2634c72?placeholderIfAbsent=true&apiKey=5cd3de3f08094ca3afe2694744931c58"
                    className="object-contain w-full aspect-[1.06] max-md:mt-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
function ProductImage({ imageSrc, className }) {
  return (
    <img src={imageSrc} alt="Beats headphones product" className={className} />
  );
}
function ProductDetails() {
  return (
    <div className="w-6/12 max-md:ml-0 max-md:w-full">
      <article className="flex flex-col grow items-start mt-12 text-sm text-white max-md:mt-10">
        <h1 className="self-stretch text-5xl font-medium text-white max-md:text-4xl">
          Beats Solo'Black
        </h1>
        <p className="mt-2.5 text-gray-200">
          Lorem Ipsum is simply dummy text of the print
        </p>
        <p className="mt-2.5  text-gray-200">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the
        </p>
        <p className="mt-3  text-gray-200">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.{" "}
        </p>
        <BuyButton />
      </article>
    </div>
  );
}

function BuyButton() {
  return (
    <button className="self-center px-6 py-3 mt-16 max-w-full text-[18px] font-medium text-white capitalize bg-accent_1 rounded-lg w-[145px] max-md:px-5 max-md:mt-10">
      Buy Now
    </button>
  );
}
