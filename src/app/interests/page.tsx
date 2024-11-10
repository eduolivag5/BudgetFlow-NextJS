"use client"

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Select, SelectItem } from '@nextui-org/react';

interface FormValues {
    initialInvestment: number;
    monthlyContribution: number;
    timeYears: number;
    interestRate: number;
    interestVariance: number;
    compoundingFrequency: number;
}

interface Result {
    totalInvested: string;
    finalAmount: string;
    generatedAmount: string;
}

export default function CompoundInterestCalculator() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();
    const [result, setResult] = useState<Result | null>(null);

    // Función para calcular el monto final usando la fórmula de interés compuesto
    const calculateAmount = (P: number, C: number, t: number, r: number, n: number): number => (
        P * Math.pow(1 + r / n, n * t) + 
        (C * (Math.pow(1 + r / n, n * t) - 1)) / (r / n)
    );
    
    const calculateCompoundInterest: SubmitHandler<FormValues> = (data) => {
        const P = data.initialInvestment; // Inversión inicial
        const C = data.monthlyContribution; // Contribución mensual
        const t = data.timeYears; // Tiempo en años
        const r = data.interestRate / 100; // Tasa de interés anual
        const n = data.compoundingFrequency; // Frecuencia de capitalización (mensual = 12)
    
        // Depuración: Imprimir los valores
        console.log("Inversión inicial (P): ", P);
        console.log("Contribución mensual (C): ", C);
        console.log("Tiempo (t): ", t);
        console.log("Tasa de interés (r): ", r);
        console.log("Frecuencia de capitalización (n): ", n);
    
        // Calcular el monto final con la tasa de interés
        const finalAmount = calculateAmount(P, C, t, r, n);
    
        // Calcular el monto invertido
        const totalInvested = P + C * 12 * t;
    
        // Calcular el interés generado
        const generatedAmount = finalAmount - totalInvested;
    
        // Depuración: Verificar los valores calculados
        console.log("Monto final (finalAmount): ", finalAmount);
        console.log("Monto invertido (totalInvested): ", totalInvested);
        console.log("Interés generado (generatedAmount): ", generatedAmount);
    
        // Actualizar el estado con los resultados
        setResult({
            totalInvested: totalInvested.toFixed(2),
            finalAmount: finalAmount.toFixed(2),
            generatedAmount: generatedAmount.toFixed(2), // Mostrar la diferencia
        });
    };
    
    return (
        <div className='md:w-1/2 mx-auto'>
            <h1 className='font-bold text-3xl mb-10'>Calculadora de Interés Compuesto</h1>
            <form className='space-y-5' onSubmit={handleSubmit(calculateCompoundInterest)}>
                
                {/* Paso 1: Inversión Inicial */}
                <div className='space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Inversión Inicial</p>
                        <label htmlFor='initialInvestment' className='text-sm text-gray-500'>Monto de dinero que tiene disponible para invertir inicialmente.</label>
                    </div>
                    <input id="initialInvestment"
                        type="number"
                        step="0.01"
                        className={`p-2 rounded-md w-full focus:outline-none ${errors.initialInvestment && 'border-2 border-red-800'}`}
                        {...register('initialInvestment', { required: true, valueAsNumber: true })}
                    />
                </div>

                {/* Paso 2: Contribución */}
                <div className='space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Contribución mensual</p>
                        <label htmlFor='monthlyContribution' className='text-sm text-gray-500'>
                            Monto que tiene previsto agregar al capital cada mes, o un número negativo para el monto que tiene previsto extraer cada mes.
                        </label>
                    </div>
                    <input id="monthlyContribution"
                        type="number"
                        step="0.01"
                        className={`rounded-md w-full focus:outline-none p-2 ${errors.monthlyContribution && 'border-2 border-red-800'}`}
                        {...register('monthlyContribution', { required: true, valueAsNumber: true })}
                    />

                    <div>
                        <p className='font-semibold text-lg'>Cantidad de tiempo en años</p>
                        <label htmlFor='timeYears' className='text-sm text-gray-500'>
                            Cantidad de tiempo, en años, que tiene previsto ahorrar.
                        </label>
                    </div>
                    <input
                        id="timeYears"
                        type="number"
                        {...register('timeYears', { required: true, valueAsNumber: true, min: 1 })}
                        className={`rounded-md w-full focus:outline-none p-2 ${errors.timeYears && 'border-2 border-red-800'}`}
                    />
                </div>

                {/* Paso 3: Tasa de Interés */}
                <div className='space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Tasa de interés estimada</p>
                        <label htmlFor="interestRate" className='text-sm text-gray-500'>
                            Su tasa de interés anual estimada.
                        </label>
                    </div>
                    <input id="interestRate"
                        type="number"
                        step="0.01"
                        className={`rounded-md w-full focus:outline-none p-2 ${errors.interestRate && 'border-2 border-red-800'}`}
                        {...register('interestRate', { required: true, valueAsNumber: true })}
                    />
                </div>

                {/* Paso 4: Capitalización */}
                <div className='space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Frecuencia de capitalización</p>
                        <label htmlFor='compoundingFrequency' className='text-sm text-gray-500'>
                            Cantidad de veces por año que se capitalizará el interés.
                        </label>
                    </div>
                    <Select aria-labelledby='compoundingFrequency' id='compoundingFrequency'
                        {...register('compoundingFrequency', { required: true })}
                        className={`rounded-md w-full focus:outline-none ${errors.compoundingFrequency && 'border-2 border-red-800'}`}
                    >
                        <SelectItem key="1" value="1">Anualmente</SelectItem>
                        <SelectItem key="4" value="4">Trimestralmente</SelectItem>
                        <SelectItem key="12" value="12">Mensualmente</SelectItem>
                        <SelectItem key="365" value="365">Diariamente</SelectItem>
                    </Select>
                </div>

                <button type="submit" className='bg-indigo-500 w-full p-2 rounded-md uppercase font-semibold'>
                    Calcular
                </button>
            </form>

            {result && (
                <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                    <h3>Resultados:</h3>
                    <p>Total Invertido: ${result.totalInvested}</p>
                    <p>Cantidad Generada (Tasa Media): ${result.generatedAmount}</p>
                </div>
            )}
        </div>
    );
}
