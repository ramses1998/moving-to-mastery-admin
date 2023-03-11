import React, {useContext, useEffect, useState} from "react";
import {ContributionOrder} from "../../api/contribution-order";
import {AppContext} from "../../context/AppContext";
import {FormFieldType} from "../../helpers/forms";
import {Member} from "../../api/members";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {BaseDialogModalComponent} from "./BaseDialogModalComponent";

type Props = {
    contributionOrder: ContributionOrder
    onClose: () => void
}
export const EditContributionOrderModalComponent: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const [contributionOrder, setContributionOrder] = useState<ContributionOrder>(props.contributionOrder)
    const [members, setMembers] = useState<Member[] | undefined>(undefined)

    useEffect(() => {
        context.getAllMembers().then(data => setMembers(data))
    }, [])

    const handleOnSubmit = async () => {
        if (contributionOrder.memberId === undefined || contributionOrder.memberId === "") {
            alert("Choisi un membre pour valider.")
            return
        }
        await context.updateContributionOrder(contributionOrder)
        props.onClose()
    }

    const handleOnChange = (propertyName: string, event: any, value?: string) => {
        setContributionOrder({
            ...contributionOrder,
            [propertyName] : value ?? event.target.value
        })
    }

    const getMemberOfDropdown = (): {label: string, member: Member} => {
        const memberFound: Member = members?.find(m => m.id === props.contributionOrder.memberId)!
        return {
            label: memberFound?.firstName + " " + memberFound?.lastName,
            member: memberFound
        }
    }

    const fields: FormFieldType[] = [
        {
            label: "Ordre",
            value: contributionOrder?.order,
            name: "order",
            placeholder: "Entre l'ordre du beneficiare. Ex: Jan " + new Date().getFullYear(),
            required: true,
            onChange: handleOnChange,
        },
        {
            label: "Membre",
            value: getMemberOfDropdown()?.label,
            name: "memberId",
            type: "dropdown",
            required: true,
            options: [getMemberOfDropdown()],
            disabled: true,
        },
    ]

    if (members === undefined) return <div>Loading...</div>

    return(
        <BaseDialogModalComponent
            title={"Modifier l'ordre de beneficiaire"}
            fields={fields}
            toggleButtonProps={{icon: <EditOutlinedIcon fontSize="small"/>}}
            onSubmit={handleOnSubmit}
        />
    )
}
