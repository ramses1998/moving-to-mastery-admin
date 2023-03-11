import {CURRENCY_OPTIONS, MainBankAccount} from "../../api/main-bank-account";
import React, {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {FormFieldType} from "../../helpers/forms";
import {BaseDialogModalComponent} from "./BaseDialogModalComponent";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type Props = {
    mainBankAccount: MainBankAccount
    onClose: () => void
}
export const EditMainAccountModalComponent: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const [mainBankAccount, setMainBankAccount] = useState<MainBankAccount>(props.mainBankAccount)

    const handleOnChange = (propertyName: string, event: any, value?: string) => {
        setMainBankAccount({
            ...mainBankAccount,
            [propertyName] : value ?? event.target.value
        })
    }

    const handleOnSubmit = async () => {
        await context.updateMainBankAccount(mainBankAccount)
        props.onClose()
    }

    const fields: FormFieldType[] = [
        {label: "Paypal", value: mainBankAccount.paypal, name: "paypal", onChange: handleOnChange},
        {label: "IBAN", value: mainBankAccount.iban, name: "iban", onChange: handleOnChange},
        {
            label: "Monnaie du compte",
            value: mainBankAccount.currency,
            name: "currency",
            type: "dropdown",
            options: CURRENCY_OPTIONS,
            onChange: handleOnChange
        },
    ]

    return(
        <BaseDialogModalComponent
            title={"Modifier le compte principal"}
            fields={fields}
            toggleButtonProps={{icon: <EditOutlinedIcon fontSize="small" sx={{color: "white"}}/>}}
            onSubmit={handleOnSubmit}
        />
    )
}
