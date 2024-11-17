"use client";

import useBudgetStore from "@/store/useBudgetStore";
import MonthlyExpensesBar from "@/components/Charts/MonthlyExpensesBar";
import BudgetProgress from "@/components/Charts/BudgetProgress";
import LastTransactions from "@/components/Home Highlights/LastTransactions";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function App() {
    const { transacciones, progress } = useBudgetStore();

    return (
        <div className="w-full">        

            <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
                <div className="bg-secondary rounded-md p-4">
                    <h1 className="md:text-xl font-bold mb-4">Resumen de Gastos Mensuales</h1>
                    <MonthlyExpensesBar transacciones={transacciones} />
                </div>
                <div className="bg-secondary rounded-md p-4 flex flex-col">
                    <h1 className="md:text-xl font-bold mb-4">Porcentaje de presupuesto actual</h1>
                    <div className="w-2/3 mx-auto">
                        <BudgetProgress percentage={progress} />
                    </div>
                </div>

                <div className="bg-secondary rounded-md p-4 flex flex-col gap-2 justify-between">
                    <h1 className="mb-4 md:text-xl font-bold">Últimas transacciones</h1>                                         
                    <LastTransactions />
                    <Link href="/transactions" className="flex justify-end">
                        <Button className="text-xs px-6">Ver todas</Button>
                    </Link>
                </div> 
                
            </div>
            
        </div>
    );
}