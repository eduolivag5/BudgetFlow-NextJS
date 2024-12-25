
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineTrendingUp, MdSwapHoriz } from "react-icons/md";
import { FaCalculator, FaWallet } from "react-icons/fa";
  
export const Menus = [
    { title: "Inicio", link: "/", icon: <AiOutlineHome /> },
    { title: "Presupuesto", link: "/budget", icon: <FaWallet /> },
    { title: "Transacciones", link: "/transactions", icon: <MdSwapHoriz /> },
    { title: "Inversiones", link: "/investments", icon: <MdOutlineTrendingUp /> },
    { title: "Intereses", link: "/interests", icon: <FaCalculator /> },
    { title: "Ajustes", link: "/settings", icon: <AiOutlineSetting /> },
    { title: "Acerca de", link: "/about", icon: <BsInfoCircle /> },
];
  