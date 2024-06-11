"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarFold, MapPin, Ticket } from "lucide-react";
import { Acara } from "@/lib/types";

export const CardAcara = ({ acara }: { acara: Acara }) => {
  const router = useRouter();

  return (
    <div
      className="card card-compact md:card-side bg-base-300 shadow hover:shadow-xl transition duration-100 ease-linear hover:cursor-pointer"
      onClick={() => router.push("/acara/" + acara.id)}
    >
      <figure>
        <Image
          src={acara.thumbnail_url}
          alt="poster"
          width={300}
          height={300}
          className="w-full max-md:rounded"
        />
      </figure>
      <div className="card-body">
        <Link
          className="card-title hover:link-primary text-lg"
          href={"/acara/" + acara.id}
        >
          {acara.nama}
        </Link>
        <div className="flex items-center gap-2">
          <CalendarFold />
          <p className="line-clamp-2">
            {new Date(acara.tanggal_mulai).toLocaleString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              timeZone: "GMT",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin />
          <p>{acara.lokasi}</p>
        </div>
        <div className="flex items-center gap-2">
          <Ticket />
          <p>Rp. {acara.harga}</p>
        </div>
        <p></p>

        <div className="card-actions justify-end">
          <button
            className="btn btn-primary btn-xs"
            onClick={() => router.push("/acara/" + acara.id)}
          >
            Join Acara
          </button>
        </div>
      </div>
    </div>
  );
};

export const SuccessCard = () => {
  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Cookies!</h2>
        <p>We are using cookies for no reason.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Accept</button>
          <button className="btn btn-ghost">Deny</button>
        </div>
      </div>
    </div>
  );
};
