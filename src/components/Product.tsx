import { formatCurrency, formatNumber } from "@/lib/formatters";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/features/cartSlice";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../redux/features/productSlice";
import { stateProps, itemProps } from "@/types/cart";

export default function Product({
  key,
  products,
}: {
  key: number;
  products: itemProps;
}) {
  const [outOfStock, setOutOfStock] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<itemProps>(products);
  const dispatch = useDispatch();
  const { product } = useSelector((state: stateProps) => state.product);
  const { numberOfItem, itemArray } = useSelector(
    (state: stateProps) => state.cart
  );
  let index = 0;

  product.map((p, k) => {
    console.log(p);
    console.log(products.id);
    if (products.id == p.id) index = k;
  });

  const decrease = () => {
    dispatch(remove(product[index].id));
    itemArray.map((item) => {
      if (item.id == product[index].id) {
        dispatch(increaseQuantity({ id: product[index].id, qty: 1 }));
        setOutOfStock(false);
      }
    });
  };

  const increase = () => {
    if (product[index].stock < 1) setOutOfStock(true);
    else {
      setOutOfStock(false);
      dispatch(add({ ...product[index], quantity: 1 }));
      dispatch(decreaseQuantity(product[index].id));
    }
  };

  const addToCart = () => {
    if (product[index].stock < 1) setOutOfStock(true);
    else {
      setOutOfStock(false);
      dispatch(add({ ...product[index], quantity: 1 }));
      dispatch(decreaseQuantity(product[index].id));
    }
  };

  return (
    <article className="flex flex-col justify-between gap-3 bg-white p-8 rounded-xl shadow-md text-center mb-6 relative z-1">
      <div className="rounded-full flex justify-center items-center bg-emerald-500 text-xs text-white absolute w-12 h-12 -top-3 -right-1 z-2">
        {formatNumber(product[index].discountPercentage)}% off
      </div>
      {outOfStock && (
        <div className="text-lg text-red-400">
          Product is out of stock. Try another product.
        </div>
      )}
      <div className="flex justify-center">
        <Image
          src={product[index].thumbnail}
          alt={product[index].title}
          width={100}
          height={100}
        />
      </div>
      <div className="text-lg">{product[index].title}</div>
      <div className="text-2xl font-semibold">
        {formatCurrency(product[index].price)}
      </div>
      <div className="flex justify-around items-center mt-4 mb-2 ">
        <button
          onClick={decrease}
          className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
        >
          -
        </button>
        <span className="w-10 text-center rounded-md mx-3">
          {product[index].stock}
        </span>
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
