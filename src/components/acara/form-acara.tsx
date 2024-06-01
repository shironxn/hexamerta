"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { joinAcara } from "@/actions/acara";
import { Pendaftaran, PendaftaranSchema, Peserta } from "@/lib/types/peserta";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

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

  const [captchaToken, setCaptchaToken] = useState("");
  const [data, setData] = useState<Pendaftaran>();
  const captchaRef = useRef<any>();
  const router = useRouter();

  const onSubmit = (data: Pendaftaran) => {
    captchaRef.current.execute();
    setData(data);
  };

  useEffect(() => {
    if (captchaToken && data) {
      // joinAcara(data, captchaToken);
      captchaRef.current.resetCaptcha();
      setCaptchaToken("");
    }
  }, [captchaToken, data]);

  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <HCaptcha
        ref={captchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? ""}
        onVerify={setCaptchaToken}
        languageOverride="id"
      />
      <div className="grid lg:grid-cols-2 gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Nama Lengkap</span>
          </div>
          <input
            type="text"
            className="input input-bordered bordered w-full"
            {...register("nama_lengkap")}
            required
          />
          <ErrorMessage errors={errors} name="nama_lengkap" />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Kelas</span>
          </div>
          <select className="select select-bordered" {...register("kelas")}>
            <option>X6</option>
            <option>X7</option>
            <option>X8</option>
          </select>
          <ErrorMessage errors={errors} name="kelas" />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Email</span>
            <span className="label-text-alt">
              e-Tiket akan dikirim ke email ini
            </span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full"
            {...register("email")}
            required
          />
          <ErrorMessage errors={errors} name="email" />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Nomor Telepon</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("nomor_telepon")}
            required
          />
          <ErrorMessage errors={errors} name="nomor_telepon" />
        </label>
      </div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Darimana Kamu Tau Acara Ini</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full"
          {...register("sumber_info")}
          required
        />
        <ErrorMessage errors={errors} name="sumber_info" />
      </label>
      <div className="form-control mt-2">
        <button type="submit" className="btn btn-primary">
          Ikuti Acara
        </button>
        {/* {captchaToken ? (
          <button type="submit" className="btn btn-primary">
            Ikuti Acara
          </button>
        ) : (
          <button
            className="btn btn-disabled"
            tabIndex={-1}
            role="button"
            aria-disabled="true"
          >
            Ikuti Acara
          </button>
        )} */}
      </div>
    </form>
  );
};
