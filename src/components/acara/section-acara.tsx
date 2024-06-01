"use client";

import React, { useState } from "react";
import { FormAcara } from "./form-acara";

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
          active={section === "lokasi"}
          onClick={() => setSection("lokasi")}
        >
          Lokasi
        </ToggleButton>
      </div>
      <article className="prose">
        {section === "deskripsi" && Deskripsi(acara)}
        {section === "tiket" && Tiket(acara)}
        {section === "lokasi" && Lokasi()}
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

const Deskripsi = (acara: any) => {
  return (
    <>
      <h3>Deskripsi Acara</h3>
      <p>{acara.deskripsi}</p>
      <h3>Syarat dan Ketentuan</h3>
      <p>{acara.deskripsi}</p>
    </>
  );
};

const Tiket = (acara: any) => {
  return (
    <>
      <h3>Form Pendaftaran</h3>
      <FormAcara acara_id={acara.id} />
    </>
  );
};

const Lokasi = () => {
  return (
    <>
      <h3>Lokasi Acara</h3>
    </>
  );
};
