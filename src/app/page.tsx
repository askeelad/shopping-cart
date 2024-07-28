"use client";
import Product from "@/components/Product";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../redux/features/productSlice";
import { stateProps, itemProps } from "@/types/cart";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { Select, Field, Label } from "@headlessui/react";

export default function Home() {
  const [searchedPosts, setSeacrhedPosts] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [shouldReduxDataChange, setShouldReduxDataChange] = useState(false);
  const [searchSortChanged, setSearchSortChanged] = useState(false);
  const dispatch = useDispatch();
  const { product } = useSelector((state: stateProps) => state.product);

  const { isPending, error, data } = useQuery({
    queryKey: ["productsData", searchedPosts, sortBy],
    queryFn: async () => {
      if (searchedPosts != "" && sortBy !== "") {
        setSearchSortChanged(true);
        window.history.replaceState(
          { additionalInformation: "Updated the URL with JS" },
          "Shopping Cart",
          `http://localhost:3000?query=${searchedPosts}&&sortBy=${sortBy}&&order=asc`
        );
        const data = await fetch(
          `https://dummyjson.com/products/search?q=${searchedPosts}&&sortBy=${sortBy}&&order=asc`
        );
        return data.json();
      } else if (searchedPosts !== "") {
        setSearchSortChanged(true);
        window.history.replaceState(
          { additionalInformation: "Updated the URL with JS" },
          "Shopping Cart",
          `http://localhost:3000?query=${searchedPosts}`
        );
        const data = await fetch(
          `https://dummyjson.com/products/search?q=${searchedPosts}`
        );
        return data.json();
      } else if (sortBy !== "") {
        setSearchSortChanged(true);
        window.history.replaceState(
          { additionalInformation: "Updated the URL with JS" },
          "Shopping Cart",
          `http://localhost:3000?sortBy=${sortBy}&&order=asc`
        );
        const data = await fetch(
          `https://dummyjson.com/products?sortBy=${sortBy}&&order=asc`
        );
        return data.json();
      } else {
        window.history.replaceState(
          { additionalInformation: "Updated the URL with JS" },
          "Shopping Cart",
          `http://localhost:3000/`
        );
        const data = await fetch("https://dummyjson.com/products");
        return data.json();
      }
    },
  });
  // console.log(data);

  useEffect(() => {
    if (searchSortChanged) setShouldReduxDataChange(true);
  }, [searchedPosts, sortBy]);

  if (data) {
    console.log(shouldReduxDataChange);
    if (product.length == 0 || shouldReduxDataChange)
      dispatch(allProducts(data.products));
  }

  // if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="flex justify-between">
        <form className="relative w-4/6 flex-center">
          <input
            type="text"
            placeholder="Search for a product"
            value={searchedPosts}
            onChange={(e) => setSeacrhedPosts(e.target.value)}
            required
            className="block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0"
          />
        </form>
        <Field className="w-2/6">
          <div className="flex gap-0 w-full">
            <Label className="w-3/6 flex justify-end items-center">
              Sort By :
            </Label>
            <Select
              name="sort"
              aria-label="Sort By"
              className="w-3/6 z-20 rounded-md border border-gray-200 py-2.5 font-satoshi pl-1 pr-5 text-sm shadow-lg font-medium justify-center items-center text-start px-auto"
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
            >
              <option value="id">Id</option>
              <option value="title">Title</option>
              <option value="rating">Rating</option>
              <option value="price">Price</option>
              <option value="stock">Quantity</option>
            </Select>
          </div>
        </Field>
      </div>
      {isPending && <div>Loading</div>}
      <div className="grid sm:grid-cols-2 md:grid-cols-5 justify-center mx-auto gap-4 place-center flex-wrap w-full py-20">
        {product &&
          product.map((product: itemProps) => (
            <Product products={product} key={product.id} />
          ))}
      </div>
    </>
  );
}
