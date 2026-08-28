import { FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const handleAddCart = () => {
  addToCart(product);
  toast.success("Added to Cart");
};
const handleWishlist = ()=>{
  addToWishlist(product)
  toast.success("Added to Wishlist")
}
  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col">

      {/* Product Image + Wishlist */}
      <div className="relative h-52">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-center h-full">
            <img
              src={product.image}
              alt={product.title}
              className="h-full object-contain hover:scale-105 transition duration-300"
            />
          </div>
        </Link>

        <button
          onClick={() =>{handleWishlist();
             addToWishlist(product);}}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:text-red-500 transition"
        >
          <FaHeart />
        </button>
      </div>

      {/* Product Title */}
      <Link to={`/product/${product._id}`}>
        <h2 className="mt-3 text-lg font-semibold hover:text-blue-600">
          {product.title}
        </h2>
      </Link>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {product.description}
      </p>

      {/* Brand */}
      <p className="text-sm text-gray-500 mt-2">
        {product.brand}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-2">
        <FaStar className="text-yellow-500" />
        <span className="font-medium">{product.rating}</span>
        <span className="text-gray-500 text-sm">
          ({product.reviews})
        </span>
      </div>

      {/* Price */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-900">
          ₹{product.price.toLocaleString()}
        </span>

        <span className="line-through text-gray-400">
          ₹{product.originalPrice.toLocaleString()}
        </span>
      </div>

      {/* Discount */}
      <div className="mt-2">
        <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
          {product.discount}
        </span>
      </div>

      {/* Delivery */}
      <p className="text-green-600 text-sm mt-3 font-medium">
        {product.delivery}
      </p>

      {/* Stock */}
      <p
        className={`text-sm ${
          product.inStock ? "text-green-700" : "text-red-600"
        }`}
      >
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>

      {/* Add to Cart */}
      <button
  onClick={() => {
    handleAddCart();
    addToCart(product);
  }}
        disabled={!product.inStock}
        className={`mt-4 w-full rounded-full py-2 font-semibold transition ${
          product.inStock
            ? "bg-yellow-400 hover:bg-yellow-500"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}

export default ProductCard;