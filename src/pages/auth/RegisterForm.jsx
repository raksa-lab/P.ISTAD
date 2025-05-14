import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useGetLoginMutation,
  useUserRegisterMutation,
} from "../../redux/features/auth/authSlice";

import { useState } from "react";
import { useNavigate } from "react-router";

import logo from "../../assets/logo/ishop-light-logo.png";

import { CircularProgress } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import Ill from "../../assets/auth/register.png";

const RegisterForm = () => {
  const [userRegister] = useUserRegisterMutation();

  const [getLogin] = useGetLoginMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // handle login with google
  const googleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (tokenResponse) {
        setLoading(true);
        const accessToken = tokenResponse.access_token;
        try {
          const userData = await fetch(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
              },
            }
          ).then((data) => data.json());
          console.log("Google User Info:", userData);

          if (userData) {
            const submitValue = {
              email: userData.email,
              username: userData.given_name,
              phoneNumber: "",
              address: {},
              password: `${userData.given_name}${
                import.meta.env.VITE_SECRET_KEY
              }`,
              confirmPassword: `${userData.given_name}${
                import.meta.env.VITE_SECRET_KEY
              }`,
              profile: userData.picture,
              emailVerified: true, // Pass emailVerified as true
            };

            console.log("Submit Value for Google Register:", submitValue);

            try {
              const registerResponse = await userRegister(submitValue).unwrap();
              console.log("Google Register Response:", registerResponse);

              const loginResponse = await getLogin({
                email: userData.email,
                password: `${userData.given_name}${
                  import.meta.env.VITE_SECRET_KEY
                }`,
              }).unwrap();
              console.log("Login Response:", loginResponse);

              localStorage.setItem("accessToken", loginResponse.accessToken);
              localStorage.setItem(
                "userData",
                JSON.stringify(loginResponse.user)
              );

              toast.success("Registration and Login Successful!", {
                icon: "✅",
              });
              navigate("/");
              window.location.reload();
            } catch (error) {
              console.error("Google Registration or Login Error:", error);
              toast.error(
                error?.data?.message || "Google registration or login failed"
              );
            }
          }
        } catch (error) {
          console.error("Google Fetch Error:", error);
          toast.error("Failed to fetch Google user info");
        }
        setLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google Auth Error:", errorResponse);
      toast.error("Google login failed");
      setLoading(false);
    },
  });

  const fieldRegister = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: {},
      profile: null,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters long")
        .max(20, "Username must not exceed 20 characters")
        .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters")
        .required("Username is required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must contain only digits")
        .min(8, "Phone Number must be 8 to 16 numbers")
        .required("Phone Number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const submissionValues = {
          ...values,
          emailVerified: false,
        };
        await userRegister(submissionValues).unwrap();
        toast.success("Please verify your Email!", {
          icon: "✅",
        });
        resetForm();
        navigate(`/verify-email?email=${values.email}`);
      } catch (err) {
        console.error("Registration failed:", err);
        const errorMessage =
          err?.data?.error?.description || "Registration failed.";
        if (errorMessage.includes("Email or username already exists")) {
          setErrors({ email: errorMessage });
          toast.error(errorMessage);
        } else {
          toast.error(errorMessage);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const isFilled = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim() !== "";
    if (value instanceof File) return true;
    return false;
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Illustration */}
        <div className="w-full md:w-2/5 bg-indigo-800 p-6 flex items-center justify-center min-h-[300px] md:min-h-full">
          <div className="relative w-full h-full max-h-96 md:max-h-full">
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:top-10 md:top-10 top-3">
              <div className="flex items-center">
                <img src={logo} alt="logo" className="md:w-[200px] w-[150px]" />
              </div>
            </div>

            <div className="w-full h-full flex justify-center items-center">
              <img
                src={Ill}
                alt=""
                className="w-[200px] md:w-[300px] lg:[350px] mt-10"
              />
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-3/5 p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-h1 font-OpenSanBold text-primary">
                Registration
              </h2>
              <div className="w-12 h-1 bg-primary mt-2"></div>
            </div>
          </div>
          <form
            onSubmit={fieldRegister.handleSubmit}
            className="mt-8 grid grid-cols-6 lg:gap-6 gap-4"
          >
            <div className="col-span-6 sm:col-span-3">
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={fieldRegister.values.username}
                  onChange={fieldRegister.handleChange}
                  placeholder=" "
                  onBlur={fieldRegister.handleBlur}
                  required
                  className={`peer w-full h-[45px] lg:h-[50px] rounded-md border border-gray-200 text-[15px] text-gray-700 shadow-xs focus:outline-none focus:border-blue-500 ${
                    isFilled(fieldRegister.values.username) &&
                    !fieldRegister.errors.username
                      ? "bg-[#e8f0fe]"
                      : "bg-white"
                  }`}
                />
                <label
                  htmlFor="username"
                  className="absolute text-caption lg:text-[18px] text-gray-300 dark:text-gray-400 duration-300 transform top-1/2 -translate-y-1/2 left-2 bg-white dark:bg-gray-900 px-2 
               peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
               peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
               peer-valid:top-2 peer-valid:-translate-y-4 peer-valid:scale-75"
                >
                  Username
                </label>
              </div>
              <div className="h-[10px] ml-1">
                {fieldRegister.errors.username &&
                  fieldRegister.touched.username && (
                    <div className="text-accent_1 lg:text-sm text-tiny">
                      {fieldRegister.errors.username}
                    </div>
                  )}
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <div className="relative">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={fieldRegister.values.phoneNumber}
                  onChange={fieldRegister.handleChange}
                  placeholder=" "
                  onBlur={fieldRegister.handleBlur}
                  required
                  className={`peer w-full h-[45px] lg:h-[50px] rounded-md border border-gray-200 text-[15px] text-gray-700 shadow-xs focus:outline-none focus:border-blue-500 ${
                    isFilled(fieldRegister.values.phoneNumber) &&
                    !fieldRegister.errors.phoneNumber
                      ? "bg-[#e8f0fe]"
                      : "bg-white"
                  }`}
                />
                <label
                  htmlFor="phoneNumber"
                  className="absolute text-caption lg:text-[18px] text-gray-300 dark:text-gray-400 duration-300 transform top-1/2 -translate-y-1/2 left-2 bg-white dark:bg-gray-900 px-2 
               peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
               peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
               peer-valid:top-2 peer-valid:-translate-y-4 peer-valid:scale-75"
                >
                  Phone Number
                </label>
              </div>
              <div className="h-[10px] ml-1">
                {fieldRegister.errors.phoneNumber &&
                  fieldRegister.touched.phoneNumber && (
                    <div className="text-accent_1 lg:text-sm text-tiny">
                      {fieldRegister.errors.phoneNumber}
                    </div>
                  )}
              </div>
            </div>

            <div className="col-span-6">
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={fieldRegister.values.email}
                  onChange={fieldRegister.handleChange}
                  placeholder=" "
                  onBlur={fieldRegister.handleBlur}
                  required
                  className={`peer w-full h-[45px] lg:h-[50px] rounded-md border border-gray-200 text-[15px] text-gray-700 shadow-xs focus:outline-none focus:border-blue-500 ${
                    isFilled(fieldRegister.values.email) &&
                    !fieldRegister.errors.email
                      ? "bg-[#e8f0fe]"
                      : "bg-white"
                  }`}
                />
                <label
                  htmlFor="email"
                  className="absolute text-caption lg:text-[18px] text-gray-300 dark:text-gray-400 duration-300 transform top-1/2 -translate-y-1/2 left-2 bg-white dark:bg-gray-900 px-2 
               peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
               peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
               peer-valid:top-2 peer-valid:-translate-y-4 peer-valid:scale-75"
                >
                  Email
                </label>
              </div>
              <div className="h-[10px] ml-1">
                {fieldRegister.errors.email && fieldRegister.touched.email && (
                  <div className="text-accent_1 lg:text-sm text-tiny">
                    {fieldRegister.errors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3 relative">
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={fieldRegister.values.password}
                  onChange={fieldRegister.handleChange}
                  placeholder=" "
                  onBlur={fieldRegister.handleBlur}
                  required
                  className={`peer w-full h-[45px] lg:h-[50px] rounded-md border border-gray-200 text-[15px] text-gray-700 shadow-xs focus:outline-none focus:border-blue-500 ${
                    isFilled(fieldRegister.values.password) &&
                    !fieldRegister.errors.password
                      ? "bg-[#e8f0fe]"
                      : "bg-white"
                  }`}
                />
                <label
                  htmlFor="password"
                  className="absolute text-caption lg:text-[18px] text-gray-300 dark:text-gray-400 duration-300 transform top-1/2 -translate-y-1/2 left-2 bg-white dark:bg-gray-900 px-2 
                   peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
                   peer-valid:top-2 peer-valid:-translate-y-4 peer-valid:scale-75"
                >
                  Password
                </label>

                {/* Eye Toggle */}
                <button
                  type="button"
                  className="absolute right-3 top-6 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>
              </div>
              <div className="h-[10px] ml-1 lg:mb-7 mb-2">
                {fieldRegister.errors.password &&
                  fieldRegister.touched.password && (
                    <div className="text-accent_1 lg:text-sm text-tiny">
                      {fieldRegister.errors.password}
                    </div>
                  )}
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3 relative">
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={fieldRegister.values.confirmPassword}
                  onChange={fieldRegister.handleChange}
                  placeholder=" "
                  onBlur={fieldRegister.handleBlur}
                  required
                  className={`peer w-full h-[45px] lg:h-[50px] rounded-md border border-gray-200 text-[15px] text-gray-700 shadow-xs focus:outline-none focus:border-blue-500 ${
                    isFilled(fieldRegister.values.confirmPassword) &&
                    !fieldRegister.errors.confirmPassword
                      ? "bg-[#e8f0fe]"
                      : "bg-white"
                  }`}
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute text-caption lg:text-[18px] text-gray-300 dark:text-gray-400 duration-300 transform top-1/2 -translate-y-1/2 left-2 bg-white dark:bg-gray-900 px-2 
                   peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
                   peer-valid:top-2 peer-valid:-translate-y-4 peer-valid:scale-75"
                >
                  Confirm Password
                </label>

                {/* Eye Toggle */}
                <button
                  type="button"
                  className="absolute right-3 top-6 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>
              </div>
              <div className="h-[10px] ml-1">
                {fieldRegister.errors.confirmPassword &&
                  fieldRegister.touched.confirmPassword && (
                    <div className="text-accent_1 lg:text-sm text-tiny">
                      {fieldRegister.errors.confirmPassword}
                    </div>
                  )}
              </div>
            </div>
            <div className="col-span-6 space-y-3">
              <div className="flex items-center justify-between mb-3 mt-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agree"
                      aria-describedby="agree"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-caption text-gray-500">
                    By registering, you agree to our{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full shrink-0 rounded-md border border-primary bg-blue-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-primary hover:text-white focus:ring-3 focus:outline-hidden flex items-center justify-center gap-2"
                disabled={fieldRegister.isSubmitting || loading}
              >
                {fieldRegister.isSubmitting || loading ? (
                  <>
                    <CircularProgress
                      size={20}
                      className="mr-2 text-white"
                      color="white"
                    />
                    Processing...
                  </>
                ) : (
                  "Register"
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                Already have an account?
                <a
                  href="/login"
                  className="text-blue-600 text-caption underline ml-3"
                >
                  Log in
                </a>
                .
              </p>
            </div>
          </form>
          <div className="flex items-center justify-center space-x-2 my-4">
            <span className="h-px w-16 bg-gray-100"></span>
            <span className="text-gray-300 font-normal">Or Sign-Up with</span>
            <span className="h-px w-16 bg-gray-100"></span>
          </div>

          {/* google */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              onClick={googleRegister}
              disabled={loading}
              className="w-[200px] flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-primary  text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500"
            >
              {loading ? (
                <CircularProgress size={20} className="mr-2" color="success" />
              ) : (
                <svg
                  className="w-4 mr-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                  />
                </svg>
              )}
              <span>{loading ? "Processing..." : "Google"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
