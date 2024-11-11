"use client"

import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Card, Select, SelectItem } from '@nextui-org/react';

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
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            compoundingFrequency: 1
        }
    });
    const [result, setResult] = useState<Result | null>(null);

    // Crear una referencia para el div 'compoundInterestResult'
    const resultRef = useRef<HTMLDivElement | null>(null);
    
    const calculateAmount = (P: number, C: number, t: number, r: number, n: number): number => (
        P * Math.pow(1 + r / n, n * t) + 
        (C * (Math.pow(1 + r / n, n * t) - 1)) / (r / n)
    );
    
    const calculateCompoundInterest: SubmitHandler<FormValues> = (data) => {
        const P = data.initialInvestment; 
        const C = data.monthlyContribution; 
        const t = data.timeYears; 
        const r = data.interestRate / 100; 
        const n = data.compoundingFrequency;     
        
        const finalAmount = calculateAmount(P, C, t, r, n);    
        
        const totalInvested = P + C * 12 * t;    
        
        const generatedAmount = finalAmount - totalInvested;    
        
        setResult({
            totalInvested: totalInvested.toFixed(2),
            finalAmount: finalAmount.toFixed(2),
            generatedAmount: generatedAmount.toFixed(2), 
        });

        // Hacer scroll hacia el div de resultados
        if (resultRef.current) {
            resultRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }
    };
    
    return (
        <div className='md:w-1/2 mx-auto'>
            <h1 className='font-bold text-3xl mb-8'>Calculadora de Interés Compuesto</h1>
            <form className='space-y-4' onSubmit={handleSubmit(calculateCompoundInterest)}>
                
                {/* Paso 1: Inversión Inicial */}
                <div className='border border-secondary rounded-lg p-3 space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Inversión Inicial</p>
                        <label htmlFor='initialInvestment' className='text-sm text-gray-500'>Monto de dinero que tiene disponible para invertir inicialmente.</label>
                    </div>
                    <input id="initialInvestment"
                        
                        step="0.01"
                        className={`bg-secondary p-2 rounded-md w-full focus:outline-none ${errors.initialInvestment && 'border border-red-800'}`}
                        {...register('initialInvestment', { required: true, valueAsNumber: true })}
                    />
                </div>

                {/* Paso 2: Contribución */}
                <div className='border border-secondary rounded-lg p-3 space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Contribución mensual</p>
                        <label htmlFor='monthlyContribution' className='text-sm text-gray-500'>
                            Monto que tiene previsto agregar al capital cada mes, o un número negativo para el monto que tiene previsto extraer cada mes.
                        </label>
                    </div>
                    <input id="monthlyContribution"
                        
                        step="0.01"
                        className={`bg-secondary rounded-md w-full focus:outline-none p-2 ${errors.monthlyContribution && 'border border-red-800'}`}
                        {...register('monthlyContribution', { required: true, valueAsNumber: true })}
                    />

                    <div>
                        <p className='font-semibold text-lg'>Cantidad de tiempo en años</p>
                        <label htmlFor='timeYears' className='text-sm text-gray-500'>
                            Cantidad de tiempo, en años, que tiene previsto ahorrar.
                        </label>
                    </div>
                    <div className="relative w-full">
                        <input
                            id="timeYears"
                            {...register('timeYears', { required: true, valueAsNumber: true, min: 1 })}
                            className={`bg-secondary rounded-md w-full focus:outline-none p-2 pr-10 ${errors.timeYears ? 'border border-red-800' : ''}`}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">años</span>
                    </div>
                </div>

                {/* Paso 3: Tasa de Interés */}
                <div className='border border-secondary rounded-lg p-3 space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Tasa de interés estimada</p>
                        <label htmlFor="interestRate" className='text-sm text-gray-500'>
                            Su tasa de interés anual estimada.
                        </label>
                    </div>
                    <div className="relative w-full">
                        <input
                            id="interestRate"
                            {...register('interestRate', { required: true, valueAsNumber: true, min: 1 })}
                            className={`bg-secondary rounded-md w-full focus:outline-none p-2 pr-10 ${errors.interestRate ? 'border border-red-800' : ''}`}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                </div>

                {/* Paso 4: Capitalización */}
                <div className='border border-secondary rounded-lg p-3 space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>Frecuencia de capitalización</p>
                        <label htmlFor='compoundingFrequency' className='text-sm text-gray-500'>
                            Cantidad de veces por año que se capitalizará el interés.
                        </label>
                    </div>
                    <Select radius='sm' aria-labelledby='compoundingFrequency' id='compoundingFrequency'
                        {...register('compoundingFrequency', { required: true })}
                        className={`w-full focus:outline-none`}
                    >
                        <SelectItem key="1" value="1">Anualmente</SelectItem>
                        <SelectItem key="4" value="4">Trimestralmente</SelectItem>
                        <SelectItem key="12" value="12">Mensualmente</SelectItem>
                        <SelectItem key="365" value="365">Diariamente</SelectItem>
                    </Select>
                </div>

                <button type="submit" className='bg-indigo-500 text-white w-full p-2 rounded-md uppercase font-semibold'>
                    Calcular
                </button>
            </form>

            {result && (
                <div ref={resultRef} id='compoundInterestResult' className='p-5 mt-5 rounded-md bg-secondary'>
                    <div className='flex'>
                        <div className='flex flex-1 flex-col space-y-4 items-center justify-center'>
                            <p className='text-sm md:text-lg uppercase font-semibold'>Inversión total</p>
                            <span className='font-bold text-green-400 text-xl md:text-2xl'>
                                {result.totalInvested}$
                            </span>
                        </div>
                        <div className='flex flex-1 flex-col space-y-4 items-center justify-center'>
                            <p className='text-sm md:text-lg uppercase font-semibold'>Profit</p>
                            <span className='font-bold text-green-400 text-xl md:text-2xl'>
                                {result.generatedAmount}$
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
