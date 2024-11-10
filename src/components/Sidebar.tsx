"use client";

import { Menus } from "../app/routes";
import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import Link from "next/link";
import { BsArrowBarLeft } from "react-icons/bs";
import { usePathname } from "next/navigation";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const pathname = usePathname();

  return (
    <div
      className={`${open ? "translate-x-0" : "-translate-x-full"}
        w-full md:w-72 p-5 flex flex-col h-full absolute top-0 left-0 justify-between transition-transform duration-300 ease-in-out z-50 bg-secondary2`}
    >
      <div>
        <div className="flex items-center justify-between">
          <h1 className={`font-bold text-2xl`}>BudgetFlow</h1>

          <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
            <BsArrowBarLeft />
          </button>
        </div>

        <ul className={`mt-6 space-y-2`}>
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex gap-4 p-2 cursor-pointer text-sm items-center`}
            >
              <span className="text-lg">{Menu.icon}</span>
              <Link
                className={`${pathname == Menu.link && "text-primary font-semibold"}`}
                href={Menu.link}
              >
                {Menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cambiar tema */}
      <div className={`flex items-center justify-between`}>
        <span className="text-sm">Tema:</span>
        <Switch
          checked={theme === "dark"}
          color="primary"
          onChange={toggleTheme}
        />
      </div>
    </div>
  );
}
