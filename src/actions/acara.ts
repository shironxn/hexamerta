"use server";

import { createClient } from "@/lib/supabase/server";
import { Pendaftaran, Peserta } from "@/lib/types/peserta";
import { redirect } from "next/navigation";

export const getUser = async () => {
  try {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    if (user.error) {
      throw user.error;
    }
    return user.data.user;
  } catch (error) {
    throw error;
  }
};

export const getPendaftaran = async (acaraId: string) => {
  try {
    const supabase = createClient();
    const user = await getUser();
    const { data, error } = await supabase
      .from("pendaftaran")
      .select()
      .match({
        acara_id: acaraId,
        peserta_id: user.id,
      })
      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllPendaftaran = async (acaraId: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("pendaftaran")
      .select()
      .eq("acara_id", acaraId);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPesertaById = async (id: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("peserta")
      .select()
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAcara = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("acara").select();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAcaraById = async (id: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("acara")
      .select()
      .eq("id", id)
      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const joinAcara = async (formData: Pendaftaran) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("pendaftaran")
      .insert<Pendaftaran>(formData)
      .select()
      .single();
    if (error) {
      throw error;
    }
    redirect(`/acara/${data?.acara_id}/tiket`);
  } catch (error: any) {
    throw error;
  }
};

export const mendataPeserta = async (id: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("peserta")
      .update({ status_hadir: true })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const setStatusPendaftaran = async (id: string, status: string) => {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("pendaftaran")
      .update({ status_verifikasi: status })
      .eq("id", id);
    if (error) {
      throw error;
    }

    if (status === "verified") {
      const { error } = await supabase.from("peserta").insert({ id });
      if (error) {
        throw error;
      }
    }
  } catch (error) {
    throw error;
  }
};
