"use client"

import React from 'react'
import IndexesTable from './IndexesTable'
import { Card, CardBody, CardHeader } from '@nextui-org/react'

export default function page() {
    return (
        <Card className="bg-transparent shadow-none bg-secondary" radius="sm">
            <CardHeader className="pb-0">
                <span className="font-bold text-2xl md:text-3xl">Activos de inversión</span>
            </CardHeader>
            <CardBody>
                <IndexesTable />
            </CardBody>
        </Card>
    )
}
