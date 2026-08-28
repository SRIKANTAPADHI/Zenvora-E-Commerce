import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save JWT + user in AuthContext
      login(data.user, data.token);

      // Save token in browser
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-md bg-white border rounded-lg p-8 shadow">

        <h1 className="text-3xl font-bold text-center mb-6">
          Zenvora<span className="text-orange-500">.com</span>
        </h1>

        <h2 className="text-2xl font-semibold mb-6">
          Sign in
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label className="block font-medium mb-1">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded p-3 mb-4 outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your email"
          />

          <label className="block font-medium mb-1">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded p-3 mb-6 outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-full font-semibold"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1" />
          <span className="text-gray-500 text-sm">OR</span>
          <hr className="flex-1" />
        </div>

        <button className="w-full border py-3 rounded-full flex items-center justify-center gap-2 mb-3">
          <FcGoogle />
          Continue with Google
        </button>

        <button className="w-full border py-3 rounded-full flex items-center justify-center gap-2 mb-3">
          <FaGithub />
          Continue with GitHub
        </button>

        <button className="w-full border py-3 rounded-full flex items-center justify-center gap-2">
          <FaApple />
          Continue with Apple
        </button>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            New Customer?
          </p>

          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Create your Account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;