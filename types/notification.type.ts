export enum NotificationType {
    INFO = 'info',
    ERROR = 'error',
    SUCCESS = 'success',
}

export type AppNotification = {
    type: NotificationType
    time: number
    message: string
    title: string
}