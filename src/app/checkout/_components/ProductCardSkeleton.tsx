import Image from "next/image";

export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <article className="flex flex-col justify-between gap-3 bg-white p-8 rounded-xl shadow-md text-center mb-6 relative z-1 h-full w-full">
        <div className="rounded-full flex flex-col justify-center items-center bg-emerald-50 text-xs text-white absolute w-12 h-12 -top-3 -right-1 z-2">
          <div></div>
          <div></div>
        </div>
        <div className="flex justify-center h-3/6"></div>
        <div className="text-lg h-1/6"></div>
        <div className="text-2xl font-semibold"></div>
        <div className="flex justify-around items-center mt-4 mb-2 h-1/6">
          <button className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500">
            -
          </button>
          <span className="w-10 text-center rounded-md mx-3"></span>
          <button className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500">
            +
          </button>
        </div>
        <button className="bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 rounded-md px-5 py-2 h-1/6"></button>
      </article>
    </div>
  );
}
