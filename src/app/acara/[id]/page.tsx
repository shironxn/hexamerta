import { getAcaraById } from "@/actions/acara";
import { SectionAcara } from "@/components/acara/section-acara";
import { CalendarFold, Clock, MapPin, User } from "lucide-react";
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
  return (
    <div className="hero bg-base-300 md:mt-20 rounded" data-aos="fade-up">
      <div className="space-y-6 w-full pt-20 md:pt-5 mb-5 px-5 md:px-10">
        <div className="prose col-span-4">
          <h1>{acara.nama}</h1>
        </div>
        <div className="grid lg:grid-cols-4 w-full gap-y-8 gap-x-4">
          <div className="lg:col-span-3">
            <PosterCarousel url={acara.poster_url} />
          </div>
          <div className="rounded flex justify-center items-center space-y-4 flex-col w-full lg:grid-cols-1">
            <div className="prose">
              <h3 className="font-bold">Detail Acara</h3>
            </div>
            <div className="px-4 items-center grid-cols-2 grid gap-4 lg:gap-6 lg:grid-cols-1">
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
            </div>
            <CountdownAcara date={acara.tanggal_mulai} />
          </div>
          <div className="lg:col-span-3">
            <SectionAcara acara={acara} />
          </div>
        </div>
      </div>
    </div>
  );
}
