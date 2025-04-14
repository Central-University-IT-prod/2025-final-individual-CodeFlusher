import type {ExerciseGroup, ExerciseType, InventoryItem, MuscleGroups} from "~/types/exercise.type";
import {ExerciseDifficulty} from "~/types/exercise.type";
import type {
    Exercise,
    ExerciseBlock,
    ExerciseBlockRegistry,
    ExerciseElement,
    Workout,
    WorkoutGroup,
    WorkoutRegistryItem
} from "~/types/workout.type";
import {ExerciseAdditionalFieldType} from "~/types/workout.type";
import {stringArrayGenerator} from "~/scripts/utils";

export const getExerciseDifficultyMultiplier = (difficulty: ExerciseDifficulty): number => {
    switch (difficulty) {
        case ExerciseDifficulty.EASY:
            return 0.75;
        case ExerciseDifficulty.HARD:
            return 1.25;
        default:
            return 1;
    }
}

export const computeExerciseDifficulty = (exercise: ExerciseType): number => {
    let exerciseMuscleGroups: MuscleGroups[] = []
    exercise.muscleGroups.forEach((muscleGroup: string) => {
        const value = getMuscleGroupById(muscleGroup);
        if (value) {
            exerciseMuscleGroups.push(value);
        }
    })

    let sum = 0

    exerciseMuscleGroups.forEach(group => sum += group.exercisePoints)

    return (sum / exerciseMuscleGroups.length) * getExerciseDifficultyMultiplier(exercise.difficulty);

}

export const computeElementsMultiplier = (elements: ExerciseElement[]): number => {
    let multiplier = 0;
    elements.forEach((element: ExerciseElement) => {
        if (element.weight) {
            multiplier += Math.sqrt(element.repeats) * (Math.sqrt(element.weight));
        } else {
            multiplier += Math.sqrt(element.repeats);
        }
    })
    return multiplier;
}

export const computeWorkoutRegistryDifficulty = (workout: WorkoutRegistryItem): number => {
    let sum = 0;

    const {getExerciseById} = useExerciseStore()

    workout.blocks.forEach((block: ExerciseBlockRegistry) => {
        const exercise = getExerciseById(block.exerciseId);
        if (exercise) {
            sum += computeExerciseDifficulty(exercise) * computeElementsMultiplier(block.elements);
        }
    })

    return Math.round(sum);
}

export const computeWorkoutDifficulty = (workout: Workout): number => {
    let sum = 0;
    workout.blocks.forEach((block: ExerciseBlock) => {
        let elementMultiplier = 0;
        block.elements.forEach((element: ExerciseElement) => {
            if (element.done) {
                if (element.weight) {
                    elementMultiplier += Math.sqrt(element.repeats) * (Math.sqrt(element.weight));
                } else {
                    elementMultiplier += Math.sqrt(element.repeats);
                }
            }
        })
        let muscleGroupSum = 0;
        block.exercise.muscleGroups.forEach((group: MuscleGroups) => {
            muscleGroupSum += group.exercisePoints;
        })
        sum += elementMultiplier * (muscleGroupSum / block.exercise.muscleGroups.length) * getExerciseDifficultyMultiplier(block.exercise.difficulty);
    })
    return Math.round(sum);
}

export const fetchMuscles = (groupIds: string[]): MuscleGroups[] => {
    let muscles: MuscleGroups[] = []

    groupIds.forEach(id => {
        const value = getMuscleGroupById(id);
        if (value) {
            muscles.push(value)
        }
    })

    return muscles
}
export const fetchGroups = (groupIds: string[]): ExerciseGroup[] => {
    let groups: ExerciseGroup[] = []

    const {getById} = useExerciseGroupRegistry()

    groupIds.forEach(id => {
        const value = getById(id);
        if (value) {
            groups.push(value)
        }
    })

    return groups
}

export const fetchInventory = (inventoryIds: string[]): InventoryItem[] => {
    let inventory: InventoryItem[] = []

    const {getInventoryItemById} = useInventoryRegistry()

    inventoryIds.forEach(id => {
        const value = getInventoryItemById(id);
        if (value) {
            inventory.push(value)
        }
    })

    return inventory
}

