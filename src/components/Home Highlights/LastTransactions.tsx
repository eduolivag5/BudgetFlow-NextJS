import useBudgetStore from '@/store/useBudgetStore';
import { Chip, ChipProps, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react';

const typeColorMap: Record<string, ChipProps["color"]> = {
  Gasto: "danger",
  Ingreso: "success",
};

export default function LastTransactions() {
  const { transacciones } = useBudgetStore();

  // Ordenar las transacciones por fecha descendente (de la más reciente a la más antigua)
  const sortedTransactions = [...transacciones].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Table className='text-sm'>
        <TableHeader>
            <TableColumn align='start'>Tipo</TableColumn>
            <TableColumn>Importe</TableColumn>
            <TableColumn align="end">Fecha</TableColumn>
        </TableHeader>
        <TableBody>
            {sortedTransactions.slice(0,3).map((transaction) => (
                <TableRow key={transaction.id}>
                    <TableCell className='text-xs'>
                      <Chip color={typeColorMap[transaction.type]} size="sm" variant="flat">
                          {transaction.type}
                      </Chip>
                    </TableCell>
                    <TableCell className='text-xs'>{transaction.amount.toFixed(2)} €</TableCell>
                    <TableCell className='text-xs'>{transaction.date}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  );
}
