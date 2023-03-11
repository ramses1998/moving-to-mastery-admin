import React, {createContext} from "react";
import {
    createNotificationAPI, deleteNotificationAPI,
    updateNotificationAPI,
    getAllNotificationsAPI,
    NotificationDTO
} from "../api/notifications";
import {Notification} from "../api/notifications";
import {
    createMemberAPI, deleteMemberAPI,
    getAllMembersAPI,
    getMemberByIdAPI,
    getMemberByPaypalAPI,
    Member,
    MemberDTO, updateMemberAPI
} from "../api/members";
import {
    ContributionOrder,
    ContributionOrderDTO,
    createContributionOrderAPI,
    getAllContributionOrderAPI, updateContributionOrderAPI
} from "../api/contribution-order";
import {getMainBankAccountAPI, MainBankAccount, updateMainBankAccountAPI} from "../api/main-bank-account";
import {
    createTransactionAPI, deleteTransactionAPI,
    getTransactionsAPI,
    Transaction,
    TransactionDTO,
    TransactionType
} from "../api/transactions";
import {ContributionAmount, getContributionAmountAPI, updateContributionAmountAPI} from "../api/contribution-amount";
import {createFineAPI, deleteFineAPI, Fine, FineDTO, getAllFinesAPI} from "../api/fines";
import {
    FundRepositoryAmount,
    getFundRepositoryAmountAPI,
    updateFundRepositoryAmountAPI
} from "../api/fund-repository-amount";
import {extractFilesAPI} from "../api/extract-files";

type Output = {
    getAllNotifications: () => Promise<Notification[]>
    createNotification: (notificationDTO: NotificationDTO) => Promise<Notification>
    updateNotification: (notification: Notification) => Promise<Notification>
    deleteNotification: (id: string) => Promise<Notification>
    getAllMembers: (nonDeleted?: boolean) => Promise<Member[]>
    getMemberById: (id: string) => Promise<Member>
    getMemberByPaypal: (paypal: string) => Promise<Member>
    createMember: (memberDTO: MemberDTO) => Promise<Member>
    updateMember: (member: Member) => Promise<Member>
    deleteMember: (id: string) => Promise<Member>
    getAllContributionOrder: () => Promise<ContributionOrder[]>
    createContributionOrder: (contributionOrderDTO: ContributionOrderDTO) => Promise<ContributionOrder>
    updateContributionOrder: (contributionOrder: ContributionOrder) => Promise<ContributionOrder>
    getMainBankAccount: () => Promise<MainBankAccount>
    updateMainBankAccount: (mainBankAccountInput: MainBankAccount) => Promise<MainBankAccount>
    getTransactions: (type?: TransactionType) => Promise<Transaction[]>
    createTransaction: (transactionDTO: TransactionDTO) => Promise<Transaction>
    deleteTransaction: (id: string) => Promise<Transaction>
    getContributionAmount: () => Promise<ContributionAmount>
    updateContributionAmount: (contributionAmount: ContributionAmount) => Promise<ContributionAmount>
    getAllFines: () => Promise<Fine[]>
    createFine: (fineDTO: FineDTO) => Promise<Fine>
    deleteFine: (id: string) => Promise<Fine>
    getFundRepositoryAmount: () => Promise<FundRepositoryAmount>
    updateFundRepositoryAmount: (fundRepositoryAmount: FundRepositoryAmount) => Promise<FundRepositoryAmount>
    extractFiles: () => Promise<void>
}

// @ts-ignore
export const AppContext = createContext<Output>({})

