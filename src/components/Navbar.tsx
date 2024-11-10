import { useTheme } from "next-themes";
import Link from "next/link";
import { BsArrowBarLeft } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi"; // Icono hamburguesa

interface NavbarProps {
  open: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>; // Tipo correcto para setState
}

export function Navbar({ open, setSidebarOpen }: NavbarProps) {
  const { theme } = useTheme();

  return (
    <div className="w-full flex items-center p-3 justify-between bg-secondary2">
      {/* Icono del Hamburguesa */}
      <div>
        <button
          className="p-2 cursor-pointer text-3xl"
          onClick={() => setSidebarOpen((prev) => !prev)} // Alternando el valor booleano
        >
          {!open ? <HiOutlineMenu /> : <BsArrowBarLeft />}
        </button>
      </div>

      {/* Logo */}
      <Link href="/">
        prueba
      </Link>
    </div>
  );
}
