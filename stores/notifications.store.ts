import type {AppNotification} from "~/types/notification.type";

export const useNotifications = defineStore('notifications', () => {
    const currentNotifications = ref<AppNotification[]>([]);

    const dispatchNotification = (notification: AppNotification) => {
        currentNotifications.value.push(notification);
        setTimeout(() => {
            currentNotifications.value.splice(currentNotifications.value.indexOf(notification), 1);
        }, 5000)
    }

    const processNotifications = () => {
    }

    return {currentNotifications, dispatchNotification}
})