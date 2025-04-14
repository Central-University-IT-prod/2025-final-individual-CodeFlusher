import {ExerciseAdditionalFieldType} from "~/types/workout.type";

export enum ExerciseDifficulty {
    EASY,
    MIDDLE,
    HARD
}

export type DefaultItem = {
    isDefault: boolean
}

export type Identifiable = {
    id: string;
}

export type InventoryItem = Identifiable & DefaultItem & {
    name: string
    emoji?: string
}

export type MuscleGroups = Identifiable & {
    id: string
    name: string
    emoji?: string
    exercisePoints: number
}

export type ExerciseGroup = Identifiable & DefaultItem & {
    name: string,
}

export type ExerciseType = Identifiable & DefaultItem & {
    id: string
    name: string
    description: string
    descriptionLong: string[]
    url?: string
    difficulty: ExerciseDifficulty
    assignedGroups: string[]
    inventory: string[]
    muscleGroups: string[]
    requireAdditionalFields: ExerciseAdditionalFieldType
}

export type ExerciseFilter = {
    name: string
    difficulty: ExerciseDifficulty[]
    inventory: InventoryItem[]
    muscleGroups: MuscleGroups[]
}

export type FilterItem = {
    name: string,
    inventory: string[]
    muscleGroups: string[]
    assignedGroups: string[]
    difficulty?: ExerciseDifficulty
}