import React from "react";
import TransactionsListTable from "./transactionsListTable";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function page() {
    return (
        <Card className="bg-transparent shadow-none bg-secondary" radius="sm">
            <CardHeader className="pb-0">
                <span className="font-bold text-2xl md:text-3xl">Transacciones</span>
            </CardHeader>
            <CardBody>
                <TransactionsListTable />
            </CardBody>
        </Card>
    )
}
