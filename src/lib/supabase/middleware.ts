import { getPendaftaran } from "@/actions/acara";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  if (request.nextUrl.pathname.startsWith("/acara")) {
    const user = await supabase.auth.getUser();

    if (request.nextUrl.pathname.includes("/tiket")) {
      try {
        const acaraId = request.nextUrl.pathname.split("/")[2];
        await getPendaftaran(acaraId);
      } catch (error) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    if (user.error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // refreshing the auth token
  await supabase.auth.getUser();

  return response;
}
