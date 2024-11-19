import Link from "next/link";
import { BsArrowBarLeft } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi"; // Icono hamburguesa

interface NavbarProps {
  open: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>; // Tipo correcto para setState
}

export function Navbar({ open, setSidebarOpen }: NavbarProps) {

  return (
    <div className="pr-4 w-full flex items-center h-16 p-3 justify-between fixed top-0 left-0 z-40">
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
        <img src="./logo.svg" className="h-10" />
      </Link>
    </div>
  );
}
