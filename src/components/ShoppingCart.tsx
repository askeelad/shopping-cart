import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";
import { useSelector } from "react-redux";
import { stateProps, itemProps } from "@/types/cart";

export default function ShoppingCart({
  shouldDisplayCart,
}: {
  shouldDisplayCart: Boolean;
}) {
  const { numberOfItem, itemArray } = useSelector(
    (state: stateProps) => state.cart
  );
  return (
    <div
      className={`bg-white z-30 flex flex-col absolute right-3 md:right-9 top-14 w-100 py-4 px-4 shadow-[0_5px_15px_0_rgba(0,0,0,.15)] rounded-md transition-opacity duration-500 ${
        shouldDisplayCart ? "opacity-100" : "opacity-0"
      }`}
    >
      {numberOfItem && numberOfItem > 0 ? (
        <>
          {Object.values(itemArray ?? {}).map((entry) => (
            <CartItem key={entry.id} item={entry} />
          ))}
          <CheckoutButton />
        </>
      ) : (
        <div className="p-5">You have no items in your cart</div>
      )}
    </div>
  );
}