type Props = {
    children: any
}
export const AppContextProvider: React.FC<Props> = (props: Props) => {

    const getAllNotifications = async (): Promise<Notification[]> => {
        return await getAllNotificationsAPI()
    }

    const createNotification = async (notificationDTO: NotificationDTO): Promise<Notification> => {
        return await createNotificationAPI(notificationDTO)
    }

    const editNotification = async (notification: Notification): Promise<Notification> => {
        return await updateNotificationAPI(notification)
    }

    const deleteNotification = async (id: string): Promise<Notification> => {
        return await deleteNotificationAPI(id)
    }

    const getAllMembers = async (nonDeleted?: boolean): Promise<Member[]> => {
        return await getAllMembersAPI(nonDeleted)
    }

    const getMemberById = async (id: string): Promise<Member> => {
        return await getMemberByIdAPI(id)
    }

    const getMemberByPaypal = async (paypal: string): Promise<Member> => {
        return await getMemberByPaypalAPI(paypal)
    }

    const createMember = async (memberDTO: MemberDTO): Promise<Member> => {
        return await createMemberAPI(memberDTO)
    }

    const updateMember = async (member: Member): Promise<Member> => {
        return await updateMemberAPI(member)
    }

    const deleteMember = async (id: string): Promise<Member> => {
        return await deleteMemberAPI(id)
    }

    const getAllContributionOrder = async (): Promise<ContributionOrder[]> => {
        return await getAllContributionOrderAPI()
    }

    const createRoleContributionOrder = async (contributionOrderDTO: ContributionOrderDTO): Promise<ContributionOrder> => {
        return await createContributionOrderAPI(contributionOrderDTO)
    }

    const updateContributionOrder = async (contributionOrder: ContributionOrder): Promise<ContributionOrder> => {
        return await updateContributionOrderAPI(contributionOrder)
    }

    const getMainBankAccount = async (): Promise<MainBankAccount> => {
        return await getMainBankAccountAPI()
    }

    const updateMainBankAccount = async (mainBankAccountInput: MainBankAccount): Promise<MainBankAccount> => {
        return await updateMainBankAccountAPI(mainBankAccountInput)
    }

    const getTransactions = async (type?: TransactionType): Promise<Transaction[]> => {
        return await getTransactionsAPI(type)
    }

    const createTransaction = async (transactionDTO: TransactionDTO): Promise<Transaction> => {
        return await createTransactionAPI(transactionDTO)
    }

    const deleteTransaction = async (id: string): Promise<Transaction> => {
        return await deleteTransactionAPI(id)
    }

    const getContributionAmount = async (): Promise<ContributionAmount> => {
        return await getContributionAmountAPI()
    }

    const updateContributionAmount = async (contributionAmount: ContributionAmount): Promise<ContributionAmount> => {
        return await updateContributionAmountAPI(contributionAmount)
    }

    const getAllFines = async (): Promise<Fine[]> => {
        return await getAllFinesAPI()
    }

    const createFine = async (fineDTO: FineDTO): Promise<Fine> => {
        return await createFineAPI(fineDTO)
    }

    const deleteFine = async (id: string): Promise<Fine> => {
        return await deleteFineAPI(id)
    }

    const getFundRepositoryAmount = async (): Promise<FundRepositoryAmount> => {
        return await getFundRepositoryAmountAPI()
    }

    const updateFundRepositoryAmount = async (fundRepositoryAmount: FundRepositoryAmount): Promise<FundRepositoryAmount> => {
        return await updateFundRepositoryAmountAPI(fundRepositoryAmount)
    }

    const extractFiles = async () => {
        await extractFilesAPI()
    }

    return (
        <AppContext.Provider value={{
            getAllNotifications: getAllNotifications,
            createNotification: createNotification,
            updateNotification: editNotification,
            deleteNotification: deleteNotification,
            getAllMembers: getAllMembers,
            getMemberById: getMemberById,
            getMemberByPaypal: getMemberByPaypal,
            createMember: createMember,
            updateMember: updateMember,
            deleteMember: deleteMember,
            getAllContributionOrder: getAllContributionOrder,
            createContributionOrder: createRoleContributionOrder,
            updateContributionOrder: updateContributionOrder,
            getMainBankAccount: getMainBankAccount,
            updateMainBankAccount: updateMainBankAccount,
            getTransactions: getTransactions,
            createTransaction: createTransaction,
            deleteTransaction: deleteTransaction,
            getContributionAmount: getContributionAmount,
            updateContributionAmount: updateContributionAmount,
            getAllFines: getAllFines,
            createFine: createFine,
            deleteFine: deleteFine,
            getFundRepositoryAmount: getFundRepositoryAmount,
            updateFundRepositoryAmount: updateFundRepositoryAmount,
            extractFiles: extractFiles,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
