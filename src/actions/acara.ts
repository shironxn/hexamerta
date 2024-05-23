"use server";

import { createClient } from "@/lib/supabase/server";
import { Pendaftaran } from "@/lib/types/peserta";
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

export const getPeserta = async () => {
  try {
    const supabase = createClient();
    const user = await getUser();
    const { data, error } = await supabase
      .from("peserta")
      .select()
      .eq("id", user.id)
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
