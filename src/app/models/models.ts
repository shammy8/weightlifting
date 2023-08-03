/**
 * TODO not used yet
 */
export interface User<T = object> extends PocketBaseRecord<T> {
  avatar: string;
  email: string;
  emailVisibility: boolean;
  name: string;
  username: string;
  verified: boolean;
}

export interface Session<T = object> extends PocketBaseRecord<T> {
  date: string;
  notes: string;
  userId: string;
}

export interface GroupOfSet<T = object> extends PocketBaseRecord<T> {
  exerciseId: string;
  order: number;
  sessionId: string;
  sets: Set[];
}

export interface Set {
  reps?: number | null;
  time?: number | null;
  weight?: number | null;
  distance?: number | null;
  painScore?: number | null;
  note?: string | null;
}

/**
 * TODO delete this and delete table on pocket base too
 */
export interface SetCollection<T = object> extends PocketBaseRecord<T> {
  groupOfSetsId: string;
  order: number;
  reps: number;
  time: number;
  weight: number;
}

export interface Exercise<T = object> extends PocketBaseRecord<T> {
  hidden: boolean;
  name: string;
  type: ExerciseType;
  userId: string;
}

// TODO: is this better as enum and a Map
// TODO: add height?? Or does it not really matter reps,time, distance are all the same?
export type ExerciseType = 'reps' | 'time' | 'distance';

// There is a class called Record in pocket base but doesn't allow you to configure the expand
interface PocketBaseRecord<T = object> {
  collectionId: string;
  collectionName: string;
  /**
   * SQL Date
   */
  created: string;
  id: string;
  /**
   * SQL Date
   */
  updated: string;
  expand: T;
}

export const emptyPocketBaseRecord: PocketBaseRecord = {
  collectionId: '',
  collectionName: '',
  created: '',
  id: '',
  updated: '',
  expand: {},
};

// TODO currently only used in this file
export const emptyExercise: Exercise = {
  ...emptyPocketBaseRecord,
  hidden: false,
  name: '',
  type: 'reps',
  userId: '',
};

export const emptyGroupOfSet: GroupOfSet<{ exerciseId: Exercise }> = {
  ...emptyPocketBaseRecord,
  order: 0,
  exerciseId: '',
  sessionId: '',
  sets: [],
  expand: { exerciseId: { ...emptyExercise } },
};
