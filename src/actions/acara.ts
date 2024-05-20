"use server";

import { createClient } from "@/lib/supabase/server";
import { Peserta } from "@/lib/types/peserta";
import { signIn } from "./auth";

export const joinAcara = async (formData: FormData) => {
  const supabase = createClient();
  const { nama_lengkap, nomor_telepon, kelas, informasi } = Object.fromEntries(
    formData
  ) as Peserta;

  const { error } = await supabase.from("peserta").insert<Peserta>({
    nama_lengkap: nama_lengkap,
    nomor_telepon: nomor_telepon,
    kelas: kelas,
    informasi: informasi,
  });

  if (error) {
    throw error;
  }
};
