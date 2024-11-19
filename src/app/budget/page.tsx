"use client"

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Input, Progress } from "@nextui-org/react";
import useBudgetStore from "../../store/useBudgetStore";
import { FaSave, FaTrash } from "react-icons/fa";
import ConfirmationModal from "../../components/ConfirmationModal";
import TransactionsListTable from "../transactions/transactionsListTable";
import { useSettingsStore } from "@/store/settingsStore";

const BudgetPage = () => {
    const { budget, disponible, gastado, progress, setBudget, deleteBudget } = useBudgetStore();
    const { currency } = useSettingsStore()
    
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // Establecer el valor inicial del input con el presupuesto guardado
    useEffect(() => {
        setInputValue(budget.toString());
    }, [budget]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const confirmDeleteBudget = () => {
        deleteBudget();
        setInputValue("");
        setIsConfirmationModalOpen(false);
    };

    return (
        <Card className='p-0 shadow-none bg-transparent'>
            <CardHeader className="px-0">
                <span className="font-bold text-2xl md:text-3xl">Presupuesto</span>
            </CardHeader>            
            <CardBody className="p-0">
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Introduce el presupuesto"
                    radius="sm"
                />

                <div className="flex flex-grow gap-2 text-sm text-white">
                    <button 
                        className="flex flex-1 justify-center items-center gap-2 md:px-5 p-2 font-semibold uppercase rounded-md bg-indigo-600"
                        onClick={() => setBudget(Number(inputValue))}
                    >
                        <FaSave />
                        <span>Guardar</span>
                    </button>
                    {budget !== 0 && (
                        <button 
                            className="flex flex-1 justify-center items-center gap-2 md:px-5 p-2 font-semibold uppercase rounded-md bg-red-600"
                            onClick={() => setIsConfirmationModalOpen(true)}
                        >
                            <FaTrash />
                            <span>Eliminar</span>
                        </button>
                    )}
                </div>
            </div>

            {budget !== 0 && (
                <div className="space-y-2">
                    <div className="mt-4 bg-secondary p-3 md:p-6 rounded-lg shadow-md space-y-2">
                        <div className="text-center flex items-center space-x-2">                            
                            <Progress
                                aria-label="Progreso"
                                size="md"
                                value={progress}
                                color={progress > 100 ? "default" : "success"}
                                showValueLabel={false}
                                className="mx-auto"
                            />
                            <span className="font-bold text-lg md:text-xl">{progress.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-around text-center items-center">
                            <div className="flex flex-col items-center">
                                <p className="font-semibold text-sm md:text-lg uppercase">Gastado</p>
                                <span className="md:text-lg font-medium text-gray-500">{gastado.toFixed(2)} {currency}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-semibold text-sm md:text-lg uppercase">Disponible</p>
                                <span className={`md:text-lg font-medium ${disponible <= 0 ? 'text-red-500' : 'text-gray-500' }`}>
                                    {disponible.toFixed(2)} {currency}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <TransactionsListTable />
                    </div>
                    
                </div>
            )}

            

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={confirmDeleteBudget}
                title="Eliminar Presupuesto"
                message="¿Estás seguro? Esta acción no se puede deshacer."
            />

            </CardBody>
        </Card>
    );
};

export default BudgetPage;
