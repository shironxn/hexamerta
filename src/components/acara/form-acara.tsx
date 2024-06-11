"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { joinAcara } from "@/actions/acara";
import { Pendaftaran, PendaftaranFormSchema } from "@/lib/types";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@material-tailwind/react";

export const FormAcara = ({ acara_id }: { acara_id: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pendaftaran>({
    resolver: zodResolver(PendaftaranFormSchema),
    defaultValues: {
      acara_id: acara_id,
    },
  });

  const captchaRef = useRef<any>();
  const router = useRouter();

  const [captchaToken, setCaptchaToken] = useState("");
  const [formData, setFormData] = useState<Pendaftaran>();
  const [data, setData] = useState<Pendaftaran | null>(null);
  const [error, setError] = useState("");

  const onSubmit = (data: Pendaftaran) => {
    captchaRef.current.execute();
    setFormData(data);
  };

  useEffect(() => {
    console.log(data);
  }, []);

  useEffect(() => {
    if (captchaToken && formData) {
      joinAcara(formData, captchaToken).then((result) => {
        if (result.error) {
          console.log(result.error);
          return setError(result.error.message);
        }
        captchaRef.current.resetCaptcha();
        setCaptchaToken("");
        setData(result.data);
      });
    }
  }, [captchaToken, formData]);

  return (
    <>
      {!data ? (
        <div className="w-full">
          <h3>Form Pendaftaran</h3>
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
                  className="input input-bordered w-full"
                  {...register("nama_lengkap")}
                  required
                />
                <ErrorMessage errors={errors} name="nama_lengkap" />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Kelas</span>
                </div>
                <select
                  className="select select-bordered"
                  {...register("kelas")}
                >
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
            </div>
            {error && (
              <div role="alert" className="alert alert-error mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="card card-compact w-96 ">
          <div className="card-body">
            <h2 className="card-title font-bold">
              Terimakasih Sudah Mendaftar
            </h2>
            <div className="grid grid-cols-2">
              <p>{data.nama_lengkap}</p>
              <p>{data.kelas}</p>
              <p>{data.email}</p>
              <p>{data.nomor_telepon}</p>
            </div>
            <small>tiket kamu akan segera dikirim lewat email</small>
            <div className="card-actions justify-end">
              <button className="btn btn-outline">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
