"use client";
import Image from "next/image";
import Link from "next/link";
import ShoppingCart from "./ShoppingCart";
import { useSelector } from "react-redux";
import { useState } from "react";
import { stateProps, itemProps } from "@/types/cart";
export default function NavBar() {
  const { numberOfItem } = useSelector((state: stateProps) => state.cart);
  const [shouldDisplayCart, setShouldDisplayCart] = useState<Boolean>(false);
  return (
    <nav className="py-5 w-full flex justify-between">
      <Link href="/">
        <p className="text-4xl font-bold decoration-2 text-emerald-500">
          ShoppingCart
        </p>
      </Link>
      <button
        className="relative"
        onClick={() => {
          setShouldDisplayCart(!shouldDisplayCart);
        }}
      >
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
      {shouldDisplayCart && (
        <ShoppingCart shouldDisplayCart={shouldDisplayCart} />
      )}
    </nav>
  );
}
