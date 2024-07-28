"use client";
import { itemProps, stateProps } from "@/types/cart";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function CheckoutButton() {
  const { numberOfItem, itemArray } = useSelector(
    (state: stateProps) => state.cart
  );
  let totalPrice = 0;
  itemArray.map((item: itemProps) => {
    totalPrice += item.price;
  });
  const router = useRouter();
  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    localStorage.setItem("price", JSON.stringify(totalPrice));
    router.push("/checkout");
  }

  return (
    <article className="mt-3 flex flex-col">
      <button
        onClick={handleClick}
        className="bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 py-3 px-5 rounded-md w-100 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:text-white"
      >
        Proceed to checkout
      </button>
    </article>
  );
}
