"use server";

import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import { headers } from "next/headers";
import { Login } from "@/lib/types";

// export async function SignInWithOAuth() {
//   const supabase = createClient();
//   const origin = headers().get("origin");

//   const user = await supabase.auth.getUser();
//   if (!user.error) {
//     redirect("/acara");
//   }

//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       redirectTo: `${origin}/auth/callback?next=/acara`,
//     },
//   });

//   if (data.url) {
//     redirect(data.url);
//   }

//   if (error) {
//     throw error;
//   }
// }

export async function signIn(formData: Login) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword(formData);
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }

  redirect("/");
}
