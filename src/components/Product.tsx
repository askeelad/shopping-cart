import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/features/cartSlice";

export default function Product({ product }: any) {
  const {
    id,
    title,
    price,
    category,
    discountPercentage,
    rating,
    stock,
    images,
    thumbnail,
  } = product;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    dispatch(remove(product.id));
  };

  const increaseQuantity = () => {
    dispatch(add({ ...product, quantity: 1 }));
  };

  const addToCart = () => {
    dispatch(add({ ...product, quantity: 1 }));
  };

  return (
    <article className="flex flex-col justify-center gap-3 bg-white p-8 rounded-xl shadow-md text-center mb-6">
      <div className="flex justify-center">
        <Image src={thumbnail} alt={title} width={100} height={100} />
      </div>
      <div className="text-lg">{title}</div>
      <div className="text-2xl font-semibold mt-auto">
        {formatCurrency(price)}
      </div>
      <div className="flex justify-around items-center mt-4 mb-2 ">
        <button
          onClick={decreaseQuantity}
          className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
        >
          -
        </button>
        <span className="w-10 text-center rounded-md mx-3">{stock}</span>
        <button
          onClick={increaseQuantity}
          className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
        >
          +
        </button>
      </div>
      <button
        onClick={() => addToCart()}
        className="bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 rounded-md px-5 py-2"
      >
        Add to cart
      </button>
    </article>
  );
}
