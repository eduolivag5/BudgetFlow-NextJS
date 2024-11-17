"use client"

import React, { useState, useMemo, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination, Input, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, SharedSelection, ChipProps, Card, CardBody, CardHeader } from "@nextui-org/react";
import { FaEdit, FaTrash, FaArrowDown } from "react-icons/fa";
import useBudgetStore from "@/store/useBudgetStore";
import AddTransactionForm from "./addTransactionForm";
import { MdAdd } from "react-icons/md";
import ConfirmationModal from "@/components/ConfirmationModal";

const columns = [
  { name: "FECHA", uid: "date" },
  { name: "TIPO", uid: "type", sortable: true },
  { name: "DESCRIPCION", uid: "description", sortable: true },
  { name: "CANTIDAD", uid: "amount", sortable: true },  
  { name: "ACCIONES", uid: "actions" }
];

const typeOptions = [
  { name: "Gasto", uid: "Gasto" },
  { name: "Ingreso", uid: "Ingreso" }
];

const typeColorMap: Record<string, ChipProps["color"]> = {
  Gasto: "danger",
  Ingreso: "success"
};

export default function TransactionsListTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<Set<string>>(new Set());
  const { transacciones, deleteTransaction } = useBudgetStore();
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const rowsPerPage = 5;

  const filteredItems = useMemo(() => {
    return transacciones.filter((transaction) => {
      const matchesSearch = search ? transaction.description.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesType = typeFilter.size > 0 ? typeFilter.has(transaction.type) : true;
      return matchesSearch && matchesType;
    });
  }, [transacciones, search, typeFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [filteredItems, page]);

  const handleStatusSelectionChange = useCallback((keys: SharedSelection) => {
    const selectedTypes = new Set<string>((Array.isArray(keys) ? keys : [...keys]).map(String));
    setTypeFilter(selectedTypes);
  }, []);

  const handleCloseEditModal = () => {
    setTransactionToEdit(null);
    setIsEditModalOpen(false);
  };

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

    return (
        <div>
            <div className="mb-4 flex flex-col md:flex-row gap-2 justify-between">
                <div className="flex gap-2 w-full">
                    <Input
                        placeholder="Buscar por descripción"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Dropdown>
                    <DropdownTrigger>
                        <Button endContent={<FaArrowDown className="text-sm" />} variant="flat">
                        Tipo
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={typeFilter}
                        selectionMode="multiple"
                        onSelectionChange={handleStatusSelectionChange}
                    >
                        {typeOptions.map((type) => (
                        <DropdownItem key={type.uid} className="capitalize">
                            {type.name}
                        </DropdownItem>
                        ))}
                    </DropdownMenu>
                    </Dropdown>
                </div>

                {/* Botón "Añadir transacción" en una nueva fila en móviles */}
                <Button startContent={<MdAdd className="text-lg" />} className="px-16 bg-primary text-white md:w-auto w-full" variant="flat" onClick={() => setIsEditModalOpen(true)}>
                    Añadir transacción
                </Button>
            </div>


            {filteredItems.length === 0 ? (
                <div className="text-center py-4 text-gray-500 text-sm">
                    <p>No existen transacciones.</p>
                </div>
            ) : (
                <Table aria-label="Tabla de transacciones" bottomContent={
                    <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                    </div>
                }>
                    <TableHeader>
                        <TableColumn>Fecha</TableColumn>
                        <TableColumn className="hidden md:table-cell">Tipo</TableColumn>
                        <TableColumn className="hidden md:table-cell">Descripcion</TableColumn>
                        <TableColumn>Cantidad</TableColumn>
                        <TableColumn align="end">Acciones</TableColumn>
                    </TableHeader>
                    <TableBody>
                    {items.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className="text-xs">
                                <div className="flex flex-col gap-1">
                                    {new Date(transaction.date).toLocaleDateString('en-GB')}
                                    <Chip className="uppercase md:hidden" color={typeColorMap[transaction.type]} size="sm" variant="flat">
                                        {transaction.type}
                                    </Chip>
                                </div>                                    
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <Chip className="uppercase" color={typeColorMap[transaction.type]} size="sm" variant="flat">
                                    {transaction.type}
                                </Chip>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-xs">{transaction.description}</TableCell>
                            <TableCell className="text-xs">
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold">{Number(transaction.amount).toFixed(2)}</span>
                                    <span className="md:hidden text-gray-500">{transaction.description}</span>
                                </div>                                    
                            </TableCell>
                            <TableCell>
                                <div className="relative flex items-center justify-end gap-2">
                                    <Tooltip content="Editar">
                                        <button className="text-lg text-primary cursor-pointer active:opacity-50" onClick={() => handleEditTransaction(transaction)}>
                                            <FaEdit />
                                        </button>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Eliminar">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDeleteTransaction(transaction.id)}>
                                            <FaTrash />
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            )}

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
        </div>
           
    );
}
