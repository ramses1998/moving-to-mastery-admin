import React, {useContext, useState} from "react";
import {ContributionAmount} from "../../api/contribution-amount";
import {AppContext} from "../../context/AppContext";
import {FormFieldType} from "../../helpers/forms";
import {BaseDialogModalComponent} from "./BaseDialogModalComponent";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type Props = {
    contributionAmount: ContributionAmount
    onClose: () => void
}
export const EditMonthlyContributionModalComponent: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const [contributionAmount, setContributionAmount] = useState<ContributionAmount>(props.contributionAmount)

    const handleOnChange = (propertyName: string, event: any, value?: string) => {
        setContributionAmount({
            ...contributionAmount,
            [propertyName] : value ?? event.target.value
        })
    }

    const handleOnSubmit = async () => {
        await context.updateContributionAmount(contributionAmount)
        props.onClose()
    }

    const fields: FormFieldType[] = [
        {label: "Montant", value: contributionAmount.amount, name: "amount", required: true, onChange: handleOnChange},
    ]

    return(
        <BaseDialogModalComponent
            title={"Modifier le montant de cotisation"}
            fields={fields}
            toggleButtonProps={{label: "Modifier le montant de cotisation", icon: <EditOutlinedIcon fontSize="small"/>}}
            onSubmit={handleOnSubmit}
        />
    )
}
