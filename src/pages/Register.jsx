import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://zenvora-e-commerce-2.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-md bg-white border rounded-lg p-8 shadow">

        <h1 className="text-3xl font-bold text-center mb-6">
          Zenvora.com
        </h1>

        <h2 className="text-2xl font-semibold mb-6">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <label className="block font-medium mb-1">
            Your name
          </label>

          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 mb-4"
          />

          <label className="block font-medium mb-1">
            Email
          </label>

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 mb-4"
          />

          <label className="block font-medium mb-1">
            Phone
          </label>

          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 mb-4"
          />

          <label className="block font-medium mb-1">
            Password
          </label>

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 mb-6"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-full font-semibold"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;