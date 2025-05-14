import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import * as Yup from "yup";
import {
  useResendCodeMutation,
  useVerifyRegistrationMutation,
} from "../../redux/features/auth/authSlice";

import logo from "../../assets/logo/ishop-dark-logo.png";

const VerifyEmail = ({ email: propEmail, oldToken: propOldToken }) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email");
  const oldTokenFromUrl = searchParams.get("oldToken");

  const email = emailFromUrl || propEmail;
  const oldToken = oldTokenFromUrl || propOldToken;

  const [verifyRegistration, { isLoading, isError, isSuccess, error }] =
    useVerifyRegistrationMutation();
  const [
    resendCode,
    { isLoading: resendLoading, isError: resendIsError, error: resendError },
  ] = useResendCodeMutation();

  const [timer, setTimer] = useState(300);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (timer === 0) {
      toast.error("Verification code expired. Please resend the code.");
    }
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Create a state to hold the individual digits
  const [digits, setDigits] = useState(Array(6).fill(""));

  const formik = useFormik({
    initialValues: {
      verificationCode: "",
    },
    validationSchema: Yup.object({
      verificationCode: Yup.string()
        .required("Verification code is required")
        .length(6, "Code must be exactly 6 digits"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await verifyRegistration(values.verificationCode).unwrap();
        console.log("Verification successful:", res);
        toast.success("Register Account Successful!", {
          icon: "✅",
        });
        navigate("/login");
      } catch (err) {
        console.error("Verification failed:", err);
        toast.error(err?.data?.message || "Verification failed");
      }
    },
  });

  // Update the verification code when digits change
  useEffect(() => {
    formik.setFieldValue("verificationCode", digits.join(""));
  }, [digits]);

  const handleDigitChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      // Auto-focus next input if a digit was entered
      if (value && index < 5) {
        document.getElementById(`digit-${index + 1}`).focus();
      }
      // Move focus to previous input if backspace was pressed on empty input
      else if (value === "" && index > 0) {
        document.getElementById(`digit-${index - 1}`).focus();
      }
    }
  };

  const handleResendCode = async () => {
    if (!email || !oldToken) {
      toast.error("Email or verification code (old token) is missing.");
      return;
    }

    try {
      console.log("Resending code with:", { email, oldToken });
      const response = await resendCode({
        email,
        oldToken,
      }).unwrap();

      console.log("Resend response:", response);
      setTimer(300);
      toast.success("Verification code resent successfully!");
    } catch (error) {
      console.error("Resend error:", error);
      toast.error(error?.data?.message || "Failed to resend code");
    }
  };

  const isFilled = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim() !== "";
    if (value instanceof File) return true;
    return false;
  };

  // Handle paste event to distribute digits across inputs
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedDigits = pastedData.replace(/\D/g, "").slice(0, 6).split("");

    const newDigits = [...digits];
    pastedDigits.forEach((digit, index) => {
      if (index < 6) {
        newDigits[index] = digit;
      }
    });

    setDigits(newDigits);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newDigits.findIndex((digit) => digit === "");
    if (nextEmptyIndex !== -1) {
      document.getElementById(`digit-${nextEmptyIndex}`).focus();
    } else if (pastedDigits.length < 6) {
      document.getElementById(`digit-${pastedDigits.length}`).focus();
    }
  };

  // Handle keydown for arrow navigation and backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`digit-${index - 1}`).focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      document.getElementById(`digit-${index + 1}`).focus();
    } else if (e.key === "Backspace" && digits[index] === "" && index > 0) {
      document.getElementById(`digit-${index - 1}`).focus();
    }
  };

  return (
    <div className="shadow-2xl flex justify-center items-center min-h-screen bg-gray-100 rounded-lg">
      <div className="md:w-[400px] w-[350px] bg-white p-8 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)]">
        <div className="flex justify-center items-center py-3">
          <img src={logo} alt="logo" className="w-[150px]" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Verify Your Email Address
        </h2>

        <p className="text-gray-500 text-center mt-4 text-sm dark:text-gray-400">
          Enter the 6-digit code sent to your email.
        </p>

        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-6">
            <label
              htmlFor="verificationCode"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center"
            >
              Enter Verification Code
            </label>

            {/* Input boxes for each digit */}
            <div
              className="flex justify-center space-x-4"
              onPaste={handlePaste}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  id={`digit-${index}`}
                  name={`digit-${index}`}
                  value={digits[index]}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`md:w-12 md:h-12 w-10 h:10 text-center text-xl border 
                    ${
                      formik.errors.verificationCode &&
                      formik.touched.verificationCode
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500`}
                />
              ))}
            </div>

            {formik.touched.verificationCode &&
              formik.errors.verificationCode && (
                <div className="text-red-500 text-sm text-center">
                  {formik.errors.verificationCode}
                </div>
              )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition duration-300 disabled:opacity-50"
              disabled={
                isLoading || formik.values.verificationCode.length !== 6
              }
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </button>
          </div>
        </form>

        {/* Countdown Timer */}
        <div className="mt-4 text-center">
          <p>
            {timer > 0
              ? `Code expires in ${formatTime(timer)}`
              : "Code expired."}
          </p>
          <button
            onClick={handleResendCode}
            disabled={resendLoading || timer > 0}
            className={`underline ${
              timer > 0 ? "text-gray-400" : "text-blue-700"
            }`}
          >
            {resendLoading ? "Resending..." : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
