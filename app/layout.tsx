import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi Colección de Comics",
  description: "App para gestionar tu colección de comics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gaming-darker text-gaming-text min-h-screen">
        {children}
      </body>
    </html>
  );
}
