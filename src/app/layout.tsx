import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/nav/navbar";
import AOSComponent from "@/components/util/aos";
import { getUser } from "@/actions/acara";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "HEXAMERTA",
  description: "Official Website HEXAMERTA",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getUser();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon/favicon.ico" />
      </head>
      <body className={poppins.className}>
        <ThemeProvider>
          <AOSComponent>
            <Navbar user={data?.user} />
            <div className="flex justify-center container">{children}</div>
          </AOSComponent>
        </ThemeProvider>
      </body>
    </html>
  );
}
