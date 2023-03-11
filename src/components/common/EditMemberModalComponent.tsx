import React, {useContext, useState} from "react";
import {MARITAL_STATUS_OPTIONS, Member, ROLE_OPTIONS} from "../../api/members";
import {AppContext} from "../../context/AppContext";
import {FormFieldType} from "../../helpers/forms";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {BaseDialogModalComponent} from "./BaseDialogModalComponent";

type Props = {
    member: Member
    onClose: () => void
}
export const EditMemberModalComponent: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const [member, setMember] = useState(props.member)

    const handleOnChange = (propertyName: string, event: any, value?: string) => {
        setMember({
            ...member,
            [propertyName] : value ?? event.target.value
        })
    }

    const handleOnSubmit = async () => {
        await context.updateMember(member)
        props.onClose()
    }

    const fields: FormFieldType[] = [
        {label: "Prénom", value: member.firstName, name: "firstName", onChange: handleOnChange},
        {label: "Nom", value: member.lastName, name: "lastName", required: true, onChange: handleOnChange},
        {label: "Statut matrimonial", value: member.maritalStatus, type: "dropdown", options: MARITAL_STATUS_OPTIONS, name: "maritalStatus", onChange: handleOnChange},
        {label: "Pays de résidence", value: member.countryOfResidence, name: "countryOfResidence", onChange: handleOnChange},
        {label: "Numéro de téléphone", value: member.phoneNumber, name: "phoneNumber", type: "tel", onChange: handleOnChange},
        {label: "Adresse", value: member.address, name: "address", onChange: handleOnChange},
        {label: "Compte Paypal", value: member.paypal, name: "paypal", required: true, onChange: handleOnChange},
        {label: "Profession", value: member.profession, name: "profession", onChange: handleOnChange},
        {label: "Photo de profil", value: member.avatar, name: "avatar", placeholder: "Entre une url vers la photo du membre.", onChange: handleOnChange},
        {label: "Role", value: member.role, name: "role", type: "dropdown", options: ROLE_OPTIONS, required: true, onChange: handleOnChange},
    ]

    return (
        <BaseDialogModalComponent
            title={"Modifier les données du membre"}
            fields={fields}
            toggleButtonProps={{icon: <EditOutlinedIcon fontSize="small"/>}}
            onSubmit={handleOnSubmit}
        />
    )
}
