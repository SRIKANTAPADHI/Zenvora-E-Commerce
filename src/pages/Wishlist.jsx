import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";
import { useEffect } from "react";

function Wishlist() {
  const { wishlist } = useWishlist();

  useEffect(() => {
    if (wishlist.length > 0) {
      toast.success(`${wishlist.length} item(s) in your wishlist ❤️`);
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center shadow">
          <h2 className="text-xl font-semibold">
            No items in wishlist ❤️
          </h2>

          <p className="text-gray-500 mt-2">
            Add products to your wishlist to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;