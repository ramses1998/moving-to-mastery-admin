import React, {useContext, useEffect, useState} from "react";
import {NotificationDTO} from "../../api/notifications";
import {UserContext} from "../../context/userContext";
import {FormFieldType} from "../../helpers/forms";
import {AppContext} from "../../context/AppContext";
import {BaseDialogModalComponent} from "./BaseDialogModalComponent";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const initialStateValue: NotificationDTO = {
    title: "",
    content: "",
    issuerId: "",
    creationDate: new Date()
}
type Props = {
    onClose: () => void
}
export const AddNotificationModalComponent: React.FC<Props> = (props: Props) => {

    const context = useContext(AppContext)
    const userContext = useContext(UserContext)
    const [notificationDTO, setNotificationDTO] = useState<NotificationDTO>(initialStateValue)

    useEffect(() => {
        setNotificationDTO(prevState => {
            return {
                ...prevState,
                issuerId: userContext.user?.id!
            }
        })
    }, [userContext, userContext.user, props.onClose])

    const handleOnClose = () => {
        setNotificationDTO(initialStateValue)
    }

    const handleOnSubmit = async () => {
        await context.createNotification(notificationDTO)
        handleOnClose()
        props.onClose()
    }

    const handleOnChange = (propertyName: string, event: any, value?: string) => {
        setNotificationDTO({
            ...notificationDTO,
            [propertyName] : value ?? event.target.value
        })
    }

    const fields: FormFieldType[] = [
        {label: "Titre", value: notificationDTO.title, name: "title", placeholder: "Titre de la notification", required: true, onChange: handleOnChange},
        {label: "Contenu", value: notificationDTO.content, name: "content", placeholder: "Contenu de la notification", multiline: true, onChange: handleOnChange},
    ]

    return (
        <BaseDialogModalComponent
            title={"Nouvelle notification"}
            fields={fields}
            toggleButtonProps={{label: "Ajouter une notification", icon: <AddOutlinedIcon fontSize="small"/>}}
            onSubmit={handleOnSubmit}
            onClose={handleOnClose}
        />
    )
}
