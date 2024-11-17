"use client";

import { useMemo, useState } from 'react';
import { Chip, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Select, SelectItem, Pagination } from '@nextui-org/react';
import marketIndexes from '../../data/markets';

export default function IndexesTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [assetType, setAssetType] = useState('');

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;    

    const filteredMarkets = marketIndexes.filter(market =>
        market.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (assetType ? market.type.toLowerCase() === assetType.toLowerCase() : true)
    );

    const pages = Math.ceil(filteredMarkets.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredMarkets.slice(start, start + rowsPerPage);
    }, [filteredMarkets, page]);

    return (
        <div className='w-full space-y-4'>
            <div className='flex justify-between items-center gap-2'>
                <Input
                    radius='sm'
                    className='flex-1'
                    label="Nombre del activo"
                    placeholder='Buscar por nombre'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Select
                    aria-label="Seleccionar tipo de activo"
                    label="Tipo de activo"
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value)}
                    className='flex-1'
                >
                    <SelectItem key="" value="">Todos</SelectItem>
                    <SelectItem key="índice" value="índice">Índices</SelectItem>
                    <SelectItem key="acción" value="acción">Acciones</SelectItem>
                    <SelectItem key="criptomoneda" value="criptomoneda">Criptomonedas</SelectItem>
                </Select>
            </div>

            {/* Verifica si no hay resultados y muestra el mensaje */}
            {filteredMarkets.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No existen resultados para tu búsqueda.</p>
            ) : (
                <Table aria-label="Índices del mercado" bottomContent={
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
                        <TableColumn className='hidden md:table-cell'>Tipo</TableColumn>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Precio</TableColumn>
                        <TableColumn className='hidden md:table-cell'>Precio (24h)</TableColumn>
                        <TableColumn>% (24h)</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {items.map(market => (
                            <TableRow key={market.symbol}>
                                <TableCell className='hidden md:table-cell'>
                                    <Chip color="primary" variant='flat' size='sm'>
                                        {market.type}
                                    </Chip>
                                </TableCell>
                                <TableCell className='font-bold text-xs'>{market.name}</TableCell>
                                <TableCell className='text-xs'>{market.currentPrice}$</TableCell>
                                <TableCell className='hidden md:table-cell'>
                                    <Chip color={market.priceChange > 0 ? 'success' : 'danger'} variant='flat' size='sm'>
                                        {market.priceChange.toFixed(2)}$
                                    </Chip>
                                </TableCell>
                                <TableCell className='text-right md:text-left'>
                                    <Chip color={market.percentChange > 0 ? 'success' : 'danger'} variant='flat' size='sm'>
                                        {market.percentChange.toFixed(2)}%
                                    </Chip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <p className='text-right text-sm text-gray-500'>(*) Estos datos no se actualizan.</p>
        </div>
    );
}
