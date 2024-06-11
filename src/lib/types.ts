import z from "zod";

export type Acara = {
  id: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  penyelenggara: string;
  lokasi: string;
  harga: number;
  kapasitas: number;
  thumbnail_url: string;
  poster_url: string[];
  tanggal_mulai: string;
  tanggal_selesai: string;
  tanggal_dibuat: string;
};

export type Pendaftaran = {
  id: string;
  acara_id: string;
  nama_lengkap: string;
  kelas: string;
  email: string;
  nomor_telepon: string;
  sumber_info: string;
  status: "terverifikasi" | "menunggu" | "ditolak";
  tanggal_dibuat: string;
};

export type Tiket = {
  id?: string;
  acara_id: string;
  pendaftaran_id: string;
  status: "aktif" | "kadaluarsa" | "dibatalkan" | "digunakan";
  tanggal_kadaluarsa?: string;
  tanggal_dibuat?: string;
};

export const PendaftaranFormSchema = z.object({
  acara_id: z.string().optional(),
  nama_lengkap: z
    .string()
    .min(4, "Nama lengkap harus memiliki setidaknya 4 karakter")
    .max(30, "Nama lengkap maksimal 30 karakter"),
  kelas: z.string().min(1, "Kelas harus diisi"),
  email: z.string().email(),
  nomor_telepon: z
    .string()
    .regex(new RegExp("^08[1-9][0-9]{6,9}$"), "Nomor telepon tidak valid"),
  sumber_info: z.string().min(1, "Informasi harus diisi"),
  status_verifikasi: z.string().optional(),
  tanggal_dibuat: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type PendaftaranForm = z.infer<typeof PendaftaranFormSchema>;
export type Login = z.infer<typeof LoginSchema>;
