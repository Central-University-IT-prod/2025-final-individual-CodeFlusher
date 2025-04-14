import type {ExerciseFilter, FilterItem} from "~/types/exercise.type";

export const filterBy = (items: FilterItem[], filter: ExerciseFilter) => {
    if (filter.name) {
        items = items.filter(item => {
            return item.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
        })
    }
    if (filter.difficulty.length > 0) {
        items = items.filter(item => filter.difficulty.findIndex(el => el == item.difficulty) !== -1)
    }
    if (filter.inventory.length > 0) {
        items = items.filter(item => {
            if (!item.inventory) {
                return false;
            }
            for (const inventoryItem of filter.inventory) {
                if (item.inventory.findIndex(item => item == inventoryItem.id) === -1) {
                    return false
                }
            }
            return true;
        })
    }
    if (filter.muscleGroups.length > 0) {
        items = items.filter(item => {
            if (!item.muscleGroups) {
                return false;
            }
            for (const muscleGroupItem of filter.muscleGroups) {
                if (item.muscleGroups.findIndex(item => item == muscleGroupItem.id) === -1) {
                    return false
                }
            }
            return true;
        })
    }
    return items;
}