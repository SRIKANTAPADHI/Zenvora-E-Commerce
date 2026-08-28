import Navbar from "./components/Navbar";
import Subnavbar from "./components/Subnavbar";
import Hero from "./components/Hero";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();

  // Pages where Navbar/Subnavbar should NOT appear
  const hideNavbar = [
    "/login",
    "/Login",
    "/register",
    "/checkout",
    "/order-success",
    "/admin",
    "/admin/products",
    "/admin/products/add",
    "/admin/orders",
  ].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideNavbar && (
        <>
          <Navbar />
          <Subnavbar />
        </>
      )}

      {location.pathname === "/" && <Hero />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/order-success/:id"
          element={<OrderSuccess />}
        />

        <Route
          path="/Login"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/products/add"
          element={<AddProduct />}
        />

        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />

        <Route
          path="/admin/products/edit/:id"
          element={<EditProduct />}
        />

        <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />

        <Route
          path="/orders"
          element={<MyOrders />}
        />

        <Route
          path="/orders/:id"
          element={<OrderDetails />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;