"use client";

import { useRouter } from "next/navigation";

const ButtonAcara = () => {
  const router = useRouter();
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() =>
          router.push("/acara/pementasan-drama-musikal-seni-budaya")
        }
      >
        Join Acara
      </button>
      <button className="btn btn-outline">Informasi</button>
    </>
  );
};

export { ButtonAcara };
