"use client";

import { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SelectTable = ({ acara }: { acara: any }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("acara_id", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      className="select select-ghost w-full max-w-xs"
      onChange={selectHandler}
    >
      <option disabled>Pick the best JS framework</option>
      {acara &&
        acara.map((item: any, i: number) => (
          <option key={i} value={item.id}>
            {item.nama}
          </option>
        ))}
    </select>
  );
};
