"use server";

import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export async function signIn() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback?next=/tiket/gw",
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
}
