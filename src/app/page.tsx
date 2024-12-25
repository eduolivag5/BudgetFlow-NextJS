"use client";

import CardItem from "@/components/CardItem";
import { FaCalculator, FaWallet } from "react-icons/fa";
import { MdOutlineTrendingUp, MdSwapHoriz } from "react-icons/md";

const cards = [
    {
        title: "Presupuesto",
        description: "Ver tu presupuesto actual",
        icon: <FaWallet />,
        link: "/budget",
    },
    {
        title: "Transacciones",
        description: "Ver todas tus transacciones",
        icon: <MdSwapHoriz />,
        link: "/transactions",
    },
    {
        title: "Inversiones",
        description: "Ver todas las inversiones",
        icon: <MdOutlineTrendingUp />,
        link: "/investments",
    },
    {
        title: "Intereses",
        description: "Ver todas las inversiones",
        icon: <FaCalculator />,
        link: "/interests",
    }
]

export default function App() {

    return (
        <div className="flex items-center gap-4 w-full">        

            {cards.map((card) => (
                <CardItem key={card.title} cardItem={card} />
            ))}
            
        </div>
    );
}