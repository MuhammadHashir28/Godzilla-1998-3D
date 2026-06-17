import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Godzilla 1998 | The City Is Alive",
  description:
    "A cinematic Godzilla 1998 landing page with interactive 3D models, parallax storytelling, HUD panels, and atmospheric scroll effects.",
  openGraph: {
    title: "Godzilla 1998 | The City Is Alive",
    description: "Dark cinematic Godzilla 1998 landing page with interactive 3D model moments.",
    images: ["/assets/godzilla-roar.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
