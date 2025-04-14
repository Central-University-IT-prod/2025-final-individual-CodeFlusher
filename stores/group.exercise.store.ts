import type {ExerciseGroup} from "~/types/exercise.type";

//Предзагатовленные группы упражнений созданы с помощью нейронных сетей
export const defaultExerciseGroups: ExerciseGroup[] = [
    {
        id: 'default-back',
        name: 'Упражнения на спину',
        isDefault: true,
    }, {
        id: 'default-chest',
        name: 'Упражнения на грудь',
        isDefault: true,
    }, {
        id: 'default-arms',
        name: 'Упражнения на руки',
        isDefault: true,
    }, {
        id: 'default-shoulders',
        name: 'Упражнения на плечи',
        isDefault: true,
    }, {
        id: 'default-legs',
        name: 'Упражнения на ноги',
        isDefault: true,
    }, {
        id: 'default-abs',
        name: 'Упражнения на пресс',
        isDefault: true,
    }, {
        id: 'default-cardio',
        name: 'Кардио',
        isDefault: true,
    },
]

export const useExerciseGroupRegistry = defineStore('exercise_group_registry', () => {
    const registeredGroups = ref<ExerciseGroup[]>([])

    const registerGroup = (group: ExerciseGroup) => {
        removeItem(group)
        registeredGroups.value.push(group)
    }

    const removeItem = (item: ExerciseGroup) => {
        registeredGroups.value = registeredGroups.value.filter((i: ExerciseGroup) => i.id !== item.id)
    }

    const getAllGroups = () => {
        return registeredGroups.value.concat(defaultExerciseGroups)
    }

    const getById = (id: string) => {
        return getAllGroups().find((g) => g.id === id)
    }

    return {registeredGroups, registerGroup, removeItem, getAllGroups, getById}
}, {
    persist: {
        key: 'exercise_group_localstorage',
        storage: localStorage

    },
})