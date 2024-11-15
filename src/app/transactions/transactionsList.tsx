"use client";

import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useBudgetStore from "../../store/useBudgetStore";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import AddTransactionForm from "./addTransactionForm";
import ConfirmationModal from "../../components/ConfirmationModal";
import { MdAdd } from "react-icons/md";

export default function TransactionsList() {
    const { transacciones, deleteTransaction } = useBudgetStore();
    const [transactionToEdit, setTransactionToEdit] = useState(null);
    const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteTransaction = (id: string) => {
        setTransactionToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteTransaction = () => {
        if (transactionToDelete) {
            deleteTransaction(transactionToDelete);
        }
        setTransactionToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleEditTransaction = (transaction: any) => {
        setTransactionToEdit(transaction);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setTransactionToEdit(null);
        setIsEditModalOpen(false);
    };

    return (
        <Card className="mx-auto bg-transparent shadow-none">
            <CardHeader>
                <span className="font-bold md:text-3xl">Lista de Transacciones</span>
            </CardHeader>
            <CardBody className="space-y-2">
                <Button className="w-full font-medium" onClick={() => setIsEditModalOpen(true)}>
                    <MdAdd />
                    <span>Añadir transacción</span>
                </Button>
                {transacciones.length === 0 ? (
                    <p className="text-sm text-gray-400">No hay transacciones registradas.</p>
                ) : (
                    transacciones.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex justify-between items-center p-2 md:p-4 rounded-md bg-secondary"
                        >
                            <div className="flex-1">
                                <p className="font-semibold">{transaction.description}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(transaction.date).toLocaleDateString('en-GB')}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-medium">{transaction.amount} €</span>
                                <button
                                    className="text-primary"
                                    onClick={() => handleEditTransaction(transaction)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDeleteTransaction(transaction.id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </CardBody>
            <AddTransactionForm
                transactionToEdit={transactionToEdit}
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteTransaction}
                title="Eliminar transacción"
                message="¿Estás seguro de que deseas eliminar esta transacción?"
            />
        </Card>
    );
}
