import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable:"--font-inter",
  weight:"100 200 300 400 500 600 700 800"
})

const montserrat = localFont({
  src: "./fonts/MontserratVF.ttf",
  variable:"--font-montserrat",
  weight:"100 200 300 400 500 600 700 800"
})

export const metadata: Metadata = {
  title: "TrueDo by coadjute",
  description: "TrueDo is a todo app to improve your daily productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
