import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
        .get(`https://dummyjson.com/products/search?q=${query}`)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="p-4">
      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari produk..."
        className="border p-2 rounded w-full mb-4"
      />

      <div className="grid gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4 shadow-sm"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <Link
              to={`/products/${item.id}`}
              className="font-bold text-blue-600 hover:underline"
            >
              {item.title}
            </Link>

            <p className="text-gray-600 mt-2">
              {item.category}
            </p>

            <p className="font-semibold mt-1">
              Rp {item.price * 1000}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}