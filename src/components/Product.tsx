import { formatCurrency, formatNumber } from "@/lib/formatters";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/features/cartSlice";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../redux/features/productSlice";

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
  const [outOfStock, setOutOfStock] = useState(true);
  const dispatch = useDispatch();

  const decrease = () => {
    dispatch(remove(product.id));
    dispatch(decreaseQuantity(product.id));
  };

  const increase = () => {
    if (product.stock < 1) setOutOfStock(true);
    else {
      setOutOfStock(false);
      dispatch(add({ ...product, quantity: 1 }));
      dispatch(increaseQuantity(product.id));
    }
  };

  const addToCart = () => {
    if (product.stock < 1) setOutOfStock(true);
    else {
      setOutOfStock(false);
      dispatch(add({ ...product, quantity: 1 }));
      dispatch(increaseQuantity(product.id));
    }
  };

  return (
    <article className="flex flex-col justify-center gap-3 bg-white p-8 rounded-xl shadow-md text-center mb-6 relative z-1">
      <div className="rounded-full flex justify-center items-center bg-emerald-500 text-xs text-white absolute w-12 h-12 -top-3 -right-1 z-2">
        {formatNumber(discountPercentage)}% off
      </div>
      {outOfStock && (
        <div text-lg text-red>
          Product is out of stock. Try another product.
        </div>
      )}
      <div className="flex justify-center">
        <Image src={thumbnail} alt={title} width={100} height={100} />
      </div>
      <div className="text-lg">{title}</div>
      <div className="text-lg">{category}</div>
      <div className="text-2xl font-semibold">{formatCurrency(price)}</div>
      <div className="flex justify-around items-center mt-4 mb-2 ">
        <button
          onClick={decrease}
          className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
        >
          -
        </button>
        <span className="w-10 text-center rounded-md mx-3">{stock}</span>
        <button
          onClick={increase}
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
