import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

type callback = (...args: any[]) => Promise<any>;
const cache = <T extends callback>(
  cb: T,
  keyparts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
) => {
  return nextCache(reactCache(cb), keyparts, options);
};

export default cache;
