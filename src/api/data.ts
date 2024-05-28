import { BodyMeasurement } from "../models/BodyMeasurement";
import { ExerciseRoutine } from "../models/ExerciseRoutine";

const bodyMeasurements: BodyMeasurement[] = [
  {
    date: '2023-01-01',
    weight: 70,
    chest: 95,
    waist: 80,
    hips: 90,
    thigh: 50,
  },
  {
    date: '2023-02-01',
    weight: 68,
    chest: 94,
    waist: 78,
    hips: 88,
    thigh: 49,
  },
  {
    date: '2023-03-01',
    weight: 67,
    chest: 93,
    waist: 77,
    hips: 87,
    thigh: 48,
  },
];

const exerciseRoutines: ExerciseRoutine[] = [
  { date: '2023-01-01', exercise: 'Bench Press', sets: 3, reps: 10, weight: 50 },
  { date: '2023-01-08', exercise: 'Bench Press', sets: 3, reps: 10, weight: 55 },
  { date: '2023-01-15', exercise: 'Bench Press', sets: 3, reps: 10, weight: 60 },
  { date: '2023-01-01', exercise: 'Squat', sets: 3, reps: 10, weight: 70 },
  { date: '2023-01-08', exercise: 'Squat', sets: 3, reps: 10, weight: 75 },
  { date: '2023-01-15', exercise: 'Squat', sets: 3, reps: 10, weight: 80 },
  { date: '2023-01-01', exercise: 'Deadlift', sets: 3, reps: 10, weight: 90 },
  { date: '2023-01-08', exercise: 'Deadlift', sets: 3, reps: 10, weight: 95 },
  { date: '2023-01-15', exercise: 'Deadlift', sets: 3, reps: 10, weight: 100 },
];

export const getProgressBody = async (userId: string): Promise<BodyMeasurement[]> => {
  try {
    const response = await fetch(`https://backend-fit-glife.vercel.app/user/${userId}/progress-body`);
    if (!response.ok) {
      throw new Error('Error fetching progress body measurements');
    }
    const data: BodyMeasurement[] = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProgressRoutines = async (userId: string): Promise<ExerciseRoutine[]> => {
  try {
    const response = await fetch(`https://backend-fit-glife.vercel.app/user/${userId}/progress-routines`);
    if (!response.ok) {
      throw new Error('Error fetching progress routines');
    }
    const data: ExerciseRoutine[] = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addProgressBody = async (userId: string): Promise<void> => {
  for (let index = 0; index < bodyMeasurements.length; index++) {
    try {
      const response = await fetch(`https://backend-fit-glife.vercel.app/user/${userId}/progress-body`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyMeasurements[index])
      });
      if (!response.ok) {
        throw new Error('Error posting data');
      }
      console.log('Data posted successfully');
    } catch (error) {
      console.log(error);
    }

  }
};

export const addProgressRoutines = async (userId: string): Promise<void> => {
  for (let index = 0; index < exerciseRoutines.length; index++) {
    try {
      const response = await fetch(`https://backend-fit-glife.vercel.app/user/${userId}/progress-routines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(exerciseRoutines[index])
      });
      if (!response.ok) {
        throw new Error('Error posting data');
      }
      console.log('Data posted successfully');
    } catch (error) {
      console.log(error);
    }

  }
};
