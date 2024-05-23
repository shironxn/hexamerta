import z from "zod";

export type Peserta = {
  id: string;
  status_hadir: string;
  tanggal_dibuat: string;
};

export const PendaftaranSchema = z.object({
  id: z.string().uuid().optional(),
  acara_id: z.string().uuid().optional(),
  peserta_id: z.string().uuid().optional(),
  nama_lengkap: z
    .string()
    .min(4, "Nama lengkap harus memiliki setidaknya 4 karakter")
    .max(30, "Nama lengkap maksimal 30 karakter"),
  nomor_telepon: z
    .string()
    .regex(new RegExp("^08[1-9][0-9]{6,9}$"), "Nomor telepon tidak valid"),
  kelas: z.string().min(1, "Kelas harus diisi"),
  sumber_info: z.string().min(1, "Informasi harus diisi"),
  status_verifikasi: z.string().optional(),
  tanggal_dibuat: z.string().optional(),
});

export type Pendaftaran = z.infer<typeof PendaftaranSchema>;
