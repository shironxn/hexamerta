import { countTiket, getAcaraById, getKomentar } from "@/actions/acara";
import { SectionAcara } from "@/components/acara/section-acara";
import { CalendarFold, Clock, MapPin, Ticket, User, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { PosterCarousel } from "@/components/acara/poster";
import type { Metadata } from "next";

const CountdownAcara = dynamic(
  () => import("@/components/acara/countdown-acara"),
  {
    ssr: false,
  }
);

type Props = {
  params: { id: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const acara = await getAcaraById(params.id);

  return {
    title: acara.nama,
    description: "HEXAMERTA EVENT IS PRESENT",
  };
};

export default async function Page({ params }: Props) {
  const acara = await getAcaraById(params.id);
  const tiket = await countTiket(acara.id);
  const komentar = await getKomentar(params.id);

  return (
    <div className="bg-base-300 pt-20 pb-10 w-full">
      <div className="container mx-auto md:px-4" data-aos="fade-up">
        <div className="text-center md:text-left mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">{acara.nama}</h1>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <PosterCarousel url={acara.poster_url} />
          </div>
          <div className="card card-compact card-bordered flex justify-center items-center space-y-4 flex-col w-full md:grid-cols-2 shadow py-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold">Detail Acara</h3>
            </div>
            <div className="items-center grid-cols-2 grid gap-4 md:gap-2 md:grid-cols-1">
              <div className="flex items-center gap-2">
                <User />
                <div>
                  <p className="text-xs">Penyelenggara</p>
                  <p className="font-bold text-sm">{acara.penyelenggara}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarFold />
                <div>
                  <p className="text-xs">Tanggal</p>
                  <p className="font-bold text-sm">
                    {new Date(acara.tanggal_mulai).toLocaleString("id", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock />
                <div>
                  <p className="text-xs">Waktu</p>
                  <p className="font-bold text-sm">
                    {new Date(acara.tanggal_mulai).toLocaleTimeString("id", {
                      hour: "numeric",
                      minute: "numeric",
                    })}{" "}
                    - Selesai
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin />
                <div>
                  <p className="text-xs">Lokasi</p>
                  <p className="font-bold text-sm">{acara.lokasi}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Ticket />
                <div>
                  <p className="text-xs">Harga</p>
                  <p className="font-bold text-sm">Rp. {acara.harga}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users />
                <div>
                  <p className="text-xs">Peserta</p>
                  <p className="font-bold text-sm">
                    {tiket} / {acara.kapasitas}
                  </p>
                </div>
              </div>
            </div>
            <CountdownAcara date={acara.tanggal_mulai} />
          </div>
          <div className="md:col-span-3 mt-4">
            <SectionAcara acara={acara} komentar={komentar} />
          </div>
        </div>
      </div>
    </div>
  );
}
