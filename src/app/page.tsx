"use client";
import Product from "@/components/Product";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://dummyjson.com/products").then((res) => res.json()),
  });
  console.log(data);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-5 justify-center mx-auto gap-4 place-center flex-wrap w-full py-20">
      {data.products.map((product: any) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
}
