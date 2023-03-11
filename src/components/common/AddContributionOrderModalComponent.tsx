import React, {useContext, useEffect, useState} from "react";
import {ContributionOrder, ContributionOrderDTO} from "../../api/contribution-order";
import {AppContext} from "../../context/AppContext";
import {Member} from "../../api/members";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {BaseDialogModalComponent} from "./BaseDialogModalComponent";
import {FormFieldType} from "../../helpers/forms";

const initialStateValue: ContributionOrderDTO = {
    order: "",
    memberId: "",
}
type Props = {
    onClose: () => void
}
export const AddContributionOrderModalComponent: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const [contributionOrderDTO, setContributionOrderDTO] = useState<ContributionOrderDTO>(initialStateValue)
    const [contributionOrders, setContributionOrders] = useState<ContributionOrder[] | undefined>(undefined)
    const [members, setMembers] = useState<Member[] | undefined>(undefined)

    useEffect(() => {
        context.getAllMembers().then(data => setMembers(data))
        context.getAllContributionOrder().then(data => setContributionOrders(data))
    }, [])

    const handleOnClose = () => {
        setContributionOrderDTO(initialStateValue)
    }

    const handleOnSubmit = async () => {
        if (contributionOrderDTO.memberId === undefined || contributionOrderDTO.memberId === "") {
            alert("Choisi un membre pour valider.")
            return
        }
        await context.createContributionOrder(contributionOrderDTO)
        handleOnClose()
        props.onClose()
    }

    const handleOnChange = (propertyName: string, event: any, value?: string) => {
        setContributionOrderDTO({
            ...contributionOrderDTO,
            [propertyName] : value ?? event.target.value
        })
    }

    const handleOnChangeMember = (propertyName: string, event: any, value?: {label: string, member: Member}) => {
        setContributionOrderDTO({
            ...contributionOrderDTO,
            [propertyName] : value?.member.id
        })
    }

    const getMembersOfDropdown = (): {label: string, member: Member}[] => {
        const membersWithoutOrder = members
            ?.filter(m => contributionOrders?.find(co => co.memberId === m.id) === undefined)

        return membersWithoutOrder?.map(m => {
            return {
                label: m.firstName + " " + m.lastName,
                member: m
            }
        })!
    }

    const fields: FormFieldType[] = [
        {
            label: "Ordre",
            value: contributionOrderDTO.order,
            name: "order",
            placeholder: "Entre l'ordre du beneficiare. Ex: Jan " + new Date().getFullYear(),
            required: true,
            onChange: handleOnChange
        },
        {
            label: "Membre",
            value: getMembersOfDropdown()?.find(m => m.member.id === contributionOrderDTO.memberId)?.label,
            name: "memberId",
            type: "dropdown",
            required: true,
            options: getMembersOfDropdown(),
            onChange: handleOnChangeMember
        },
    ]

    if (members === undefined ||
        contributionOrders === undefined) return <div>Loading...</div>

    return (
        <BaseDialogModalComponent
            title={"Nouvel ordre de beneficiaire"}
            fields={fields}
            toggleButtonProps={{label: "Ajouter un ordre de beneficiaire", icon: <AddOutlinedIcon fontSize="small"/>}}
            onSubmit={handleOnSubmit}
            onClose={handleOnClose}
        />
    )
}
