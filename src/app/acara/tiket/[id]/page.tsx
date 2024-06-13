import { getAcaraById, getTiketById } from "@/actions/acara";
import { DownloadTiket, QRCode } from "@/components/acara/qr-acara";
import { Copy } from "@/components/util/copy";

export default async function Page({ params }: { params: { id: string } }) {
  const tiket = await getTiketById(params.id);
  const acara = await getAcaraById(tiket.acara_id);
  return (
    <div className="hero min-h-screen" id="tiket">
      <div className="hero-content flex-col lg:flex-row-reverse justify-center">
        <div className="md:w-1/3">
          <QRCode text={params.id} width={500} />
        </div>
        <div className="prose">
          <h1 className="font-bold">{acara.nama}</h1>
          <div className="overflow-x-auto">
            <table className="table rounded-none">
              <thead>
                <tr>
                  <th>NAMA</th>
                  <th>KELAS</th>
                  <th>TELEPON</th>
                  <th>EMAIL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{tiket.nama_lengkap}</th>
                  <td>{tiket.kelas}</td>
                  <td>{tiket.nomor_telepon}</td>
                  <td>{tiket.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Copy text={tiket.id} copy={tiket.id} />
          <div className="mt-8">
            <DownloadTiket nama={acara.nama} />
          </div>
        </div>
      </div>
    </div>
  );
}
