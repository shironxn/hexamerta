import { getAcaraById, getKomentar } from "@/actions/acara";
import { SectionAcara } from "@/components/acara/section-acara";
import { CalendarFold, Clock, MapPin, Ticket, User, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { PosterCarousel } from "@/components/acara/poster";

const CountdownAcara = dynamic(
  () => import("@/components/acara/countdown-acara"),
  {
    ssr: false,
  }
);

export default async function Page({ params }: { params: { id: string } }) {
  const acara = await getAcaraById(params.id);
  const komentar = await getKomentar(params.id);

  return (
    <div className="w-full bg-base-300 py-10 px-4 md:px-10 lg:px-20">
      <div
        className="grid md:grid-cols-4 w-full gap-y-8 gap-x-4"
        data-aos="fade-up"
      >
        <div className="prose md:col-span-4">
          <h1>{acara.nama}</h1>
        </div>
        <div className="lg:col-span-3">
          <PosterCarousel url={acara.poster_url} />
        </div>
        <div className="card card-compact card-bordered flex justify-center items-center space-y-4 flex-col w-full lg:grid-cols-1 shadow py-4">
          <div className="prose">
            <h3>Detail Acara</h3>
          </div>
          <div className="items-center grid-cols-2 grid gap-4 md:gap-2 md:grid-cols-1">
            <div className="flex gap-2 text-xs h-full">
              <User />
              <div>
                <p>Penyelenggara</p>
                <p className="font-bold">{acara.penyelenggara}</p>
              </div>
            </div>
            <div className="flex gap-2 text-xs h-full">
              <CalendarFold />
              <div>
                <p>Tanggal</p>
                <p className="font-bold">
                  {new Date(acara.tanggal_mulai).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    timeZone: "GMT",
                  })}
                </p>
              </div>
            </div>
            <div className="flex gap-2 text-xs h-full">
              <Clock />
              <div>
                <p>Waktu</p>
                <p className="font-bold">
                  {new Date(acara.tanggal_mulai).toLocaleTimeString("id", {
                    hour: "numeric",
                    minute: "numeric",
                  })}{" "}
                  - Selesai
                </p>
              </div>
            </div>
            <div className="flex gap-2 text-xs h-full">
              <MapPin />
              <div>
                <p>Lokasi</p>
                <p className="font-bold">{acara.lokasi}</p>
              </div>
            </div>
            <div className="flex gap-2 text-xs h-full">
              <Ticket />
              <div>
                <p>Harga</p>
                <p className="font-bold">Rp. {acara.harga}</p>
              </div>
            </div>
            <div className="flex gap-2 text-xs h-full">
              <Users />
              <div>
                <p>Peserta</p>
                <p className="font-bold">/ {acara.kapasitas}</p>
              </div>
            </div>
          </div>
          <CountdownAcara date={acara.tanggal_mulai} />
        </div>
        <div className="lg:col-span-3">
          <SectionAcara acara={acara} komentar={komentar} />
        </div>
      </div>
    </div>
  );
}
