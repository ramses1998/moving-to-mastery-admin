import {CurrencyType} from "./main-bank-account";

export const MAIN_ACCOUNT: string = "main-account"

export type TransactionType = "contribution" | "fund" | "expense"

export const TRANSACTION_OPTIONS: TransactionType[] = [
    "contribution",
    "fund",
    "expense"
]

export type Transaction = {
    id: string,
    amount: number,
    senderId: string,
    receiverId: string,
    currency?: CurrencyType
    type: TransactionType
    creationDate: Date
}

export type TransactionDTO = {
    amount: number,
    senderId: string,
    receiverId: string,
    currency?: CurrencyType
    type: TransactionType
    creationDate: Date
}

export const getTransactionsAPI = async (type?: TransactionType): Promise<Transaction[]> => {
    let url: string = process.env.REACT_APP_BACKEND_BASE_URL! + "/transactions"
    if (type !== undefined) {
        url = process.env.REACT_APP_BACKEND_BASE_URL! + "/transactions?type=" + type
    }
    return await fetch(url)
        .then(res => res.json())
        .then(data => data.map((d: any) => convertToTransactionType(d)))
}

export const createTransactionAPI = async (transactionDTO: TransactionDTO): Promise<Transaction> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/transactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionDTO)
    })
        .then(res => res.json())
        .then(data => convertToTransactionType(data))
}

export const deleteTransactionAPI = async (id: string): Promise<Transaction> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/transactions/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res.json())
        .then(data => convertToTransactionType(data))
}

const convertToTransactionType = (response: any): Transaction => {
    return {
        ...response,
        creationDate: new Date(response.creationDate)
    }
}
