"use client";

import { joinAcara } from "@/actions/acara";

const FormAcara = () => {
  return (
    <form className="flex flex-col gap-4 mt-4" action={joinAcara}>
      <div className="form-control">
        <input
          type="text"
          name="nama_lengkap"
          placeholder="Nama lengkap"
          className="input input-bordered"
          required
        />
      </div>
      <div className="flex gap-2">
        <div className="form-control w-1/2">
          <input
            type="text"
            name="nomor_telepon"
            placeholder="Nomor telepon"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <select className="select select-bordered" name="kelas">
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
          name="informasi"
          placeholder="Darimana kamu tau acara ini"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Ikuti Acara
        </button>
      </div>
    </form>
  );
};

export { FormAcara };
