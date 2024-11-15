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
              className={`mt-16 p-2 md:p-8 w-full transition-all duration-300 ${sidebarOpen && "md:ml-72"}`}
            >              
              <div className="md:w-2/3 mx-auto mb-10">
                {children}
              </div>
              
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
