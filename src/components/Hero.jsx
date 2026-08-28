import React from "react";
import { FaArrowRight, FaTags, FaPlay, FaGift, FaShoppingBag } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[550px] overflow-hidden bg-gray-950">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      {/* Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

      {/* Orange Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex items-center min-h-[550px]">

        <div className="max-w-2xl">

          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-md">
            <FaGift />
            Special Weekend Offer
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Shop More.
            <span className="block text-orange-400">
              Save More.
            </span>
            Enjoy More.
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-lg mt-5 max-w-xl leading-relaxed">
            Discover trending products, amazing deals and exclusive offers
            specially selected for you.
          </p>

          {/* Coupon */}
          <div className="mt-7 flex flex-wrap gap-4">

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-4 flex items-center gap-4">
              <div className="bg-orange-500 p-3 rounded-lg text-white">
                <FaTags />
              </div>

              <div>
                <p className="text-xs text-gray-300">
                  USE COUPON
                </p>
                <p className="text-xl font-bold text-white tracking-wider">
                  ZENVORA20
                </p>
              </div>

              <span className="text-orange-400 font-bold">
                20% OFF
              </span>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">

            <button className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30">
              <FaShoppingBag />
              Shop Now
              <FaArrowRight />
            </button>

            <button className="flex items-center gap-3 border border-white/30 hover:border-orange-400 text-white px-7 py-3.5 rounded-xl backdrop-blur-md transition-all duration-300 hover:bg-white/10">
              <FaPlay className="text-orange-400" />
              Explore Deals
            </button>

          </div>

        </div>

        {/* Right Floating Cards */}
        <div className="hidden lg:block absolute right-10 xl:right-20 top-1/2 -translate-y-1/2">

          {/* Main Card */}
          <div className="w-72 h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/20 rotate-3 hover:rotate-0 transition-all duration-500">

            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80"
              alt="Movie entertainment"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-orange-400 text-sm font-semibold">
                ENTERTAINMENT
              </p>

              <h3 className="text-white text-2xl font-bold">
                Movie Night
              </h3>

              <p className="text-gray-300 text-sm mt-1">
                Refresh your mood 🎬
              </p>
            </div>

          </div>

          {/* Floating Discount */}
          <div className="absolute -top-8 -left-16 bg-white text-gray-900 rounded-2xl px-5 py-4 shadow-xl animate-bounce">
            <p className="text-xs font-semibold text-gray-500">
              TODAY ONLY
            </p>
            <p className="text-2xl font-extrabold text-orange-500">
              50% OFF
            </p>
          </div>

          {/* Floating Movie Card */}
          <div className="absolute -bottom-10 -right-16 w-36 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-2xl -rotate-6 hover:rotate-0 transition-all duration-300">

            <img
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80"
              alt="Cinema"
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
              <p className="text-white text-xs font-bold">
                Movie Picks 🎬
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-950 to-transparent" />

    </section>
  );
};

export default Hero;