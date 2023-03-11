// "SINGLE" | "MARRIED" | "DIVORCED"
export type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED"

export type Role = "NORMAL-USER" | "PRESIDENT" | "SECRETARY" | "CENSOR" | "ACCOUNT-COMMISSIONER" | "TREASURY-OFFICER"

export const MARITAL_STATUS_OPTIONS = [
    "SINGLE",
    "MARRIED",
    "DIVORCED"
]

export const ROLE_OPTIONS = [
    "NORMAL-USER",
    "PRESIDENT",
    "SECRETARY",
    "CENSOR",
    "ACCOUNT-COMMISSIONER",
    "TREASURY-OFFICER"
]

export type Member = {
    id: string,
    firstName?: string,
    lastName: string,
    maritalStatus?: MaritalStatus,
    countryOfResidence?: string,
    phoneNumber?: string,
    address?: string,
    paypal?: string,
    profession?: string,
    avatar?: string,
    role: Role
}

export type MemberDTO = {
    firstName?: string,
    lastName: string,
    maritalStatus?: MaritalStatus,
    countryOfResidence?: string,
    phoneNumber?: string,
    address?: string,
    paypal?: string,
    profession?: string,
    avatar?: string,
    role: Role
}

export const getAllMembersAPI = async (nonDeleted?: boolean): Promise<Member[]> => {
    let url = process.env.REACT_APP_BACKEND_BASE_URL! + "/members"
    if (nonDeleted !== undefined) {
        url = url.concat("?non-deleted=" + nonDeleted)
    }
    return await fetch(url).then(res => res.json())
}

export const getMemberByIdAPI = async (id: string): Promise<Member> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/members/single?id=" + id).then(res => res.json())
}

export const getMemberByPaypalAPI = async (paypal: string): Promise<Member> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/members/single?paypal=" + paypal)
        .then(res => res.json())
}

export const createMemberAPI = async (memberDTO: MemberDTO): Promise<Member> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/members", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(memberDTO)
    }).then(res => res.json())
}

export const updateMemberAPI = async (member: Member): Promise<Member> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/members", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(member)
    }).then(res => res.json())
}

export const deleteMemberAPI = async (id: string): Promise<Member> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/members/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json())
}
