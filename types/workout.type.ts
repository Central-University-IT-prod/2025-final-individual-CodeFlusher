import type {DefaultItem, ExerciseGroup, Identifiable, InventoryItem, MuscleGroups} from "~/types/exercise.type";
import {ExerciseDifficulty} from "~/types/exercise.type";

export enum ExerciseAdditionalFieldType {
    WEIGHT = "weight",
    DISTANCE = "distance",
    TIME = "time",
    NONE = ''
}

export type CanBeFinished = {
    isFinished: boolean
}

export type ExerciseElement = {
    repeats: number,
    weight?: number,
    done?: boolean,
}

export type ExerciseBlockRegistry = {
    exerciseId: string,
    elements: ExerciseElement[],
}

export type Exercise = Identifiable & DefaultItem & {
    name: string
    description: string
    descriptionLong: string[]
    url?: string
    difficulty: ExerciseDifficulty
    assignedGroups: ExerciseGroup[]
    inventory: InventoryItem[]
    muscleGroups: MuscleGroups[]
    requireAdditionalFields: ExerciseAdditionalFieldType
}

export type ExerciseBlock = {
    exercise: Exercise,
    elements: ExerciseElement[],
}

export type WorkoutGroup = Identifiable & DefaultItem & {
    name: string,
}

export type WorkoutRegistryItem = Identifiable & DefaultItem & {
    name: string,
    workoutGroups: string[],
    description: string,
    blocks: ExerciseBlockRegistry[],
    _special_field_points?: number,
}

export type Workout = Identifiable & {
    name: string,
    workoutGroups: WorkoutGroup[],
    description: string,
    blocks: ExerciseBlock[],
};
