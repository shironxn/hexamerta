import z from "zod";

export type Peserta = {
  nama_lengkap: string;
  nomor_telepon: string;
  kelas: string;
  informasi: string;
};

export const PesertaSchema = z.object({
  nama_lengkap: z
    .string()
    .min(4, "Nama lengkap harus memiliki setidaknya 4 karakter")
    .max(30, "Nama lengkap maksimal 30 karakter"),
  nomor_telepon: z
    .string()
    .regex(
      new RegExp(`^(\+62|62|0)8[1-9][0-9]{6,9}$`),
      "Nomor telepon tidak valid"
    ),
  kelas: z.string().min(1, "Kelas harus diisi"),
  informasi: z.string().min(1, "Informasi harus diisi"),
});
