import type {Identifiable} from "~/types/exercise.type";
import type {CanBeFinished, Workout} from "~/types/workout.type";

export type WorkoutSession = Identifiable & CanBeFinished & {
    workout: Workout,
    countedTime: number,
    startTime: number,
}