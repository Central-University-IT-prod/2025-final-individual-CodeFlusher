import type {Profile} from "~/types/profile.type";
import {Track, TrainingGoals} from "~/types/profile.type";
import {dispatchInfoNotification} from "~/scripts/notification.utils";
import {getLevel} from "~/scripts/profile.utils";
import {Achievement} from "~/types/achievements.type";
import {getAchievementName} from "~/scripts/achievements.utils";

export const useProfileStore = defineStore("profile", () => {
    const profile = ref<Profile>({
        name: '',
        track: '' as Track,
        experience: 100,
        trainingGoal: 'keep_fit' as TrainingGoals,
        weight: 0,
        height: 0,
    })

    const prestigeLevel = ref<number>(0);
    const achievements = ref<Achievement[]>([]);
    const timesFinishedWorkouts = ref<number>(0)
    const displayAchievement = ref<Achievement | undefined>("" as Achievement)

    const isFinishedRegister = ref<boolean>(false)

    const finishRegister = () => {
        profile.value.experience = 100;
        isFinishedRegister.value = true
    }

    const pushAchievement = (achievement: Achievement) => {
        if (!achievement) {
            return
        }
        if (achievements.value.findIndex(el => el === achievement) < 0) {
            dispatchInfoNotification("Получено достижение!", `Вы получили достижение: ${getAchievementName(achievement)}`);
            achievements.value.push(achievement)
        }
    }

    const addExperience = (experience: number) => {
        dispatchInfoNotification("Завершение тренировки", `Вам было начислено ${experience} опыта 🎉🎉`)
        const prevLevel = getLevel.value
        profile.value.experience += experience;
        const newLevel = getLevel.value
        if (newLevel !== prevLevel) {
            pushAchievement(Achievement.FIRST_LEVEL)
            dispatchInfoNotification("Завершение тренировки", `Ваш уровень был повышен с ${prevLevel} до ${newLevel}`)
        }
        timesFinishedWorkouts.value++;
        if (timesFinishedWorkouts.value === 1) {
            pushAchievement(Achievement.FIRST_WORKOUT)
        }
        if (timesFinishedWorkouts.value === 5) {
            pushAchievement(Achievement.FIVE_WORKOUTS)
        }
        if (timesFinishedWorkouts.value === 10) {
            pushAchievement(Achievement.TEN_WORKOUTS)
        }
        if (timesFinishedWorkouts.value === 20) {
            pushAchievement(Achievement.TWENTY_WORKOUTS)
        }
        if (timesFinishedWorkouts.value === 50) {
            pushAchievement(Achievement.FIFTY_WORKOUTS)
        }
        if (timesFinishedWorkouts.value === 100) {
            pushAchievement(Achievement.HUNDRED_WORKOUTS)
        }
    }

    const prestige = () => {
        profile.value.experience = 0;
        prestigeLevel.value += 1;
        if (prestigeLevel.value === 1) {
            pushAchievement(Achievement.FIRST_PRESTIGE)
        }
        if (prestigeLevel.value === 5) {
            pushAchievement(Achievement.FIFTH_PRESTIGE)
        }
        if (prestigeLevel.value === 10) {
            pushAchievement(Achievement.TENTH_PRESTIGE)
        }
    }

    return {
        profile,
        prestigeLevel,
        achievements,
        isFinishedRegister,
        displayAchievement,
        finishRegister,
        pushAchievement,
        prestige,
        addExperience
    }
}, {
    persist: {
        key: 'profile_localstorage',
        storage: localStorage
    }
});