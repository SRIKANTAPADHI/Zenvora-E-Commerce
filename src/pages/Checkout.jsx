import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const { cart, totalPrice } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState({
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
});

  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Handle address input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Place Order
  const placeOrder = async (e) => {
    e.preventDefault();

    setError("");

    // Login check
    if (!token) {
      setError("Please login before placing your order.");
      return;
    }

    // Cart check
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

     const orderData = {
  items: cart.map((item) => ({
    product: item._id || item.id,
    title: item.title,
    image: item.image,
    price: Number(item.price),
    quantity: Number(item.quantity),
  })),

  shippingAddress: {
    fullName: address.fullName,
    phone: address.phone,
    address: address.address,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
  },

  paymentMethod,

  itemsPrice: Number(totalPrice),

  deliveryPrice: 0,

  totalPrice: Number(totalPrice),
};

      console.log("ORDER DATA:", orderData);

      const response = await fetch("http://localhost:5000/api/orders",{
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      console.log("ORDER CREATED:", data.order);

      // Go to success page
      navigate(`/order-success/${data.order._id}`);
    } catch (error) {
      console.error("PLACE ORDER ERROR:", error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-500 mt-1">Complete your order</p>
        </div>
        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        <form onSubmit={placeOrder} className="grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold mb-5">1. Delivery Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
  type="text"
  name="fullName"
  value={address.fullName}
  onChange={handleChange}
  placeholder="Full Name"
  required
  className="w-full border border-gray-300 rounded-lg px-4 py-3"
/>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={address.address}
                    onChange={handleChange}
                    placeholder="House no, street, area"
                    rows="3"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">City</label>

                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    placeholder="Bhubaneswar"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    placeholder="Odisha"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleChange}
                    placeholder="751001"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold mb-5">2. Payment Method</h2>

              <div className="space-y-3">
                {/* COD */}

                <label
                  className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${
                    paymentMethod === "COD"
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />

                  <div>
                    <p className="font-semibold">Cash on Delivery</p>

                    <p className="text-sm text-gray-500">
                      Pay when your order arrives
                    </p>
                  </div>
                </label>

                {/* Online */}

                <label
                  className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition ${
                    paymentMethod === "Online"
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5"
                  />

                  <div>
                    <p className="font-semibold">Online Payment</p>

                    <p className="text-sm text-gray-500">
                      Payment gateway will be added later
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT - SUMMARY */}

          <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-5">
            <h2 className="text-xl font-bold mb-5">Order Summary</h2>

            {/* Cart Items */}

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {cart.map((item) => (
                <div key={item._id || item.id} className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-2">
                      {item.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-5 pt-5 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Items</span>

                <span>
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>

                <span>₹{totalPrice.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>

                <span className="text-green-600 font-medium">FREE</span>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <span className="text-xl font-bold">Total</span>

                <span className="text-xl font-bold">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 py-3 rounded-full font-bold transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
