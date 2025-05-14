import { WifiOff } from "lucide-react";
import Logo2 from "../assets/logo/ishop-dark-logo.png";

const NoInternet = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="flex space-x-6 mb-6">
      <div className="flex items-center justify-center bg-gray-200 rounded-full w-28 h-28 p-4">
        <img
          src={Logo2}
          alt="iShop Logo"
          className="w-16 h-16 object-contain"
        />
      </div>
      <div className="flex items-center justify-center bg-gray-200 rounded-full w-28 h-28 p-4">
        <WifiOff size={40} className="text-orange-500" />
      </div>
    </div>
    <div className="text-center">
      <p className="text-3xl font-bold text-custom-blue">
        No Internet Connection
      </p>
      <p className="text-xl font-bold mt-3 text-custom-blue">
        Check your connection and try again.
      </p>
    </div>
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="mt-6 px-5 py-2.5 text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      Retry
    </button>
  </div>
);

export default NoInternet;
