import { Link, useParams } from "react-router-dom";
import { FaCheckCircle, FaBoxOpen } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

function OrderSuccess() {
  const { id } = useParams();
 const { clearcart } = useCart();

  // Clear cart when success page is opened
 clearcart();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

      <div className="bg-white rounded-3xl shadow-xl max-w-xl w-full p-8 md:p-12 text-center">

        {/* Success Icon */}

        <div className="flex justify-center">
  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-[scaleIn_0.5s_ease-out]">
    <FaCheckCircle className="text-green-500 text-6xl animate-[checkPop_0.6s_ease-out_0.3s_both]" />
  </div>
</div>

        {/* Heading */}

        <h1 className="text-3xl font-bold text-gray-900 mt-7">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-3">
          Thank you for shopping with Zenvora.
          Your order has been successfully placed.
        </p>

        {/* Order ID */}

        <div className="bg-gray-50 rounded-xl p-4 mt-6">

          <p className="text-sm text-gray-500">
            Order ID
          </p>

          <p className="font-bold text-gray-800 break-all mt-1">
            {id}
          </p>

        </div>

        {/* Status */}

        <div className="flex items-center justify-center gap-3 mt-6">

          <FaBoxOpen className="text-blue-600 text-xl" />

          <span className="font-semibold text-gray-700">
            Order Status:
          </span>

          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
            Pending
          </span>

        </div>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row gap-3 mt-8">

          <Link
            to={`/orders/${id}`}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 py-3 rounded-full font-bold transition"
          >
            View Order
          </Link>

          <Link
            to="/"
            className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-full font-bold transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;