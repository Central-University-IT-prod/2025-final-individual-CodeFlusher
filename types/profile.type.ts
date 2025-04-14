export type PhysicalProfile = {
    weight: number;
    height: number;
}

export enum TrainingGoals {
    MUSCLE_GAIN = 'muscle_gain',
    DROP_WEIGHT = 'drop_weight',
    KEEP_FIT = 'keep_fit'
}

export enum Track {
    BETA = 'beta',
    SIGMA = 'sigma',
    OMEGA = 'omega',
}

export type Profile = {
    name: string
    track: Track
    experience: number
    trainingGoal: TrainingGoals
    weight: number,
    height: number,
}