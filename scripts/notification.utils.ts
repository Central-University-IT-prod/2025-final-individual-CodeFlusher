import {NotificationType} from "~/types/notification.type";

export const dispatchErrorNotification = (title: string, message: string) => {
    const {dispatchNotification} = useNotifications()

    dispatchNotification({
        type: NotificationType.ERROR,
        time: Date.now(),
        message: message,
        title: title,
    })
}
export const dispatchInfoNotification = (title: string, message: string) => {
    const {dispatchNotification} = useNotifications()

    dispatchNotification({
        type: NotificationType.INFO,
        time: Date.now(),
        message: message,
        title: title,
    })
}
export const dispatchSuccessNotification = (title: string, message: string) => {
    const {dispatchNotification} = useNotifications()

    dispatchNotification({
        type: NotificationType.SUCCESS,
        time: Date.now(),
        message: message,
        title: title,
    })
}