export const completeExerciseFrom = (exercise: ExerciseType): Exercise => {
    return {
        id: exercise.id,
        name: exercise.name,
        description: exercise.description,
        descriptionLong: exercise.descriptionLong,
        isDefault: exercise.isDefault,
        url: exercise.url,
        difficulty: exercise.difficulty,
        requireAdditionalFields: exercise.requireAdditionalFields,
        assignedGroups: fetchGroups(exercise.assignedGroups),
        muscleGroups: fetchMuscles(exercise.muscleGroups),
        inventory: fetchInventory(exercise.inventory)
    } as Exercise;
}

export const mapToExerciseType = (exercise: Exercise): ExerciseType => {
    return {
        id: exercise.id,
        name: exercise.name,
        description: exercise.description,
        descriptionLong: exercise.descriptionLong,
        isDefault: exercise.isDefault,
        url: exercise.url,
        difficulty: exercise.difficulty,
        requireAdditionalFields: exercise.requireAdditionalFields,
        assignedGroups: stringArrayGenerator(exercise.assignedGroups, (o: object) => (o as ExerciseGroup).id),
        muscleGroups: stringArrayGenerator(exercise.muscleGroups, (o: object) => (o as MuscleGroups).id),
        inventory: stringArrayGenerator(exercise.inventory, (o: object) => (o as InventoryItem).id),
    }
}

export const mapBlock = (block: ExerciseBlockRegistry): ExerciseBlock | null => {
    const {getExerciseById} = useExerciseStore()
    const value = getExerciseById(block.exerciseId)
    if (!value) {
        return null
    }
    return {
        exercise: completeExerciseFrom(value),
        elements: block.elements
    }
}

export const fetchWorkoutGroups = (ids: string[]): WorkoutGroup[] => {
    let workoutGroups: WorkoutGroup[] = []
    const {getWorkoutGroupById} = useWorkoutGroupRegistry()
    ids.forEach(id => {
        const value = getWorkoutGroupById(id);
        if (value) {
            workoutGroups.push(value)
        }
    })
    return workoutGroups
}

export const mapWorkout = (workout: WorkoutRegistryItem): Workout => {
    const blocks: ExerciseBlock[] = []
    workout.blocks.forEach((block: ExerciseBlockRegistry) => {
        const value = mapBlock(block)
        if (value) {
            blocks.push(value)
        }
    })

    return {
        id: workout.id,
        name: workout.name,
        description: workout.description,
        workoutGroups: fetchWorkoutGroups(workout.workoutGroups),
        blocks: blocks
    }
}

export const getStringByFieldType = (fieldType: ExerciseAdditionalFieldType) => {
    switch (fieldType) {
        case ExerciseAdditionalFieldType.DISTANCE:
            return "Расстояние"
        case ExerciseAdditionalFieldType.TIME:
            return "Время выполнения"
        case ExerciseAdditionalFieldType.WEIGHT:
            return "Вес инвентаря"
        default:
            return "Только повоторения"
    }
}

export const mapWorkoutGroupsToRegistries = (workoutGroups: WorkoutGroup[]): string[] => {
    let workoutGroupRegistries: string[] = []
    workoutGroups.forEach(workoutGroup => {
        workoutGroupRegistries.push(workoutGroup.id)
    })
    return workoutGroupRegistries
}

export const mapBlocksToRegistries = (blocks: ExerciseBlock[]): ExerciseBlockRegistry[] => {
    let exerciseBlocks: ExerciseBlockRegistry[] = []
    blocks.forEach(block => {
        exerciseBlocks.push({
            exerciseId: block.exercise.id,
            elements: block.elements
        })
    })
    return exerciseBlocks;
}

export const mapWorkoutToWorkoutRegistry = (workout: Workout) => {
    const workoutRegistry: WorkoutRegistryItem = {
        id: workout.id,
        name: workout.name,
        description: workout.description,
        workoutGroups: mapWorkoutGroupsToRegistries(workout.workoutGroups),
        isDefault: false,
        blocks: mapBlocksToRegistries(workout.blocks),
    }
    return workoutRegistry
}