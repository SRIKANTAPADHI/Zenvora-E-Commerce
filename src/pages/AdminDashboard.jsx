import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { user, token } = useAuth();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // ==============================
  // Fetch Products
  // ==============================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        const response = await fetch(
          "https://zenvora-e-commerce-2.onrender.com/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // ==============================
  // Fetch Orders
  // ==============================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoadingOrders(true);

        const response = await fetch(
          "https://zenvora-e-commerce-2.onrender.com/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.error("Order fetch error:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  // ==============================
  // Delete Product
  // ==============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://zenvora-e-commerce-2.onrender.com/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete product");
        return;
      }

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product._id !== id
        )
      );

      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
       setError("Unable to load products. Please try again.");
      alert("Server error");
    }
  };

  // ==============================
  // Admin Protection
  // ==============================
  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Access Denied
          </h1>

          <p className="text-gray-600 mt-2">
            Admin access required.
          </p>
        </div>
      </div>
    );
  }

  // ==============================
  // Categories
  // ==============================
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // ==============================
  // Filter Products
  // ==============================
  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase().trim();

    const matchesSearch =
      product.title?.toLowerCase().includes(keyword) ||
      product.brand?.toLowerCase().includes(keyword);

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // ==============================
  // Product Statistics
  // ==============================
  const totalProducts = products.length;

  const inStockProducts = products.filter(
    (product) => product.inStock
  ).length;

  const outOfStockProducts = products.filter(
    (product) => !product.inStock
  ).length;

  const totalCategories = categories.length - 1;

  // ==============================
  // Order Statistics
  // ==============================
  const totalOrders = orders.length;

  const totalRevenue = orders
    .filter(
      (order) => order.orderStatus !== "Cancelled"
    )
    .reduce(
      (total, order) =>
        total + Number(order.totalPrice || 0),
      0
    );

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  ).length;

  const confirmedOrders = orders.filter(
    (order) => order.orderStatus === "Confirmed"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.orderStatus === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.orderStatus === "Cancelled"
  ).length;

  // ==============================
  // Recent Orders
  // ==============================
  const recentOrders = useMemo(() => {
    return [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);
  }, [orders]);

  // ==============================
  // Order Status Style
  // ==============================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-indigo-100 text-indigo-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* =================================
            HEADER
        ================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome back, {user.name}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <Link
              to="/admin/orders"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold text-center transition"
            >
              📦 Manage Orders
            </Link>

            <Link
              to="/admin/products/add"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-3 rounded-lg font-semibold text-center transition"
            >
              + Add Product
            </Link>

          </div>
        </div>

        {/* =================================
            STATISTICS
        ================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Total Products */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Total Products
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {totalProducts}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Products in store
            </p>
          </div>

          {/* In Stock */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">
              In Stock
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {inStockProducts}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Available products
            </p>
          </div>

          {/* Out Of Stock */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Out of Stock
            </p>

            <h2 className="text-3xl font-bold text-red-600 mt-2">
              {outOfStockProducts}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Need restocking
            </p>
          </div>

          {/* Categories */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Categories
            </p>

            <h2 className="text-3xl font-bold text-purple-600 mt-2">
              {totalCategories}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Product categories
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Total Orders
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {totalOrders}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              All customer orders
            </p>
          </div>

          {/* Revenue */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Revenue
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Excluding cancelled orders
            </p>
          </div>

          {/* Pending */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Pending Orders
            </p>

            <h2 className="text-3xl font-bold text-yellow-600 mt-2">
              {pendingOrders}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Waiting for confirmation
            </p>
          </div>

          {/* Delivered */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Delivered
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {deliveredOrders}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Successfully delivered
            </p>
          </div>

        </div>

        {/* =================================
            ORDER OVERVIEW
        ================================= */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Order Overview
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Current order status
              </p>
            </div>

            <Link
              to="/admin/orders"
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            <div className="bg-yellow-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Pending
              </p>

              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {pendingOrders}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Confirmed
              </p>

              <p className="text-2xl font-bold text-blue-600 mt-1">
                {confirmedOrders}
              </p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Shipped
              </p>

              <p className="text-2xl font-bold text-indigo-600 mt-1">
                {shippedOrders}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Delivered
              </p>

              <p className="text-2xl font-bold text-green-600 mt-1">
                {deliveredOrders}
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">
                Cancelled
              </p>

              <p className="text-2xl font-bold text-red-600 mt-1">
                {cancelledOrders}
              </p>
            </div>

          </div>
        </div>

        {/* =================================
            RECENT ORDERS
        ================================= */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden">

          <div className="p-6 border-b flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Recent Orders
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest customer orders
              </p>
            </div>

            <Link
              to="/admin/orders"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              View All
            </Link>

          </div>

          {loadingOrders ? (
            <div className="p-8 text-center text-gray-500">
              Loading orders...
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No orders found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead className="bg-gray-50">

                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">
                      Order
                    </th>

                    <th className="p-4 text-left text-sm font-semibold text-gray-600">
                      Customer
                    </th>

                    <th className="p-4 text-left text-sm font-semibold text-gray-600">
                      Amount
                    </th>

                    <th className="p-4 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="p-4 text-left text-sm font-semibold text-gray-600">
                      Date
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      <td className="p-4">
                        <span className="font-semibold text-gray-800">
                          #{order._id?.slice(-6)}
                        </span>
                      </td>

                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-800">
                            {order.user?.name ||
                              order.userName ||
                              "Customer"}
                          </p>

                          <p className="text-sm text-gray-500">
                            {order.user?.email ||
                              order.email ||
                              ""}
                          </p>
                        </div>
                      </td>

                      <td className="p-4 font-semibold">
                        ₹
                        {Number(
                          order.totalPrice || 0
                        ).toLocaleString("en-IN")}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus || "Unknown"}
                        </span>
                      </td>

                      <td className="p-4 text-sm text-gray-500">
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleDateString("en-IN")
                          : "-"}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* =================================
            SEARCH & FILTER
        ================================= */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Search Products
              </label>

              <input
                type="text"
                placeholder="Search by title or brand..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">

              <div className="w-full bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-sm text-gray-500">
                  Showing
                </p>

                <p className="text-lg font-bold text-gray-800">
                  {filteredProducts.length} Products
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* =================================
            PRODUCT MANAGEMENT
        ================================= */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Product Management
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage your store products
            </p>
          </div>

          {loadingProducts ? (
           <div className="p-10 flex flex-col items-center justify-center">

  <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>

  <p className="text-gray-500 mt-4">
    Loading products...
  </p>

</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-10 text-center">

              <div className="text-5xl mb-3">
                📦
              </div>

              <h2 className="text-xl font-semibold text-gray-500">
                No products found
              </h2>

              <p className="text-gray-400 mt-1">
                Try changing your search or category.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px]">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="p-4 text-left text-sm font-semibold text-gray-600">
                      Product
                    </th>

                    <th className="p-4 text-left text-sm font-semibold text-gray-600">
                      Category
                    </th>

                    <th className="p-4 text-left text-sm font-semibold text-gray-600">
                      Price
                    </th>

                    <th className="p-4 text-left text-sm font-semibold text-gray-600">
                      Stock
                    </th>

                    <th className="p-4 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="p-4 text-left text-sm font-semibold text-gray-600">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredProducts.map((product) => (

                    <tr
                      key={product._id}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      {/* Product */}
                      <td className="p-4">

                        <div className="flex items-center gap-4">

                          <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">

                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-14 h-14 object-contain"
                            />

                          </div>

                          <div className="max-w-xs">

                            <p className="font-semibold text-gray-800 truncate">
                              {product.title}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                              {product.brand}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Category */}
                      <td className="p-4">

                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {product.category}
                        </span>

                      </td>

                      {/* Price */}
                      <td className="p-4 font-semibold text-gray-800">

                        ₹
                        {Number(
                          product.price || 0
                        ).toLocaleString("en-IN")}

                      </td>

                      {/* Stock */}
                      <td className="p-4">

                        <span
                          className={
                            product.stock > 0
                              ? "text-gray-800"
                              : "text-red-600"
                          }
                        >
                          {product.stock}
                        </span>

                      </td>

                      {/* Status */}
                      <td className="p-4">

                        {product.inStock ? (

                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            In Stock
                          </span>

                        ) : (

                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                            Out of Stock
                          </span>

                        )}

                      </td>

                      {/* Actions */}
                      <td className="p-4">

                        <div className="flex gap-2">

                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(product._id)
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;