import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // <--- Importamos aqui
import Footer from "@/components/Footer"; // <--- Importamos aqui

export const metadata: Metadata = {
  title: "Norte Tech - Soluções em Energia",
  description: "Portal Corporativo Norte Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
        
        {/* Navbar Fixa no Topo */}
        <Navbar />
        
        {/* Conteúdo Principal (Empurrado para baixo por causa da navbar fixa) */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Rodapé no Fim */}
        <Footer />
        
      </body>
    </html>
  );
}