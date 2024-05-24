"use client";

import { getPendaftaran } from "@/actions/acara";
import { QRCode } from "@/components/acara/qr-acara";
import { Pendaftaran } from "@/lib/types/peserta";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [pendaftaran, setPendaftaran] = useState<Pendaftaran>();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetch = async () => {
      const pendaftaran: Pendaftaran = await getPendaftaran(params.id);
      setPendaftaran(pendaftaran);
    };
    fetch();
  }, []);
  return (
    <div className="hero">
      <div className="hero-content gap-40 flex-col lg:flex-row-reverse">
        <div className="space-y-3">
          <QRCode user_id={pendaftaran?.id} />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">
            Pementasan Drama Musikal Seni Budaya
          </h1>
          <div className="flex gap-3">
            <div>
              <p>Nama lengkap</p>
              <p className="p-3 bg-base-200">{pendaftaran?.nama_lengkap}</p>
            </div>
            <div>
              <p>Tanggal</p>
              <p className="p-3 bg-base-200">21 MEI 2024</p>
            </div>
          </div>
          <div>
            <p>Lokasi acara</p>
            <p className="p-3 bg-base-200">Bunker X6</p>
          </div>
        </div>
      </div>
    </div>
  );
}
