import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, deleteCartItem } from "../redux/features/cartSlice";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../redux/features/productSlice";
import { stateProps, itemProps } from "@/types/cart";

export default function CartItem({ item }: { item: itemProps }) {
  const { id, title, thumbnail, quantity, price } = item;
  const { product } = useSelector((state: stateProps) => state.product);
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

  const decrease = () => {
    dispatch(remove(item.id));
    dispatch(increaseQuantity({ id: id, qty: 1 }));
  };

  const increase = () => {
    product.map((p, k) => {
      if (id == p.id && p.stock > 0) {
        dispatch(add({ ...item, quantity: 1 }));
        dispatch(decreaseQuantity(id));
      }
    });
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-3 w-full">
      <p className="text-4xl w-3/12">
        <Image src={thumbnail} alt={title} height={50} width={70} />
      </p>
      <div className="w-3/12">
        {title} <span className="text-xs">({quantity})</span>
      </div>
      <div className="flex justify-around items-center mt-4 mb-2 w-3/10 ">
        <button
          onClick={decrease}
          className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
        >
          -
        </button>
        <button
          onClick={increase}
          className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
        >
          +
        </button>
      </div>
      <div className="ml-auto w-2/12">{formatCurrency(price * quantity)}</div>
      <button
        onClick={() => removeItemFromCart()}
        className="hover:bg-red-400 transition-colors rounded-full duration-500 p-1 bg-red-100 w-1/10"
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
