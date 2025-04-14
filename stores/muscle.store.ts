import type {MuscleGroups} from "~/types/exercise.type";

//Группы мышц созданы с помощью нейронных сетей
export const availableMuscleGroups: MuscleGroups[] = [
    {
        id: 'chest',
        name: 'Грудь',
        emoji: '🏋️',
        exercisePoints: 8,
    },
    {
        id: 'back',
        name: 'Спина',
        emoji: '🚴',
        exercisePoints: 9,
    },
    {
        id: 'shoulders',
        name: 'Плечи',
        emoji: '💪',
        exercisePoints: 7,
    },
    {
        id: 'biceps',
        name: 'Бицепс',
        emoji: '💪',
        exercisePoints: 6,
    },
    {
        id: 'triceps',
        name: 'Трицепс',
        emoji: '💪',
        exercisePoints: 6,
    },
    {
        id: 'forearms',
        name: 'Предплечья',
        emoji: '🤲',
        exercisePoints: 5,
    },
    {
        id: 'abs',
        name: 'Пресс',
        emoji: '🦵',
        exercisePoints: 7,
    },
    {
        id: 'quads',
        name: 'Квадрицепсы',
        emoji: '🦵',
        exercisePoints: 9,
    },
    {
        id: 'calves',
        name: 'Икры',
        emoji: '🦶',
        exercisePoints: 6,
    },
    {
        id: 'glutes',
        name: 'Ягодицы',
        emoji: '🍑',
        exercisePoints: 8,
    },
    {
        id: 'lats',
        name: 'Широчайшие мышцы спины',
        emoji: '🚴',
        exercisePoints: 8,
    },
    {
        id: 'lower_back',
        name: 'Поясница',
        emoji: '🚴',
        exercisePoints: 7,
    },
    {
        id: 'adductors',
        name: 'Приводящие мышцы бедра',
        emoji: '🦵',
        exercisePoints: 6,
    },
    {
        id: 'abductors',
        name: 'Отводящие мышцы бедра',
        emoji: '🦵',
        exercisePoints: 6,
    },
    {
        id: 'cardio',
        name: 'Кардио',
        emoji: '🏃',
        exercisePoints: 10,
    },
];


export const getMuscleGroupById = (id: string) => {
    return availableMuscleGroups.find(i => i.id === id);
};