"use client";

import React, { useState } from "react";
import { FormAcara } from "./form-acara";
import Markdown from "react-markdown";
import { QRCode } from "./qr-acara";

export const SectionAcara = ({ acara }: { acara: any }) => {
  const [section, setSection] = useState("deskripsi");

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
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
      </div>
      <article className="prose">
        <Deskripsi acara={acara} isVisible={section === "deskripsi"} />
        <Tiket acara={acara} isVisible={section === "tiket"} />
        <Share isVisible={section === "share"} />
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
      className={`btn btn-outline rounded-badge ${active ? "btn-active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Deskripsi = ({
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

const Tiket = ({ acara, isVisible }: { acara: any; isVisible: boolean }) => {
  if (!isVisible) return null;
  return (
    <div data-aos="fade-up" className="flex justify-center">
      <FormAcara acara_id={acara.id} />
    </div>
  );
};

const Share = ({ isVisible }: { isVisible: boolean }) => {
  const [isCopy, setIsCopy] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 500);
  };

  if (!isVisible) return null;
  return (
    <div className="items-center m-auto justify-center flex" data-aos="fade-up">
      <div className="flex items-center flex-col w-1/2 text-center">
        <h3>Share Acara</h3>
        <QRCode text={window.location.href} />
        <p>
          Pindai kode QR untuk mendapatkan tautan acara, atau{" "}
          <span
            className={`link link-primary ${isCopy && "tooltip"}`}
            data-tip="Tautan disalin!"
            onClick={handleClick}
          >
            klik di sini
          </span>{" "}
          untuk menyalin tautan acara.
        </p>
      </div>
    </div>
  );
};
