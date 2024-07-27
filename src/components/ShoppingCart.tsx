import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";
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

export default function ShoppingCart() {
  const { numberOfItem, itemArray } = useSelector(
    (state: stateProps) => state.cart
  );
  const shouldDisplayCart = true;
  const cartCount = 0;
  return (
    <div
      className={`bg-white flex flex-col absolute right-3 md:right-9 top-14 w-80 py-4 px-4 shadow-[0_5px_15px_0_rgba(0,0,0,.15)] rounded-md transition-opacity duration-500 ${
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
