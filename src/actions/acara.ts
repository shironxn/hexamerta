"use server";

import QRCode from "qrcode";
import { createClient } from "@/lib/supabase/server";
import { transporter } from "@/lib/transport";
import { Acara, TiketForm, Tiket, KomentarForm, Komentar } from "@/lib/types";
import { PostgrestError } from "@supabase/supabase-js";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { error } from "console";

export const getUser = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { error: error.message };
  }

  return { data: data };
};

export const getAcara = async () => {
  const supabase = createClient();

  const { data, error }: { data: Acara | null; error: PostgrestError | null } =
    await supabase.from("acara").select().single();

  if (!data) {
    return notFound();
  }

  if (error) {
    return { error: error.message };
  }

  return { data: data };
};

export const getAcaraById = async (id: string) => {
  const supabase = createClient();

  const { data, error }: { data: Acara | null; error: PostgrestError | null } =
    await supabase.from("acara").select().eq("id", id).single();

  if (!data) {
    return notFound();
  }

  if (error) {
    return { error: error.message };
  }

  return { data: data };
};

export const createTiket = async (
  formData: TiketForm,
  captchaToken: string
) => {
  if (!captchaToken) {
    throw new Error("missing captcha token");
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("tiket")
    .insert<TiketForm>(formData)
    .select()
    .single<Tiket>();

  if (error) {
    throw new Error(error.message);
  }

  redirect(`/acara/tiket/${data.id}`);
};

export const getTiket = async (
  acaraId: string,
  search: string,
  filter: "semua" | "terverifikasi" | "menunggu" | "ditolak" | "digunakan"
) => {
  const supabase = createClient();

  const query = search
    ? supabase
        .from("tiket")
        .select()
        .order("tanggal_dibuat", { ascending: false })
        .textSearch("nama_lengkap", search, {
          type: "websearch",
          config: "english",
        })
    : supabase
        .from("tiket")
        .select()
        .order("tanggal_dibuat", { ascending: false });

  const {
    data,
    error,
  }: { data: Tiket[] | null; error: PostgrestError | null } = await query.match(
    filter === "semua"
      ? { acara_id: acaraId }
      : { acara_id: acaraId, status: filter }
  );

  if (error) {
    return { error: error.message };
  }

  return { data: data };
};

export const getTiketById = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tiket")
    .select()
    .eq("id", id)
    .single<Tiket>();

  if (error) {
    return { error: error.message };
  }

  return { data: data };
};

export const countTiket = async (acara_id: string) => {
  const supabase = createClient();

  const { count: usedTickets, error: errorUsed } = await supabase
    .from("tiket")
    .select("count", { count: "exact" })
    .match({ acara_id: acara_id, status: "digunakan" });

  if (errorUsed) {
    return { error: errorUsed.message };
  }

  const { count: verifiedTickets, error: errorVerified } = await supabase
    .from("tiket")
    .select("count", { count: "exact" })
    .match({ acara_id: acara_id, status: "terverifikasi" });

  if (errorVerified) {
    return { error: errorVerified.message };
  }

  const totalCount = Number(usedTickets) + Number(verifiedTickets);
  return { data: totalCount };
};

export const setStatusTiket = async (
  id: string,
  status: "terverifikasi" | "menunggu" | "ditolak" | "digunakan"
) => {
  const supabase = createClient();

  const { data: tiketData, error: tiketError } = await getTiketById(id);
  if (tiketError) {
    return { error: tiketError };
  }

  if (!tiketData) throw new Error("Tiket tidak ditemukan");
  if (status === "digunakan" && tiketData.status === "digunakan")
    throw new Error("Tiket sudah digunakan sebelumnya");
  if (status === "digunakan" && tiketData.status !== "terverifikasi")
    throw new Error("Tiket harus dalam status terverifikasi untuk digunakan");

  const { data, error } = await supabase
    .from("tiket")
    .update({ status: status })
    .eq("id", id)
    .select()
    .single<Tiket>();
  if (error) {
    return { error: error.message };
  }

  if (status === "terverifikasi") {
    await sendEmail(data);
  }

  revalidatePath("/acara/dashboard");
  return { data: data };
};

const sendEmail = async (tiket: Tiket) => {
  const { data, error } = await getAcaraById(tiket.acara_id);

  if (error) {
    return { error: error };
  }

  const qrCodeDataUrl = await QRCode.toDataURL(tiket.id || "invalid ticket id");

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_NODEMAILER_USER,
    to: tiket.email,
    subject: `Selamat! Tiket Anda Telah Terverifikasi | ${data?.penyelenggara}`,
    text: `Hai, Tiket anda dari acara ${data?.nama} telah sukses terverifikasi. QR Code bisa Anda temukan di lampiran berikut.`,
    attachments: [
      {
        filename: "qrcode.png",
        path: qrCodeDataUrl,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    return { error: error.message };
  }
};

export const createKomentar = async (
  formData: KomentarForm,
  captchaToken: string
) => {
  if (!captchaToken) {
    throw new Error("missing captcha token");
  }

  const supabase = createClient();

  const { error } = await supabase
    .from("komentar")
    .insert<KomentarForm>(formData);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/acara/${formData.acara_id}`);
};

export const getKomentar = async (acaraId: string) => {
  const supabase = createClient();

  const {
    data,
    error,
  }: { data: Komentar[] | null; error: PostgrestError | null } = await supabase
    .from("komentar")
    .select()
    .order("tanggal_dibuat", { ascending: false })
    .eq("acara_id", acaraId);
  if (error) {
    return { error: error.message };
  }

  return { data: data };
};

export const deleteKomentar = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("komentar")
    .delete()
    .eq("id", id)
    .select()
    .single<Komentar>();

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/acara/${data.acara_id}`);
};
