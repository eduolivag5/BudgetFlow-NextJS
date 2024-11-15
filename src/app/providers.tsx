"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  return (
    <NextUIProvider>
      <NextThemesProvider
  attribute="class" // Asegúrate de usar "class" aquí
  value={{
    light: "light", // Clase para el tema claro
    dark: "dark",   // Clase para el tema oscuro
  }}
  defaultTheme="dark"
  enableSystem={true}
>
  {children}
</NextThemesProvider>

    </NextUIProvider>
  );
}
