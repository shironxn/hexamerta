"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col justify-center items-center prose">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button className="btn btn-outline" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
