"use client";
import { useState } from "react";

export default function CheckoutButton() {
  const [status, setStatus] = useState("idle");
  const cartCount = 0;

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  return (
    <article className="mt-3 flex flex-col">
      <div className="text-red-700 text-xs mb-3 h-5 text-center">
        {cartCount! > 0
          ? "You must have at least 1 product in your basket"
          : ""}
      </div>
      <button
        onClick={handleClick}
        className="bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 py-3 px-5 rounded-md w-100 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:text-white"
        disabled={cartCount! > 0}
      >
        {status !== "loading" ? "Proceed to checkout" : "Loading..."}
      </button>
    </article>
  );
}
