import "flowbite";
import { useState } from "react";
import { BsCart, BsMouse3 } from "react-icons/bs";
import { CiSpeaker } from "react-icons/ci";
import { FaRegKeyboard } from "react-icons/fa";
import { GiHeadphones } from "react-icons/gi";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
  IoIosDesktop,
  IoIosLaptop,
  IoIosPhonePortrait,
} from "react-icons/io";
import { NavLink, useNavigate } from "react-router";
import Logo from "../../assets/logo/ishop-light-logo.png";

const navLinks = [
  {
    to: "/products",
    label: "Products",
  },
  {
    label: "Categories",
    isDropdown: true,
    subItems: [
      {
        to: "/phone",
        label: "Phone",
        icon: <IoIosPhonePortrait className="w-[26px] h-[26px]" />,
      },
      {
        to: "/laptop",
        label: "Laptop",
        icon: <IoIosLaptop className="w-[26px] h-[26px]" />,
      },
      {
        to: "/desktop",
        label: "Desktop",
        icon: <IoIosDesktop className="w-[26px] h-[26px]" />,
      },
      {
        to: "/keyboard",
        label: "Keyboard",
        icon: <FaRegKeyboard className="w-[26px] h-[26px]" />,
      },
      {
        to: "/mouse",
        label: "Mouse",
        icon: <BsMouse3 className="w-[26px] h-[26px]" />,
      },
      {
        to: "/speaker",
        label: "Speaker",
        icon: <CiSpeaker className="w-[26px] h-[26px]" />,
      },
      {
        to: "/headphone",
        label: "Headphone",
        icon: <GiHeadphones className="w-[26px] h-[26px]" />,
      },
    ],
  },
  { to: "/brand", label: "Brand" },
  { to: "/discount-products", label: "Discount" },
  { to: "/about", label: "About Us" },
];
// Navigation Component that have background primary color and fixed on top

