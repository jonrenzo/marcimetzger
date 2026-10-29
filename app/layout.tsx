import type { Metadata } from "next";
import { Manrope, Libre_Franklin, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";

const heading = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const body = Libre_Franklin({ variable: "--font-body", subsets: ["latin"] });
const accent = Libre_Baskerville({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
export const metadata: Metadata = {
  title: "Marci Metzger | Your Pahrump Realtor",
  description:
    "Personal real estate guidance in Pahrump, Nevada. Marci Metzger at The Ridge Realty Group brings nearly three decades of experience to your next move.",
  icons: { icon: "/images/logo_white.png" },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} ${accent.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
