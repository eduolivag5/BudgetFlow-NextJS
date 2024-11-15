export type Transaction = {
    id: string;
    type: "Gasto" | "Ingreso";
    description: string;
    amount: number;
    date: string;
}