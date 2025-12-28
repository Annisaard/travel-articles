import { DM_Sans, Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Travel Article",
  description: "Travel Article Application",
};

const dmSans = DM_Sans({
  variable: "--font-outfit",
  subsets: ["latin"],
});
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
    ${roboto.variable}
    ${dmSans.variable}
    antialiased
  `}
        suppressHydrationWarning
      >
        <div>{children}</div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
