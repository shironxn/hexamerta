"use server";

import { createClient } from "@/lib/supabase/server";
import { transporter } from "@/lib/transport";
import { Acara, Pendaftaran, PendaftaranForm, Tiket } from "@/lib/types";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

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

// export const getPendaftaran = async (acaraId: string) => {
//   try {
//     const supabase = createClient();
//     const user = await getUser();
//     const { data, error } = await supabase
//       .from("pendaftaran")
//       .select()
//       .match({
//         acara_id: acaraId,
//         peserta_id: user.id,
//       })
//       .single();
//     if (error) {
//       throw error;
//     }
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getPendaftaran = async (acaraId: string) => {
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
    const {
      data,
      error,
    }: { data: Acara | null; error: PostgrestError | null } = await supabase
      .from("acara")
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

export const getAcaraById = async (id: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("acara")
      .select()
      .eq("id", id)
      .single<Acara>();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const joinAcara = async (
  formData: PendaftaranForm,
  captchaToken: string
) => {
  if (!captchaToken) {
    throw new Error("missing captcha token");
  }

  const supabase = createClient();
  return await supabase
    .from("pendaftaran")
    .insert<PendaftaranForm>(formData)
    .select()
    .single<Pendaftaran>();
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

export const setStatusPendaftaran = async (pendaftaran: Pendaftaran) => {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("pendaftaran")
      .update({ status: pendaftaran.status })
      .eq("id", pendaftaran.id);
    if (error) {
      throw error;
    }

    const { data } = await supabase
      .from("tiket")
      .select()
      .eq("pendaftaran_id", pendaftaran.id)
      .single();
    if (pendaftaran.status === "terverifikasi") {
      if (!data) {
        const { data, error } = await supabase.from("tiket").insert<Tiket>({
          acara_id: pendaftaran.acara_id,
          pendaftaran_id: pendaftaran.id,
          status: "aktif",
        });
        if (error) {
          throw error;
        }

        try {
          const info = await transporter.sendMail({
            from: "HEXAMERTA CORPORATION",
            to: pendaftaran.email,
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });

          console.log("message send", info.messageId);
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    } else {
      if (data) {
        const { error } = await supabase
          .from("tiket")
          .delete()
          .eq("pendaftaran_id", pendaftaran.id);
        if (error) {
          throw error;
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
