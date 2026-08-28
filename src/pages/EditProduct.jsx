import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    brand: "",
    stock: 0,
    description: "",
    price: "",
    originalPrice: "",
    rating: 0,
    reviews: 0,
    image: "",
    discount: "",
    seller: "",
    warranty: "",
    delivery: "",
    inStock: true,
    featured: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Admin check
  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow text-center">
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

  // Get product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Product not found"
          );
        }

        setFormData({
          title: data.title || "",
          category: data.category || "",
          brand: data.brand || "",
          stock: data.stock || 0,
          description: data.description || "",
          price: data.price || "",
          originalPrice: data.originalPrice || "",
          rating: data.rating || 0,
          reviews: data.reviews || 0,
          image: data.image || "",
          discount: data.discount || "",
          seller: data.seller || "",
          warranty: data.warranty || "",
          delivery: data.delivery || "",
          inStock: data.inStock ?? true,
          featured: data.featured ?? false,
        });
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            stock: Number(formData.stock),
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice),
            rating: Number(formData.rating),
            reviews: Number(formData.reviews),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update product"
        );
      }

      alert("Product updated successfully!");

      navigate("/admin");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading product...
        </h2>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl text-red-600 font-bold">
            {error}
          </h2>

          <button
            onClick={() => navigate("/admin")}
            className="mt-4 bg-gray-800 text-white px-5 py-2 rounded"
          >
            Back to Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Edit Product
            </h1>

            <p className="text-gray-500 mt-1">
              Update product information
            </p>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            ← Back
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Basic Information */}

          <h2 className="text-xl font-bold mb-4">
            Basic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="md:col-span-2">
              <label className="block font-medium mb-1">
                Product Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Category
              </label>

              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Brand
              </label>

              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full border rounded p-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-1">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border rounded p-3"
              />
            </div>

          </div>

          {/* Pricing */}

          <h2 className="text-xl font-bold mt-8 mb-4">
            Pricing
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <div>
              <label className="block font-medium mb-1">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Original Price
              </label>

              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                required
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Discount
              </label>

              <input
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full border rounded p-3"
              />
            </div>

          </div>

          {/* Inventory */}

          <h2 className="text-xl font-bold mt-8 mb-4">
            Inventory
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <div>
              <label className="block font-medium mb-1">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Rating
              </label>

              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Reviews
              </label>

              <input
                type="number"
                name="reviews"
                min="0"
                value={formData.reviews}
                onChange={handleChange}
                className="w-full border rounded p-3"
              />
            </div>

          </div>

          {/* Image */}

          <h2 className="text-xl font-bold mt-8 mb-4">
            Product Image
          </h2>

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full border rounded p-3"
          />

          {/* Seller */}

          <h2 className="text-xl font-bold mt-8 mb-4">
            Seller & Delivery
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <div>
              <label className="block font-medium mb-1">
                Seller
              </label>

              <input
                name="seller"
                value={formData.seller}
                onChange={handleChange}
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Warranty
              </label>

              <input
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Delivery
              </label>

              <input
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
                className="w-full border rounded p-3"
              />
            </div>

          </div>

          {/* Options */}

          <div className="flex gap-8 mt-8">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
              />

              <span>In Stock</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />

              <span>Featured Product</span>
            </label>

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={saving}
            className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 py-3 rounded-full font-bold"
          >
            {saving
              ? "Updating Product..."
              : "Update Product"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditProduct;