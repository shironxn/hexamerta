"use server";

import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import { Login } from "@/lib/types";

export async function signIn(formData: Login) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);
  if (error) {
    return { error: error.message };
  }

  redirect("/acara/dashboard");
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }

  redirect("/");
}
