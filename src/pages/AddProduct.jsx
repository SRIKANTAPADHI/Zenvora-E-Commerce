import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AddProduct() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    originalPrice: "",
    stock: "",
    rating: "0",
    reviews: "0",
    image: "",
    discount: "",
    seller: "",
    warranty: "",
    delivery: "Free Delivery",
    inStock: true,
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.title ||
      !formData.category ||
      !formData.price ||
      !formData.stock ||
      !formData.image
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://zenvora-e-commerce-2.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice),
            stock: Number(formData.stock),
            rating: Number(formData.rating),
            reviews: Number(formData.reviews),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add product"
        );
      }

      alert("Product added successfully!");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
        <div className="bg-white p-10 rounded-2xl shadow text-center">

          <div className="text-5xl">
            🔒
          </div>

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

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="flex items-center justify-between mb-7">

          <div>
            <h1 className="text-3xl font-bold">
              Add Product
            </h1>

            <p className="text-gray-500 mt-1">
              Add a new product to your store
            </p>
          </div>

          <Link
            to="/admin/products"
            className="px-5 py-3 bg-white border rounded-lg hover:bg-gray-50"
          >
            ← Products
          </Link>

        </div>

        {/* Error */}

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-lg mb-5">
            {error}
          </div>
        )}

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 md:p-8"
        >

          {/* Basic Information */}

          <h2 className="text-xl font-bold mb-5">
            Basic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="md:col-span-2">
              <label className="block font-medium mb-2">
                Product Name *
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Apple iPhone 15"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Category *
              </label>

              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Mobiles"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Brand
              </label>

              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Apple"
                className="input"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Product description..."
                className="input resize-none"
              />
            </div>

          </div>

          {/* Pricing */}

          <h2 className="text-xl font-bold mt-8 mb-5">
            Pricing & Stock
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <div>
              <label className="block font-medium mb-2">
                Price *
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="69999"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Original Price
              </label>

              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="79999"
                className="input"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Stock *
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="25"
                min="0"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Discount
              </label>

              <input
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="13% Off"
                className="input"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Rating
              </label>

              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="input"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Reviews
              </label>

              <input
                type="number"
                name="reviews"
                value={formData.reviews}
                onChange={handleChange}
                min="0"
                className="input"
              />
            </div>

          </div>

          {/* Product Details */}

          <h2 className="text-xl font-bold mt-8 mb-5">
            Product Details
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="md:col-span-2">
              <label className="block font-medium mb-2">
                Image URL *
              </label>

              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/product.jpg"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Seller
              </label>

              <input
                name="seller"
                value={formData.seller}
                onChange={handleChange}
                placeholder="Apple Store"
                className="input"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Warranty
              </label>

              <input
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                placeholder="1 Year"
                className="input"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Delivery
              </label>

              <input
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
                className="input"
              />
            </div>

          </div>

          {/* Options */}

          <h2 className="text-xl font-bold mt-8 mb-5">
            Options
          </h2>

          <div className="flex flex-wrap gap-6">

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <span>
                In Stock
              </span>

            </label>

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <span>
                Featured Product
              </span>

            </label>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 mt-10 pt-6 border-t">

            <Link
              to="/admin/products"
              className="px-6 py-3 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-bold disabled:bg-gray-300"
            >
              {loading
                ? "Adding Product..."
                : "Add Product"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddProduct;