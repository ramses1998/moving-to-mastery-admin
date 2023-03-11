
export type ContributionOrder = {
    id: string
    order: string
    memberId: string
}

export type ContributionOrderDTO = {
    order: string
    memberId: string
}


export const getAllContributionOrderAPI = async (): Promise<ContributionOrder[]> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/contribution-order").then(res => res.json())
}

export const createContributionOrderAPI = async (contributionOrderDTO: ContributionOrderDTO): Promise<ContributionOrder> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/contribution-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contributionOrderDTO)
    }).then(res => res.json())
}

export const updateContributionOrderAPI = async (contributionOrder: ContributionOrder): Promise<ContributionOrder> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/contribution-order", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contributionOrder)
    }).then(res => res.json())
}
