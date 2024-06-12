"use client";

import { CopyIcon } from "lucide-react";
import { useState } from "react";

export const Copy = ({ text, copy }: { text: string; copy: string }) => {
  const [isCopy, setIsCopy] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(copy);
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 1000);
  };
  return (
    <span
      className={`flex items-center gap-2 hover:text-accent ${
        isCopy && "tooltip"
      }`}
      data-tip="Berhasil disalin!"
      onClick={handleClick}
    >
      <CopyIcon />
      {text}
    </span>
  );
};
