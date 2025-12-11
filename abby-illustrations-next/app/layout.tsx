import type { Metadata } from "next";
import "./globals.css";
import Layout from "../src/components/layout/Layout";
import { ViewTransitions } from "next-view-transitions";

export const metadata: Metadata = {
  title: "Abby Illustrations",
  description: "Illustration portfolio of Abby Wright",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" data-theme="cupcake">
        <body>
          <Layout>{children}</Layout>
        </body>
      </html>
    </ViewTransitions>
  );
}
