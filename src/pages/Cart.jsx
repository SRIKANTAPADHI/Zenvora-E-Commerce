import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrash, FaShieldAlt, FaTruck, FaTag } from "react-icons/fa";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const originalTotal = cart.reduce(
    (total, item) =>
      total +
      (Number(item.originalPrice) || Number(item.price)) * item.quantity,
    0,
  );

  const savings = originalTotal - totalPrice;

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* ================= HEADER ================= */}

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Shopping Cart
              </h1>

              <p className="text-gray-500 mt-1">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            {cart.length > 0 && (
              <Link
                to="/"
                className="hidden sm:block text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                ← Continue Shopping
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {cart.length === 0 ? (
          /* ================= EMPTY CART ================= */

          <div className="bg-white rounded-2xl shadow-sm border p-10 md:p-16 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-yellow-50 flex items-center justify-center text-5xl">
              🛒
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-6">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Start
              shopping and find something you love.
            </p>

            <Link
              to="/"
              className="inline-flex items-center justify-center mt-7 px-8 py-3.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full font-bold shadow-sm hover:shadow-md transition-all duration-200"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ================= CART PRODUCTS ================= */}

            <div className="lg:col-span-2 space-y-4">
              {/* Cart title bar */}

              <div className="bg-white rounded-2xl border shadow-sm px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Your Items
                    </h2>

                    <p className="text-sm text-gray-500 mt-0.5">
                      Review your products before checkout
                    </p>
                  </div>

                  <span className="hidden sm:flex items-center gap-2 text-sm text-green-600 font-medium">
                    <FaShieldAlt />
                    Secure Cart
                  </span>
                </div>
              </div>

              {/* Product Cards */}

              {cart.map((item) => {
                const productId = item._id || item.id;

                const itemOriginalPrice =
                  Number(item.originalPrice) || Number(item.price);

                const itemSavings = itemOriginalPrice - Number(item.price);

                return (
                  <div
                    key={productId}
                    className="group bg-white rounded-2xl
                               border border-gray-200
                               shadow-sm
                               hover:shadow-lg
                               hover:border-gray-300
                               transition-all duration-300
                               p-4 md:p-5"
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* ================= IMAGE ================= */}

                      <Link to={`/product/${productId}`} className="shrink-0">
                        <div
                          className="relative w-full sm:w-40 h-40
                                     bg-gray-50
                                     rounded-xl
                                     flex items-center justify-center
                                     overflow-hidden"
                        >
                          {item.discount && (
                            <span
                              className="absolute top-2 left-2 z-10
                                         bg-red-500 text-white
                                         text-xs font-bold
                                         px-2 py-1 rounded-md"
                            >
                              {item.discount}% OFF
                            </span>
                          )}

                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain
                                       p-3
                                       group-hover:scale-110
                                       transition-transform duration-500"
                          />
                        </div>
                      </Link>

                      {/* ================= PRODUCT INFO ================= */}

                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${productId}`}>
                          <h2
                            className="text-lg md:text-xl
                                       font-semibold
                                       text-gray-900
                                       leading-7
                                       hover:text-blue-600
                                       transition"
                          >
                            {item.title}
                          </h2>
                        </Link>

                        {item.brand && (
                          <p className="text-sm text-gray-500 mt-1">
                            Brand:{" "}
                            <span className="font-medium text-gray-700">
                              {item.brand}
                            </span>
                          </p>
                        )}

                        {/* Stock */}

                        <div className="flex items-center gap-2 mt-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>

                          <span className="text-sm font-medium text-green-600">
                            In Stock
                          </span>
                        </div>

                        {/* Price */}

                        <div className="flex items-center flex-wrap gap-2 mt-3">
                          <span className="text-2xl font-bold text-gray-900">
                            ₹{Number(item.price).toLocaleString()}
                          </span>

                          {item.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹{itemOriginalPrice.toLocaleString()}
                            </span>
                          )}

                          {itemSavings > 0 && (
                            <span className="text-sm font-semibold text-green-600">
                              Save ₹{itemSavings.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Delivery */}

                        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <FaTruck />
                            <span>FREE Delivery</span>
                          </div>

                          <div className="text-sm text-gray-500">
                            Delivery by{" "}
                            <b className="text-gray-700">Tomorrow</b>
                          </div>
                        </div>

                        {/* ================= ACTIONS ================= */}

                        <div
                          className="flex flex-wrap
                                     items-center
                                     gap-4
                                     mt-5"
                        >
                          {/* Quantity */}

                          <div
                            className="flex items-center
                                          bg-white
                                          border-2 border-gray-200
                                          rounded-xl
                                          overflow-hidden
                                          shadow-sm"
                          >
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(productId)}
                              className="w-10 h-10
                                         flex items-center justify-center
                                         text-xl font-bold
                                         text-gray-700
                                         hover:bg-gray-100
                                         active:bg-gray-200
                                         transition"
                            >
                              −
                            </button>

                            <span
                              className="w-12 h-10
                                         flex items-center justify-center
                                         border-x-2 border-gray-200
                                         font-bold text-gray-900"
                            >
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              disabled={
                                item.stock !== undefined &&
                                item.quantity >= item.stock
                              }
                              onClick={() =>
                                increaseQuantity(item._id || item.id)
                              }
                              className="w-9 h-9 bg-gray-50
             hover:bg-gray-200
             font-bold text-lg transition
             disabled:opacity-40
             disabled:cursor-not-allowed"
                            >
                              +
                            </button>
                          </div>

                          {/* Divider */}

                          <span className="hidden sm:block h-6 w-px bg-gray-300"></span>

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() => removeFromCart(productId)}
                            className="flex items-center gap-2
                                       text-sm font-medium
                                       text-red-500
                                       hover:text-red-700
                                       transition"
                          >
                            <FaTrash className="text-xs" />
                            Remove
                          </button>

                          {/* Save */}

                          <button
                            type="button"
                            className="text-sm font-medium
                                       text-blue-600
                                       hover:text-blue-800
                                       transition"
                          >
                            Save for later
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================= ORDER SUMMARY ================= */}

            <div className="lg:col-span-1">
              <div
                className="bg-white
                           rounded-2xl
                           border
                           border-gray-200
                           shadow-md
                           p-5 md:p-6
                           lg:sticky lg:top-6"
              >
                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                {/* Items */}

                <div className="flex justify-between mt-6 text-gray-600">
                  <span>Items ({totalItems})</span>

                  <span className="font-medium text-gray-900">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Delivery */}

                <div className="flex justify-between mt-4">
                  <span className="text-gray-600">Delivery</span>

                  <span className="text-green-600 font-semibold">FREE</span>
                </div>

                {/* Savings */}

                {savings > 0 && (
                  <div
                    className="flex items-center justify-between
                               mt-4
                               bg-green-50
                               border border-green-100
                               rounded-lg
                               px-3 py-2"
                  >
                    <div className="flex items-center gap-2 text-green-700">
                      <FaTag className="text-sm" />

                      <span className="text-sm font-medium">Your savings</span>
                    </div>

                    <span className="font-bold text-green-700">
                      ₹{savings.toLocaleString()}
                    </span>
                  </div>
                )}

                <hr className="my-6" />

                {/* Total */}

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>

                  <span className="text-2xl font-extrabold text-gray-900">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Checkout */}

                <Link
                  to="/checkout"
                  className="flex items-center justify-center
                             w-full
                             mt-6
                             bg-yellow-400
                             hover:bg-yellow-500
                             active:bg-yellow-600
                             text-gray-900
                             py-3.5
                             rounded-xl
                             font-bold
                             shadow-sm
                             hover:shadow-md
                             transition-all duration-200"
                >
                  Proceed to Checkout
                </Link>

                {/* Benefits */}

                <div className="mt-6 space-y-3">
                  <div className="flex gap-3 items-start">
                    <div
                      className="w-8 h-8 rounded-full bg-green-50
                                    flex items-center justify-center
                                    text-green-600 shrink-0"
                    >
                      <FaShieldAlt className="text-sm" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Secure Payment
                      </p>

                      <p className="text-xs text-gray-500">
                        Your payment information is protected
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div
                      className="w-8 h-8 rounded-full bg-blue-50
                                    flex items-center justify-center
                                    text-blue-600 shrink-0"
                    >
                      <FaTruck className="text-sm" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Fast & Free Delivery
                      </p>

                      <p className="text-xs text-gray-500">
                        Get your order delivered quickly
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
