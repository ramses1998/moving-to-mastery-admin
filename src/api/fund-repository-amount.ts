import {CurrencyType} from "./main-bank-account";

export type FundRepositoryAmount = {
    id: string
    amount: number
    currency?: CurrencyType
}

export const getFundRepositoryAmountAPI = async (): Promise<FundRepositoryAmount> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/fund-amount").then(res => res.json())
}

export const updateFundRepositoryAmountAPI = async (fundRepositoryAmountInput: FundRepositoryAmount): Promise<FundRepositoryAmount> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/fund-amount", {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fundRepositoryAmountInput)
    }).then(res => res.json())
}

