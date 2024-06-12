"use client";

import React, { useEffect, useRef, useState } from "react";
import { FormAcara } from "./form-acara";
import Markdown from "react-markdown";
import { QRCode } from "./qr-acara";
import { Acara, Komentar, KomentarForm, KomentarFormSchema } from "@/lib/types";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createKomentar, deleteKomentar, getUser } from "@/actions/acara";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { ErrorMessage } from "@hookform/error-message";

export const SectionAcara = ({
  acara,
  komentar,
}: {
  acara: Acara;
  komentar: Komentar[] | null;
}) => {
  const [section, setSection] = useState("deskripsi");

  return (
    <div className="space-y-5">
      <div className="flex gap-2 justify-center md:justify-start">
        <ToggleButton
          active={section === "deskripsi"}
          onClick={() => setSection("deskripsi")}
        >
          Deskripsi
        </ToggleButton>
        <ToggleButton
          active={section === "tiket"}
          onClick={() => setSection("tiket")}
        >
          Tiket
        </ToggleButton>
        <ToggleButton
          active={section === "share"}
          onClick={() => setSection("share")}
        >
          Share
        </ToggleButton>
        <ToggleButton
          active={section === "komentar"}
          onClick={() => setSection("komentar")}
        >
          Komentar
        </ToggleButton>
      </div>
      <article className="prose px-4">
        <DeskripsiSection acara={acara} isVisible={section === "deskripsi"} />
        <TiketSection acara={acara} isVisible={section === "tiket"} />
        <ShareSection isVisible={section === "share"} />
        <KomentarSection
          isVisible={section === "komentar"}
          acara_id={acara.id}
          komentar={komentar}
        />
      </article>
    </div>
  );
};

const ToggleButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={`btn btn-outline rounded-badge btn-sm md:btn-md ${
        active ? "btn-active" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const DeskripsiSection = ({
  acara,
  isVisible,
}: {
  acara: any;
  isVisible: boolean;
}) => {
  if (!isVisible) return null;

  return (
    <div data-aos="fade-up">
      <h3>Tentang Acara</h3>
      <Markdown>{acara.deskripsi}</Markdown>
    </div>
  );
};

const TiketSection = ({
  acara,
  isVisible,
}: {
  acara: any;
  isVisible: boolean;
}) => {
  if (!isVisible) return null;
  return (
    <div data-aos="fade-up" className="flex justify-center">
      <FormAcara acara_id={acara.id} />
    </div>
  );
};

const ShareSection = ({ isVisible }: { isVisible: boolean }) => {
  const [isCopy, setIsCopy] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 1000);
  };

  if (!isVisible) return null;
  return (
    <div
      className="flex flex-col-reverse md:flex-row items-center justify-center w-full"
      data-aos="fade-up"
    >
      <div>
        <QRCode text={window.location.href} width={300} />
      </div>
      <div className="text-center md:text-left md:w-1/2 md:order-2">
        <h2>Bagikan Acara Ini ke Orang-Orang Terdekatmu!</h2>
        <p>
          Pindai kode QR untuk mendapatkan tautan acara, atau{" "}
          <span
            className={`link link-primary ${isCopy && "tooltip"}`}
            data-tip="Tautan berhasil disalin!"
            onClick={handleClick}
          >
            klik di sini
          </span>{" "}
          untuk menyalin tautan acara secara instan.
        </p>
      </div>
    </div>
  );
};

const KomentarSection = ({
  isVisible,
  acara_id,
  komentar,
}: {
  isVisible: boolean;
  acara_id: string;
  komentar: Komentar[] | null;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KomentarForm>({
    resolver: zodResolver(KomentarFormSchema),
  });

  const captchaRef = useRef<any>();
  const [formData, setFormData] = useState<KomentarForm>();
  const [captchaToken, setCaptchaToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>();

  const onSubmit = async (data: KomentarForm) => {
    captchaRef.current.execute();
    setFormData(data);
  };

  useEffect(() => {
    getUser()
      .then((data) => setUser(data))
      .catch(() => null);
  }, []);

  useEffect(() => {
    if (captchaToken && formData) {
      try {
        formData.acara_id = acara_id;
        createKomentar(formData, captchaToken);
        captchaRef.current.resetCaptcha();
        setCaptchaToken("");
      } catch (error: any) {
        setError(error.message);
      }
    }
  }, [captchaToken, formData, acara_id]);

  if (!isVisible) return null;
  return (
    <div data-aos="fade-up">
      <form onSubmit={handleSubmit(onSubmit)}>
        <HCaptcha
          ref={captchaRef}
          size="invisible"
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? ""}
          onVerify={setCaptchaToken}
          languageOverride="id"
        />
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nama</span>
          </label>
          <input
            {...register("nama")}
            type="text"
            className="input input-bordered w-full"
            required
          />
          <ErrorMessage errors={errors} name="nama" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pesan</span>
          </label>
          <input
            {...register("pesan")}
            type="text"
            className="input input-bordered w-full"
            required
          />
          <ErrorMessage errors={errors} name="pesan" />
        </div>
        <div className="form-control mt-4">
          <button className="btn btn-primary" type="submit">
            Kirim
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

      <div className="grid mt-4 gap-2">
        {komentar &&
          komentar.map((item: Komentar, i) => (
            <div
              className="card card-compact w-full card-bordered shadow"
              key={i}
            >
              <div className="card-body">
                <div className="flex gap-4">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
                      <span className="text-3xl">
                        <User />
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>{item.nama}</div>
                    <div>{item.pesan}</div>
                  </div>
                </div>
                {user && (
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-outline btn-xs"
                      onClick={() => deleteKomentar(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
