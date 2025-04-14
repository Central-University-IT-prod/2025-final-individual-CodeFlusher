import {Achievement} from "~/types/achievements.type";

//Допускаем что мы делаем запрос на бек и получаем название достижений с него
export const getAchievementName = (achievement: Achievement) => {
    switch (achievement) {
        case Achievement.FIRST_PRESTIGE:
            return "Первый престиж"
        case Achievement.FIFTH_PRESTIGE:
            return "Пятый престиж"
        case Achievement.TENTH_PRESTIGE:
            return "Десятый престиж"
        case Achievement.FIRST_LEVEL:
            return "Первое повышение уровня"
        case Achievement.FIRST_WORKOUT:
            return "Первая тренировка"
        case Achievement.FIVE_WORKOUTS:
            return "Пять тренировок"
        case Achievement.TEN_WORKOUTS:
            return "Десять тренировок"
        case Achievement.TWENTY_WORKOUTS:
            return "Двадцать тренировок"
        case Achievement.FIFTY_WORKOUTS:
            return "Пятьдесят тренировок"
        case Achievement.HUNDRED_WORKOUTS:
            return "Сто тренировок"
        default:
            return "Неизвестное достижение"
    }
}

export const getEmojiForAchievement = (achievement: Achievement) => {
    switch (achievement) {
        case Achievement.FIRST_PRESTIGE:
            return "🥇"
        case Achievement.FIFTH_PRESTIGE:
            return "⭐"
        case Achievement.TENTH_PRESTIGE:
            return "🏆"
        case Achievement.FIRST_LEVEL:
            return "🆕"
        case Achievement.FIRST_WORKOUT:
            return "💪"
        case Achievement.FIVE_WORKOUTS:
            return "📈"
        case Achievement.TEN_WORKOUTS:
            return "🏋️"
        case Achievement.TWENTY_WORKOUTS:
            return "🔥"
        case Achievement.FIFTY_WORKOUTS:
            return "💨"
        case Achievement.HUNDRED_WORKOUTS:
            return "🦸"
        default:
            return ""
    }
}

export const getColorForAchievement = (achievement: Achievement) => {
    switch (achievement) {
        case Achievement.FIRST_PRESTIGE:
            return "#41ffa1"
        case Achievement.FIFTH_PRESTIGE:
            return "#04ffe7"
        case Achievement.TENTH_PRESTIGE:
            return "#0095ff"
        case Achievement.FIRST_LEVEL:
            return "#9cff00"
        case Achievement.FIRST_WORKOUT:
            return "#ff4c4c"
        case Achievement.FIVE_WORKOUTS:
            return "#ff3434"
        case Achievement.TEN_WORKOUTS:
            return "#e71515"
        case Achievement.TWENTY_WORKOUTS:
            return "#e5600d"
        case Achievement.FIFTY_WORKOUTS:
            return "#bf00ff"
        case Achievement.HUNDRED_WORKOUTS:
            return "#000000"
        default:
            return "#FFFFFF"
    }
}