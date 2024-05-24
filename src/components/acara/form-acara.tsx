"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { joinAcara } from "@/actions/acara";
import { Pendaftaran, PendaftaranSchema } from "@/lib/types/peserta";
import { SubmitHandler, useForm } from "react-hook-form";

export const FormAcara = ({ acara_id }: { acara_id: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pendaftaran>({
    resolver: zodResolver(PendaftaranSchema),
    defaultValues: {
      acara_id: acara_id,
    },
  });

  const onSubmit = async (data: Pendaftaran) => {
    await joinAcara(data);
  };

  return (
    <>
      <article className="prose">
        <h2 className="text-center">Formulir Acara</h2>
      </article>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control">
          <input
            type="text"
            placeholder="Nama lengkap"
            className="input input-bordered"
            {...register("nama_lengkap")}
            required
          />
          {errors.nama_lengkap?.message && (
            <p>{errors.nama_lengkap?.message}</p>
          )}
        </div>
        <div className="flex gap-2">
          <div className="form-control w-1/2">
            <input
              type="text"
              placeholder="Nomor telepon"
              className="input input-bordered"
              {...register("nomor_telepon")}
              required
            />
            {errors.nomor_telepon?.message && (
              <p>{errors.nomor_telepon?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <select
              className="select select-bordered"
              defaultValue={"Kelas"}
              {...register("kelas")}
            >
              <option disabled>Kelas</option>
              <option>X6</option>
              <option>X7</option>
              <option>X8</option>
            </select>
            {errors.kelas?.message && <p>{errors.kelas?.message}</p>}
          </div>
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Darimana kamu tau acara ini"
            className="input input-bordered"
            {...register("sumber_info")}
            required
          />
          {errors.sumber_info?.message && <p>{errors.sumber_info?.message}</p>}
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Ikuti Acara
          </button>
        </div>
      </form>
    </>
  );
};
