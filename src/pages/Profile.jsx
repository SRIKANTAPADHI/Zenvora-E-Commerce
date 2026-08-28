import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaShoppingBag } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <h1 className="text-2xl font-bold">
            Please Login
          </h1>

          <Link
            to="/login"
            className="inline-block mt-5 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-full font-bold"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your account
          </p>
        </div>

        {/* Profile Card */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Top */}

          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-8">

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow">
                <FaUser className="text-gray-700 text-3xl" />
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  {user.name}
                </h2>

                <p className="text-gray-700">
                  {user.isAdmin
                    ? "Administrator"
                    : "Customer"}
                </p>

              </div>

            </div>

          </div>

          {/* Information */}

          <div className="p-8">

            <h2 className="text-xl font-bold mb-5">
              Account Information
            </h2>

            <div className="space-y-4">

              {/* Name */}

              <div className="flex items-center gap-4 border-b pb-4">

                <FaUser className="text-gray-500" />

                <div>
                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <p className="font-semibold">
                    {user.name}
                  </p>
                </div>

              </div>

              {/* Email */}

              <div className="flex items-center gap-4 border-b pb-4">

                <FaEnvelope className="text-gray-500" />

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="font-semibold">
                    {user.email}
                  </p>
                </div>

              </div>

              {/* Account Type */}

              <div className="flex items-center gap-4">

                <FaUser className="text-gray-500" />

                <div>
                  <p className="text-sm text-gray-500">
                    Account Type
                  </p>

                  <p className="font-semibold">
                    {user.isAdmin
                      ? "Admin"
                      : "Customer"}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <Link
            to="/orders"
            className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition flex items-center gap-5"
          >

            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <FaShoppingBag className="text-blue-600 text-xl" />
            </div>

            <div>
              <h3 className="text-lg font-bold">
                My Orders
              </h3>

              <p className="text-gray-500 text-sm">
                View and track your orders
              </p>
            </div>

          </Link>

          {user.isAdmin && (
            <Link
              to="/admin"
              className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition flex items-center gap-5"
            >

              <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                👑
              </div>

              <div>
                <h3 className="text-lg font-bold">
                  Admin Dashboard
                </h3>

                <p className="text-gray-500 text-sm">
                  Manage products and orders
                </p>
              </div>

            </Link>
          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;