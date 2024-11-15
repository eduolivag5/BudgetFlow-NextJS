import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Select,
    SelectItem,
    Input,
} from "@nextui-org/react";
import useBudgetStore from "../../store/useBudgetStore"; 
import { v4 as uuidv4 } from 'uuid'; 
import { Transaction } from "@/types";

interface AddTransactionFormProps {
    transactionToEdit: Transaction | null; 
    isOpen: boolean; 
    onClose: () => void; 
}

export default function AddTransactionForm({ transactionToEdit, isOpen, onClose }: AddTransactionFormProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Transaction>({
        defaultValues: transactionToEdit || {}
    });
    const addTransaction = useBudgetStore((state) => state.addTransaction);
    const editTransaction = useBudgetStore((state) => state.editTransaction); 

    const transactionTypes: Transaction['type'][] = ["Gasto", "Ingreso"];

    useEffect(() => {
        if (transactionToEdit && isOpen) {
            reset(transactionToEdit); // Carga los valores de la transacción a editar
        } else {
            reset(); // Limpia el formulario si se cierra el modal o no hay transacción a editar
        }
    }, [transactionToEdit, isOpen, reset]);

    const onSubmit: SubmitHandler<Transaction> = (data: Transaction) => {
        const transaction = {
            id: transactionToEdit?.id || uuidv4(),
            type: data.type,
            amount: parseFloat(data.amount.toString()), // Convertir a número
            description: data.description,
            date: data.date,
        };
    
        if (transactionToEdit) {
            editTransaction(transaction);
        } else {
            addTransaction(transaction);
        }
        reset();
        onClose();
    };
    

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="bottom-center">
            <ModalContent>
                <ModalHeader className="font-bold text-lg md:text-2xl">
                    {transactionToEdit ? "Editar Transacción" : "Añadir Transacción"}
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 md:space-y-4">
                        <Select
                            label="Tipo de Transacción"
                            placeholder="Seleccione un tipo"
                            {...register("type", { required: true })}
                        >
                            {transactionTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </Select>
                        {errors.type && <span className="text-red-500">Este campo es obligatorio</span>}

                        <Input
                            label="Descripción"
                            placeholder="Descripción"
                            {...register("description", { required: true, maxLength: 100 })}
                        />
                        {errors.description && (
                            <span className="text-red-500">Este campo es obligatorio y debe tener menos de 100 caracteres</span>
                        )}

                        <Input
                            label="Cantidad"
                            placeholder="Ej: 1500"
                            type="number"
                            step="1"
                            {...register("amount", { required: true, min: 0.01 })}
                        />
                        {errors.amount && (
                            <span className="text-red-500">Ingrese una cantidad válida mayor a 0</span>
                        )}

                        <Input
                            label="Fecha"
                            type="date"
                            {...register("date", { required: true })}
                        />
                        {errors.date && <span className="text-red-500">Este campo es obligatorio</span>}
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={onClose} color="secondary">
                        Cancelar
                    </Button>
                    <Button className="text-white" type="submit" color="primary" onClick={handleSubmit(onSubmit)}>
                        Guardar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
