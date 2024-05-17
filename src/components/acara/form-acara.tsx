"use client";

import { useRouter } from "next/navigation";

const FormAcara = () => {
  const router = useRouter();
  return (
    <form className="flex flex-col gap-4 mt-4">
      <div className="form-control">
        <input
          type="text"
          placeholder="Nama lengkap"
          className="input input-bordered"
          required
        />
      </div>
      <div className="flex gap-2">
        <div className="form-control w-1/2">
          <input
            type="number"
            placeholder="Nomor telepon"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <select className="select select-bordered">
            <option disabled selected>
              Kelas
            </option>
            <option>X6</option>
            <option>X7</option>
            <option>X8</option>
          </select>
        </div>
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Darimana kamu tau acara ini"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control mt-6">
        <button
          className="btn btn-primary"
          onClick={() => router.push("/tiket/gw")}
        >
          Ikuti Acara
        </button>
      </div>
    </form>
  );
};

export { FormAcara };
