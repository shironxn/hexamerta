"use client";

import { signIn } from "@/actions/auth";
import { useRouter } from "next/navigation";

const ButtonAcara = () => {
  const router = useRouter();
  return (
    <>
      <button className="btn btn-primary" onClick={async () => await signIn()}>
        Acara
      </button>
      <button
        className="btn btn-outline"
        onClick={() => router.push("/informasi")}
      >
        Informasi
      </button>
    </>
  );
};

export { ButtonAcara };
