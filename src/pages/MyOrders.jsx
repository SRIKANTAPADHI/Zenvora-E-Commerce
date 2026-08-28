import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MyOrders() {
  const { user, token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError("Please login to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://zenvora-e-commerce-2.onrender.com/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load orders"
          );
        }

        setOrders(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (!user || !token) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold">
            Please Sign In
          </h1>

          <p className="text-gray-600 mt-2">
            Sign in to view your orders.
          </p>

          <Link
            to="/login"
            className="inline-block mt-6 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-full font-semibold"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Your Orders
        </h1>

        {loading && (
         <div className="flex flex-col items-center">

  <div className="w-12 h-12 border-4 border-gray-200 border-t-yellow-400 rounded-full animate-spin"></div>

  <p className="text-gray-500 mt-4">
    Loading your orders...
  </p>

</div>
        )}

        {!loading && error && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-4">
            {error}
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-lg shadow p-10 text-center">

            <div className="text-6xl mb-4">
              📦
            </div>

            <h2 className="text-2xl font-bold">
              You haven't placed any orders yet.
            </h2>

            <p className="text-gray-600 mt-2">
              Start shopping and your orders will appear here.
            </p>

            <Link
              to="/"
              className="inline-block mt-6 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-full font-semibold"
            >
              Start Shopping
            </Link>

          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >

                {/* Order Header */}

                <div className="bg-gray-100 border-b p-5">

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        Order Date
                      </p>

                      <p className="font-medium mt-1">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString("en-IN")}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        Total
                      </p>

                      <p className="font-medium mt-1">
                        ₹{order.totalPrice?.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        Payment
                      </p>

                      <p className="font-medium mt-1">
                        {order.paymentMethod}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        Order Status
                      </p>

                      <p
                        className={`font-semibold mt-1 ${
                          order.orderStatus === "Delivered"
                            ? "text-green-600"
                            : order.orderStatus === "Cancelled"
                            ? "text-red-600"
                            : "text-orange-600"
                        }`}
                      >
                        {order.orderStatus}
                      </p>
                    </div>

                  </div>

                  <p className="text-xs text-gray-500 mt-4 break-all">
                    Order ID: {order._id}
                  </p>

                </div>

                {/* Products */}

                <div className="p-5">

                  <div className="space-y-5">

                    {order.items.map((item, index) => (

                      <div
                        key={item.product?._id || item.product || index}
                        className="flex gap-4 border-b pb-5 last:border-b-0 last:pb-0"
                      >

                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 object-contain"
                        />

                        <div className="flex-1">

                          <h2 className="font-semibold text-lg">
                            {item.title}
                          </h2>

                          <p className="text-gray-500 mt-1">
                            Quantity: {item.quantity}
                          </p>

                          <p className="font-bold mt-2">
                            ₹{item.price?.toLocaleString()}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                  {/* Delivery */}

                  <div className="mt-6 border-t pt-5">

                    <h3 className="font-semibold">
                      Delivery Address
                    </h3>

                    <p className="text-gray-600 mt-2">
                      {order.shippingAddress.fullName}
                    </p>

                    <p className="text-gray-600">
                      {order.shippingAddress.address}
                    </p>

                    <p className="text-gray-600">
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} -{" "}
                      {order.shippingAddress.pincode}
                    </p>

                    <p className="text-gray-600">
                      Phone:{" "}
                      {order.shippingAddress.phone}
                    </p>

                  </div>

                  {/* Actions */}

                  <div className="flex flex-wrap gap-3 mt-6">

                    <Link
                      to={`/orders/${order._id}`}
                      className="border border-gray-400 px-5 py-2 rounded-lg hover:bg-gray-100"
                    >
                      View Order
                    </Link>

                    <Link
                      to="/"
                      className="border border-gray-400 px-5 py-2 rounded-lg hover:bg-gray-100"
                    >
                      Buy Again
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyOrders;