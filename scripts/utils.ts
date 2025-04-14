import {ExerciseDifficulty, type Identifiable} from "~/types/exercise.type";
import {Track} from "~/types/profile.type";

export const excludeEverythingBesides = (list: Identifiable[], filterOut: Identifiable[]) => {
    return list.filter(item => {
        return filterOut.findIndex(i => i.id === item.id) === -1;
    })
}

export const deepFilterArray = (list: Identifiable[], func: (item: Identifiable) => string[], id: Identifiable) => {
    return list.filter(i => func(i).findIndex(i2 => i2 === id.id) !== -1);
}

export const anyIdInDeepArray = (list: Identifiable[], func: (item: Identifiable) => string[], id: Identifiable) => {
    return list.findIndex(i => func(i).findIndex(i2 => i2 === id.id) !== -1) !== -1;
}

export const stringArrayGenerator = (list: object[], func: (o: object) => string): string[] => {
    let stringArray: string[] = []
    for (let item of list) {
        stringArray.push(func(item));
    }
    return stringArray;
}

export const getStringByDifficulty = (difficulty: ExerciseDifficulty) => {
    switch (difficulty) {
        case ExerciseDifficulty.EASY:
            return 'Простое'
        case ExerciseDifficulty.MIDDLE:
            return 'Среднее'
        case ExerciseDifficulty.HARD:
            return 'Сложное'
    }
}

export const getStyleByDifficulty = (difficulty: ExerciseDifficulty) => {
    switch (difficulty) {
        case ExerciseDifficulty.HARD:
            return 'text-red-500'
        case ExerciseDifficulty.MIDDLE:
            return 'text-orange-500'
        case ExerciseDifficulty.EASY:
            return 'text-accent-dark'
    }
}

export const formatSeconds = (seconds: number) => {
    if (!seconds) return '00:00:00';
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

export const clamp = (value: number, min: number = Number.MIN_VALUE, max: number = Number.MAX_VALUE): number => {
    return Math.max(Math.min(value, max), min);
}

export const getNameForTrack = (track: Track) => {
    switch (track){
        case Track.BETA:
            return 'Путь культуризма'
        case Track.SIGMA:
            return 'Путь гигачада'
        case Track.OMEGA:
            return 'Путь скуфа'
    }
}