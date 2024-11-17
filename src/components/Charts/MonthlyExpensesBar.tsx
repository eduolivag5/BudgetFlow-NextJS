import React from 'react'

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import { Transaction } from '@/types';


const getLastSixMonths = () => {
    const months = [];
    const now = new Date();
  
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1); 
      months.push({
        key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`, 
        label: date.toLocaleString("default", { month: "long" }), 
      });
    }
  
    return months;
  };
  
  
  const processTransactions = (transactions: { date: string; amount: number; type: string }[]) => {
    const groupedData: Record<string, number> = transactions.reduce((acc: Record<string, number>, transaction) => {
      if (!transaction.date || isNaN(new Date(transaction.date).getTime())) return acc;
  
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  
      // Si el type es "Ingreso", restamos la cantidad
      if (transaction.type === "Ingreso") {
        if (!acc[monthKey]) acc[monthKey] = 0;
        acc[monthKey] -= Math.abs(transaction.amount); // Restamos el monto
      }
      // Si el type es "Gasto", sumamos la cantidad
      else if (transaction.type === "Gasto") {
        if (!acc[monthKey]) acc[monthKey] = 0;
        acc[monthKey] += Math.abs(transaction.amount); // Sumamos el monto
      }
  
      return acc;
    }, {});  
  
    // Generar los últimos seis meses
    const lastSixMonths = getLastSixMonths();  
  
    // Obtener las etiquetas y los valores procesados
    const labels = lastSixMonths.map((month) => month.label);
    const values = lastSixMonths.map((month) => groupedData[month.key] || 0);
  
    return { labels, values };
  };
  

export default function MonthlyExpensesBar({transacciones} : {transacciones: Transaction[]}) {

    const { labels, values } = processTransactions(transacciones);
    const { theme } = useTheme();

    const chartOptions: ApexOptions = {
        chart: {
          type: "bar",
          toolbar: {
            show: false
          }
        },
        grid: {
          show: false, 
          padding: {
            top: 0,    
            right: 0,  
            bottom: 0, 
            left: 0    
          }
        },
        xaxis: {
          categories: labels, 
          axisBorder: {
            show: false, 
          },
          axisTicks: {
            show: false, 
          },
          labels: {
            show: true
          }
        },
        tooltip: {
          theme: theme,
          x: {
            show: false 
          },
          y: {
            formatter: (value) => `${value.toFixed(2)} €`
          }
        },
        dataLabels: {
          enabled: false, 
        },
        colors: ["rgba(99, 102, 241, 0.6)"], 
    };  
      
    
    const chartSeries = [
        {
            name: "Gastos por Mes",
            data: values,
        },
    ];


    return (
      <div className="w-full overflow-hidden">
        <Chart options={chartOptions} series={chartSeries} type="bar" height={250} />
      </div>
        
    )
}
