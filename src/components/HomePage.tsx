import React, {useContext, useEffect, useState} from "react";
import {Avatar, Box, IconButton, Typography} from "@mui/material";
import {Notification} from "../api/notifications";
import {AppContext} from "../context/AppContext";
import {Member} from "../api/members";
import {AddNotificationModalComponent} from "./common/AddNotificationModalComponent";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {EditNotificationModalComponent} from "./common/EditNotificationModalComponent";

export const HomePage: React.FC = () => {

    const context = useContext(AppContext)
    const [notifications, setNotifications] = useState<Notification[] | undefined>(undefined)
    const [notificationIssuers, setNotificationIssuers] = useState<Member[] | undefined>(undefined)

    useEffect(() => {
        context.getAllNotifications().then(data => setNotifications(data))
        context.getAllMembers().then(data => setNotificationIssuers(data))
    }, [])

    const getIssuerOfNotification = (issuerId: string): Member => {
        return notificationIssuers?.find(m => m?.id === issuerId)!
    }

    const handleOnDataChange = () => {
        context.getAllNotifications().then(data => setNotifications(data))
    }

    const handleDeleteNotification = async (id: string) => {
        await context.deleteNotification(id)
            .catch(error => console.error("An error occurred while deleting notification: ", error))

        handleOnDataChange()
    }

    if (notifications === undefined ||
        notificationIssuers === undefined) return <Box>Loading...</Box>

    return (
        <Box
            sx={{
                display: "grid",
                gap: 3,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h4">Notifications</Typography>
                <AddNotificationModalComponent onClose={handleOnDataChange}/>
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gap: 3
                }}>
                {notifications.map((n, idx) =>
                    <NotificationItem
                        key={idx}
                        notification={n}
                        issuer={getIssuerOfNotification(n.issuerId)}
                        onEdit={handleOnDataChange}
                        onDelete={() => handleDeleteNotification(n.id)}
                    />
                )}
                {notifications.length === 0 ? <Typography sx={{color: "gray"}}>Aucune notification pour l'instant</Typography> : null}
            </Box>
        </Box>
    )
}

type PropsNotificationItem = {
    notification: Notification
    issuer: Member
    onEdit: () => void
    onDelete: () => void
}
const NotificationItem: React.FC<PropsNotificationItem> = (props: PropsNotificationItem) => {
    return (
        <Box
            sx={{
                display: "grid",
                borderRadius: 2,
                padding: "15px 20px",
                boxShadow: "0 0 4px var(--primary-color)",
            }}>
            <Box sx={{display: "grid", gridTemplateColumns: "max-content max-content max-content 1fr", gap: 1, alignItems: "center"}}>
                <Avatar
                    alt={props.issuer.firstName + " " + props.issuer.lastName}
                    src={props.issuer.avatar}
                    children={props.issuer.avatar === undefined ?
                        props.issuer?.firstName![0] + "" + props.issuer?.lastName![0] : null
                    }
                    sx={{ width: 28, height: 28, border: "2px solid grey"}}
                />
                <Box style={{fontSize: "15px"}}>{props.issuer?.firstName + " " + props.issuer?.lastName}</Box>
                <Box style={{display: "flex", gap: 10, alignItems: "center"}}>
                    <Box style={{backgroundColor: "gray", color: "gray", borderRadius: "50%", height: "6px", width: "6px", margin: "0 2px 0 2px", justifySelf: "flex-start"}}/>
                    <Box style={{fontSize: "14px", color: "gray"}}>
                        {props.notification.creationDate
                            .toLocaleDateString([], {day: '2-digit', month: '2-digit', year: "numeric"})
                        }
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: 0.5,
                        justifySelf: "flex-end !important",
                    }}
                >
                    <EditNotificationModalComponent notification={props.notification} onClose={props.onEdit}/>
                    <IconButton sx={{border: "2px solid gray"}} onClick={props.onDelete}>
                        <DeleteOutlinedIcon fontSize="small" sx={{color: "red"}}/>
                    </IconButton>
                </Box>
            </Box>
            <Typography variant="h6">{props.notification.title}</Typography>
            <Typography>{props.notification.content}</Typography>
        </Box>
    )
}
