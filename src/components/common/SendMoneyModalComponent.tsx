import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {MAIN_ACCOUNT, TRANSACTION_OPTIONS, TransactionDTO} from "../../api/transactions";
import {Member} from "../../api/members";
import {FormFieldType} from "../../helpers/forms";
import {CURRENCY_OPTIONS, DEFAULT_CURRENCY} from "../../api/main-bank-account";
import {BaseDialogModalComponent} from "./BaseDialogModalComponent";
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';

const initialStateValue: TransactionDTO = {
    amount: 0,
    senderId: MAIN_ACCOUNT,
    receiverId: "",
    currency: DEFAULT_CURRENCY,
    type: "contribution",
    creationDate: new Date()
}
type Props = {
    onClose: () => void
}
export const SendMoneyModalComponent: React.FC<Props> = (props: Props) => {

    const applicationContext = useContext(AppContext)
    const [transactionDTO, setTransactionDTO] = useState<TransactionDTO>(initialStateValue)
    const [members, setMembers] = useState<Member[] | undefined>(undefined)

    useEffect(() => {
        applicationContext.getAllMembers().then(data => setMembers(data))
    }, [])

    const handleOnClose = () => {
        setTransactionDTO(initialStateValue)
    }

    const handleOnSubmit = async () => {
        if (transactionDTO.amount <= 0 || transactionDTO.senderId === undefined || transactionDTO.senderId === "") {
            alert("Rempli les champs obligatoires")
            return
        }
        await applicationContext.createTransaction(transactionDTO)
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
            label: "Destinataire",
            value: getMembersOfDropdown()?.find(m => m.member.id === transactionDTO.receiverId)?.label,
            name: "receiverId",
            type: "dropdown",
            options: getMembersOfDropdown(),
            required: true,
            onChange: handleOnChangeMember
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
            options: TRANSACTION_OPTIONS.filter(to => to !== "fund"),
            onChange: handleOnChange
        },
    ]

    if (members === undefined) return <div>Loading...</div>

    return (
        <BaseDialogModalComponent
            title={"Créer une transaction"}
            fields={fields}
            toggleButtonProps={{label: "Envoyer", icon: <IosShareOutlinedIcon fontSize="small"/>}}
            onSubmit={handleOnSubmit}
            onClose={handleOnClose}
        />
    )

}
