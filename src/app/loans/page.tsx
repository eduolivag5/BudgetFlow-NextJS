"use client";

import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import InterestChart from "@/components/Charts/InterestsChart";

export default function Page() {
  const [initialAmount, setInitialAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0); // Porcentaje anual
  const [data, setData] = useState<number[]>([]);
  const [categories, setCategories] = useState<number[]>([]);

  // Función para calcular el interés compuesto
  const calculateInterest = () => {
    const months = 12; // Número de meses para el cálculo
    let amount = initialAmount;
    const results: number[] = [];
    const labels: number[] = [];

    // Convertir el porcentaje anual a mensual dividiendo por 12
    const monthlyRate = interestRate / 12;

    for (let i = 1; i <= months; i++) {
      amount += (amount * monthlyRate) / 100;
      results.push(parseFloat(amount.toFixed(2)));
      labels.push(i);
    }

    setData(results);
    setCategories(labels);
  };

  return (
    <Card className="bg-transparent">
      <CardHeader className="pb-0">
        <span className="font-bold text-2xl md:text-3xl">Préstamos</span>
      </CardHeader>
      
      <CardBody className="space-y-2">
        <label className="space-y-1">
          <span className="text-sm">Importe inicial (€):</span>
          <Input
            type="number"
            value={initialAmount.toString()}
            onChange={(e) => setInitialAmount(parseFloat(e.target.value))}
            radius="sm"
            placeholder="Ejemplo: 1000"
          />
        </label>
        <label className="space-y-1">
          <span className="text-sm">Porcentaje de interés anual (%):</span>
          <Input
            type="number"
            value={interestRate.toString()}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            radius="sm"
            placeholder="Ejemplo: 5"
          />
        </label>
        <Button
          onClick={calculateInterest}
          className="bg-primary text-white font-bold"
          radius="sm"
        >
          Calcular
        </Button>

        {/* Utilizar el componente InterestChart */}
        {data.length > 0 && (
          <div className="w-full flex flex-col md:flex-row p-4 gap-8 bg-secondary rounded-md">
            <div className="flex-1">
              <span className="font-bold text-2xl">Beneficios obtenidos</span>
              <InterestChart data={data} categories={categories} />
            </div>
            <div className="flex-1">
              {/* Tabla de resultados */}
              <Table>
                <TableHeader>
                  <TableColumn>Mes</TableColumn>
                  <TableColumn>Beneficio (€)</TableColumn>
                </TableHeader>
                <TableBody>
                  {data.map((value, index) => (
                    <TableRow key={index}>
                      <TableCell className="py-2 px-4 text-sm">{categories[index]}</TableCell>
                      <TableCell className="py-2 px-4 text-sm">{value.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
