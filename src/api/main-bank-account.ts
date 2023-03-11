
export type CurrencyType = "EUR" | "USD" | "BTC" | "ETH" | "SOL" | "XAF-CFA"

export const DEFAULT_CURRENCY: CurrencyType = "EUR"

export const CURRENCY_OPTIONS = [
    "EUR",
    "USD",
    "BTC",
    "ETH",
    "SOL",
    "XAF-CFA"
]

export type MainBankAccount = {
    id: string
    iban?: string
    paypal?: string
    currency?: CurrencyType
}

export const getMainBankAccountAPI = async (): Promise<MainBankAccount> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/main-bank-account").then(res => res.json())
}

export const updateMainBankAccountAPI = async (mainBankAccountInput: MainBankAccount): Promise<MainBankAccount> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/main-bank-account", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mainBankAccountInput)
    }).then(res => res.json())
}
