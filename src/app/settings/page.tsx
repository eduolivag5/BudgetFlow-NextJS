"use client";

import { useSettingsStore } from "@/store/settingsStore";
import { Button, Card, CardBody, CardHeader, Select, SelectItem } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function GeneralSettings() {
  const { theme, setTheme } = useTheme();
  const { currency, setCurrency } = useSettingsStore();

  const [settingsCurrency, setSettingsCurrency] = useState(currency);
  const [settingsTheme, setSettingsTheme] = useState(theme);
  
  useEffect(() => {
    setSettingsCurrency(currency);
    setSettingsTheme(theme);
  }, [currency, theme]);

  const handleSave = () => {
    setTheme(settingsTheme!);
    setCurrency(settingsCurrency);
    toast.success("Ajustes guardados correctamente.", {
      theme: theme,
      position: "bottom-right"
    })
  };

  return (
    <Card className="bg-transparent shadow-none">
      <CardHeader className="pb-0">
        <h1 className="text-3xl font-bold mb-4">Ajustes</h1>
      </CardHeader>

      <CardBody>
        {/* Moneda por defecto */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Moneda por defecto:</label>
          <Select
            value={settingsCurrency} 
            onChange={(e) => setSettingsCurrency(e.target.value)}
            radius="sm"
            aria-label="Elegir moneda"
          >
            <SelectItem key="$" value="$">
              USD - Dólar Estadounidense ($)
            </SelectItem>
            <SelectItem key="€" value="€">
              EUR - Euro (€)
            </SelectItem>
            <SelectItem key="¥" value="¥">
              JPY - Yen Japonés (¥)
            </SelectItem>
            <SelectItem key="£" value="£">
              GBP - Libra Esterlina (£)
            </SelectItem>
          </Select>
        </div>

        {/* Tema de la página */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tema:</label>
          <Select
            value={settingsTheme} 
            onChange={(e) => setSettingsTheme(e.target.value)}
            radius="sm"
            aria-label="Elegir tema"
          >
            <SelectItem key="light" value="light">
              Claro
            </SelectItem>
            <SelectItem key="dark" value="dark">
              Oscuro
            </SelectItem>
          </Select>
        </div>

        {/* Botón de guardar */}
        <Button onClick={handleSave} className="w-full bg-primary text-white uppercase font-semibold">
          Guardar
        </Button>
        <ToastContainer />
      </CardBody>
    </Card>
  );
}
