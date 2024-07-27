"use client";
import Image from "next/image";
import Link from "next/link";
import ShoppingCart from "./ShoppingCart";
import { useSelector } from "react-redux";

interface cartItemPayload {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface cartState {
  numberOfItem: number;
  itemArray: cartItemPayload[];
}

interface stateProps {
  product: {}[];
  cart: cartState;
}

export default function NavBar() {
  const { numberOfItem } = useSelector((state: stateProps) => state.cart);
  return (
    <nav className="py-5 w-full flex justify-between">
      <Link href="/">
        <p className="text-4xl font-bold underline underline-offset-4 decoration-wavy decoration-2 decoration-emerald-500">
          ShoppingCart
        </p>
      </Link>
      <button className="relative" onClick={() => {}}>
        <Image
          src="/assets/cart.svg"
          width={40}
          height={40}
          alt="shopping cart icon"
        />
        <div className="rounded-full flex justify-center items-center bg-emerald-500 text-xs text-white absolute w-6 h-5 bottom-6 -right-1">
          {numberOfItem}
        </div>
      </button>
      <ShoppingCart />
    </nav>
  );
}
