"use client";

import "./globals.css";
import "@nextui-org/react"
import { useEffect, useState } from "react";

import { Providers } from "./providers";

import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const pathname = usePathname(); // Detecta cambios de ruta

  // Desplazar hacia arriba cuando cambie la ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <div className="flex">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <Navbar open={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Contenido principal */}
            <main
              className={`mt-10 p-2 md:p-8 w-full transition-all duration-300 ${sidebarOpen && "md:ml-72"}`}
            >              
              <div className="2xl:w-2/3 2xl:mx-auto w-full mb-10">
                {children}
              </div>
              
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
