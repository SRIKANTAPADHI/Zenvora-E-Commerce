import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminProducts() {
  const { token, user } = useAuth();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
const [deleting, setDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to get products"
        );
      }

      setProducts(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user?.isAdmin) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [token, user]);

 const deleteProduct = async () => {
  if (!deleteId) return;

  try {
    setDeleting(true);

    const response = await fetch(
      `http://localhost:5000/api/products/${deleteId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete product"
      );
    }

    setProducts((prevProducts) =>
      prevProducts.filter(
        (product) => product._id !== deleteId
      )
    );

    setDeleteId(null);
  } catch (error) {
    alert(error.message);
  } finally {
    setDeleting(false);
  }
};
  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    return (
      product.title?.toLowerCase().includes(keyword) ||
      product.category?.toLowerCase().includes(keyword) ||
      product.brand?.toLowerCase().includes(keyword)
    );
  });

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow text-center">
          <div className="text-5xl">🔒</div>

          <h1 className="text-2xl font-bold text-red-600 mt-4">
            Access Denied
          </h1>

          <p className="text-gray-500 mt-2">
            Admin access required.
          </p>

          <Link
            to="/"
            className="inline-block mt-5 bg-yellow-400 px-6 py-3 rounded-full font-semibold"
          >
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

          <div>
            <h1 className="text-3xl font-bold">
              Product Management
            </h1>

            <p className="text-gray-500 mt-1">
              Manage products in your Zenvora store
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              to="/admin"
              className="px-5 py-3 border bg-white rounded-lg hover:bg-gray-50"
            >
              ← Dashboard
            </Link>

            <Link
              to="/admin/products/add"
              className="px-5 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold"
            >
              + Add Product
            </Link>

          </div>
        </div>

        {/* Search */}

        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">

          <input
            type="text"
            placeholder="Search by product, category or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Error */}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-5">
            {error}
          </div>
        )}

        {/* Loading */}

        {loading && (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            Loading products...
          </div>
        )}

        {/* Product Table */}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>
                    <th className="text-left p-4">
                      Product
                    </th>

                    <th className="text-left p-4">
                      Category
                    </th>

                    <th className="text-left p-4">
                      Price
                    </th>

                    <th className="text-left p-4">
                      Stock
                    </th>

                    <th className="text-left p-4">
                      Actions
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center p-10 text-gray-500"
                      >
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (

                      <tr
                        key={product._id}
                        className="border-t hover:bg-gray-50"
                      >

                        {/* Product */}

                        <td className="p-4">

                          <div className="flex items-center gap-4">

                            <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">

                              <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain"
                              />

                            </div>

                            <div>

                              <h3 className="font-semibold">
                                {product.title}
                              </h3>

                              <p className="text-sm text-gray-500">
                                {product.brand}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Category */}

                        <td className="p-4 text-gray-600">
                          {product.category}
                        </td>

                        {/* Price */}

                        <td className="p-4 font-semibold">
                          ₹{Number(product.price).toLocaleString()}
                        </td>

                        {/* Stock */}

                        <td className="p-4">

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              product.stock > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {product.stock > 0
                              ? `${product.stock} in stock`
                              : "Out of stock"}
                          </span>

                        </td>

                        {/* Actions */}

                        <td className="p-4">

                          <div className="flex gap-2">

                            <Link
                              to={`/admin/products/edit/${product._id}`}
                              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                            >
                              Edit
                            </Link>

                            <button
  onClick={() => setDeleteId(product._id)}
  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
>
  Delete
</button>{deleteId && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-7">

      <div className="text-center">

        <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center text-3xl">
          🗑️
        </div>

        <h2 className="text-2xl font-bold mt-5">
          Delete Product?
        </h2>

        <p className="text-gray-500 mt-2">
          This action cannot be undone. Are you sure you want
          to delete this product?
        </p>

      </div>

      <div className="flex gap-3 mt-7">

        <button
          type="button"
          onClick={() => setDeleteId(null)}
          disabled={deleting}
          className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={deleteProduct}
          disabled={deleting}
          className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
        >
          {deleting ? "Deleting..." : "Yes, Delete"}
        </button>

      </div>

    </div>

  </div>
)}

                          </div>

                        </td>

                      </tr>

                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminProducts;