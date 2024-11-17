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
                const transactionAmount =
                    transaction.type === "Gasto"
                        ? transaction.amount
                        : -transaction.amount; // Sumar si es gasto, restar si es ingreso
        
                const newTransaction = {
                    ...transaction,
                    id: uuidv4(),
                };
        
                const newGastado = state.gastado + transactionAmount
                const newDisponible = state.disponible - transactionAmount;
                const newProgress = (newGastado / state.budget) * 100;
        
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
                const prevTransaction = state.transacciones.find(
                    (transaction) => transaction.id === updatedTransaction.id
                );
                if (!prevTransaction) return state;
        
                const prevAmount =
                    prevTransaction.type === "Gasto"
                        ? prevTransaction.amount
                        : -prevTransaction.amount;
                const newAmount =
                    updatedTransaction.type === "Gasto"
                        ? updatedTransaction.amount
                        : -updatedTransaction.amount;
        
                const diffAmount = newAmount - prevAmount;
        
                const newGastado =
                    updatedTransaction.type === "Gasto"
                        ? state.gastado + diffAmount
                        : state.gastado - diffAmount;
                const newDisponible = state.budget - newGastado;
                const newProgress = (newGastado / state.budget) * 100;
        
                const updatedTransactions = state.transacciones.map((transaction) =>
                    transaction.id === updatedTransaction.id
                        ? updatedTransaction
                        : transaction
                );
        
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
                const transactionToDelete = state.transacciones.find(
                    (transaction) => transaction.id === transactionId
                );
                if (!transactionToDelete) return state;
        
                const transactionAmount =
                    transactionToDelete.type === "Gasto"
                        ? transactionToDelete.amount
                        : -transactionToDelete.amount;
        
                const newGastado = state.gastado - transactionAmount
                const newDisponible = state.budget - newGastado;
                const newProgress = (newGastado / state.budget) * 100;
        
                const filteredTransactions = state.transacciones.filter(
                    (transaction) => transaction.id !== transactionId
                );
        
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
