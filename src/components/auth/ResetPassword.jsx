import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router";
import * as Yup from "yup";
import logo from "../../assets/logo/ishop-dark-logo.png";
import {
  useResendResetPasswordCodeMutation,
  useResetPasswordMutation,
} from "../../redux/features/auth/authSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation();

  const [resendResetPasswordCode, { isLoading: resendCode }] =
    useResendResetPasswordCodeMutation();

  const [timer, setTimer] = useState(300);
  const [digits, setDigits] = useState(Array(6).fill(""));

  const [passwordVisible, setPasswordVisible] = useState(false);

  // Format time display
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, [timer]);

  // Timer countdown effect
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Update formik code value whenever digits change
  useEffect(() => {
    formik.setFieldValue("code", digits.join(""));
  }, [digits]);

  // Handle digit input change
  const handleDigitChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (value && index < 5) {
        document.getElementById(`digit-${index + 1}`).focus();
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required("Verification code is required")
        .length(6, "Code must be exactly 6 digits"),
      newPassword: Yup.string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        await resetPassword({
          email,
          code: values.code,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        }).unwrap();
        toast.success("Password reset successfully!");
        navigate("/login");
      } catch (error) {
        toast.error(error?.data?.message || "Failed to reset password");
      }
    },
  });

  // Handle paste event for verification code
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedDigits = pastedData.replace(/\D/g, "").slice(0, 6).split("");

    if (pastedDigits.length === 6) {
      setDigits(pastedDigits);
      document.getElementById("digit-5").focus();
    }
  };

  // Handle resend code logic
  const handleResendCode = async () => {
    try {
      await resendResetPasswordCode({ email }).unwrap();
      setDigits(Array(6).fill(""));
      setTimer(300);
      toast.success("New verification code sent!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to resend code");
    }
  };

  return (
    <div className="shadow-2xl flex justify-center items-center min-h-screen bg-gray-100 rounded-lg">
      <div className="w-[400px] bg-white p-8 rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="flex justify-center items-center py-3">
          <img src={logo} alt="logo" className="w-[150px]" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Reset Your Password
        </h2>
        <p className="text-gray-500 text-center mt-4 text-sm dark:text-gray-400">
          Enter the 6-digit code sent to{" "}
          <span className="text-accent_1">{email}</span> and set a new password.
        </p>

        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
              Enter Verification Code
            </label>
            <div
              className="flex justify-center space-x-4 mt-3"
              onPaste={handlePaste}
            >
              {digits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  id={`digit-${index}`}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  className="w-[43px] h-10 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            {formik.touched.code && formik.errors.code && (
              <div className="text-red-500 text-sm text-center">
                {formik.errors.code}
              </div>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-2 p-3 border ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white`}
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-[33px] transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
              >
                {passwordVisible ? (
                  <FaRegEyeSlash size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </button>
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-2 p-3 border ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-white`}
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-[33px] transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
              >
                {passwordVisible ? (
                  <FaRegEyeSlash size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
          <button
            type="submit"
            disabled={isLoading || formik.values.code.length !== 6}
            className="w-full mt-6 bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition duration-300 disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            {timer > 0 ? `Code expires in ${formattedTime}` : "Code expired."}
          </p>
          <button
            onClick={handleResendCode}
            disabled={resendCode || timer > 0}
            className={`underline ${
              timer > 0 ? "text-gray-400" : "text-blue-700"
            }`}
          >
            {resendCode ? "Resending..." : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
