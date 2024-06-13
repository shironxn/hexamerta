"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createTiket } from "@/actions/acara";
import { TiketForm, TiketFormSchema } from "@/lib/types";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState, useRef, useEffect, useTransition } from "react";

export const TiketPendaftaranForm = ({ acara_id }: { acara_id: string }) => {
  const captchaRef = useRef<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TiketForm>({
    resolver: zodResolver(TiketFormSchema),
    defaultValues: {
      acara_id: acara_id,
    },
  });
  const [captchaToken, setCaptchaToken] = useState("");
  const [formData, setFormData] = useState<TiketForm>();
  const [isLoading, startTransition] = useTransition();

  const onSubmit = (data: TiketForm) => {
    captchaRef.current.execute();
    setFormData(data);
  };

  useEffect(() => {
    if (captchaToken && formData) {
      startTransition(() => {
        createTiket(formData, captchaToken);
        captchaRef.current.resetCaptcha();
        setCaptchaToken("");
      });
    }
  }, [captchaToken, formData]);

  return (
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
            <div className="text-xs mt-2">
              <ErrorMessage errors={errors} name="nama_lengkap" />
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Kelas</span>
            </div>
            <input
              type="text"
              placeholder="contoh: X6"
              className="input input-bordered w-full"
              {...register("kelas")}
              required
            />
            <div className="text-xs mt-2">
              <ErrorMessage errors={errors} name="kelas" />
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
              <span className="label-text-alt">
                e-Tiket dikirim melalui email ini
              </span>
            </div>
            <input
              type="email"
              className="input input-bordered w-full"
              {...register("email")}
              required
            />
            <div className="text-xs mt-2">
              <ErrorMessage errors={errors} name="email" />
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Nomor Telepon</span>
              <span className="label-text-alt">gunakan nomor whatsapp</span>
            </div>
            <input
              type="text"
              placeholder="contoh: 08XX"
              className="input input-bordered w-full"
              {...register("nomor_telepon")}
              required
            />
            <div className="text-xs mt-2">
              <ErrorMessage errors={errors} name="nomor_telepon" />
            </div>
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
          <div className="text-xs mt-2">
            <ErrorMessage errors={errors} name="sumber_info" />
          </div>
        </label>
        <div className="form-control mt-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Ikuti Acara"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
