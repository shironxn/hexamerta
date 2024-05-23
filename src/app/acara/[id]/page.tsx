import { getAcara, getAcaraById } from "@/actions/acara";
import { signOut } from "@/actions/auth";
import { FormAcara } from "@/components/acara/form-acara";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const acara = await getAcaraById(params.id);
  return (
    <div>
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse gap-20">
          <div className="text-center lg:text-left space-y-6">
            <form action={signOut}>
              <button className="btn" type="submit">
                logout
              </button>
            </form>
            <h1 className="text-5xl font-bold">{acara.nama}</h1>
            <Image
              src={"/thumbnail.jpg"}
              alt=""
              width={600}
              height={600}
              className="w-full"
            />
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="border-b">
                    <th>PENYELENGGARA</th>
                    <th className="border-x">LOKASI</th>
                    <th className="border-x">HARGA</th>
                    <th>WAKTU</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-none">
                    <td>{acara.penyelenggara}</td>
                    <td className="border-x">{acara.lokasi}</td>
                    <td className="border-x">Rp. {acara.harga}</td>
                    <td>
                      {new Date(acara.tanggal_mulai).toLocaleString("en-GB", {
                        timeZone: "GMT",
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>{acara.deskripsi}</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm">
            <div className="card-body">
              <article className="prose">
                <h2>Formulir Acara</h2>
              </article>
              <FormAcara acara_id={acara.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
