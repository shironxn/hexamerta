import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/nav/navbar";
import AOSComponent from "@/components/util/aos";
import { getUser } from "@/actions/acara";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HEXAMERTA",
  description: "Official Website HEXAMERTA",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AOSComponent>
            <Navbar user={user.data.user} />
            <div className="flex justify-center container max-md:p-8">
              {children}
            </div>
          </AOSComponent>
        </ThemeProvider>
      </body>
    </html>
  );
}
