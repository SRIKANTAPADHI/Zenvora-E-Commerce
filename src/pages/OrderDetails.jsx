import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function OrderDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load order"
          );
        }

        setOrder(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrder();
    } else {
      setError("Please login first.");
      setLoading(false);
    }
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading order...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h1 className="text-2xl font-bold text-red-600">
            {error || "Order not found"}
          </h1>

          <Link
            to="/orders"
            className="inline-block mt-5 bg-yellow-400 px-6 py-3 rounded-full font-semibold"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

          <div>
            <h1 className="text-3xl font-bold">
              Order Details
            </h1>

            <p className="text-gray-500 mt-1 break-all">
              Order ID: {order._id}
            </p>
          </div>

          <Link
            to="/orders"
            className="border border-gray-400 px-5 py-2 rounded-lg hover:bg-white"
          >
            ← Back to Orders
          </Link>

        </div>

        {/* Order Status */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h2 className="text-xl font-bold mb-6">
            Order Status
          </h2>

          <div className="grid grid-cols-4 gap-2">

            {[
              "Pending",
              "Confirmed",
              "Shipped",
              "Delivered",
            ].map((status, index) => {

              const statuses = [
                "Pending",
                "Confirmed",
                "Shipped",
                "Delivered",
              ];

              const currentIndex =
                statuses.indexOf(order.orderStatus);

              const active = index <= currentIndex;

              return (
                <div
                  key={status}
                  className="text-center"
                >
                  <div
                    className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center font-bold ${
                      active
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {active ? "✓" : index + 1}
                  </div>

                  <p
                    className={`text-xs md:text-sm mt-2 ${
                      active
                        ? "font-semibold text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {status}
                  </p>
                </div>
              );
            })}

          </div>

        </div>

        {/* Products */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h2 className="text-xl font-bold mb-5">
            Ordered Items
          </h2>

          <div className="space-y-5">

            {order.items.map((item, index) => (

              <div
                key={item.product?._id || item.product || index}
                className="flex gap-5 border-b pb-5 last:border-b-0"
              >

                <div className="w-28 h-28 bg-gray-50 rounded-lg flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">

                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-xl font-bold mt-2">
                    ₹{item.price?.toLocaleString()}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Address + Payment */}

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Address */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Delivery Address
            </h2>

            <div className="text-gray-600 space-y-1">

              <p className="font-semibold text-gray-900">
                {order.shippingAddress.fullName}
              </p>

              <p>
                {order.shippingAddress.address}
              </p>

              <p>
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.state}
              </p>

              <p>
                PIN: {order.shippingAddress.pincode}
              </p>

              <p>
                Phone: {order.shippingAddress.phone}
              </p>

            </div>

          </div>

          {/* Payment */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Payment Information
            </h2>

            <p className="text-gray-600">
              Payment Method:
              <span className="font-semibold text-gray-900 ml-2">
                {order.paymentMethod}
              </span>
            </p>

            <p className="text-gray-600 mt-3">
              Payment Status:
              <span
                className={`font-semibold ml-2 ${
                  order.isPaid
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {order.isPaid ? "Paid" : "Not Paid"}
              </span>
            </p>

          </div>

        </div>

        {/* Price Summary */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Price Summary
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="text-gray-600">
                Items
              </span>

              <span>
                ₹{order.itemsPrice?.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Delivery
              </span>

              <span className="text-green-600">
                {order.deliveryPrice === 0
                  ? "FREE"
                  : `₹${order.deliveryPrice?.toLocaleString()}`}
              </span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">
              <span>
                Total
              </span>

              <span>
                ₹{order.totalPrice?.toLocaleString()}
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;