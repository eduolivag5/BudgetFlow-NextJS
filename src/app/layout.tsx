"use client";

import "./globals.css";
import "@nextui-org/react"
import { useState } from "react";

import { Providers } from "./providers";

import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

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
              className={`mt-16 p-4 md:p-8 transition-all duration-300 w-full ${sidebarOpen && "md:ml-72"}`}
            >              
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
