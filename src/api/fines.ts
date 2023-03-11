import {CurrencyType} from "./main-bank-account";

export type Fine = {
    id: string,
    memberId: string,
    amount: number,
    currency?: CurrencyType
    creationDate: Date
}

export type FineDTO = {
    memberId: string,
    amount: number,
    currency?: CurrencyType
    creationDate: Date
}

export const getAllFinesAPI = async (): Promise<Fine[]> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/fines")
        .then(res => res.json())
        .then(data => data.map((d: any) => convertToFineType(d)))
}

export const createFineAPI = async (fineDTO: FineDTO): Promise<Fine> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/fines", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fineDTO)
    })
        .then(res => res.json())
        .then(data => convertToFineType(data))
}

export const deleteFineAPI = async (id: string): Promise<Fine> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/fines/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res.json())
        .then(data => convertToFineType(data))
}

const convertToFineType = (response: any): Fine => {
    return {
        ...response,
        creationDate: new Date(response.creationDate)
    }
}

// let fines: Fine[] = [
//     {
//         "id": "1959e734-54cf-4c24-a25b-b5c0d4fcacdc",
//         "memberId": "1059e734-54cf-4c24-a25b-b5c0d4fcacdc",
//         "amount": 20,
//         "currency": DEFAULT_CURRENCY,
//         "creationDate": "2024-10-05T00:00:00.000Z"
//     },
//     {
//         "id": "2959e734-54cf-4c24-a25b-b5c0d4fcacdc",
//         "memberId": "4959e734-54cf-4c24-a25b-b5c0d4fcacdc",
//         "amount": 10,
//         "currency": DEFAULT_CURRENCY,
//         "creationDate": "2023-03-08T22:42:02.706Z"
//     },
//     {
//         "id": "3959e734-54cf-4c24-a25b-b5c0d4fcacdc",
//         "memberId": "5959e734-54cf-4c24-a25b-b5c0d4fcacdc",
//         "amount": 5,
//         "currency": DEFAULT_CURRENCY,
//         "creationDate": "2023-03-08T22:42:02.706Z"
//     }
// ]
