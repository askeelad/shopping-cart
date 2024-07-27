"use client";
import Product from "@/components/Product";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../redux/features/productSlice";
import { stateProps, itemProps } from "@/types/cart";

export default function Home() {
  const dispatch = useDispatch();
  const { product } = useSelector((state: stateProps) => state.product);
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://dummyjson.com/products").then((res) => {
        return res.json();
      }),
  });
  console.log(data);

  if (data) {
    if (product.length == 0) dispatch(allProducts(data.products));
  }

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-5 justify-center mx-auto gap-4 place-center flex-wrap w-full py-20">
      {product &&
        product.map((product: itemProps) => (
          <Product products={product} key={product.id} />
        ))}
    </div>
  );
}
