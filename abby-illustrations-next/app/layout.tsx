import type { Metadata } from "next";
import "./globals.css";
import Layout from "../src/components/layout/Layout";

export const metadata: Metadata = {
  title: "Abby Illustrations",
  description: "Illustration portfolio of Abby Wright",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en" data-theme="cupcake">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
