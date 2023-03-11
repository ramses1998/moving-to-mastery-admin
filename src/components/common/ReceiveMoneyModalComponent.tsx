import React, {useContext, useEffect, useState} from "react";
import {MAIN_ACCOUNT, TRANSACTION_OPTIONS, TransactionDTO} from "../../api/transactions";
import {CURRENCY_OPTIONS, DEFAULT_CURRENCY} from "../../api/main-bank-account";
import {AppContext} from "../../context/AppContext";
import {Member} from "../../api/members";
import {FormFieldType} from "../../helpers/forms";
import {BaseDialogModalComponent} from "./BaseDialogModalComponent";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const initialStateValue: TransactionDTO = {
    amount: 0,
    senderId: "",
    receiverId: MAIN_ACCOUNT,
    currency: DEFAULT_CURRENCY,
    type: "contribution",
    creationDate: new Date()
}
type Props = {
    onClose: () => void
}
export const ReceiveMoneyModalComponent: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const [transactionDTO, setTransactionDTO] = useState<TransactionDTO>(initialStateValue)
    const [members, setMembers] = useState<Member[] | undefined>(undefined)

    useEffect(() => {
        context.getAllMembers().then(data => setMembers(data))
    }, [])

    const handleOnClose = () => {
        setTransactionDTO(initialStateValue)
    }

    const handleOnSubmit = async () => {
        if (transactionDTO.amount <= 0 || transactionDTO.receiverId === undefined || transactionDTO.receiverId === "") {
            alert("Rempli les champs obligatoires")
            return
        }
        await context.createTransaction(transactionDTO)
        handleOnClose()
        props.onClose()
    }

    const handleOnChange = (propertyName: string, event: any, value?: string) => {
        setTransactionDTO({
            ...transactionDTO,
            [propertyName] : value ?? event.target.value
        })
    }

    const handleOnChangeMember = (propertyName: string, event: any, value?: {label: string, member: Member}) => {
        setTransactionDTO({
            ...transactionDTO,
            [propertyName] : value?.member.id
        })
    }

    const getMembersOfDropdown = (): {label: string, member: Member}[] => {
        return members?.map(m => {
            return {
                label: m.firstName + " " + m.lastName,
                member: m
            }
        })!
    }

    const fields: FormFieldType[] = [
        {label: "Montant", value: transactionDTO.amount.toString(), name: "amount", type: "number", required: true, onChange: handleOnChange},
        {
            label: "Émetteur",
            value: getMembersOfDropdown()?.find(m => m.member.id === transactionDTO.senderId)?.label,
            name: "senderId",
            type: "dropdown",
            required: true,
            options: getMembersOfDropdown(),
            onChange: handleOnChangeMember,
        },
        {
            label: "Monnaie",
            value: transactionDTO.currency,
            name: "currency",
            type: "dropdown",
            options: CURRENCY_OPTIONS,
            onChange: handleOnChange
        },
        {
            label: "Type de transaction",
            value: transactionDTO.type,
            name: "type",
            type: "dropdown",
            options: TRANSACTION_OPTIONS.filter(to => to !== "expense"),
            onChange: handleOnChange
        },
    ]

    if (members === undefined) return <div>Loading...</div>

    return (
        <BaseDialogModalComponent
            title={"Créer une transaction"}
            fields={fields}
            toggleButtonProps={{label: "Recevoir", icon: <FileDownloadOutlinedIcon fontSize="small"/>}}
            onSubmit={handleOnSubmit}
            onClose={handleOnClose}
        />
    )
}
