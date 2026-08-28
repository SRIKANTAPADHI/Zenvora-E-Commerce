import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Navigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://zenvora-e-commerce-2.onrender.com/api/products/${id}`,
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error(error);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl">Loading product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}

        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md h-[450px] object-contain"
          />
        </div>

        {/* Product Information */}

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-gray-600 mt-3">{product.description}</p>

          <p className="text-2xl text-red-600 font-bold mt-5">
            ₹{product.price.toLocaleString()}
          </p>

          <p className="line-through text-gray-500">
            ₹{product.originalPrice.toLocaleString()}
          </p>

          <p className="mt-3">
            ⭐ {product.rating} ({product.reviews} reviews)
          </p>

          <p className="text-green-600 font-semibold mt-3">
            {product.inStock ? "✓ In Stock" : "Out of Stock"}
          </p>

          <p className="text-gray-600 mt-2">{product.delivery}</p>

          {/* Quantity */}

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Quantity</h3>

            <div className="flex items-center gap-4">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-10 h-10 border rounded-md hover:bg-gray-200"
              >
                -
              </button>

              <span className="text-xl font-semibold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border rounded-md hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex gap-4 mt-6">
            <button
              disabled={!product.inStock}
              onClick={() => addToCart(product, quantity)}
              className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-full font-semibold disabled:bg-gray-300"
            >
              Add to Cart
            </button>
            <button
              disabled={!product.inStock}
              onClick={() => {
                addToCart(product);
                navigate("/checkout");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold disabled:bg-gray-300"
            >
              Buy Now
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
