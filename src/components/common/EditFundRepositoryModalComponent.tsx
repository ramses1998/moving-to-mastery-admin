import React, {useContext, useState} from "react";
import {FundRepositoryAmount} from "../../api/fund-repository-amount";
import {AppContext} from "../../context/AppContext";
import {FormFieldType} from "../../helpers/forms";
import {BaseDialogModalComponent} from "./BaseDialogModalComponent";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type Props = {
    fundRepository: FundRepositoryAmount
    onClose: () => void
}
export const EditFundRepositoryModalComponent: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const [fundRepository, setFundRepository] = useState<FundRepositoryAmount>(props.fundRepository)

    const handleOnSubmit = async () => {
        await context.updateFundRepositoryAmount({
            ...fundRepository,
            amount: Number(fundRepository.amount)
        })
        props.onClose()
    }

    const handleOnChange = (propertyName: string, event: any, value?: string) => {
        setFundRepository({
            ...fundRepository,
            [propertyName] : value ?? event.target.value
        })
    }

    const fields: FormFieldType[] = [
        {
            label: "Montant",
            value: fundRepository.amount,
            name: "amount",
            type: "number",
            required: true,
            onChange: handleOnChange,
        }
    ]

    return(
        <BaseDialogModalComponent
            title={"Modifier le fond de caisse"}
            fields={fields}
            toggleButtonProps={{label: "Modifier le montant du fond de caisse",icon: <EditOutlinedIcon fontSize="small"/>}}
            onSubmit={handleOnSubmit}
        />
    )
}
