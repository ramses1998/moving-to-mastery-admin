import {CurrencyType} from "./main-bank-account";

export type ContributionAmount = {
    id: string
    amount: number
    currency?: CurrencyType
}

export const getContributionAmountAPI = async (): Promise<ContributionAmount> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/contribution-amount").then(res => res.json())
}

export const updateContributionAmountAPI = async (contributionAmount: ContributionAmount): Promise<ContributionAmount> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/contribution-amount", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contributionAmount)
    }).then(res => res.json())
}
