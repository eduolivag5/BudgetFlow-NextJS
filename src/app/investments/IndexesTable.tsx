"use client";

import { useMemo, useState } from 'react';
import { Chip, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Select, SelectItem, Pagination } from '@nextui-org/react';

const marketIndexes = [
    {
       "symbol":"DJI",
       "name":"Dow Jones Industrial Average",
       "currentPrice":34321.74,
       "priceChange":-256.23,
       "percentChange":-0.75,
       "type":"Índice"
    },
    {
       "symbol":"^GSPC",
       "name":"S&P 500",
       "currentPrice":3950.15,
       "priceChange":28.42,
       "percentChange":0.72,
       "type":"Índice"
    },
    {
       "symbol":"^IXIC",
       "name":"NASDAQ Composite",
       "currentPrice":12356.42,
       "priceChange":-152.65,
       "percentChange":-1.25,
       "type":"Índice"
    },
    {
       "symbol":"^RUT",
       "name":"Russell 2000",
       "currentPrice":1865.32,
       "priceChange":13.76,
       "percentChange":0.74,
       "type":"Índice"
    },
    {
       "symbol":"^VIX",
       "name":"CBOE Volatility Index",
       "currentPrice":19.63,
       "priceChange":-0.85,
       "percentChange":-4.51,
       "type":"Índice"
    },
    {
       "symbol":"AAPL",
       "name":"Apple Inc.",
       "currentPrice":145.22,
       "priceChange":2.35,
       "percentChange":1.64,
       "type":"Acción"
    },
    {
       "symbol":"MSFT",
       "name":"Microsoft Corp.",
       "currentPrice":287.45,
       "priceChange":-4.12,
       "percentChange":-1.46,
       "type":"Acción"
    },
    {
       "symbol":"GOOG",
       "name":"Alphabet Inc. (Google)",
       "currentPrice":2754.63,
       "priceChange":24.65,
       "percentChange":0.90,
       "type":"Acción"
    },
    {
       "symbol":"AMZN",
       "name":"Amazon.com Inc.",
       "currentPrice":3345.27,
       "priceChange":-45.18,
       "percentChange":-1.36,
       "type":"Acción"
    },
    {
       "symbol":"TSLA",
       "name":"Tesla Inc.",
       "currentPrice":688.98,
       "priceChange":-15.02,
       "percentChange":-2.24,
       "type":"Acción"
    },
    {
       "symbol":"FB",
       "name":"Meta Platforms, Inc.",
       "currentPrice":358.11,
       "priceChange":3.32,
       "percentChange":0.94,
       "type":"Acción"
    },
    {
       "symbol":"NVDA",
       "name":"NVIDIA Corporation",
       "currentPrice":202.56,
       "priceChange":6.45,
       "percentChange":3.29,
       "type":"Acción"
    },
    {
       "symbol":"NFLX",
       "name":"Netflix, Inc.",
       "currentPrice":507.22,
       "priceChange":-12.55,
       "percentChange":-2.54,
       "type":"Acción"
    },
    {
       "symbol":"INTC",
       "name":"Intel Corporation",
       "currentPrice":56.34,
       "priceChange":-1.75,
       "percentChange":-3.19,
       "type":"Acción"
    },
    {
       "symbol":"CSCO",
       "name":"Cisco Systems, Inc.",
       "currentPrice":52.85,
       "priceChange":0.78,
       "percentChange":1.5,
       "type":"Acción"
    },
    {
       "symbol":"BA",
       "name":"Boeing Company",
       "currentPrice":215.10,
       "priceChange":1.90,
       "percentChange":0.89,
       "type":"Acción"
    },
    {
       "symbol":"V",
       "name":"Visa Inc.",
       "currentPrice":232.11,
       "priceChange":3.67,
       "percentChange":1.61,
       "type":"Acción"
    },
    {
       "symbol":"PYPL",
       "name":"PayPal Holdings, Inc.",
       "currentPrice":274.31,
       "priceChange":-6.22,
       "percentChange":-2.32,
       "type":"Acción"
    },
    {
       "symbol":"MA",
       "name":"Mastercard Inc.",
       "currentPrice":358.99,
       "priceChange":4.55,
       "percentChange":1.29,
       "type":"Acción"
    },
    {
       "symbol":"DIS",
       "name":"The Walt Disney Company",
       "currentPrice":156.98,
       "priceChange":2.22,
       "percentChange":1.43,
       "type":"Acción"
    },
    {
       "symbol":"BTC",
       "name":"Bitcoin",
       "currentPrice":53721.34,
       "priceChange":1500.50,
       "percentChange":2.86,
       "type":"Criptomoneda"
    },
    {
       "symbol":"ETH",
       "name":"Ethereum",
       "currentPrice":3467.22,
       "priceChange":85.12,
       "percentChange":2.52,
       "type":"Criptomoneda"
    },
    {
       "symbol":"BNB",
       "name":"Binance Coin",
       "currentPrice":412.44,
       "priceChange":7.50,
       "percentChange":1.85,
       "type":"Criptomoneda"
    },
    {
       "symbol":"XRP",
       "name":"XRP (Ripple)",
       "currentPrice":1.25,
       "priceChange":-0.05,
       "percentChange":-3.85,
       "type":"Criptomoneda"
    },
    {
       "symbol":"SOL",
       "name":"Solana",
       "currentPrice":123.45,
       "priceChange":5.25,
       "percentChange":4.44,
       "type":"Criptomoneda"
    },
    {
       "symbol":"ADA",
       "name":"Cardano",
       "currentPrice":1.60,
       "priceChange":0.12,
       "percentChange":8.11,
       "type":"Criptomoneda"
    },
    {
       "symbol":"DOGE",
       "name":"Dogecoin",
       "currentPrice":0.25,
       "priceChange":-0.01,
       "percentChange":-3.85,
       "type":"Criptomoneda"
    },
    {
       "symbol":"DOT",
       "name":"Polkadot",
       "currentPrice":42.87,
       "priceChange":2.14,
       "percentChange":5.25,
       "type":"Criptomoneda"
    },
    {
       "symbol":"LTC",
       "name":"Litecoin",
       "currentPrice":223.30,
       "priceChange":15.32,
       "percentChange":7.37,
       "type":"Criptomoneda"
    },
    {
       "symbol":"MATIC",
       "name":"Polygon",
       "currentPrice":2.12,
       "priceChange":0.10,
       "percentChange":4.92,
       "type":"Criptomoneda"
    }
]

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
