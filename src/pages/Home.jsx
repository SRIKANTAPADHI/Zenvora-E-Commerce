import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearch } from "../context/SearchContext";

function Home() {
  const { search } = useSearch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search
  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    return (
      product.title?.toLowerCase().includes(keyword) ||
      product.category?.toLowerCase().includes(keyword) ||
      product.brand?.toLowerCase().includes(keyword)
    );
  });

  // Loading
  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold">
          Loading products...
        </h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <h2 className="text-2xl text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">

          <h2 className="text-3xl font-bold text-gray-500">
            😢 No Products Found
          </h2>

          <p className="text-gray-600 mt-2">
            {filteredProducts.length} Products Found
          </p>

          <p className="text-gray-400 mt-2">
            Try another keyword.
          </p>

        </div>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      )}

    </div>
  );
}

export default Home;