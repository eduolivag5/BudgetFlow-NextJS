// routes.ts
import { AiOutlineHome, AiOutlineDollarCircle, AiOutlineSetting } from "react-icons/ai";
import { BsClipboardData, BsInfoCircle } from "react-icons/bs";
import { MdOutlineTrendingUp } from "react-icons/md";
import { FaCalculator } from "react-icons/fa";
  
export const Menus = [
    { title: "Inicio", link: "/", icon: <AiOutlineHome /> },
    { title: "Presupuesto", link: "/budget", icon: <AiOutlineDollarCircle /> },
    { title: "Transacciones", link: "/transactions", icon: <BsClipboardData /> },
    { title: "Inversiones", link: "/investments", icon: <MdOutlineTrendingUp /> },
    { title: "Intereses", link: "/interests", icon: <FaCalculator /> },
    { title: "Ajustes", link: "/settings", icon: <AiOutlineSetting /> },
    { title: "Acerca de", link: "/about", icon: <BsInfoCircle /> },
];
  