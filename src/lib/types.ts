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

export type Tiket = {
  id: string;
  acara_id: string;
  nama_lengkap: string;
  kelas: string;
  email: string;
  nomor_telepon: string;
  sumber_info: string;
  status: "terverifikasi" | "menunggu" | "ditolak" | "digunakan";
  tanggal_dibuat: string;
};

export type Komentar = {
  id: string;
  acara_id: string;
  nama: string;
  pesan: string;
  tanggal_dibuat: string;
};

export const LoginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password harus diisi"),
});

export const TiketFormSchema = z.object({
  acara_id: z.string().optional(),
  nama_lengkap: z
    .string()
    .min(4, "Nama lengkap harus memiliki setidaknya 4 karakter")
    .max(30, "Nama lengkap maksimal 30 karakter"),
  kelas: z
    .string()
    .regex(
      new RegExp("^(X[1-8]|XI[1-8])$"),
      "Kelas harus diisi dengan nilai yang valid ex: X6 XI6"
    ),
  email: z.string().email("Format email tidak valid"),
  nomor_telepon: z
    .string()
    .regex(new RegExp("^08[1-9][0-9]{6,9}$"), "Nomor telepon tidak valid"),
  sumber_info: z.string().min(1, "Form harus diisi"),
  status_verifikasi: z.string().optional(),
  tanggal_dibuat: z.string().optional(),
});

export const KomentarFormSchema = z.object({
  acara_id: z.string().optional(),
  nama: z
    .string()
    .min(1)
    .max(30, "Nama harus memiliki antara 1 hingga 30 karakter"),
  pesan: z
    .string()
    .min(1)
    .max(50, "Pesan harus memiliki antara 1 hingga 50 karakter"),
});

export type Login = z.infer<typeof LoginSchema>;
export type TiketForm = z.infer<typeof TiketFormSchema>;
export type KomentarForm = z.infer<typeof KomentarFormSchema>;
