export interface User {
  username: string;
  score: number;
  currentDistrict: string;
  completedChallenges: string[];
  startTime?: string;
  lastActive?: string;
}

export interface ScoreEntry {
  username: string;
  score: number;
  currentDistrict: string;
  completedChallenges: string[];
}

export interface Challenge {
  id: string;
  name: string;
  district: string;
  message: string;
  hint: string;
  points: number;
  flag: string;
  completed: boolean;
  description?: string;
} 