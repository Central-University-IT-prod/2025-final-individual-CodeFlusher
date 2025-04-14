import type {Workout, WorkoutRegistryItem} from "~/types/workout.type";
import type {ExerciseFilter, InventoryItem, MuscleGroups} from "~/types/exercise.type";
import {mapWorkout} from "~/scripts/workout.utils";
import {ExerciseDifficulty} from "~/types/exercise.type";
import {stringArrayGenerator} from "~/scripts/utils";

const skipByDifficulty = (workout: Workout, filter: ExerciseFilter) => {
    if(filter.difficulty.length > 0) {
        let difficultySet = new Set<ExerciseDifficulty>();
        workout.blocks.forEach(block => {
            difficultySet.add(block.exercise.difficulty)
        })
        if(difficultySet.difference(new Set<ExerciseDifficulty>(filter.difficulty)).size !== 0) {
            return true;
        }
    }
    return false;
}

const skipByMuscleGroups = (workout: Workout, filter: ExerciseFilter) => {
    let tag = false;
    if(filter.muscleGroups.length > 0) {
        let muscle: string[] = []
        workout.blocks.forEach(block => {
            stringArrayGenerator(block.exercise.muscleGroups, (o: object)=>(o as MuscleGroups).id).forEach((m: string) => {
                muscle.push(m);
            })
        })
        filter.muscleGroups.forEach(group => {
            if(muscle.indexOf(group.id) === -1){
                tag = true;
            }
        })
        if(tag){
            return true;
        }
    }
    return false;
}

const skipByInventory = (workout: Workout, filter: ExerciseFilter) => {
    let tag = false;
    if(filter.inventory.length > 0) {
        let inventory: string[] = []
        workout.blocks.forEach(block => {
            stringArrayGenerator(block.exercise.inventory, (o: object)=>(o as InventoryItem).id).forEach((m: string) => {
                inventory.push(m);
            })
        })
        filter.inventory.forEach(group => {
            if(inventory.indexOf(group.id) === -1){
                tag = true;
            }
        })
        if(tag){
            return true;
        }
    }
    return false;
}

export const filterWorkoutsBy = (workouts: WorkoutRegistryItem[], filter: ExerciseFilter) => {
    let newWorkouts: WorkoutRegistryItem[] = [];
    workouts.forEach(workout => {
        const mappedWorkout = mapWorkout(workout)
        if (mappedWorkout) {
            if(filter.name){
                if(mappedWorkout.name.toLowerCase().indexOf(filter.name.toLowerCase()) === -1){
                    return;
                }
            }
            if(skipByDifficulty(mappedWorkout, filter)){
                return;
            }
            if(skipByMuscleGroups(mappedWorkout, filter)){
                return;
            }
            if(skipByInventory(mappedWorkout, filter)){
                return;
            }
        }
        newWorkouts.push(workout);
    })
    return newWorkouts;
}