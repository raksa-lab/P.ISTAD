import { FaShippingFast, FaHeadset, FaMoneyCheck } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
const features = [
  {
    icon: (
      <div className="bg-emerald-400 rounded-full p-2">
        <BsShieldCheck className="text-white text-3xl " />
      </div>
    ),
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days"
  },
  {
    icon: (
      <div className="bg-orange-400 rounded-full p-2">
        <FaShippingFast className="text-white text-3xl" />
      </div>
    ),
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140"
  },
  {
    icon: (
      <div className="bg-purple-400 rounded-full p-2">
        <FaMoneyCheck className=" text-white text-3xl" />
      </div>
    ),
    title: "100% SECURE PAYMENT",
    description: "Your money is safe"
  },
  {
    icon: (
      <div className="bg-blue-400 rounded-full p-2">
        <FaHeadset className="text-white text-3xl" />
      </div>
    ),
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support"
  }
];

export default function AssuranceSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap:2">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center text-center p-4">
          <div className="mb-4">{feature.icon}</div>
          <h3 className="font-OpenSanBold text-lg mb-1 text-primary">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-body">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
