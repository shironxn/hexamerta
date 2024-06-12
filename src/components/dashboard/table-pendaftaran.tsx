"use client";

import { setStatusTiket } from "@/actions/acara";
import { Tiket } from "@/lib/types";

export const TablePendaftaran = ({ tiket }: { tiket: Tiket[] | null }) => {
  return (
    <div className="overflow-x-auto md:h-1/2 space-y-8">
      <table className="table table-xs md:table-md">
        {/* head */}
        <thead>
          <tr>
            <th>NAMA</th>
            <th>KELAS</th>
            <th>EMAIL</th>
            <th>TELEPON</th>
            <th>INFO</th>
            <th>STATUS</th>
            <th>TANGGAL</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {tiket &&
            tiket.map((item: Tiket, i: number) => (
              <tr key={i}>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{item.nama_lengkap}</div>
                      <div className="text-sm opacity-50">{item.id}</div>
                    </div>
                  </div>
                </td>
                <td>{item.kelas}</td>
                <td>{item.email}</td>
                <td>{item.nomor_telepon}</td>
                <td>{item.sumber_info}</td>
                <td>
                  <select
                    className="select select-ghost max-w-xs"
                    onChange={(e) => {
                      item.status = e.target.value as
                        | "terverifikasi"
                        | "menunggu"
                        | "ditolak"
                        | "digunakan";
                      setStatusTiket(item.id, item.status);
                    }}
                    defaultValue={item.status}
                  >
                    <option>menunggu</option>
                    <option>terverifikasi</option>
                    <option>ditolak</option>
                    <option>digunakan</option>
                  </select>
                </td>
                <td>
                  {new Date(item.tanggal_dibuat).toLocaleString("UTC", {
                    dateStyle: "medium",
                    timeStyle: "long",
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
