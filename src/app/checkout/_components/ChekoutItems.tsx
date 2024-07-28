import React from "react";
import { itemProps } from "@/types/cart";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";

const ChekoutItems = ({ item }: { item: itemProps }) => {
  const { id, title, thumbnail, quantity, price } = item;
  return (
    <div className="flex items-center gap-4 mb-3">
      <p className="text-4xl">
        <Image src={thumbnail} alt={title} height={50} width={70} />
      </p>
      <div>
        {title} <span className="text-xs">({quantity})</span>
      </div>
      <div className="ml-auto">{formatCurrency(price)}</div>
      <div className="ml-auto">{formatCurrency(price * quantity)}</div>
    </div>
  );
};

export default ChekoutItems;
