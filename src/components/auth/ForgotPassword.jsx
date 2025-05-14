import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import logo from "../../assets/logo/ishop-dark-logo.png";
import { useSendResetCodeMutation } from "../../redux/features/auth/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sendResetCode, { isLoading }] = useSendResetCodeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const response = await sendResetCode(email).unwrap();
      console.log("API Response:", response);
      toast.success("Verification code sent to your email!");
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error?.data?.message || "Email not register yet");
    }
  };

  return (
    <div className="shadow flex justify-center items-center min-h-screen bg-gray-100 rounded-lg">
      <div className="w-[400px] bg-white p-8 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="flex justify-center items-center py-3">
          <img src={logo} alt="logo" className="w-[150px]" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Forget Password
        </h2>
        <p className="text-gray-500 text-center mt-4 text-caption">
          Please enter your email address, and we'll send you a 6-digit code
        </p>

        <form className="mt-6" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Enter your email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-70 mt-2 p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 flex justify-center items-center gap-2 bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300 disabled:opacity-50"
            aria-label="Send reset code"
          >
            {isLoading ? "Sending..." : "Send Code"} <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
