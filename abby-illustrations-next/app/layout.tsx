import type { Metadata } from "next";
import "./globals.css";
import Layout from "../src/components/layout/Layout";
import { ViewTransitions } from "next-view-transitions";
import Providers from "./providers";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Abby Illustrations",
  description: "Illustration portfolio of Abby Wright",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <ViewTransitions>
      <html lang="en" data-theme="cupcake">
        <body>
          <Providers session={session}>
            <Layout>{children}</Layout>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
