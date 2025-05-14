"use client";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBars, FaRegEyeSlash, FaTimes } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink
import * as Yup from "yup";
import {
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from "../../redux/features/auth/authSlice";
import { useUploadImageMutation } from "../../redux/features/images/imgSlice";
import { useGetAllOrderQuery } from "../../redux/service/order/orderSlice";
import OrderHistory from "./OrderHistory"; // Import OrderHistory component (adjust path as needed)

function Profile({ user }) {
  const [preview, setPreview] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile"); // State to track active section
  const navigate = useNavigate();
  const userUuid = user?.uuid || localStorage.getItem("userUuid");

  const [uploadImage] = useUploadImageMutation();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: orderData } = useGetAllOrderQuery(userUuid, {
    skip: !userUuid,
  });
  const [updatePassword, { isLoading: passLoading }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (user) {
      infoForm.setValues({
        username: user.username || "",
        phoneNumber: user.phoneNumber || "",
        addressLine1: user.address?.addressLine1 || "",
        addressLine2: user.address?.addressLine2 || "",
        road: user.address?.road || "",
        linkAddress: user.address?.linkAddress || "",
        profile: "",
      });
      if (user.profile) setPreview(user.profile);
    }
  }, [user]);

  const infoForm = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      road: "",
      linkAddress: "",
      profile: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters long")
        .max(20, "Username must not exceed 20 characters")
        .matches(
          /^[a-zA-Z0-9_]+$/,
          "Username can only contain letters, numbers, and underscores"
        ),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must contain only digits")
        .min(8, "Phone Number must be 8 to 16 numbers")
        .max(16, "Phone Number must be 8 to 16 numbers"),
      addressLine1: Yup.string().required("Address Line 1 is required"),
      addressLine2: Yup.string().required("Address Line 2 is required"),
      road: Yup.string().required("Road is required"),
      linkAddress: Yup.string().required("Link Address is required"),
      profile: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      try {
        if (!userUuid) {
          toast.error("Cannot update profile: User ID missing");
          navigate("/login");
          return;
        }

        let profileUri = user?.profile || "";
        if (values.profile && typeof values.profile !== "string") {
          const formData = new FormData();
          formData.append("file", values.profile);
          const imageResponse = await uploadImage(formData).unwrap();
          profileUri = imageResponse.uri;
        }

        const updateData = {
          username: values.username,
          phoneNumber: values.phoneNumber,
          address: {
            addressLine1: values.addressLine1,
            addressLine2: values.addressLine2,
            road: values.road,
            linkAddress: values.linkAddress,
          },
          profile: profileUri,
        };

        await updateProfile({ uuid: userUuid, ...updateData }).unwrap();
        toast.success("Profile Updated Successfully");
        setActiveSection("profile"); // Stay on profile section after save
      } catch (err) {
        console.error("Update profile error:", err);
        toast.error(err?.data?.message || "Failed to update profile");
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(6, "Old password must be at least 6 characters")
        .max(20, "Old password must be less than 20 characters")
        .required("Old password is required"),
      newPassword: Yup.string()
        .min(6, "New password must be at least 6 characters")
        .max(20, "New password must be less than 20 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "New password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)"
        )
        .required("New password is required")
        .notOneOf(
          [Yup.ref("oldPassword"), null],
          "New password must be different from old password"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (!userUuid) {
          toast.error("User ID not found. Please log in again.");
          navigate("/login");
          return;
        }

        const updateData = {
          uuid: userUuid,
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        };

        await updatePassword(updateData).unwrap();
        toast.success("Password updated successfully!");
        passwordFormik.resetForm();
        navigate("/login"); // Navigate to login after password change
      } catch (err) {
        console.error("Update password error:", err);
        toast.error(err?.data?.message || "Failed to update password");
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      infoForm.setFieldValue("profile", file);
    }
  };

  const isFilled = (value) => value && value.trim() !== "";

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const togglePasswordVisibility = (field) =>
    setPasswordVisible((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSignOut = () => {
    toast.success("Log-Out Successful!", { icon: "✅" });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userUuid");
    navigate("/");
    window.location.reload();
  };

  const handleCancel = () => {
    navigate("/");
    window.location.reload();
  };

  // Render the appropriate section based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <form onSubmit={infoForm.handleSubmit} className="md:px-6 mb-10">
            <div className="flex flex-col items-start mb-8">
              <div className="relative">
                <img
                  src={
                    preview ||
                    "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                  }
                  alt="profile"
                  className="object-cover w-32 h-32 rounded-full border-4 border-gray-200 shadow-md"
                />
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full cursor-pointer hover:bg-red-700 transition-colors duration-200"
                >
                  Edit
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {infoForm.errors.profile && infoForm.touched.profile && (
                <div className="text-red-500 text-sm mt-2">
                  {infoForm.errors.profile}
                </div>
              )}
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-red-600 mb-6">
              Edit Your Profile
            </h3>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={infoForm.values.username}
                  onChange={infoForm.handleChange}
                  onBlur={infoForm.handleBlur}
                  placeholder="Enter username"
                  className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-200 ${
                    isFilled(infoForm.values.username) &&
                    !infoForm.errors.username
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                />
                {infoForm.errors.username && infoForm.touched.username && (
                  <div className="text-red-500 text-sm mt-1">
                    {infoForm.errors.username}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={infoForm.values.phoneNumber}
                  onChange={infoForm.handleChange}
                  onBlur={infoForm.handleBlur}
                  placeholder="Enter phone number"
                  className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-200 ${
                    isFilled(infoForm.values.phoneNumber) &&
                    !infoForm.errors.phoneNumber
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                />
                {infoForm.errors.phoneNumber &&
                  infoForm.touched.phoneNumber && (
                    <div className="text-red-500 text-sm mt-1">
                      {infoForm.errors.phoneNumber}
                    </div>
                  )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={infoForm.values.addressLine1}
                  onChange={infoForm.handleChange}
                  onBlur={infoForm.handleBlur}
                  placeholder="Enter address line 1"
                  className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-200 ${
                    isFilled(infoForm.values.addressLine1) &&
                    !infoForm.errors.addressLine1
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                />
                {infoForm.errors.addressLine1 &&
                  infoForm.touched.addressLine1 && (
                    <div className="text-red-500 text-sm mt-1">
                      {infoForm.errors.addressLine1}
                    </div>
                  )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={infoForm.values.addressLine2}
                  onChange={infoForm.handleChange}
                  onBlur={infoForm.handleBlur}
                  placeholder="Enter address line 2"
                  className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-200 ${
                    isFilled(infoForm.values.addressLine2) &&
                    !infoForm.errors.addressLine2
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                />
                {infoForm.errors.addressLine2 &&
                  infoForm.touched.addressLine2 && (
                    <div className="text-red-500 text-sm mt-1">
                      {infoForm.errors.addressLine2}
                    </div>
                  )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Road
                </label>
                <input
                  type="text"
                  name="road"
                  value={infoForm.values.road}
                  onChange={infoForm.handleChange}
                  onBlur={infoForm.handleBlur}
                  placeholder="Enter road"
                  className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-200 ${
                    isFilled(infoForm.values.road) && !infoForm.errors.road
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                />
                {infoForm.errors.road && infoForm.touched.road && (
                  <div className="text-red-500 text-sm mt-1">
                    {infoForm.errors.road}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Google Map Link
                </label>
                <input
                  type="text"
                  name="linkAddress"
                  value={infoForm.values.linkAddress}
                  onChange={infoForm.handleChange}
                  onBlur={infoForm.handleBlur}
                  placeholder="Enter Google Map link"
                  className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-200 ${
                    isFilled(infoForm.values.linkAddress) &&
                    !infoForm.errors.linkAddress
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                />
                {infoForm.errors.linkAddress &&
                  infoForm.touched.linkAddress && (
                    <div className="text-red-500 text-sm mt-1">
                      {infoForm.errors.linkAddress}
                    </div>
                  )}
              </div>
            </section>

            <div className="flex gap-6 items-center justify-end mt-10">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 text-white font-medium rounded-md border border-gray-300 bg-accent_1 hover:bg-primary transition-colors duration-200"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        );
      case "password":
        return (
          <form onSubmit={passwordFormik.handleSubmit} className="px-0 md:px-6">
            <h3 className="text-xl md:text-2xl font-semibold text-red-600 mb-6">
              Change Password
            </h3>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">
                  Old Password
                </label>
                <input
                  type={passwordVisible.oldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={passwordFormik.values.oldPassword}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  placeholder="Enter old password"
                  className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-200 ${
                    isFilled(passwordFormik.values.oldPassword) &&
                    !passwordFormik.errors.oldPassword
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility("oldPassword")}
                >
                  {passwordVisible.oldPassword ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>
                {passwordFormik.errors.oldPassword &&
                  passwordFormik.touched.oldPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {passwordFormik.errors.oldPassword}
                    </div>
                  )}
              </div>

              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">
                  New Password
                </label>
                <input
                  type={passwordVisible.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordFormik.values.newPassword}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  placeholder="Enter new password"
                  className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-200 ${
                    isFilled(passwordFormik.values.newPassword) &&
                    !passwordFormik.errors.newPassword
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {passwordVisible.newPassword ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>
                {passwordFormik.errors.newPassword &&
                  passwordFormik.touched.newPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {passwordFormik.errors.newPassword}
                    </div>
                  )}
              </div>

              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type={passwordVisible.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordFormik.values.confirmPassword}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  placeholder="Confirm new password"
                  className={`w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-200 ${
                    isFilled(passwordFormik.values.confirmPassword) &&
                    !passwordFormik.errors.confirmPassword
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {passwordVisible.confirmPassword ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>
                {passwordFormik.errors.confirmPassword &&
                  passwordFormik.touched.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {passwordFormik.errors.confirmPassword}
                    </div>
                  )}
              </div>
            </section>

            <div className="flex gap-6 items-center justify-end mt-10">
              <button
                type="button"
                onClick={() => {
                  passwordFormik.resetForm();
                  setActiveSection("profile");
                }}
                className="px-6 py-2 text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={passLoading}
                className="px-4 py-2 sm:px-6 text-white font-medium rounded-md border border-gray-300 bg-accent_1 hover:bg-primary transition-colors duration-200"
              >
                {passLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        );
      case "orders":
        return <OrderHistory user={user} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen md:px-20 lg:px-0 pt-24 pb-16">
      <div className="mx-[50px] items-center lg:mx-[100px] xl:mx-[100px] 2xl:mx-[100px]">
        <div className="flex mt-32">
          {/* Sidebar - Left Column */}
          <aside
            className={`fixed lg:relative lg:block top-0 left-0 h-full w-64 lg:bg-transparent lg:p-0 z-20 transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen
                ? "translate-x-0 bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl z-50"
                : "-translate-x-full lg:translate-x-0"
            } lg:shadow-none rounded-md text-white lg:text-black`}
          >
            <nav className="flex flex-col p-6 lg:p-0 h-full">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-h5 font-semibold tracking-wide">
                  My Setting
                </h2>
                <button
                  onClick={toggleSidebar}
                  className="text-white hover:text-accent_1 lg:hidden"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <NavLink
                  to="#"
                  onClick={() => setActiveSection("profile")}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 text-left ${
                      activeSection === "profile"
                        ? "text-accent_1"
                        : "text-black_50 hover:text-accent_1"
                    }`
                  }
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="#"
                  onClick={() => setActiveSection("password")}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 text-left ${
                      activeSection === "password"
                        ? "text-accent_1"
                        : "text-black_50 hover:text-accent_1"
                    }`
                  }
                >
                  Change Password
                </NavLink>
                <NavLink
                  to="#"
                  onClick={() => setActiveSection("orders")}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 text-left ${
                      activeSection === "orders"
                        ? "text-accent_1"
                        : "text-black_50 hover:text-accent_1"
                    }`
                  }
                >
                  Orders History{" "}
                  {orderData?.length > 0 && `(${orderData.length})`}
                </NavLink>
              </div>
              <button
                onClick={handleSignOut}
                className="mt-32 px-6 py-2 text-white bg-red-600 hover:bg-red-700 text-sm font-medium rounded-md transition-colors duration-200"
              >
                Log Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <section className="w-full lg:pl-8 flex-1">
            <div className="flex flex-col grow">
              <div className="flex justify-between items-center mb-8">
                <header className="text-h1 font-bold text-gray-800">
                  Welcome!{" "}
                  <span className="text-red-600">
                    {user?.username || infoForm.values.username || "User"}
                  </span>
                </header>
                <button
                  onClick={toggleSidebar}
                  className="text-gray-800 hover:text-gray-600 lg:hidden md:bg-red-600 md:text-white md:hover:bg-red-700 md:px-4 md:py-2 md:rounded-md transition-colors duration-200"
                >
                  <span className="lg:hidden">
                    <FaBars size={24} />
                  </span>
                </button>
              </div>

              {/* Render the active section */}
              {renderSection()}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Profile;
