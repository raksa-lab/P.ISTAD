import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-start justify-between text-6xl text-yellow-400 mb-10 ">
        <FaExclamationTriangle />
      </div>
      <h1 className="text-6xl font-bold text-gray-800 mb-5">404 Not Found</h1>
      <p className="mt-2 text-lg text-gray-500 mb-20">
        Your visited page not found. You may go home page.
      </p>
      <button
        type="button"
        className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-10 dark:focus:ring-yellow-900 "
      >
        Back to Home Page
      </button>
    </div>
  );
}
