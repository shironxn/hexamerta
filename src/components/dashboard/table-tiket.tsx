"use client";

import { getTiket, setStatusTiket } from "@/actions/acara";
import { Tiket } from "@/lib/types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

type PropsTiket = "terverifikasi" | "menunggu" | "ditolak" | "digunakan";
type PropsFilter =
  | "semua"
  | "terverifikasi"
  | "menunggu"
  | "ditolak"
  | "digunakan";

export const TableTiket = ({ acara_id }: { acara_id: string }) => {
  const [tiket, setTiket] = useState<Tiket[] | null>(null);
  const [filter, setFilter] = useState<PropsFilter>("semua");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTiket(acara_id, search, filter)
      .then(setTiket)
      .catch(() => setTiket(null));
  }, [acara_id, filter, search]);
  return (
    <div className="space-y-8">
      <div className="flex gap-2">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="w-4" />
        </label>
        <select
          className="select select-bordered w-full md:max-w-xs"
          onChange={(e) => setFilter(e.target.value as PropsFilter)}
        >
          <option>semua</option>
          <option>menunggu</option>
          <option>terverifikasi</option>
          <option>ditolak</option>
          <option>digunakan</option>
        </select>
      </div>
      {tiket && (
        <div className="overflow-x-auto space-y-8">
          <table className="table table-xs md:table-md">
            {/* head */}
            <thead>
              <tr>
                <th>NO</th>
                <th>NAMA</th>
                <th>KELAS</th>
                <th>EMAIL</th>
                <th>TELEPON</th>
                <th>INFO</th>
                <th>STATUS</th>
                <th>TANGGAL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {tiket &&
                tiket.map((item: Tiket, i: number) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
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
                          item.status = e.target.value as PropsTiket;
                          setStatusTiket(item.id, item.status);
                        }}
                        value={item.status}
                      >
                        <option>menunggu</option>
                        <option>terverifikasi</option>
                        <option>ditolak</option>
                        <option>digunakan</option>
                      </select>
                    </td>
                    <td>
                      {new Date(item.tanggal_dibuat).toLocaleString("id", {
                        dateStyle: "medium",
                        timeStyle: "medium",
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
