"use server";

import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export async function signIn() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  if (!user.error) {
    redirect("/acara");
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getURL() + "auth/callback?next=/acara",
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
