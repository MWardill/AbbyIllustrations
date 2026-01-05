import type { Metadata } from "next";
import "./globals.css";
import AppShell from "../src/components/layout/AppShell";
import { ViewTransitions } from "next-view-transitions";
import Providers from "./providers";
import { auth } from "@/auth";
import { getGalleries } from "@/db/queries/gallery-maint/galleries";

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
  const galleries = await getGalleries();

  return (
    <ViewTransitions>
      <html lang="en" data-theme="cupcake">
        <body>
          <Providers session={session}>
            <AppShell galleries={galleries}>{children}</AppShell>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
