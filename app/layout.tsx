import type { Metadata } from "next";
// @ts-ignore: global CSS import declaration
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "LadangNusa — AI Smart Farming",
  description:
    "Platform pertanian cerdas berbasis AI untuk analisis lahan, rekomendasi tanaman, dan pemantauan harga komoditas.",
  keywords: ["pertanian", "AI", "smart farming", "analisis lahan", "rekomendasi tanaman"],
  openGraph: {
    title: "LadangNusa — AI Smart Farming",
    description: "Platform pertanian cerdas berbasis kecerdasan buatan",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>  {/* ← tambah ini */}
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
