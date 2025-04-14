import type {InventoryItem} from "~/types/exercise.type";

//Предзагатовленные предметы инвентаря созданы с помощью нейронных сетей
export const defaultInventoryItems: InventoryItem[] = [
    {
        id: 'default-inventory-item-0',
        name: 'Гиря',
        emoji: '🏋️',
        isDefault: true
    },
    {
        id: 'default-inventory-item-1',
        name: 'Штанга',
        emoji: '🏋️',
        isDefault: true
    },
    {
        id: 'default-inventory-item-2',
        name: 'Гантели',
        emoji: '💪',
        isDefault: true
    },
    {
        id: 'default-inventory-item-3',
        name: 'Блочный Тренажер',
        emoji: '🏗️',
        isDefault: true
    },
    {
        id: 'default-inventory-item-4',
        name: 'Эспандер',
        emoji: '🔄',
        isDefault: true
    },
    {
        id: 'default-inventory-item-5',
        name: 'Скакалка',
        emoji: '🦘',
        isDefault: true
    },
    {
        id: 'default-inventory-item-6',
        name: 'Мяч для фитнеса',
        emoji: '🏀',
        isDefault: true
    },
    {
        id: 'default-inventory-item-7',
        name: 'Ролик для пресса',
        emoji: '🛞',
        isDefault: true
    },
    {
        id: 'default-inventory-item-8',
        name: 'Тренажер для гребли',
        emoji: '🚣',
        isDefault: true
    },
    {
        id: 'default-inventory-item-9',
        name: 'Степ-платформа',
        emoji: '🪜',
        isDefault: true
    },
    {
        id: 'default-inventory-item-10',
        name: 'Турник',
        emoji: '🪝',
        isDefault: true
    },
    {
        id: 'default-inventory-item-11',
        name: 'Брусья',
        emoji: '🛠️',
        isDefault: true
    },
    {
        id: 'default-inventory-item-12',
        name: 'Медбол',
        emoji: '🏐',
        isDefault: true
    },
    {
        id: 'default-inventory-item-13',
        name: 'Тренажер для кардио',
        emoji: '🏃',
        isDefault: true
    },
    {
        id: 'default-inventory-item-14',
        name: 'Пояс для отягощений',
        emoji: '⛓️',
        isDefault: true
    },
    {
        id: 'default-inventory-item-15',
        name: 'Коврик для йоги',
        emoji: '🧘',
        isDefault: true
    },
    {
        id: 'default-inventory-item-16',
        name: 'Утяжелители для ног',
        emoji: '🦵',
        isDefault: true
    },
    {
        id: 'default-inventory-item-17',
        name: 'Утяжелители для рук',
        emoji: '💪',
        isDefault: true
    },
    {
        id: 'default-inventory-item-18',
        name: 'Тренажер для баланса',
        emoji: '🎯',
        isDefault: true
    },
    {
        id: 'default-inventory-item-19',
        name: 'Тренажер для растяжки',
        emoji: '🧘‍♂️',
        isDefault: true
    }
];

export const useInventoryRegistry = defineStore('inventory_registry',
    () => {
        const registeredInventoryItems = ref<InventoryItem[]>([]);

        const register = (item: InventoryItem) => {
            removeItem(item);
            registeredInventoryItems.value.push(item)
        }

        const removeItem = (item: InventoryItem) => {
            registeredInventoryItems.value = registeredInventoryItems.value.filter(i => i !== item);
        }

        const getAllInventoryItems = () => {
            return registeredInventoryItems.value.concat(defaultInventoryItems);
        }

        const getInventoryItemById = (id: string) => {
            return getAllInventoryItems().find(i => i.id === id);
        }

        return {registeredInventoryItems, register, removeItem, getAllInventoryItems, getInventoryItemById};

    }, {
        persist: {
            key: 'inventory_localstorage',
            storage: localStorage

        },
    })