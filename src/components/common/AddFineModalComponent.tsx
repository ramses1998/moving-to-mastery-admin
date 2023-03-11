import React, {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {FineDTO} from "../../api/fines";
import {DEFAULT_CURRENCY} from "../../api/main-bank-account";
import {FormFieldType} from "../../helpers/forms";
import {BaseDialogModalComponent} from "./BaseDialogModalComponent";
import {Member} from "../../api/members";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";

const initialStateValue: FineDTO = {
    memberId: "",
    amount: 0,
    currency: DEFAULT_CURRENCY,
    creationDate: new Date()
}
type Props = {
    member: Member
    onClose: () => void
}
export const AddFineModalComponent: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const [fineDTO, setFineDTO] = useState<FineDTO>({...initialStateValue, memberId: props.member.id})

    const handleOnClose = () => {
        setFineDTO(initialStateValue)
    }

    const handleOnSubmit = async () => {
        if (fineDTO.memberId === undefined || fineDTO.memberId === "" || fineDTO.amount === 0) {
            alert("Rempli les champs obligatoires")
            return
        }
        await context.createFine({
            ...fineDTO,
            amount: Number(fineDTO.amount)
        })
        handleOnClose()
        props.onClose()
    }

    const handleOnChange = (propertyName: string, event: any, value?: string) => {
        setFineDTO({
            ...fineDTO,
            [propertyName] : value ?? event.target.value
        })
    }

    const fields: FormFieldType[] = [
        {
            label: "Montant",
            value: fineDTO.amount,
            name: "amount",
            type: "number",
            required: true,
            onChange: handleOnChange,
        }
    ]

    return (
        <BaseDialogModalComponent
            title={"Donner une ammende"}
            fields={fields}
            toggleButtonProps={{icon: <GavelOutlinedIcon fontSize="small"/>}}
            onSubmit={handleOnSubmit}
            onClose={handleOnClose}
        />
    )
}
