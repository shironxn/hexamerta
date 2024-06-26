"use client";

import { countTiket, getTiket, setStatusTiket } from "@/actions/acara";
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
  const [tiket, setTiket] = useState<Tiket[] | null | undefined>(null);
  const [filter, setFilter] = useState<PropsFilter>("semua");
  const [search, setSearch] = useState("");
  const [count, setCount] = useState<
    | {
        menunggu: number | null;
        terverifikasi: number | null;
        ditolak: number | null;
        digunakan: number | null;
      }
    | null
    | undefined
  >(null);

  useEffect(() => {
    getTiket(acara_id, search, filter).then((result) => {
      if (result.error) throw new Error(result.error);
      setTiket(result.data);
    });
    countTiket(acara_id).then((result) => {
      if (result.error) throw new Error(result.error);
      setCount(result.data);
    });
  }, [acara_id, filter, search]);

  return (
    <div className="space-y-8 w-full container">
      <div className="flex gap-2">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onKeyDown={(e) =>
              e.key === "Enter" && setSearch(e.currentTarget.value)
            }
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
        <div className="overflow-x-auto space-y-8 max-h-[400px]">
          <table className="table table-xs">
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
                          setStatusTiket(item.id, item.status).then(
                            (result) => {
                              if (result.error) throw new Error(result.error);
                            }
                          );
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
      {count && (
        <div className="overflow-x-auto">
          <table className="table table-xs text-center font-bold">
            {/* head */}
            <thead>
              <tr className="border-none">
                <th>MENUNGGU</th>
                <th>TERVERIFIKASI</th>
                <th>DITOLAK</th>
                <th>DIGUNAKAN</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="border-none">
                <td>{count.menunggu}</td>
                <td>{count.terverifikasi}</td>
                <td>{count.ditolak}</td>
                <td>{count.digunakan}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
