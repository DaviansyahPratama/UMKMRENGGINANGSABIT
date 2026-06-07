import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-64 rounded"
      />

      <h1 className="text-2xl font-bold mt-4">
        {product.title}
      </h1>

      <p>{product.description}</p>

      <p className="font-semibold">
        Rp {product.price * 1000}
      </p>
    </div>
  );
}