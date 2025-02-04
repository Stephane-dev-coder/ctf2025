interface AuthContextType {
  user: any;
  userData: any;
  currentChallenge: {
    id: string;
    name: string;
    type: string;
    description: string;
    hint: string;
    points: number;
    flag: string;
  } | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); 