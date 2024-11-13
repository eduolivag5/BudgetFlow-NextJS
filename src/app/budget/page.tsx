"use client";

import { FaSave, FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

import React, { useEffect, useState } from "react";
import BudgetProgress from "./BudgetProgress";
import AddTransactionForm from "../transactions/addTransactionForm";
import { Progress } from "@nextui-org/react";

const BudgetPage = () => {
    const [budget, setBudget] = useState<number | null>(null); 
    const [progress, setProgress] = useState<number>(0);
    const [inputValue, setInputValue] = useState(""); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSaveBudget = () => {
        setBudget(Number(inputValue));
    };

    const handleDeleteBudget = () => {
        setBudget(null);
        setInputValue("");
        setProgress(0);
    };



    useEffect(() => {
        const interval = setInterval(() => {
          setProgress((v) => (v >= 100 ? 0 : v + 10));
        }, 10000);
    
        return () => clearInterval(interval);
      }, []);



    return (
        <div className='md:w-1/2 mx-auto'>
            <h1 className='font-bold text-3xl mb-8'>Presupuesto</h1>

            <div className="flex flex-col md:flex-row justify-between gap-2">
                <div className="space-y-2 w-full">
                    <div className="relative">
                        <input
                            value={inputValue}
                            onChange={handleInputChange}
                            className="p-2 pl-4 pr-8 bg-secondary w-full rounded-md focus:outline-none"
                            placeholder="Introduce el valor"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                            €
                        </span>
                    </div>
                </div>

                <div className="flex flex-grow gap-2 text-sm">
                    <button 
                        className="flex flex-1 justify-center items-center gap-2 md:px-5 p-2 font-semibold uppercase rounded-md bg-indigo-600"
                        onClick={handleSaveBudget}
                    >
                        <FaSave />
                        <span className="">Guardar</span>
                    </button>
                    {budget !== null && (
                        <button 
                            className="flex flex-1 justify-center items-center gap-2 md:px-5 p-2 font-semibold uppercase rounded-md bg-red-600"
                            onClick={handleDeleteBudget}
                        >
                            <FaTrash />
                            <span className="">Eliminar</span>
                        </button>
                    )}
                </div>
                
            </div>

            {budget !== null && (
                <div className="space-y-2">
                    <div className="mt-4 bg-secondary p-3 md:p-6 rounded-lg shadow-md space-y-2">
                        {/* Barra de progreso centrada */}
                        <div className="text-center flex items-center space-x-2">                            
                            <Progress
                                aria-label="Descargando..."
                                size="md"
                                value={progress}
                                color="success"
                                showValueLabel={false}
                                className="mx-auto"
                            />
                            <span className="font-bold text-lg md:text-xl">{progress}%</span>
                        </div>
                    
                        {/* Información de presupuesto gastado y disponible */}
                        <div className="flex justify-around text-center items-center">
                            <div className="flex flex-col items-center">
                                <p className="font-semibold text-sm md:text-lg uppercase tracking-wide">Gastado</p>
                                <span className="md:text-lg font-medium text-gray-500">1.500 €</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-semibold text-sm md:text-lg uppercase tracking-wide">Disponible</p>
                                <span className="md:text-lg font-medium text-gray-500">1.500 €</span>
                            </div>
                        </div>
                    </div>
                    <AddTransactionForm />
                </div>
            )}

            
        </div>
    );
};

export default BudgetPage;
