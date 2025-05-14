import QRCode from "qrcode";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaArrowRight,
  FaCheck,
  FaClock,
  FaQrcode,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PaymentFailed from "../../components/payment/PaymentFailed";
import PaymentSuccess from "../../components/payment/PaymentSuccess";
import {
  useCancelOrderMutation,
  useGetAllOrderQuery,
  useGetOrderByUuidQuery,
} from "../../redux/service/order/orderSlice";
import {
  useBakongQrMutation,
  useMakePaymentMutation,
} from "../../redux/service/payment/paymentSice";

function OrderHistory({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [verificationInterval, setVerificationInterval] = useState(null);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
  const [isPaymentFailedOpen, setIsPaymentFailedOpen] = useState(false);

  const userUuid = user?.uuid || localStorage.getItem("userUuid");

  // Queries and Mutations
  const {
    data: allOrdersData,
    isLoading: allOrdersLoading,
    refetch: refetchOrders,
  } = useGetAllOrderQuery(userUuid, { skip: !userUuid });

  const { data: orderDetails, isLoading: orderDetailsLoading } =
    useGetOrderByUuidQuery(selectedOrder?.orderUuid, {
      skip: !selectedOrder?.orderUuid,
      pollingInterval: selectedOrder?.status === "PENDING" ? 10000 : 0,
    });

  const [generateQR, { isLoading: isGeneratingQR }] = useBakongQrMutation();
  const [verifyPayment, { isLoading: isVerifying }] = useMakePaymentMutation();
  const [makePayment] = useMakePaymentMutation();
  const [cancelOrder, { isLoading: isCanceling }] = useCancelOrderMutation();

  // Orders organized by status
  const [orders, setOrders] = useState({
    all: [],
    pending: [],
    paid: [],
    canceled: [],
  });

  useEffect(() => {
    if (allOrdersData) {
      const allOrders = Array.isArray(allOrdersData)
        ? allOrdersData
        : allOrdersData.orders || [];

      setOrders({
        all: allOrders,
        pending: allOrders.filter((order) => order.status === "PENDING"),
        paid: allOrders.filter((order) => order.status === "PAID"),
        canceled: allOrders.filter((order) => order.status === "CANCELED"),
      });
    }
  }, [allOrdersData]);

  useEffect(() => {
    if (orderDetails && selectedOrder) {
      if (
        selectedOrder.status === "PENDING" &&
        orderDetails.status === "PAID"
      ) {
        refetchOrders();
        toast.success("Your order has been paid successfully!");
      }
      setSelectedOrder(orderDetails);
    }
  }, [orderDetails]);

  useEffect(() => {
    return () => {
      if (verificationInterval) clearInterval(verificationInterval);
    };
  }, [verificationInterval]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setQrCodeImage(null);
    if (verificationInterval) clearInterval(verificationInterval);
  };

  const handleClosePaymentSuccess = () => {
    setIsPaymentSuccessOpen(false);
    setQrCodeImage(null); // Reset QR modal state
    if (verificationInterval) clearInterval(verificationInterval);
  };

  const handleClosePaymentFailed = () => {
    setIsPaymentFailedOpen(false);
    setQrCodeImage(null);
    if (verificationInterval) clearInterval(verificationInterval);
  };

  const handleTryAgain = (orderUuid) => {
    setIsPaymentFailedOpen(false);
    generateBakongQr(orderUuid); // Retry QR generation
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <FaClock className="text-yellow-500" />;
      case "PAID":
        return <FaCheck className="text-green-500" />;
      case "CANCEL":
        return <FaTimes className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    let bgColor = "bg-gray-100 text-gray-800";
    switch (status) {
      case "PENDING":
        bgColor = "bg-yellow-100 text-yellow-800";
        break;
      case "PAID":
        bgColor = "bg-green-100 text-green-800";
        break;
      case "CANCEL":
        bgColor = "bg-red-100 text-red-800";
        break;
    }
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} flex items-center gap-1`}
      >
        {getStatusIcon(status)}
        {status}
      </span>
    );
  };

  const generateBakongQr = async (orderUuid) => {
    const order = orders.all.find((o) => o.orderUuid === orderUuid);
    const totalAmount = order?.totalAmount;

    const payload = {
      userUuid,
      orderUuid,
      currency: "USD",
      city: "Phnom Penh",
      amount: totalAmount, // Include totalAmount in payload for QR generation
    };
    try {
      const qrResponse = await generateQR(payload).unwrap();
      const qrCodeData = qrResponse?.data?.qr;
      if (qrCodeData) {
        const qrDataUrl = await QRCode.toDataURL(qrCodeData, {
          errorCorrectionLevel: "H",
          margin: 1,
          width: 300,
        });
        setQrCodeImage(qrDataUrl);
        setIsQrModalOpen(true);
        startMd5VerificationLoop(qrResponse?.data?.md5, orderUuid, totalAmount);
      }
    } catch (error) {
      console.error("Failed to generate QR code:", error);
      toast.error("Failed to generate QR code");
      setIsQrModalOpen(false);
      setIsPaymentFailedOpen(true);
    }
  };

  const startMd5VerificationLoop = async (md5, orderUuid, totalAmount) => {
    const bakongToken = import.meta.env.VITE_BAKONG_TOKEN;
    if (!bakongToken) {
      toast.error("Payment verification unavailable: Token missing");
      setIsQrModalOpen(false);
      setIsPaymentFailedOpen(true);
      return;
    }

    const checkMd5WithToken = async () => {
      try {
        const response = await fetch(
          "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${bakongToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ md5 }),
          }
        );
        return await response.json();
      } catch (error) {
        console.error("Error checking MD5:", error);
        throw error;
      }
    };

    const intervalId = setInterval(async () => {
      try {
        const response = await checkMd5WithToken();
        console.log("MD5 verification response:", response);

        if (
          response?.responseCode === 0 &&
          response?.responseMessage === "Success" &&
          response?.data
        ) {
          const receivedAmount = Number(response.data.amount);
          if (receivedAmount === totalAmount) {
            setPaymentStatus("Payment confirmed! Processing order...");
            clearInterval(intervalId);

            try {
              const paymentResponse = await makePayment({
                userUuid,
                orderUuid,
              }).unwrap();
              toast.success("Payment processed successfully!");
              setPaymentStatus("Payment successful! Email confirmation sent.");
              refetchOrders();
              setSelectedOrder((prev) =>
                prev ? { ...prev, status: "PAID" } : null
              );
              setIsQrModalOpen(false);
              setIsPaymentSuccessOpen(true);
            } catch (paymentError) {
              console.error("Payment processing failed:", paymentError);
              setPaymentStatus(
                "Payment verified but processing failed. Please contact support."
              );
              setIsQrModalOpen(false);
              setIsPaymentFailedOpen(true);
            }
          } else {
            setPaymentStatus(
              `Payment amount (${receivedAmount} USD) does not match order total (${totalAmount} USD).`
            );
            clearInterval(intervalId);
            setIsQrModalOpen(false);
            setIsPaymentFailedOpen(true);
          }
        }
      } catch (error) {
        console.error("MD5 verification failed:", error);
        setPaymentStatus("Payment verification failed. Please try again.");
        clearInterval(intervalId);
        setIsQrModalOpen(false);
        setIsPaymentFailedOpen(true);
      }
    }, 5000);

    setVerificationInterval(intervalId);
  };

  const handleRegenerateQR = (orderUuid) => {
    generateBakongQr(orderUuid);
  };

  const handleVerifyPayment = async (orderUuid) => {
    try {
      const response = await verifyPayment({ orderUuid }).unwrap();
      if (response.status === "PAID") {
        toast.success("Payment verified successfully!");
        refetchOrders();
        setSelectedOrder((prev) => (prev ? { ...prev, status: "PAID" } : null));
      } else {
        toast.info("Payment still pending");
      }
    } catch (error) {
      toast.error(
        "Payment verification failed: " +
          (error?.data?.message || "Unknown error")
      );
    }
  };

  const handleCancelOrder = async (orderUuid) => {
    try {
      await cancelOrder(orderUuid).unwrap();
      toast.success("Order canceled successfully!");
      refetchOrders();
      setSelectedOrder((prev) =>
        prev && prev.orderUuid === orderUuid
          ? { ...prev, status: "CANCEL" }
          : prev
      );
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error(
        "Failed to cancel order: " + (error?.data?.message || "Unknown error")
      );
    }
  };

  const OrderButtons = ({ order }) => (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <button
        onClick={() => handleViewOrder(order)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
      >
        View Details <FaArrowRight className="ml-1" />
      </button>

      {order.status === "PENDING" && (
        <>
          <button
            onClick={() => handleRegenerateQR(order.orderUuid)}
            disabled={isGeneratingQR}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 flex items-center justify-center"
          >
            {isGeneratingQR ? "Generating..." : "Regenerate QR"}{" "}
            <FaQrcode className="ml-1" />
          </button>
          <button
            onClick={() => handleCancelOrder(order.orderUuid)}
            disabled={isCanceling}
            className="px-4 py-2 text-sm font-medium text-white bg-accent_1 rounded-md hover:bg-green-700 disabled:bg-green-400 transition-colors duration-200 flex items-center justify-center"
          >
            {isCanceling ? "Canceling..." : "Cancel Order"}{" "}
            <MdOutlineCancel className="ml-1" />
          </button>
        </>
      )}
    </div>
  );

  if (allOrdersLoading) {
    return <div className="py-8 text-center">Loading order history...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold text-red-600 mb-2">
          Order History
        </h2>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "all"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All ({orders.all.length})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "pending"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pending ({orders.pending.length})
          </button>
          <button
            onClick={() => setActiveTab("paid")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "paid"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Paid ({orders.paid.length})
          </button>
          <button
            onClick={() => setActiveTab("canceled")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "canceled"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Canceled ({orders.canceled.length})
          </button>
        </div>

        {/* Orders List */}
        {orders[activeTab].length > 0 ? (
          <div className="grid gap-4">
            {orders[activeTab].map((order) => (
              <div
                key={order.orderUuid}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-xs text-gray-500">
                      Order #{order.orderUuid.substring(0, 8)}
                    </p>
                    <p className="text-sm font-medium">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="mt-2">
                  <p className="font-medium">
                    Items: {order.orderItems?.length || 0}
                  </p>
                  <p className="font-semibold text-green-600">
                    Total: ${order.totalAmount?.toFixed(2)}
                  </p>
                </div>

                <OrderButtons order={order} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">
              No {activeTab !== "all" ? activeTab : ""} orders found.
            </p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Order Details</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Order #{selectedOrder.orderUuid.substring(0, 8)}
                </p>
                <p className="text-sm">{formatDate(selectedOrder.createdAt)}</p>
              </div>
              {getStatusBadge(selectedOrder.status)}
            </div>

            <div className="border-t border-b border-gray-200 py-4 my-4">
              <h4 className="font-medium mb-2">Order Items</h4>
              <div className="space-y-2">
                {selectedOrder.orderItems?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center font-medium text-lg">
              <p>Total</p>
              <p className="text-green-600">
                ${selectedOrder.totalAmount?.toFixed(2)}
              </p>
            </div>

            {selectedOrder.status === "PENDING" && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => handleRegenerateQR(selectedOrder.orderUuid)}
                  disabled={isGeneratingQR}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 flex items-center justify-center"
                >
                  {isGeneratingQR ? "Generating..." : "Regenerate QR"}{" "}
                  <FaQrcode className="ml-1" />
                </button>
                <button
                  onClick={() => handleCancelOrder(selectedOrder.orderUuid)}
                  disabled={isCanceling}
                  className="flex-1 px-4 py-2 text-white bg-accent_1 rounded-md hover:bg-green-700 disabled:bg-green-400 transition-colors duration-200 flex items-center justify-center"
                >
                  {isCanceling ? "Canceling..." : "Cancel Order"}{" "}
                  <MdOutlineCancel className="ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {isQrModalOpen && qrCodeImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Scan to Pay</h3>
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <img
              src={qrCodeImage}
              alt="QR Code"
              className="w-full max-w-[300px] mx-auto"
            />
            <p className="text-center mt-4 text-sm text-gray-600">
              {paymentStatus ||
                `Pay $${selectedOrder?.totalAmount?.toFixed(2)}`}
            </p>
          </div>
        </div>
      )}
      {/* Payment Success Popup */}
      {isPaymentSuccessOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <PaymentSuccess onClose={handleClosePaymentSuccess} />
        </div>
      )}

      {/* Payment Failed Popup */}
      {isPaymentFailedOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <PaymentFailed
            onClose={handleClosePaymentFailed}
            onTryAgain={() =>
              handleTryAgain(
                selectedOrder?.orderUuid || orders.pending[0]?.orderUuid
              )
            }
          />
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
