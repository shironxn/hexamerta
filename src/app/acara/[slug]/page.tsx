import { FormAcara } from "@/components/acara/form-acara";
import Image from "next/image";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            Pementasan Drama Musikal Seni Budaya
          </h1>
          <Image
            src={"/thumbnail.jpg"}
            alt=""
            width={600}
            height={600}
            className="w-full"
          />
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="border-b border-black">
                  <th>ACARA</th>
                  <th className="border-x border-black">LOKASI</th>
                  <th>HARGA</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>Pentas Seni</td>
                  <td className="border-x border-black">Bunker X6</td>
                  <td>Rp. 69</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm">
          <div className="card-body">
            <article className="prose">
              <h2>Formulir Acara</h2>
            </article>
            <FormAcara />
          </div>
        </div>
      </div>
    </div>
  );
}
