import type {WorkoutSession} from "~/types/session.type";
import type {WorkoutRegistryItem} from "~/types/workout.type";
import {mapWorkout} from "~/scripts/workout.utils";
import type {ExerciseType} from "~/types/exercise.type";
import {useHistoryStorage} from "~/stores/history.local.storage";

export class SessionStore {
    public sessions = ref<WorkoutSession[]>([])

    constructor() {
        this.parseData()
    }

    parseData(): void {
        if (!localStorage.getItem("sessions_storage")) {
            localStorage.setItem("sessions_storage", JSON.stringify([]))
        }
        const parsedData = localStorage.getItem("sessions_storage");
        if (parsedData) {
            this.sessions.value = JSON.parse(parsedData);
        } else {
            this.sessions.value = [];
        }
    }

    saveAll(): void {
        localStorage.setItem('sessions_storage', JSON.stringify(this.sessions.value));
        this.parseData()
    }

    public openNewSession(workout: WorkoutRegistryItem): WorkoutSession {
        const newSession: WorkoutSession = {
            id: `workout-session-${crypto.randomUUID()}`,
            isFinished: false,
            countedTime: 0,
            workout: mapWorkout(workout),
            startTime: Date.now(),
        }
        this.sessions.value.push(newSession)
        this.saveAll()
        return newSession;
    }

    public openNewSessionFromExercise(exercise: ExerciseType) {
        const {incrementImmediateWorkouts} = useWorkoutRegistry()
        const workout: WorkoutRegistryItem = {
            id: `immediate-workout-${crypto.randomUUID()}`,
            name: `Произвольная тренировка №${incrementImmediateWorkouts()}`,
            workoutGroups: ['immediate'],
            isDefault: false,
            description: `Произвольная тренировка, созданная ${new Date().toLocaleString()}`,
            blocks: [
                {
                    exerciseId: exercise.id,
                    elements: []
                }
            ]
        };
        return this.openNewSession(workout);
    }

    public closeSession(session: WorkoutSession) {
        this.declineSession(session)
        session.isFinished = true;
        useHistoryStorage.saveToHistory(session)
        this.saveAll()
        return session;
    }

    public updateSession(session: WorkoutSession) {
        if (!session.isFinished) {
            this.sessions.value = this.sessions.value.filter(el => el.id !== session.id)
            this.sessions.value.push(session)
            this.saveAll()
        }
    }

    public declineSessionById(id: string) {
        this.sessions.value = this.sessions.value.filter(el => el.id !== id)
        this.saveAll()
    }

    public declineSession(session: WorkoutSession) {
        session.isFinished = true
        this.sessions.value = this.sessions.value.filter(el => el.id !== session.id)
        this.saveAll()
    }

    public getSessionById(id: string) {
        return this.sessions.value.find(el => el.id === id)
    }

    public getSessionIndex(id: string) {
        return this.sessions.value.findIndex(el => el.id === id)
    }
}

export const useSessionLocalStore = new SessionStore();