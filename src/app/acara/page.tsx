import { getAcara } from "@/actions/acara";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const acara = await getAcara();

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {acara &&
          acara.map((item, i) => (
            <div className="card card-compact bg-base-100 shadow-xl" key={i}>
              <figure>
                <img src={"/thumbnail.jpg"} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.nama}</h2>
                <p className="line-clamp-2">{item.deskripsi}</p>
                <div className="card-actions justify-end">
                  <Link className="btn w-full" href={"/acara/" + item.id}>
                    Join
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
