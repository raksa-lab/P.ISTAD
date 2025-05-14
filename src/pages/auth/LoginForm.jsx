import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

import { useNavigate } from "react-router";
import * as Yup from "yup";
import logo from "../../assets/logo/ishop-light-logo.png";
import {
  useGetLoginMutation,
  useUserRegisterMutation,
} from "../../redux/features/auth/authSlice";

import { CircularProgress } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import Ill from "../../assets/auth/login.png";

const LoginForm = ({ setIsLoggedIn }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [getLogin] = useGetLoginMutation();
  const [loading, setLoading] = useState(false);

  const [userRegister] = useUserRegisterMutation();

  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Please enter a valid email"),
      password: Yup.string()
        .min(8, "Please enter at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const accessTokenData = await getLogin({
          email: values.email,
          password: values.password,
        }).unwrap();

        if (accessTokenData.accessToken) {
          localStorage.setItem("accessToken", accessTokenData.accessToken);
          localStorage.setItem(
            "userData",
            JSON.stringify(accessTokenData.user)
          );

          toast.success("Login Successful!", {
            icon: "✅",
          });
          setIsLoggedIn(true);

          navigate("/");
        } else {
          setLoginError("Login failed. Please try again.");
          toast.error("Login failed. Please try again.");
        }
      } catch (err) {
        const errorMessage =
          err?.data?.message || "Invalid email or password. Please try again.";
        setLoginError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const googleLogin = useGoogleLogin({
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
            const loginCredentials = {
              email: userData.email,
              password: `${userData.given_name}${
                import.meta.env.VITE_SECRET_KEY
              }`,
            };

            try {
              // Try logging in first
              const loginResponse = await getLogin(loginCredentials).unwrap();
              console.log("Login Successful:", loginResponse);

              // Store login details
              localStorage.setItem("accessToken", loginResponse.accessToken);
              localStorage.setItem(
                "userData",
                JSON.stringify(loginResponse.user)
              );

              toast.success("Login Successful!", { icon: "✅" });
              navigate("/");
              window.location.reload();
              setLoading(false);
            } catch (loginError) {
              console.log("User not found, proceeding with registration...");
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
                const registerResponse = await userRegister(
                  submitValue
                ).unwrap();
                console.log("Google Register Response:", registerResponse);

                // After registration, attempt login
                const loginAfterRegister = await getLogin(
                  loginCredentials
                ).unwrap();
                console.log("Login after Register:", loginAfterRegister);

                localStorage.setItem(
                  "accessToken",
                  loginAfterRegister.accessToken
                );
                localStorage.setItem(
                  "userData",
                  JSON.stringify(loginAfterRegister.user)
                );

                toast.success("Registration and Login Successful!", {
                  icon: "✅",
                });
                navigate("/products");
                window.location.reload();
              } catch (registerError) {
                console.error("Google Registration Error:", registerError);
                toast.error(
                  registerError?.data?.message || "Google registration failed"
                );
              }
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

  const isFilled = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim() !== "";
    if (value instanceof File) return true;
    return false;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section - Top on small screens, Right on medium+ */}
        <div className="order-1 md:order-last w-full md:w-2/5 bg-primary p-6 flex items-center justify-center min-h-[200px] md:min-h-full">
          <div className="relative w-full h-full max-h-96 md:max-h-full">
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:top-10 md:top-10 -top-2">
              <img src={logo} alt="Logo" className="w-[100px] md:w-[200px]" />
            </div>

            <div className="w-full h-full flex justify-center items-center">
              <img
                src={Ill}
                alt="Login Illustration"
                className="w-[200px] md:w-[300px] lg:w-[350px]"
              />
            </div>
          </div>
        </div>

        {/* Form Section - Bottom on small screens, Left on medium+ */}
        <div className="order-2 md:order-first md:w-3/5 p-6 md:p-8">
          <div className="mb-10">
            <h2 className="text-h2 font-OpenSanBold text-primary">Login</h2>
            <div className="w-12 h-1 bg-primary mt-2"></div>
          </div>
          <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div className="relative">
              <div className="flex flex-col">
                <div className="relative w-full">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder=" "
                    className={`peer w-full h-[50px] lg:h-[55px] rounded-md border-primary text-[18px] text-gray-700 shadow-xs ${
                      isFilled(formik.values.email) && !formik.errors.email
                        ? "bg-[#e8f0fe]"
                        : "bg-white"
                    }`}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-[18px] rounded-md text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Email
                  </label>
                </div>

                {/* Fixed height box for the error message */}
                <div className="h-[10px]">
                  {formik.errors.email && formik.touched.email && (
                    <div className="text-red-500 text-caption">
                      {formik.errors.email}
                    </div>
                  )}
                  {loginError && !formik.errors.email && (
                    <div className="text-red-500 text-caption">
                      {loginError}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder=" "
                  className={`peer w-full h-[50px] lg:h-[55px] rounded-md border-primary text-[18px] text-gray-700 shadow-xs pr-10 ${
                    isFilled(formik.values.password) && !formik.errors.password
                      ? "bg-[#e8f0fe]"
                      : "bg-white"
                  }`}
                  required
                />
                {/* Floating Label */}
                <label
                  htmlFor="password"
                  className="absolute left-3 text-[18px] rounded-md text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Password
                </label>

                {/* Eye Toggle */}
                <button
                  type="button"
                  className="absolute right-3 top-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>
              </div>

              <div className="h-[20px] mt-1">
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500 text-caption">
                    {formik.errors.password}
                  </div>
                )}
                {loginError &&
                  !formik.errors.email &&
                  !formik.errors.password && (
                    <div className="text-red-500 text-caption">
                      {loginError}
                    </div>
                  )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-caption">
                  <label htmlFor="remember" className="text-gray-500">
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="/forgot-password"
                className="text-caption font-medium text-red-400 underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white p-3 rounded-md hover:bg-primary focus:ring-3 focus:outline-hidden"
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} className="mr-2 text-white" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Sign Up Link */}
            <p className="text-caption text-gray-500 text-center">
              Don’t have an account yet?{" "}
              <a href="/register" className="text-blue-600 underline">
                Sign up
              </a>
            </p>
          </form>
          {/* google */}
          <div className="flex items-center justify-center space-x-2 my-4">
            <span className="h-px w-16 bg-gray-100"></span>
            <span className="text-gray-300 font-normal">Or continue with</span>
            <span className="h-px w-16 bg-gray-100"></span>
          </div>
          {/* google */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              onClick={googleLogin}
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

export default LoginForm;
