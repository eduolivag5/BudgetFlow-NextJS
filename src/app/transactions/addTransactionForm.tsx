import React from 'react';
import { MdAdd } from "react-icons/md";
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Select,
    SelectItem,
    useDisclosure,
    Input,
} from "@nextui-org/react";

interface TransactionFormData {
    tipo: "gasto" | "ingreso" | "compra" | "nómina";
    descripcion: string;
    cantidad: number;
    fecha: string;
}

export default function AddTransactionForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TransactionFormData>();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onSubmit: SubmitHandler<TransactionFormData> = (data: TransactionFormData) => {
        console.log(data);
        reset()
        onOpenChange()
    };

    return (
        <>
            <Button onPress={onOpen} color="primary" className='flex gap-2 w-full uppercase font-medium'>
                <MdAdd />
                <span>Añadir transacciones</span>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center">
                <ModalContent>
                    <ModalHeader className="font-bold text-lg md:text-2xl">
                        Añadir Transacción
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 md:space-y-4">
                            <Select
                                label="Tipo de Transacción"
                                placeholder="Seleccione un tipo"
                                {...register("tipo", { required: true })}
                            >
                                <SelectItem key="gasto" value="gasto">Gasto</SelectItem>
                                <SelectItem key="ingreso" value="ingreso">Ingreso</SelectItem>
                                <SelectItem key="compra" value="compra">Compra en tienda</SelectItem>
                                <SelectItem key="nómina" value="nómina">Ingreso de nómina</SelectItem>
                            </Select>
                            {errors.tipo && <span className="text-red-500">Este campo es obligatorio</span>}

                            <Input
                                label="Descripción"
                                placeholder="Descripción"
                                {...register("descripcion", { required: true, maxLength: 100 })}
                            />
                            {errors.descripcion && (
                                <span className="text-red-500">Este campo es obligatorio y debe tener menos de 100 caracteres</span>
                            )}

                            <Input
                                label="Cantidad"
                                placeholder="Ej: 1500"
                                type="number"
                                step="1"
                                {...register("cantidad", { required: true, min: 0.01 })}
                            />
                            {errors.cantidad && (
                                <span className="text-red-500">Ingrese una cantidad válida mayor a 0</span>
                            )}

                            <Input
                                label="Fecha"
                                type="date"
                                {...register("fecha", { required: true })}
                            />
                            {errors.fecha && <span className="text-red-500">Este campo es obligatorio</span>}
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={() => onOpenChange()} color="secondary">
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary" onClick={handleSubmit(onSubmit)}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
