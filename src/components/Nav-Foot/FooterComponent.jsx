import "flowbite";
import { FaFacebook, FaPhoneAlt, FaTelegram } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

import { FaSquareXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import logo from "../../assets/logo/ishop-light-logo.png";
import SchoolLogo from "../../assets/logo/istad-logo-white.png.png";

const FooterComponent = () => {
  return (
    <footer className="bg-primary">
      <div className="w-80%">
        <div className="md:flex md:items-center md:justify-between grid grid-flow-row">
          {/* Logo Section */}
          <div className="grid items-center p-4 py-12 lg:ml-[100px] md:ml-[50px]">
            <div className="grid items-center space-y-4">
              <span className="text-h6 font-OpenSanBold md:text-h5 text-white uppercase mb-2">
                Organized by
              </span>
              <img
                src={SchoolLogo}
                alt="iStad"
                className="w-[230px] md:w-[250px]"
              />
            </div>
            <div className="mt-6">
              <a href="/" className="flex">
                <img
                  src={logo}
                  className="w-[230px] md:w-[280px]"
                  alt="iShop Logo"
                />
              </a>
            </div>
          </div>

          {/* Description Columns */}
          <div className="grid ml-5 py-12 grid-cols-1 gap-8 lg:gap-20 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mr-[100px] md:mr-[50px]">
            <div>
              <h2 className="mb-6 text-h6 font-OpenSanBold md:text-h5 text-white uppercase dark:text-white">
                Quick Links
              </h2>
              <ul className="text-white/70 dark:text-gray-400 font-medium">
                {[
                  "All Products",
                  "Categories",
                  "Brand",
                  "Discount",
                  "About Us",
                  "FAQs",
                ].map((item) => (
                  <li key={item} className="mb-4">
                    <a href="#" className="hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-h6 font-OpenSanBold md:text-h5 text-white uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-white/70 dark:text-gray-400 font-medium">
                {["Term of Service", "Privacy Policy", "Refound Policy"].map(
                  (item) => (
                    <li key={item} className="mb-4">
                      <a href="#" className="hover:underline">
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-h6 font-OpenSanBold md:text-h5 text-white uppercase dark:text-white">
                Contacts
              </h2>
              <ul className="text-white/70 dark:text-gray-400 font-medium">
                <li className="mb-4 flex items-center">
                  <FaPhoneAlt className="mr-2 text-gray-500 dark:text-gray-400" />
                  <span>(+855) 12345678</span>
                </li>
                <li className="mb-4 flex items-center">
                  <MdOutlineEmail className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <a href="#" className="hover:underline">
                    iShop@gmail.com
                  </a>
                </li>
                <li>
                  <div className="flex mt-4 sm:justify-center sm:mt-0">
                    <a href="#" className="text-blue-600">
                      <FaFacebook className="w-6 h-6" />
                      <span className="sr-only">Facebook page</span>
                    </a>
                    <a href="#" className="text-black ms-5">
                      <FaSquareXTwitter className="w-6 h-6" />
                      <span className="sr-only">Twitter page</span>
                    </a>
                    <a href="#" className="ms-5">
                      <svg
                        width="37"
                        height="37"
                        viewBox="0 0 24 24"
                        fill="url(#instagramGradient)"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="instagramGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#f09433" />
                            <stop offset="25%" stopColor="#e6683c" />
                            <stop offset="50%" stopColor="#dc2743" />
                            <stop offset="75%" stopColor="#cc2366" />
                            <stop offset="100%" stopColor="#bc1888" />
                          </linearGradient>
                        </defs>
                        <RiInstagramFill
                          className="w-6 h-6"
                          fill="url(#instagramGradient)"
                        />
                      </svg>
                      <span className="sr-only">Instagram account</span>
                    </a>

                    <a href="#" className="text-[#33AAE2] ms-3">
                      <FaTelegram className="w-6 h-6" />
                      <span className="sr-only">Telegram account</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-1 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-1" />

        <div className="text-center p-3">
          <span className="text-sm text-white  dark:text-white sm:text-center">
            © 2025{" "}
            <a href="#" className="hover:underline">
              iShop™
            </a>
            {" |"} All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
