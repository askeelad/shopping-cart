"use client";
import Product from "@/components/Product";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../redux/features/productSlice";
import { stateProps, itemProps } from "@/types/cart";
import { InputHTMLAttributes, useState } from "react";
import { Select, Field, Label } from "@headlessui/react";

export default function Home() {
  const [searchedPosts, setSeacrhedPosts] = useState("");
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

  const handleSearch = (e: InputHTMLAttributes<HTMLFormElement>) => {};

  return (
    <>
      <div className="flex justify-between">
        <form className="relative w-4/6 flex-center">
          <input
            type="text"
            placeholder="Search for a tag or username"
            value={searchedPosts}
            onChange={handleSearch}
            required
            className="block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0"
          />
        </form>
        <Field className="w-2/6">
          <div className="flex gap-0 w-full">
            <Label className="w-2/6 flex justify-end items-center">
              Sort By :
            </Label>
            <Select
              name="status"
              aria-label="Project status"
              className="w-4/6 z-20 rounded-md border border-gray-200 py-2.5 font-satoshi pl-1 pr-5 text-sm shadow-lg font-medium"
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="delayed">Delayed</option>
              <option value="canceled">Canceled</option>
            </Select>
          </div>
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-5 justify-center mx-auto gap-4 place-center flex-wrap w-full py-20">
        {product &&
          product.map((product: itemProps) => (
            <Product products={product} key={product.id} />
          ))}
      </div>
    </>
  );
}
