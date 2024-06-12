"use server";

import QRCode from "qrcode";
import { createClient } from "@/lib/supabase/server";
import { transporter } from "@/lib/transport";
import { Acara, TiketForm, Tiket, KomentarForm, Komentar } from "@/lib/types";
import { PostgrestError } from "@supabase/supabase-js";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const getUser = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return data.user;
};

export const getAcara = async () => {
  const supabase = createClient();
  const { data, error }: { data: Acara | null; error: PostgrestError | null } =
    await supabase.from("acara").select().single();
  if (!data) {
    return notFound();
  }
  if (error) {
    throw error;
  }
  return data;
};

export const getAcaraById = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("acara")
    .select()
    .eq("id", id)
    .single<Acara>();
  if (!data) {
    return notFound();
  }
  if (error) {
    throw error;
  }
  return data;
};

export const countTiket = async (acara_id: string) => {
  const supabase = createClient();
  const { count, error } = await supabase
    .from("tiket")
    .select("count", { count: "exact" })
    .match({ acara_id: acara_id, status: "digunakan" });
  if (error) {
    throw error;
  }
  return count;
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
    throw error;
  }
  redirect(`/acara/tiket/${data.id}`);
};

export const getTiket = async (acaraId: string) => {
  const supabase = createClient();
  const {
    data,
    error,
  }: { data: Tiket[] | null; error: PostgrestError | null } = await supabase
    .from("tiket")
    .select()
    .eq("acara_id", acaraId);
  if (error) {
    throw error;
  }
  return data;
};

export const getTiketById = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tiket")
    .select()
    .eq("id", id)
    .single<Tiket>();
  if (error) {
    throw error;
  }
  return data;
};

export const setStatusTiket = async (
  id: string,
  status: "terverifikasi" | "menunggu" | "ditolak" | "digunakan"
) => {
  const supabase = createClient();

  try {
    const tiket = await getTiketById(id);
    if (!tiket) throw new Error("Tiket tidak valid");
    if (status === "digunakan" && tiket.status === "digunakan")
      throw new Error("Tiket sudah digunakan");
  } catch (error: any) {
    if (error.message === "Tiket sudah digunakan") {
      throw new Error("Tiket sudah digunakan");
    }
    throw new Error("Tiket tidak valid");
  }

  const { data, error } = await supabase
    .from("tiket")
    .update({ status: status })
    .eq("id", id)
    .select()
    .single<Tiket>();
  if (error) {
    throw error;
  }
  if (status === "terverifikasi") {
    const qrCodeDataUrl = await QRCode.toDataURL(
      data.id || "invalid ticket id"
    );
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_NODEMAILER_USER,
      to: data.email,
      subject: "Hello ✔",
      text: "HI JAWA",
      attachments: [
        {
          filename: `qrcode-${data.id}.png`,
          path: qrCodeDataUrl,
        },
      ],
    });
  }

  return data;
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
    throw error;
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
    .eq("acara_id", acaraId);
  if (error) {
    throw error;
  }
  return data;
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
    throw error;
  }
  revalidatePath(`/acara/${data.acara_id}`);
};
