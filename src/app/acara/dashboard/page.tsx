import { getAcara, getPendaftaran } from "@/actions/acara";
import { TablePendaftaran } from "@/components/dashboard/table-pendaftaran";

export default async function Page() {
  const acara = await getAcara();

  return (
    <div className="mt-20 h-screen px-2 md:px-0">
      {acara && (
        <div className="text-4xl space-y-8">
          <div className="space-y-4">
            <h1 className="font-bold">Acara</h1>
            <div className="overflow-x-auto md:h-1/2">
              <table className="table table-xs md:table-md">
                <thead>
                  <tr>
                    <th>NAMA</th>
                    <th>PENYELENGGARA</th>
                    <th>TANGGAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{acara.nama}</div>
                          <div className="text-sm opacity-50">{acara.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{acara.penyelenggara}</td>
                    <td>
                      {new Date(acara.tanggal_dibuat).toLocaleString("id", {
                        dateStyle: "medium",
                        timeStyle: "long",
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="font-bold">List Pendaftar</h1>
            <TablePendaftaran pendaftaran={await getPendaftaran(acara.id)} />
          </div>
        </div>
      )}
    </div>
  );
}
