import Link from "next/link";
import Image from "next/image";
import { BsArrowBarLeft } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi"; 

interface NavbarProps {
  open: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>; 
}

export function Navbar({ open, setSidebarOpen }: NavbarProps) {

  return (
    <div className="pr-4 w-full flex items-center h-16 p-3 justify-between fixed top-0 left-0 z-40">
      {/* Icono del Hamburguesa */}
      <div>
        <button
          className="p-2 cursor-pointer text-3xl"
          onClick={() => setSidebarOpen((prev) => !prev)} 
        >
          {!open ? <HiOutlineMenu /> : <BsArrowBarLeft />}
        </button>
      </div>

      {/* Logo */}      
      <Link href="/">
        <Image alt="logo" width={40} height={40} src="./logo.svg" />
      </Link>
    </div>
  );
}
