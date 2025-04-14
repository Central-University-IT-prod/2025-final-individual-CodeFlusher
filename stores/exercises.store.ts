import {defineStore} from "pinia";
import {ExerciseDifficulty, type ExerciseType} from "~/types/exercise.type";
import {ExerciseAdditionalFieldType} from "~/types/workout.type";

//Предзагатовленные тренировки созданы с помощью нейронных сетей
export const defaultExercises: ExerciseType[] = [
    {
        id: 'default-0',
        name: "Жим лежа",
        description: "Подъем штанги над грудью",
        descriptionLong: [
            "Лягте на скамью, ноги поставьте на пол.",
            "Возьмите штангу хватом шире плеч.",
            "Опустите штангу к груди, сгибая локти.",
            "Выжмите штангу вверх, выпрямляя руки.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/rIZirGYcbD8",
        difficulty: ExerciseDifficulty.HARD,
        assignedGroups: ['default-chest'],
        inventory: ['default-inventory-item-1'],
        muscleGroups: ['chest'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.WEIGHT,
    },
    {
        id: 'default-1',
        name: "Подтягивания на турнике",
        description: "Подъем тела на турнике",
        descriptionLong: [
            "Возьмитесь за турник хватом шире плеч.",
            "Повисните на прямых руках.",
            "Подтяните тело вверх, сгибая локти.",
            "Опуститесь в исходное положение.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/K5UVjeNCKmY",
        difficulty: ExerciseDifficulty.MIDDLE,
        assignedGroups: ['default-back'],
        inventory: ['default-inventory-item-10'],
        muscleGroups: ['back', 'biceps'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.NONE,
    },
    {
        id: 'default-2',
        name: "Приседания со штангой",
        description: "Приседания со штангой на плечах",
        descriptionLong: [
            "Поставьте ноги на ширине плеч.",
            "Положите штангу на плечи.",
            "Согните ноги в коленях, опускаясь вниз.",
            "Вернитесь в исходное положение.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/3F6v7KCdD0k",
        difficulty: ExerciseDifficulty.HARD,
        assignedGroups: ['default-legs'],
        inventory: ['default-inventory-item-1'],
        muscleGroups: ['quads', 'glutes', 'hamstrings'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.WEIGHT,
    },
    {
        id: 'default-3',
        name: "Отжимания от пола",
        description: "Отжимания от пола",
        descriptionLong: [
            "Примите упор лежа, руки на ширине плеч.",
            "Опустите тело, сгибая локти.",
            "Поднимите тело вверх, выпрямляя руки.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/vO0ItS53Jno",
        difficulty: ExerciseDifficulty.EASY,
        assignedGroups: ['default-chest'],
        inventory: [],
        muscleGroups: ['chest', 'shoulders', 'triceps'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.NONE,
    },
    {
        id: 'default-4',
        name: "Становая тяга",
        description: "Подъем штанги с пола до уровня бедер",
        descriptionLong: [
            "Поставьте ноги на ширине плеч.",
            "Возьмите штангу хватом сверху.",
            "Поднимите штангу, выпрямляя спину и ноги.",
            "Опустите штангу на пол.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/duSnLRneftc",
        difficulty: ExerciseDifficulty.HARD,
        assignedGroups: ['default-back'],
        inventory: ['default-inventory-item-1'],
        muscleGroups: ['back', 'glutes', 'hamstrings'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.WEIGHT,
    },
    {
        id: 'default-5',
        name: "Скручивания на пресс",
        description: "Скручивания для мышц пресса",
        descriptionLong: [
            "Лягте на пол, согните ноги в коленях.",
            "Руки за головой.",
            "Поднимите верхнюю часть тела, скручиваясь.",
            "Опуститесь в исходное положение.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/H8xSHCAjM-I",
        difficulty: ExerciseDifficulty.EASY,
        assignedGroups: ['default-abs'],
        inventory: ['default-inventory-item-15'],
        muscleGroups: ['abs'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.NONE,
    },
    {
        id: 'default-6',
        name: "Жим гантелей сидя",
        description: "Жим гантелей в положении сидя",
        descriptionLong: [
            "Сядьте на скамью, возьмите гантели.",
            "Поднимите гантели до уровня плеч.",
            "Выжмите гантели вверх, выпрямляя руки.",
            "Опустите гантели до уровня плеч.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/gVoVKUmyXVQ",
        difficulty: ExerciseDifficulty.MIDDLE,
        assignedGroups: ['default-shoulders'],
        inventory: ['default-inventory-item-2'],
        muscleGroups: ['shoulders'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.WEIGHT,
    },
    {
        id: 'default-7',
        name: "Выпады с гантелями",
        description: "Выпады с гантелями",
        descriptionLong: [
            "Возьмите гантели в руки.",
            "Сделайте шаг вперед одной ногой.",
            "Опустите тело, сгибая колени.",
            "Вернитесь в исходное положение.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/d3xVz2ObWyg",
        difficulty: ExerciseDifficulty.MIDDLE,
        assignedGroups: ['default-legs'],
        inventory: ['default-inventory-item-2'],
        muscleGroups: ['quads', 'glutes', 'hamstrings'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.WEIGHT,
    },
    {
        id: 'default-8',
        name: "Планка",
        description: "Статическое упражнение для кора",
        descriptionLong: [
            "Примите упор лежа на предплечьях.",
            "Держите тело прямым, не прогибаясь.",
            "Удерживайте положение необходимое время."
        ],
        url: "https://youtube.com/embed/0JtBS11DGDk",
        difficulty: ExerciseDifficulty.EASY,
        assignedGroups: ['default-abs'],
        inventory: ['default-inventory-item-15'],
        muscleGroups: ['abs', 'obliques'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.TIME,
    },
    {
        id: 'default-9',
        name: "Тяга блока к груди",
        description: "Тяга блока к груди",
        descriptionLong: [
            "Сядьте на тренажер, возьмите рукоять.",
            "Подтяните рукоять к груди, сводя лопатки.",
            "Верните рукоять в исходное положение.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/GTs3xqB_ZgQ",
        difficulty: ExerciseDifficulty.MIDDLE,
        assignedGroups: ['default-back'],
        inventory: ['default-inventory-item-3'],
        muscleGroups: ['back', 'biceps'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.WEIGHT,
    },
    {
        id: 'default-10',
        name: "Бег на дорожке",
        description: "Бег на беговой дорожке",
        descriptionLong: [
            "Встаньте на дорожку, установите скорость.",
            "Начните бег, держась за поручни.",
            "Бегите необходимое время или расстояние."
        ],
        url: "https://youtube.com/embed/DoZIHU9hs6U",
        difficulty: ExerciseDifficulty.EASY,
        assignedGroups: ['default-cardio'],
        inventory: ['default-inventory-item-13'],
        muscleGroups: ['cardio'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.DISTANCE,
    },
    {
        id: 'default-11',
        name: "Подъем на носки",
        description: "Подъем на носки с весом",
        descriptionLong: [
            "Встаньте прямо, возьмите вес.",
            "Поднимитесь на носки, напрягая икры.",
            "Опуститесь в исходное положение.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/zUShXqdXJbY",
        difficulty: ExerciseDifficulty.EASY,
        assignedGroups: ['default-calves'],
        inventory: ['default-inventory-item-1'],
        muscleGroups: ['calves'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.WEIGHT,
    },
    {
        id: 'default-12',
        name: "Французский жим",
        description: "Жим штанги для трицепсов",
        descriptionLong: [
            "Лягте на скамью, возьмите штангу.",
            "Опустите штангу ко лбу, сгибая локти.",
            "Выжмите штангу вверх, выпрямляя руки.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/CiTxLNNudqk",
        difficulty: ExerciseDifficulty.MIDDLE,
        assignedGroups: ['default-arms'],
        inventory: ['default-inventory-item-1', 'default-inventory-item-2'],
        muscleGroups: ['triceps'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.WEIGHT,
    },
    {
        id: 'default-13',
        name: "Махи гантелями в стороны",
        description: "Махи гантелями для плеч",
        descriptionLong: [
            "Встаньте прямо, возьмите гантели.",
            "Поднимите гантели в стороны до уровня плеч.",
            "Опустите гантели в исходное положение.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/Q3j7XYxrJtk",
        difficulty: ExerciseDifficulty.MIDDLE,
        assignedGroups: ['default-shoulders'],
        inventory: ['default-inventory-item-2'],
        muscleGroups: ['shoulders'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.WEIGHT,
    },
    {
        id: 'default-14',
        name: "Гиперэкстензия",
        description: "Упражнение для поясницы",
        descriptionLong: [
            "Лягте на тренажер, зафиксируйте ноги.",
            "Опустите тело вниз, сгибаясь в пояснице.",
            "Поднимите тело вверх, выпрямляя спину.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/qtvf0fe7nFE",
        difficulty: ExerciseDifficulty.EASY,
        assignedGroups: ['default-back'],
        inventory: ['default-inventory-item-7'],
        muscleGroups: ['lower_back'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.NONE,
    },
    {
        id: 'default-15',
        name: "Берпи",
        description: "Комплексное упражнение с прыжком и отжиманием",
        descriptionLong: [
            "Примите положение стоя.",
            "Выполните приседание, касаясь руками пола.",
            "Оттолкнитесь ногами назад, приняв упор лёжа.",
            "Выполните отжимание.",
            "Вернитесь в положение приседа и выпрыгните вверх.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/50-0F_gQHFI",
        difficulty: ExerciseDifficulty.HARD,
        assignedGroups: ['default-cardio'],
        inventory: [],
        muscleGroups: ['cardio'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.NONE,
    },
    {
        id: 'default-16',
        name: "Скакалка",
        description: "Прыжки на скакалке",
        descriptionLong: [
            "Возьмите скакалку за рукояти.",
            "Начните вращать скакалку, подпрыгивая при каждом проходе.",
            "Приземляйтесь мягко, слегка сгибая колени.",
            "Продолжайте выполнять прыжки в заданном ритме."
        ],
        url: "https://youtube.com/embed/PHG3Z7dYGs0",
        difficulty: ExerciseDifficulty.MIDDLE,
        assignedGroups: ['default-cardio'],
        inventory: ['default-inventory-item-5'],
        muscleGroups: ['cardio'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.NONE,
    },
    {
        id: 'default-17',
        name: "Гребной тренажер",
        description: "Имитация гребли на тренажере",
        descriptionLong: [
            "Сядьте на тренажер, закрепите ноги.",
            "Возьмитесь за рукоять, слегка согнув локти.",
            "Оттолкнитесь ногами и потяните рукоять к груди.",
            "Вернитесь в исходное положение.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/pdA28b32MOQ",
        difficulty: ExerciseDifficulty.MIDDLE,
        assignedGroups: ['default-cardio'],
        inventory: ['default-inventory-item-8'],
        muscleGroups: ['cardio', 'back', 'biceps'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.DISTANCE,
    },
    {
        id: 'default-18',
        name: "Тяга гантелей в наклоне",
        description: "Тяга гантелей к поясу в наклоне",
        descriptionLong: [
            "Встаньте, слегка согните ноги и наклонитесь вперёд.",
            "Возьмите гантели в руки, ладони направлены к телу.",
            "Подтяните гантели к поясу, сводя лопатки.",
            "Опустите гантели в исходное положение.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/Ch4UZW_j08Q",
        difficulty: ExerciseDifficulty.MIDDLE,
        assignedGroups: ['default-back'],
        inventory: ['default-inventory-item-2'],
        muscleGroups: ['back', 'lats'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.WEIGHT,
    },
    {
        id: 'default-19',
        name: "Разведение рук с эспандером",
        description: "Упражнение на растяжение груди с эспандером",
        descriptionLong: [
            "Возьмите эспандер за ручки, расположите его перед собой.",
            "Разведите руки в стороны, растягивая эспандер.",
            "Медленно вернитесь в исходное положение.",
            "Повторите необходимое количество раз."
        ],
        url: "https://youtube.com/embed/mTYReas7C-Q",
        difficulty: ExerciseDifficulty.EASY,
        assignedGroups: ['default-chest'],
        inventory: ['default-inventory-item-4'],
        muscleGroups: ['chest'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.NONE,
    },
    {
        id: 'default-20',
        name: "Баланс на платформе",
        description: "Упражнение на баланс на тренажере",
        descriptionLong: [
            "Встаньте на балансировочную платформу.",
            "Держите равновесие, напрягая мышцы корпуса.",
            "Сохраняйте положение как можно дольше."
        ],
        difficulty: ExerciseDifficulty.MIDDLE,
        assignedGroups: ['default-abs'],
        inventory: ['default-inventory-item-18'],
        muscleGroups: ['abs', 'obliques'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.TIME,
    },
    {
        id: 'default-21',
        name: "Растяжка на тренажере",
        description: "Растяжка мышц ног с помощью тренажера",
        descriptionLong: [
            "Сядьте на тренажер, зафиксируйте ноги.",
            "Медленно разводите ноги, растягивая мышцы.",
            "Задержитесь в крайнем положении.",
            "Вернитесь в исходное положение."
        ],
        difficulty: ExerciseDifficulty.EASY,
        assignedGroups: ['default-legs'],
        inventory: ['default-inventory-item-19'],
        muscleGroups: ['adductors', 'abductors'],
        isDefault: true,
        requireAdditionalFields: ExerciseAdditionalFieldType.TIME,
    }
];

export const useExerciseStore = defineStore('exercises_registry', () => {
    const registeredItems = ref<ExerciseType[]>([])

    const registerNew = (exercise: ExerciseType) => {
        removeItem(exercise)
        registeredItems.value.push(exercise);
    }

    const removeItem = (exercise: ExerciseType) => {
        registeredItems.value = registeredItems.value.filter(item => item.id !== exercise.id);
    }

    const getAllItems = () => {
        return registeredItems.value.concat(defaultExercises);
    }

    const getExerciseById = (id: string) => {
        return getAllItems().find(item => item.id === id);
    }

    return {registeredItems, registerNew, removeItem, getAllItems, getExerciseById};
}, {
    persist: {
        key: 'exercise_localstorage',
        storage: localStorage

    }
})