const NavTwoCom = ({ isLoggedIn, profile, cartItems, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [isOpen, setIsOpen] = useState(false);

  const userName = user?.username || localStorage.getItem("userName");
  const userEmil = user?.email || localStorage.getItem("userEmail");

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignOut = () => {
    toast.success("Log-Out Successful!", {
      icon: "✅",
    });
    localStorage.removeItem("accessToken");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      {/* Main Navbar Container */}
      <div className="fixed left-0 w-full z-40 bg-primary">
        <nav className="relative py-2 flex justify-between items-center mx-4 sm:mx-6 md:mx-10 lg:mx-[50px]">
          {/* Logo */}
          <div className="flex items-center gap-5">
            <div>
              <NavLink className="text-3xl font-bold leading-none" to="/">
                <img
                  src={Logo}
                  alt="iShop Logo"
                  className="h-9 md:h-12 xl:h-14"
                />
              </NavLink>
            </div>
            <div>
              {/* Desktop Menu */}
              <ul className="hidden lg:flex xl:items-center xl:space-x-6 xl:ml-10">
                {navLinks.map((link, index) =>
                  link.isDropdown ? (
                    <li key={index} className="relative">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center lg:font-OpenSanBold justify-between w-full py-2 px-3 text-white hover:text-secondary"
                      >
                        {link.label}
                        {isDropdownOpen ? (
                          <IoIosArrowUp className="w-5 h-5 ms-2.5 transition-transform duration-300" />
                        ) : (
                          <IoIosArrowDown className="w-5 h-5 ms-2.5 transition-transform duration-300" />
                        )}
                      </button>
                      {isDropdownOpen && (
                        <div className="z-40 absolute bg-white/70 backdrop-blur-md divide-y w-[400px] divide-gray-100 rounded-lg shadow-sm mt-[20px]">
                          <ul className="py-2 text-sm text-primary">
                            {link.subItems.map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                className="hover:bg-gray-100 hover:text-secondary"
                              >
                                <NavLink
                                  to={subItem.to}
                                  className="flex items-center gap-2.5 px-4 py-2 justify-between w-full"
                                >
                                  <div className="flex items-center gap-2.5">
                                    {subItem.icon}
                                    <span>{subItem.label}</span>
                                  </div>
                                  <IoIosArrowForward className="w-[18px] h-[18px]" />
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ) : (
                    <li key={index}>
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          isActive
                            ? "text-secondary block py-2 px-3 lg:font-OpenSanBold"
                            : "block py-2 px-3 lg:font-OpenSanBold text-white hover:text-secondary"
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Mobile: Cart/Profile or Login + Hamburger */}
          <div className="flex items-center gap-10">
            {/* Mobile Login/Cart/Profile (Visible only on mobile) */}
            <div className="siXl:hidden flex items-center gap-6">
              {/* Add search icon here */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white text-body block md:hidden lg:block siXl:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
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
              </button>
              <div className="hidden md:block lg:hidden">
                <form onSubmit={(e) => e.preventDefault()} className="flex-1">
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 bottom-0 w-5 h-5 my-auto text-black_50 left-3"
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
                    <input
                      type="text"
                      placeholder="Search your product..."
                      className="w-full py-2 h-[40px] pl-12 pr-4 text-black_50 font-OpenSan text-base border-[1px] rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
                      autoFocus
                    />
                  </div>
                </form>
              </div>

              {isLoggedIn ? (
                <div className="flex items-center gap-5">
                  <NavLink to="/shopping-cart" className="relative">
                    <BsCart className="text-white text-xl hover:text-secondary" />
                    {cartItems > 0 && (
                      <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-1.5">
                        {cartItems}
                      </span>
                    )}
                  </NavLink>
                  <div className="relative">
                    <button
                      type="button"
                      className="flex text-caption bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        src={
                          profile ??
                          "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                        }
                        alt="profile"
                        className="w-12 h-12 rounded-full border"
                      />
                    </button>

                    {isOpen && (
                      <div className="absolute right-1 mt-3 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                        <div className="px-4 py-3">
                          <span className="block text-caption text-gray-900 dark:text-white">
                            {userName}
                          </span>
                          <span className="block text-caption text-gray-500 truncate dark:text-gray-400">
                            {userEmil}
                          </span>
                        </div>
                        <ul className="py-2">
                          <li>
                            <a
                              href="/profile-setting"
                              className="block px-4 py-2 text-caption text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Settings
                            </a>
                          </li>

                          <li>
                            <div
                              onClick={handleSignOut}
                              className="block px-4 py-2 text-caption text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Sign out
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    className="flex text-caption bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                      alt="profile"
                      className="w-10 h-10 rounded-full border"
                    />
                  </button>

                  {isOpen && (
                    <div className="absolute right-1 mt-3 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-2">
                        <li>
                          <a
                            href="/login"
                            className="block px-4 py-2 text-caption text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Login
                          </a>
                        </li>

                        <li>
                          <a
                            href="/register"
                            className="cursor-pointer block px-4 py-2 text-caption text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Sign Up
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Mobile Search Popup */}
            {isSearchOpen && (
              <div className="fixed top-14 left-0 right-0 z-50 p-4 bg-white shadow-md">
                <div className="flex items-center">
                  <form onSubmit={(e) => e.preventDefault()} className="flex-1">
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 bottom-0 w-5 h-5 my-auto text-black_50 left-3"
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
                      <input
                        type="text"
                        placeholder="Search your product..."
                        className="w-full py-2 h-[40px] pl-12 pr-4 text-black_50 font-OpenSan text-base border-[1px] rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
                        autoFocus
                      />
                    </div>
                  </form>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-3 text-gray-500"
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Hamburger Button (Mobile , tablet) */}
            <div className="lg:hidden">
              <button
                className="navbar-burger flex items-center text-white font-OpenSanBold p-3"
                onClick={toggleMenu}
              >
                <svg
                  className="block h-4 w-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Mobile menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Login/Cart/Profile */}
          <div className="hidden siXl:flex siXl:items-center siXl:gap-6">
            {/* Desktop Search Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="xl:w-[300px] siXl:w-[250px] px-2"
            >
              <div className="relative flex justify-end ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute  top-0 bottom-0 w-5 h-5 my-auto text-black_50 xl:left-[10px] lg:left-3"
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
                <input
                  type="text"
                  placeholder="Search your product..."
                  className="lg:w-full py-2 h-[40px] pl-12 pr-4 text-caption text-black_50 font-OpenSan text-base border-[1px] rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
                />
              </div>
            </form>

            {/* Desktop Login/Cart/Profile */}
            {isLoggedIn ? (
              <div className="flex items-center gap-6">
                <NavLink to="/shopping-cart" className="relative">
                  <BsCart className="text-white text-2xl hover:text-secondary" />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-2">
                      {cartItems}
                    </span>
                  )}
                </NavLink>
                <div className="relative">
                  <button
                    type="button"
                    className="flex text-caption bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      src={
                        profile ??
                        "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                      }
                      alt="profile"
                      className="w-12 h-12 rounded-full border"
                    />
                  </button>

                  {isOpen && (
                    <div className="absolute right-1 mt-3 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                      <div className="px-4 py-3">
                        <span className="block text-caption text-gray-900 dark:text-white">
                          {userName}
                        </span>
                        <span className="block text-caption text-gray-500 truncate dark:text-gray-400">
                          {userEmil}
                        </span>
                      </div>
                      <ul className="py-2">
                        <li>
                          <a
                            href="/profile-setting"
                            className="block px-4 py-2 text-caption text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Settings
                          </a>
                        </li>

                        <li>
                          <div
                            onClick={handleSignOut}
                            className="block px-4 py-2 text-caption text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Sign out
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  className="flex text-caption bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                    alt="profile"
                    className="w-10 h-10 rounded-full border"
                  />
                </button>

                {isOpen && (
                  <div className="absolute right-1 mt-3 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-2">
                      <li>
                        <a
                          href="/login"
                          className="block px-4 py-2 text-caption text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Login
                        </a>
                      </li>

                      <li>
                        <a
                          href="/register"
                          className="cursor-pointer block px-4 py-2 text-caption text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign Up
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu (Sidebar) */}
        <div
          className={`navbar-menu relative z-50 ${isMenuOpen ? "" : "hidden"}`}
        >
          <div
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
            onClick={toggleMenu}
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white/50 backdrop-blur-md border-r overflow-y-auto z-50">
            <div className="flex items-center mb-8">
              <NavLink
                className="mr-auto text-3xl font-bold leading-none"
                to="/"
              >
                <img src={Logo} alt="iShop Logo" className="h-9 ml-3" />
              </NavLink>
              <button className="navbar-close" onClick={toggleMenu}>
                <svg
                  className="h-6 w-6 text-primary cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="mb-6">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 bottom-0 w-5 h-5 my-auto text-black_50 left-3"
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
                <input
                  type="text"
                  placeholder="Search your product..."
                  className="w-full py-2 h-[40px] pl-12 pr-4 text-black_50 font-OpenSan text-sm border-[1px] rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
                />
              </div>
            </form>
            {/* Mobile Menu Links */}
            <div>
              <ul>
                {navLinks.map((link, index) =>
                  link.isDropdown ? (
                    <li key={index} className="mb-1 relative">
                      <div
                        className="p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-primary rounded cursor-pointer flex justify-between items-center"
                        onClick={toggleCategories}
                      >
                        {link.label}
                        <svg
                          className={`w-4 h-4 transform transition-transform ${
                            isCategoriesOpen ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      {isCategoriesOpen && (
                        <ul className="ml-4 bg-white/80 backdrop-blur-md rounded shadow-lg">
                          {link.subItems.map((subItem, subIndex) => (
                            <li
                              key={subIndex}
                              className="hover:bg-gray-100 hover:text-secondary"
                            >
                              <NavLink
                                to={subItem.to}
                                className="flex items-center rounded gap-2.5 px-4 py-2 justify-between w-full"
                              >
                                {subItem.icon}
                                <span>{subItem.label}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={index} className="mb-1">
                      <NavLink
                        to={link.to}
                        className="block p-4 text-sm font-semibold text-primary hover:bg-blue-50 hover:text-primary rounded"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Mobile Menu Footer (No Login/Cart Here Anymore) */}
            <div className="mt-auto">
              <p className="my-4 text-xs text-center text-white">
                <span>Copyright © 2025 iShop</span>
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavTwoCom;
