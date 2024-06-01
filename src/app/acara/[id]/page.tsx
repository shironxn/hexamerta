import { getAcaraById } from "@/actions/acara";
import { SectionAcara } from "@/components/acara/section-acara";
import { CalendarFold, Clock, MapPin, User } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  const acara = await getAcaraById(params.id);
  return (
    <div className="hero py-20">
      <div className="space-y-6 w-full">
        <div className="prose col-span-4">
          <h1>{acara.nama}</h1>
        </div>
        <div className="grid lg:grid-cols-4 w-full gap-y-8 gap-x-4">
          <div className="lg:col-span-3">
            <img src={"/thumbnail.jpg"} alt="" className="rounded w-full" />
          </div>
          <div className="bg-base-200 rounded flex justify-center items-center space-y-4 flex-col w-full py-8 lg:grid-cols-1">
            <div className="prose">
              <h2 className="font-bold">Detail Acara</h2>
            </div>
            <div className="px-4 items-center grid-cols-2 grid gap-4 lg:grid-cols-1">
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
                    {new Date(acara.tanggal_mulai).toLocaleTimeString("en-GB", {
                      hour: "numeric",
                      minute: "numeric",
                      timeZone: "GMT",
                    })}{" "}
                    -{" "}
                    {new Date(acara.tanggal_selesai).toLocaleTimeString(
                      "en-GB",
                      {
                        hour: "numeric",
                        minute: "numeric",
                        timeZone: "GMT",
                      }
                    )}
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
          </div>
          <div className="lg:col-span-3">
            <SectionAcara acara={acara} />
          </div>
        </div>
      </div>
    </div>
  );
}
