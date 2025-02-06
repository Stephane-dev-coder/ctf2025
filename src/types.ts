export interface Challenge {
  id: string;
  name: string;
  district: string;
  message: string;
  hint: string;
  completed: boolean;
  flag: string;
  points: number;
}

export interface User {
  username: string;
  score: number;
  currentDistrict: string;
  completedChallenges: string[];
}

export interface ScoreEntry {
  username: string;
  score: number;
  completedChallenges: string[];
  currentDistrict: string;
  startTime: string;
}