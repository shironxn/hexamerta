"use server";

import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export async function signIn() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  if (!user.error) {
    redirect("/acara");
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.BASE_URL + "/auth/callback?next=/acara",
    },
  });

  if (data.url) {
    redirect(data.url);
  }

  if (error) {
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
