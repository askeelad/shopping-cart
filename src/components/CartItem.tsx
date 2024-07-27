import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, deleteCartItem } from "../redux/features/cartSlice";
import { increaseQuantity } from "../redux/features/productSlice";
import { stateProps, itemProps } from "@/types/cart";

export default function CartItem({ item }: { item: itemProps }) {
  const { id, title, thumbnail, quantity, price } = item;
  const { numberOfItem, itemArray } = useSelector(
    (state: stateProps) => state.cart
  );
  const dispatch = useDispatch();

  const removeItemFromCart = () => {
    itemArray.map((p) => {
      if (p.id == item.id)
        dispatch(increaseQuantity({ id: p.id, qty: p.quantity }));
    });
    dispatch(deleteCartItem(item.id));
  };

  return (
    <div className="flex items-center gap-4 mb-3">
      <p className="text-4xl">
        <Image src={thumbnail} alt={title} height={50} width={70} />
      </p>
      <div>
        {title} <span className="text-xs">({quantity})</span>
      </div>
      <div className="ml-auto">{formatCurrency(price)}</div>
      <button
        onClick={() => removeItemFromCart()}
        className="hover:bg-emerald-50 transition-colors rounded-full duration-500 p-1"
      >
        <Image
          alt="delete icon"
          src="/assets/trash.svg"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
