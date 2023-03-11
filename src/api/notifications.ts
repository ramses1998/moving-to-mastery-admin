export type Notification = {
    id: string
    title: string
    content?: string,
    issuerId: string,
    creationDate: Date
}

export type NotificationDTO = {
    title: string
    content?: string,
    issuerId: string,
    creationDate: Date
}

export const getAllNotificationsAPI = async (): Promise<Notification[]> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/notifications")
        .then(res => res.json())
        .then(data => data.map((d: any) => convertToNotificationType(d)))
}

export const createNotificationAPI = async (notificationDTO: NotificationDTO): Promise<Notification> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/notifications", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationDTO)
    })
        .then(res => res.json())
        .then(data => convertToNotificationType(data))
}

export const updateNotificationAPI = async (notification: Notification): Promise<Notification> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/notifications", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(notification)
    })
        .then(res => res.json())
        .then(data => convertToNotificationType(data))
}

export const deleteNotificationAPI = async (id: string): Promise<Notification> => {
    return await fetch(process.env.REACT_APP_BACKEND_BASE_URL! + "/notifications/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res.json())
        .then(data => convertToNotificationType(data))
}

const convertToNotificationType = (response: any): Notification => {
    return {
        ...response,
        creationDate: new Date(response.creationDate)
    }
}
