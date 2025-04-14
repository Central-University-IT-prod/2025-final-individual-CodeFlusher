import type {WorkoutSession} from "~/types/session.type";

export class HistoryStorage {

    history = ref<WorkoutSession[]>([]);

    constructor() {
        this.history.value = this.parseData()
    }

    saveData() {
        localStorage.setItem('workout_history', JSON.stringify(this.history.value))
    }

    parseData() {
        if (!localStorage.getItem('workout_history')) {
            localStorage.setItem('workout_history', JSON.stringify([]));
        }

        const item = localStorage.getItem('workout_history');
        if (item) {
            this.history.value = JSON.parse(item);
        } else {
            this.history.value = [];
        }
        return this.history.value;
    }

    public saveToHistory(workout: WorkoutSession) {
        this.removeFromHistory(workout);
        this.history.value.push(workout);
        this.saveData()
    }

    public removeSessionById(id: string) {
        this.history.value = this.history.value.filter(h => h.id !== id);
        this.saveData()
    }

    public removeFromHistory(workout: WorkoutSession) {
        this.removeSessionById(workout.id);
    }

    public getSessionById(id: string) {
        return this.history.value.find(h => h.id === id);
    }
}

export const useHistoryStorage = new HistoryStorage();