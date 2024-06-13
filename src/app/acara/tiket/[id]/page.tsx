import { getAcaraById, getTiketById } from "@/actions/acara";
import { DownloadTiket, QRCode } from "@/components/acara/qr-acara";
import { Copy } from "@/components/util/copy";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: tiketData, error: tiketError } = await getTiketById(params.id);
  if (tiketError) throw new Error(tiketError);
  const { data: acaraData, error: acaraError } = await getAcaraById(
    String(tiketData?.acara_id)
  );
  if (acaraError) throw new Error(acaraError);

  return (
    <div className="hero min-h-screen" id="tiket">
      <div className="hero-content flex-col lg:flex-row-reverse justify-center">
        <div className="md:w-1/3">
          <QRCode text={params.id} width={500} />
        </div>
        {tiketData && acaraData && (
          <div className="prose">
            <h1 className="font-bold">{acaraData.nama}</h1>
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
                    <th>{tiketData.nama_lengkap}</th>
                    <td>{tiketData.kelas}</td>
                    <td>{tiketData.nomor_telepon}</td>
                    <td>{tiketData.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Copy text={tiketData.id} copy={tiketData.id} />
            <div className="mt-8">
              <DownloadTiket nama={acaraData.nama} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
