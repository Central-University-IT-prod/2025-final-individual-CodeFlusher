import type {WorkoutGroup} from "~/types/workout.type";

//Предзагатовленные группы тренировок созданы с помощью нейронных сетей
export const defaultWorkoutGroups: WorkoutGroup[] = [
    {
        id: "restored",
        isDefault: true,
        name: "Сохраненные из истории"
    },
    {
        id: 'default-workout-group-0',
        isDefault: true,
        name: "Тренировки на верхнюю часть тела",
    },
    {
        id: 'default-workout-group-1',
        isDefault: true,
        name: "Тренировки общей направленности",
    },
    {
        id: 'default-workout-group-2',
        isDefault: true,
        name: "Тренировки на нижнюю часть тела",
    },
    {
        id: 'default-workout-group-3',
        isDefault: true,
        name: "Тренировки на спину и руки",
    },
    {
        id: 'immediate',
        isDefault: true,
        name: "Произвольные"
    }

]

export const useWorkoutGroupRegistry = defineStore('workout_group_registry', () => {
    const registeredGroups = ref<WorkoutGroup[]>([])

    const registerWorkoutGroup = (workoutGroup: WorkoutGroup): void => {
        removeWorkoutGroup(workoutGroup)
        registeredGroups.value.push(workoutGroup)
    }

    const removeWorkoutGroup = (workoutGroup: WorkoutGroup): void => {
        registeredGroups.value = registeredGroups.value.filter(group => group.id !== workoutGroup.id)
    }

    const getAllWorkoutGroups = (): WorkoutGroup[] => {
        return defaultWorkoutGroups.concat(registeredGroups.value)
    }

    const getWorkoutGroupById = (id: string): WorkoutGroup | undefined => {
        return getAllWorkoutGroups().find(group => group.id === id)
    }

    return {registeredGroups, registerWorkoutGroup, removeWorkoutGroup, getAllWorkoutGroups, getWorkoutGroupById}
}, {
    persist: {
        key: 'workout_group_localstorage',
        storage: localStorage

    }
})
