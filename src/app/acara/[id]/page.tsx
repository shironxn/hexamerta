import { countTiket, getAcaraById, getKomentar } from "@/actions/acara";
import { SectionAcara } from "@/components/acara/section-acara";
import { CalendarFold, Clock, MapPin, Ticket, User, Users } from "lucide-react";
import dynamic from "next/dynamic";
// import { PosterCarousel } from "@/components/acara/poster";
import type { Metadata } from "next";
import Image from "next/image";
import { GetTime } from "@/components/util/time";

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
  const { data, error } = await getAcaraById(params.id);
  if (error) throw new Error(error);

  return {
    title: data?.nama,
    description: "HEXAMERTA EVENT IS PRESENT",
  };
};

export default async function Page({ params }: Props) {
  const { data: acaraData, error: acaraError } = await getAcaraById(params.id);
  if (acaraError) throw new Error(acaraError);

  const { data: tiketData, error: tiketError } = await countTiket(
    String(acaraData?.id)
  );
  if (tiketError) throw new Error(tiketError);

  const { data: komentarData, error: komentarError } = await getKomentar(
    params.id
  );
  if (komentarError) throw new Error(komentarError);

  return (
    <div className="bg-base-300 pt-20 pb-10 w-full min-h-screen">
      {acaraData && (
        <div className="container mx-auto md:px-4" data-aos="fade-up">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">{acaraData.nama}</h1>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-3 w-full">
              <Image
                src={"/poster.jpg"}
                width={1000}
                height={1000}
                alt=""
                className="md:rounded-xl"
              />
              {/* <PosterCarousel url={acara.poster_url} /> */}
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
                    <p className="font-bold text-sm">
                      {acaraData.penyelenggara}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarFold />
                  <div>
                    <p className="text-xs">Tanggal</p>
                    <p className="font-bold text-sm">
                      {new Date(acaraData.tanggal_mulai).toLocaleString("id", {
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
                      <GetTime time={acaraData.tanggal_mulai} /> -{" "}
                      <GetTime time={acaraData.tanggal_selesai} />
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin />
                  <div>
                    <p className="text-xs">Lokasi</p>
                    <p className="font-bold text-sm">{acaraData.lokasi}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket />
                  <div>
                    <p className="text-xs">Harga</p>
                    <p className="font-bold text-sm">
                      {acaraData.harga !== 0
                        ? `Rp. ${acaraData.harga}`
                        : "Gratis"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users />
                  <div>
                    <p className="text-xs">Peserta</p>
                    <p className="font-bold text-sm">{tiketData}</p>
                  </div>
                </div>
              </div>
              <CountdownAcara date={acaraData.tanggal_mulai} />
            </div>
            <div className="md:col-span-3 mt-4">
              <SectionAcara acara={acaraData} komentar={komentarData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
