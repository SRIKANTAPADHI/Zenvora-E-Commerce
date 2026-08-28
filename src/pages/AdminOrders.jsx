import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminOrders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/orders/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to get orders"
        );
      }

      setOrders(data);
    } catch (error) {
      console.error("ADMIN ORDERS ERROR:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);

      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: status,
              }
            : order
        )
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading orders...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Admin Orders
            </h1>

            <p className="text-gray-500 mt-1">
              Manage customer orders
            </p>
          </div>

          <Link
            to="/admin"
            className="bg-white border px-5 py-3 rounded-lg hover:bg-gray-50"
          >
            ← Dashboard
          </Link>

        </div>

        {/* Error */}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Empty */}

        {!error && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-12 text-center">

            <div className="text-6xl">
              📦
            </div>

            <h2 className="text-2xl font-bold mt-4">
              No Orders
            </h2>

            <p className="text-gray-500 mt-2">
              There are no customer orders yet.
            </p>

          </div>
        )}

        {/* Orders */}

        <div className="space-y-5">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-2xl shadow overflow-hidden"
            >

              {/* Top */}

              <div className="p-5 border-b bg-gray-50">

                <div className="grid md:grid-cols-4 gap-5">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="font-semibold break-all">
                      {order._id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Customer
                    </p>

                    <p className="font-semibold">
                      {order.user?.name ||
                        order.shippingAddress?.fullName ||
                        "Customer"}
                    </p>

                    {order.user?.email && (
                      <p className="text-sm text-gray-500">
                        {order.user.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Date
                    </p>

                    <p className="font-medium">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="text-xl font-bold">
                      ₹
                      {Number(
                        order.totalPrice
                      ).toLocaleString()}
                    </p>
                  </div>

                </div>

              </div>

              {/* Content */}

              <div className="p-5">

                <div className="space-y-4">

                  {order.items.map(
                    (item, index) => (

                      <div
                        key={
                          item.product ||
                          index
                        }
                        className="flex gap-4"
                      >

                        <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">

                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />

                        </div>

                        <div className="flex-1">

                          <p className="font-semibold">
                            {item.title}
                          </p>

                          <p className="text-sm text-gray-500">
                            Quantity:{" "}
                            {item.quantity}
                          </p>

                          <p className="font-semibold">
                            ₹
                            {Number(
                              item.price
                            ).toLocaleString()}
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

                {/* Bottom */}

                <div className="border-t mt-5 pt-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  {/* Status */}

                  <div className="flex items-center gap-3">

                    <span className="font-semibold">
                      Status:
                    </span>

                    <select
                      value={order.orderStatus}
                      disabled={
                        updatingId ===
                        order._id
                      }
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>

                    {updatingId ===
                      order._id && (
                      <span className="text-sm text-gray-500">
                        Updating...
                      </span>
                    )}

                  </div>

                  {/* View */}

                  <Link
                    to={`/orders/${order._id}`}
                    className="bg-gray-900 text-white px-6 py-3 rounded-full text-center font-semibold hover:bg-gray-700"
                  >
                    View Order
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminOrders;