import React from "react";
import { itemProps } from "@/types/cart";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";

const ChekoutItems = ({ item }: { item: itemProps }) => {
  const { id, title, thumbnail, quantity, price } = item;
  return (
    <div className="flex items-center justify-between gap-4 mb-3 w-full">
      <p className="text-4xl w-2/6">
        <Image src={thumbnail} alt={title} height={50} width={70} />
      </p>
      <div className="w-2/6">
        {title} <span className="text-xs">({quantity})</span>
      </div>
      <div className="ml-auto w-2/6">{formatCurrency(price * quantity)}</div>
    </div>
  );
};

export default ChekoutItems;
