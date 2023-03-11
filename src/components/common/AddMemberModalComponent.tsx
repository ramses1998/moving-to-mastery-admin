import React, {useContext, useState} from "react";
import {MARITAL_STATUS_OPTIONS, MemberDTO, ROLE_OPTIONS} from "../../api/members";
import {AppContext} from "../../context/AppContext";
import {FormFieldType} from "../../helpers/forms";
import {BaseDialogModalComponent} from "./BaseDialogModalComponent";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const initialStateValue: MemberDTO = {
    firstName: "",
    lastName: "",
    maritalStatus: "SINGLE",
    countryOfResidence: "",
    phoneNumber: "",
    address: "",
    paypal: "",
    profession: "",
    avatar: "",
    role: "NORMAL-USER"
}
type Props = {
    onClose: () => void
}
export const AddMemberModalComponent: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const [memberDTO, setMemberDTO] = useState<MemberDTO>(initialStateValue)

    const handleOnClose = () => {
        setMemberDTO(initialStateValue)
    }

    const handleOnSubmit = async () => {
        await context.createMember(memberDTO)
        handleOnClose()
        props.onClose()
    }

    const handleOnChange = (propertyName: string, event: any, value?: string) => {
        setMemberDTO({
            ...memberDTO,
            [propertyName] : value ?? event.target.value
        })
    }

    const fields: FormFieldType[] = [
        {label: "Prénom", value: memberDTO.firstName, name: "firstName", onChange: handleOnChange},
        {label: "Nom", value: memberDTO.lastName, name: "lastName", required: true, onChange: handleOnChange},
        {label: "Statut matrimonial", value: memberDTO.maritalStatus, type: "dropdown", options: MARITAL_STATUS_OPTIONS, name: "maritalStatus", onChange: handleOnChange},
        {label: "Pays de résidence", value: memberDTO.countryOfResidence, name: "countryOfResidence", onChange: handleOnChange},
        {label: "Numéro de téléphone", value: memberDTO.phoneNumber, name: "phoneNumber", type: "tel", onChange: handleOnChange},
        {label: "Adresse", value: memberDTO.address, name: "address", onChange: handleOnChange},
        {label: "Compte Paypal", value: memberDTO.paypal, name: "paypal", required: true, onChange: handleOnChange},
        {label: "Profession", value: memberDTO.profession, name: "profession", onChange: handleOnChange},
        {label: "Photo de profil", value: memberDTO.avatar, name: "avatar", placeholder: "Entre une url vers la photo du membre.", onChange: handleOnChange},
        {label: "Role", value: memberDTO.role, name: "role", type: "dropdown", options: ROLE_OPTIONS, required: true, onChange: handleOnChange},
    ]

    return (
        <BaseDialogModalComponent
            title={"Nouveau membre"}
            fields={fields}
            toggleButtonProps={{label: "Ajouter un membre", icon: <AddOutlinedIcon fontSize="small"/>}}
            onSubmit={handleOnSubmit}
            onClose={handleOnClose}
        />
    )
}
