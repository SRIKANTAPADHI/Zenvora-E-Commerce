import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaOpencart, FaHeart } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [language, setLanguage] = useState("EN");

  const { cart } = useCart();
  const { user, logout } = useAuth();

  const {
    search,
    setSearch,
    category,
    setCategory,
  } = useSearch();

  const categories = [
  "All",
  "Alexa Skills",
  "Amazon Devices",
  "Amazon Fashion",
  "Mobile Phones",
  "Mobile Accessories",
  "Phone Cases & Covers",
  "Chargers & Adapters",
  "Power Banks",
  "USB Cables",
  "Screen Protectors",
  "Earphones & Headphones",
  "Smartwatches",
];

  const lang = [
    { code: "EN", label: "" },
    { code: "हिन्दी", label: "" },
    { code: "ଓଡ଼ିଆ", label: "" },
    { code: "বাংলা", label: "" },
    { code: "తెలుగు", label: "" },
    { code: "தமிழ்", label: "" },
    { code: "ಕನ್ನಡ", label: "" },
    { code: "മലയാളം", label: "" },
  ];

  return (
    <nav className="bg-[#131921] text-white">

      <div
        className="
          min-h-[60px]
          flex
          items-center
          justify-evenly
          gap-2
          px-2
          md:px-4
          py-2
          flex-wrap
        "
      >

        {/* LOGO */}

        <Link
          to="/"
          className="
            logo
            cursor-pointer
            shrink-0
            px-1
            hover:border
            border-white
          "
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Zenvora
            <span className="text-orange-400">.</span>
            <span className="text-lg">
              com
            </span>
          </h2>
        </Link>


        {/* LOCATION */}

        <div
          className="
            location
            hidden
            md:flex
            flex-col
            cursor-pointer
            shrink-0
          "
        >
          <span className="text-xs text-gray-300">
            Delivering to Bhubaneswar
          </span>

          <h4 className="text-sm font-semibold flex items-center">

            <div className="text-2xl text-white">
              <MdOutlineLocationOn />
            </div>

            Update Location

          </h4>
        </div>


        {/* SEARCH */}

        <div
          className="
            category
            flex
            h-10
            w-full
            md:flex-1
            md:max-w-2xl
            md:mx-4
            order-last
            md:order-none
          "
        >

           <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: `${category.length + 4}ch` }}
            className="bg-gray-200 text-black text-sm rounded-l-md border-r border-gray-300 outline-none px-2 hover:bg-gray-300 cursor-pointer"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>



          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search Zenvora"
            className="
              flex-1
              min-w-0
              px-3
              text-black
              bg-white
              outline-none
            "
          />


          <button
            className="
              bg-orange-200
              hover:bg-orange-500
              px-3
              md:px-4
              rounded-r-md
              text-black
              text-2xl
              transition
            "
          >
            <IoSearchOutline />
          </button>

        </div>


        {/* LANGUAGE */}

        <div
          className="
            language
            hidden
            lg:block
            cursor-pointer
            font-semibold
            shrink-0
          "
        >

          <select
            className="bg-[#131921] text-white outline-none"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ width: `${language.length + 4}ch` }}
          >
            {lang.map((lang) => (
              <option key={lang.code} value={lang.value}>
                {lang.label} {lang.code}
              </option>
            ))}
          </select>



        </div>


        {/* ACCOUNT */}

        <div
          className="
            account
            hidden
            md:flex
            flex-col
            relative
            group
            p-1
            shrink-0
          "
        >

          <Link
            to={
              user
                ? "/profile"
                : "/login"
            }
            className="
              px-2
              py-1
              flex
              flex-col
              border
              border-transparent
              hover:border-white
              rounded-sm
              transition-all
              duration-150
            "
          >

            <span className="text-xs text-gray-300 leading-4">
              Hello,{" "}
              {user
                ? user.name
                : "Sign in"}
            </span>

            <h4 className="text-sm font-bold text-white leading-4">
              Account & Lists
            </h4>

          </Link>


          {/* DROPDOWN */}

          {user && (
            <div
              className="
                absolute
                top-full
                right-0
                mt-1
                w-44
                bg-[#131921]
                rounded-md
                shadow-2xl
                border
                border-gray-600
                p-2
                z-[100]
                hidden
                group-hover:block
              "
            >

              {/* PROFILE */}

              <Link
                to="/profile"
                className="
                  block
                  w-full
                  px-3
                  py-2
                  mb-1
                  text-sm
                  font-semibold
                  text-white
                  rounded-md
                  hover:bg-[#232F3E]
                  hover:text-yellow-400
                  transition-all
                "
              >
                👤 Profile
              </Link>


              {/* MY ORDERS */}

              <Link
                to="/orders"
                className="
                  block
                  w-full
                  px-3
                  py-2
                  mb-1
                  text-sm
                  font-semibold
                  text-white
                  rounded-md
                  hover:bg-[#232F3E]
                  hover:text-yellow-400
                  transition-all
                "
              >
                📦 My Orders
              </Link>


              {/* ADMIN */}

              {user.isAdmin && (
                <Link
                  to="/admin"
                  className="
                    block
                    w-full
                    px-3
                    py-2
                    mb-1
                    text-sm
                    font-semibold
                    text-white
                    rounded-md
                    hover:bg-[#232F3E]
                    hover:text-yellow-400
                    transition-all
                  "
                >
                  ⚙️ Admin Panel
                </Link>
              )}


              {/* LOGOUT */}

              <button
                onClick={logout}
                className="
                  w-full
                  text-left
                  px-3
                  py-2
                  text-sm
                  font-semibold
                  text-white
                  rounded-md
                  hover:bg-[#232F3E]
                  hover:text-red-400
                  transition-all
                "
              >
                🚪 Sign out
              </button>

            </div>
          )}

        </div>


        {/* WISHLIST */}

        <Link
          to="/wishlist"
          className="
          hidden
          md:block
            relative
            md:hover:border
            border-white
            p-2
            shrink-0
          "
        >
          <FaHeart className="text-xl md:text-2xl" />
        </Link>


        {/* CART */}

        <Link
          to="/cart"
          className="
            cart
            hidden
           md:flex
            items-center
            gap-1
            cursor-pointer
            hover:border
            border-white
            p-2
            relative
            shrink-0
          "
        >

          <span className="text-2xl">
            <FaOpencart />
          </span>


          {cart.length > 0 && (
            <span
              className="
                absolute
                -top-1
                left-5
                bg-orange-500
                text-black
                text-xs
                font-bold
                rounded-full
                w-5
                h-5
                flex
                items-center
                justify-center
              "
            >
              {cart.length}
            </span>
          )}

{/* 
          <span className="hidden sm:block font-bold">
            Cart
          </span> */}

        </Link>

      </div>


      {/* MOBILE ACCOUNT / ORDERS ROW */}

      <div
        className="
          md:hidden
          border-t
          border-gray-700
          flex
          items-center
          justify-around
          py-2
          text-sm
        "
      >

        {!user ? (
          <Link
            to="/login"
            className="font-semibold"
          >
            Sign in
          </Link>
        ) : (
          <>
            <Link
              to="/profile"
              className="font-semibold"
            >
              Profile
            </Link>

            <Link
              to="/orders"
              className="font-semibold"
            >
              Orders
            </Link>

            {user.isAdmin && (
              <Link
                to="/admin"
                className="font-semibold text-yellow-400"
              >
                Admin
              </Link>
            )}
          </>
        )}

        <Link
          to="/wishlist"
          className="font-semibold"
        >
          ❤️ Wishlist
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;