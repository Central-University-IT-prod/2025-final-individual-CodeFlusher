import {TrainingGoals} from "~/types/profile.type";

export const getTargetForLevel = (level: number) => {
    switch (level) {
        case 1:
            return 1000;
        case 2:
            return 3000;
        case 3:
            return 6000;
        default:
            return 10000;
    }

}

export const getLevel = computed(() => {
    const {profile} = useProfileStore()

    if (!profile) {
        return 0;
    }
    if (profile.experience < getTargetForLevel(1)) {
        return 1;
    }
    if (profile.experience < getTargetForLevel(2)) {
        return 2;
    }
    if (profile.experience < getTargetForLevel(3)) {
        return 3;
    }
    if (profile.experience < getTargetForLevel(4)) {
        return 4;
    }
    return 4 + Math.floor(profile.experience / getTargetForLevel(4));
});

export const getDeltaExperience = computed(() => {
    const {profile} = useProfileStore()

    switch (getLevel.value) {
        case 1:
            return getTargetForLevel(1) - profile.experience;
        case 2:
            return getTargetForLevel(2) - profile.experience;
        case 3:
            return getTargetForLevel(3) - profile.experience;
        case 4:
            return getTargetForLevel(4) - profile.experience;
        default:
            return profile.experience % getTargetForLevel(4);
    }
})

export const getProfilePicture = () => {
    const {profile} = useProfileStore()

    return `/images/profile/${profile.track}/level_${getLevel.value}.png`
}

export const evaluateBMI = () => {
    const {profile} = useProfileStore()
    return profile.weight / ((profile.height / 100) * (profile.height / 100))
}


export const getNameForGoal = computed(() => {
    return (goal: TrainingGoals) => {
        switch (goal) {
            case TrainingGoals.DROP_WEIGHT:
                return "Сброс веса"
            case TrainingGoals.KEEP_FIT:
                return "Поддержание формы"
            case TrainingGoals.MUSCLE_GAIN:
                return "Набор мышеченой массы"
            default:
                return "Не установлена"
        }
    }
})
