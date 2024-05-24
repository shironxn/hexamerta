"use client";

import { setStatusPendaftaran } from "@/actions/acara";

export const TablePendaftaran = ({ pendaftaran }: { pendaftaran: any }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>id</th>
            <th>tanggal_dibuat</th>
            <th>peserta_id</th>
            <th>acara_id</th>
            <th>nama_lengkap</th>
            <th>nomor_telepon</th>
            <th>kelas</th>
            <th>sumber_info</th>
            <th>status_verifikasi</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {pendaftaran &&
            pendaftaran.map((item: any, i: number) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.tanggal_dibuat}</td>
                <td>{item.peserta_id}</td>
                <td>{item.acara_id}</td>
                <td>{item.nama_lengkap}</td>
                <td>{item.nomor_telepon}</td>
                <td>{item.kelas}</td>
                <td>{item.sumber_info}</td>
                <th>
                  <select
                    className="select select-ghost max-w-xs"
                    onChange={(e) =>
                      setStatusPendaftaran(item.id, e.target.value)
                    }
                    defaultValue={item.status_verifikasi}
                  >
                    <option>pending</option>
                    <option>verified</option>
                    <option>rejected</option>
                  </select>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
