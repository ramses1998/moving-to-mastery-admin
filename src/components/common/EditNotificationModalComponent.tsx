import React, {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {FormFieldType} from "../../helpers/forms";
import {Notification} from "../../api/notifications";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {BaseDialogModalComponent} from "./BaseDialogModalComponent";

type Props = {
    notification: Notification
    onClose: () => void
}
export const EditNotificationModalComponent: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const [notification, setNotification] = useState<Notification>(props.notification)

    const handleOnChange = (propertyName: string, event: any, value?: string) => {
        setNotification({
            ...notification,
            [propertyName] : value ?? event.target.value
        })
    }

    const handleOnSubmit = async () => {
        await context.updateNotification(notification)
        props.onClose()
    }

    const fields: FormFieldType[] = [
        {label: "Titre", value: notification.title, name: "title", placeholder: "Titre de la notification", required: true, onChange: handleOnChange},
        {label: "Contenu", value: notification.content, name: "content", placeholder: "Contenu de la notification", multiline: true, onChange: handleOnChange},
    ]

    return(
        <BaseDialogModalComponent
            title={"Modifier la notification"}
            fields={fields}
            toggleButtonProps={{icon: <EditOutlinedIcon fontSize="small"/>}}
            onSubmit={handleOnSubmit}
        />
    )
}
