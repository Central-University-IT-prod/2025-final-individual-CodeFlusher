import type {WorkoutRegistryItem} from "~/types/workout.type";

//Предзагатовленные тренировки созданы с помощью нейронных сетей
export const defaultWorkouts: WorkoutRegistryItem[] = [
    {
        id: "default-workout-0",
        isDefault: true,
        name: "Тренировка верхней части тела",
        description: "Комплекс упражнений направленный на развитие и поддержание формы грудной клетки, спины, плеч",
        workoutGroups: ["default-workout-group-0"],
        blocks: [
            {
                exerciseId: "default-0",
                elements: [
                    {repeats: 6, weight: 20},
                    {repeats: 6, weight: 20},
                    {repeats: 6, weight: 20},
                    {repeats: 6, weight: 20}
                ]
            },
            {
                exerciseId: "default-6",
                elements: [
                    {repeats: 10, weight: 12},
                    {repeats: 10, weight: 12},
                    {repeats: 10, weight: 12}
                ]
            },
            {
                exerciseId: "default-12",
                elements: [
                    {repeats: 8, weight: 15},
                    {repeats: 8, weight: 15},
                    {repeats: 8, weight: 15}
                ]
            },
            {
                exerciseId: "default-13",
                elements: [
                    {repeats: 12, weight: 8},
                    {repeats: 12, weight: 8},
                    {repeats: 12, weight: 8}
                ]
            },
            {
                exerciseId: "default-9",
                elements: [
                    {repeats: 10, weight: 40},
                    {repeats: 10, weight: 40},
                    {repeats: 10, weight: 40}
                ]
            }
        ]
    },
    {
        id: "default-workout-1",
        isDefault: true,
        name: "Общая тренировка",
        description: "Комплекс упражнений для поддержания общей физической формы",
        workoutGroups: ["default-workout-group-1"],
        blocks: [
            {
                exerciseId: "default-3",
                elements: [
                    {repeats: 15},
                    {repeats: 15},
                    {repeats: 15}
                ]
            },
            {
                exerciseId: "default-15",
                elements: [
                    {repeats: 10},
                    {repeats: 10},
                    {repeats: 10}
                ]
            },
            {
                exerciseId: "default-16",
                elements: [
                    {repeats: 50},
                    {repeats: 50},
                    {repeats: 50}
                ]
            },
            {
                exerciseId: "default-10",
                elements: [
                    {repeats: 500},
                    {repeats: 500},
                ]
            },
            {
                exerciseId: "default-8",
                elements: [
                    {repeats: 60},
                    {repeats: 60},
                    {repeats: 60},
                ]
            }
        ]
    },
    {
        id: "default-workout-2",
        isDefault: true,
        name: "Тренировка нижней части тела",
        description: "Комплекс упражнений для развития мышц ног и ягодиц",
        workoutGroups: ["default-workout-group-2"],
        blocks: [
            {
                exerciseId: "default-2",
                elements: [
                    {repeats: 8, weight: 40},
                    {repeats: 8, weight: 40},
                    {repeats: 8, weight: 40}
                ]
            },
            {
                exerciseId: "default-7",
                elements: [
                    {repeats: 10, weight: 20},
                    {repeats: 10, weight: 20},
                    {repeats: 10, weight: 20}
                ]
            },
            {
                exerciseId: "default-11",
                elements: [
                    {repeats: 15, weight: 25},
                    {repeats: 15, weight: 25},
                    {repeats: 15, weight: 25}
                ]
            },
            {
                exerciseId: "default-14",
                elements: [
                    {repeats: 12},
                    {repeats: 12},
                    {repeats: 12}
                ]
            }
        ]
    },
    {
        id: "default-workout-3",
        isDefault: true,
        name: "Тренировка спины и рук",
        description: "Комплекс упражнений для укрепления спины и рук",
        workoutGroups: ["default-workout-group-3"],
        blocks: [
            {
                exerciseId: "default-1",
                elements: [
                    {repeats: 8},
                    {repeats: 8},
                    {repeats: 8}
                ]
            },
            {
                exerciseId: "default-4",
                elements: [
                    {repeats: 6, weight: 50},
                    {repeats: 6, weight: 50},
                    {repeats: 6, weight: 50}
                ]
            },
            {
                exerciseId: "default-18",
                elements: [
                    {repeats: 10, weight: 20},
                    {repeats: 10, weight: 20},
                    {repeats: 10, weight: 20}
                ]
            },
            {
                exerciseId: "default-19",
                elements: [
                    {repeats: 12},
                    {repeats: 12},
                    {repeats: 12}
                ]
            }
        ]
    }
]


export const useWorkoutRegistry = defineStore('workout_registry', () => {
    const registeredWorkouts = ref<WorkoutRegistryItem[]>([])

    const immediateWorkoutsInvoked = ref<number>(0)

    const registerWorkout = (workout: WorkoutRegistryItem) => {
        removeWorkout(workout);
        registeredWorkouts.value.push(workout);
    }

    const incrementImmediateWorkouts = () => {
        immediateWorkoutsInvoked.value++
        return immediateWorkoutsInvoked.value
    }

    const removeWorkout = (workout: WorkoutRegistryItem) => {
        registeredWorkouts.value = registeredWorkouts.value.filter((item: WorkoutRegistryItem) => item.id !== workout.id)
    }

    const getAllWorkouts = () => {
        return registeredWorkouts.value.concat(defaultWorkouts);
    }

    const getWorkoutById = (id: string) => {
        return getAllWorkouts().find(item => item.id === id);
    }

    return {
        registeredWorkouts,
        registerWorkout,
        removeWorkout,
        getAllWorkouts,
        getWorkoutById,
        immediateWorkoutsInvoked,
        incrementImmediateWorkouts
    };
}, {
    persist: {
        key: 'workout_registry_localstorage',
        storage: localStorage
    }
})