import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';  
import { Transaction } from "@/types";

interface BudgetState {
    budget: number;
    disponible: number;
    gastado: number;
    progress: number;
    transacciones: Transaction[];
    setBudget: (amount: number) => void;
    addTransaction: (transaction: Transaction) => void;
    editTransaction: (updatedTransaction: Transaction) => void; 
    deleteTransaction: (transactionId: Transaction['id']) => void; 
    deleteBudget: () => void;
}


const loadState = (): BudgetState => {
    const savedState = localStorage.getItem("budgetState");
    return savedState
        ? JSON.parse(savedState)
        : {
              budget: 0,
              disponible: 0,
              gastado: 0,
              progress: 0,
              transacciones: [],
          };
};


const useBudgetStore = create<BudgetState>((set) => ({
    ...loadState(), 
    
    setBudget: (amount) =>
        set((state) => {
            const newDisponible = amount - state.gastado; // Recalcular el disponible según el nuevo presupuesto
            const newProgress = (state.gastado / amount) * 100; // Recalcular el progreso
    
            const newState = {
                ...state,
                budget: amount,
                disponible: newDisponible,
                progress: newProgress,
            };
    
            localStorage.setItem("budgetState", JSON.stringify(newState));
            return newState;
        }),
    

    addTransaction: (transaction) =>
        set((state) => {
            const transactionAmount = parseFloat(transaction.amount.toString()); // Convertir a número
            
            const newTransaction = {
                ...transaction,
                id: uuidv4(),
            };
    
            const newGastado = state.gastado + transactionAmount;
            const newProgress = (newGastado / state.budget) * 100;
            const newDisponible = state.budget - newGastado;
    
            const newState = {
                ...state,
                transacciones: [...state.transacciones, newTransaction],
                gastado: newGastado,
                disponible: newDisponible,
                progress: newProgress,
            };
    
            localStorage.setItem("budgetState", JSON.stringify(newState));
            return newState;
        }),
        

    editTransaction: (updatedTransaction) =>
        set((state) => {
            const updatedTransactions = state.transacciones.map((transaction) =>
                transaction.id === updatedTransaction.id
                    ? { ...updatedTransaction, amount: parseFloat(updatedTransaction.amount.toString()) } // Convertir a número
                    : transaction
            );
    
            const newGastado = updatedTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
            const newProgress = (newGastado / state.budget) * 100;
            const newDisponible = state.budget - newGastado;
    
            const newState = {
                ...state,
                transacciones: updatedTransactions,
                gastado: newGastado,
                disponible: newDisponible,
                progress: newProgress,
            };
    
            localStorage.setItem("budgetState", JSON.stringify(newState));
            return newState;
        }),

    deleteTransaction: (transactionId: string) =>
        set((state) => {
            const filteredTransactions = state.transacciones.filter((transaction) => transaction.id !== transactionId);

            const newGastado = filteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
            const newProgress = (newGastado / state.budget) * 100;
            const newDisponible = state.budget - newGastado;

            const newState = {
                ...state,
                transacciones: filteredTransactions,
                gastado: newGastado,
                disponible: newDisponible,
                progress: newProgress,
            };

            localStorage.setItem("budgetState", JSON.stringify(newState));
            return newState;
        }),
        

    deleteBudget: () =>
        set(() => {
            const initialState = {
                budget: 0,
                disponible: 0,
                gastado: 0,
                progress: 0,
                transacciones: [],
            };
            localStorage.setItem("budgetState", JSON.stringify(initialState));
            return initialState;
        }),
}));

export default useBudgetStore;
