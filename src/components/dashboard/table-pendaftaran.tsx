"use client";

import { setStatusPendaftaran } from "@/actions/acara";
import { Pendaftaran } from "@/lib/types";

export const TablePendaftaran = ({
  pendaftaran,
}: {
  pendaftaran: Pendaftaran[];
}) => {
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
          {pendaftaran &&
            pendaftaran.map((item: Pendaftaran, i: number) => (
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
                        | "ditolak";
                      setStatusPendaftaran(item);
                    }}
                    defaultValue={item.status}
                  >
                    <option>menunggu</option>
                    <option>terverifikasi</option>
                    <option>ditolak</option>
                  </select>
                </td>
                <td>
                  {new Date(item.tanggal_dibuat).toLocaleString("id", {
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
