export interface Session {
  done: boolean;
  active: boolean;
  city: string;
  showDate: string;
  stage: string;
  secretWord: string;
  sessionID: string;
  createdAt: number;
  updatedAt: number;
  candidatesLeft: string[];
}

export interface Round {
  roundID: string;
  parentSessionID: string;
  number: number;
  candidatesInRound: string[];
  roundActive: boolean;
  votingActive: boolean;
  done: boolean;
  displayResults: boolean;
  timer: number;
  voteCount?: [string, number][];
}

export interface Vote {
  voteID: string;
  candidate: string;
  userEmail: string;
  roundID: string;
}

export interface User {
  email: string | null;
  uid: string;
}

export interface AuthContextType {
  user: User | null;
  isLoadedAuth: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  register: (email: string, password: string) => void;
  registerWithRandomEmail: () => void;
}

export interface SessionContextType {
  isLoaded: boolean;
  activeSession: Session | null;
  activeRound: Round | null;
  votesInActiveRound: Vote[];
  userVoteInActiveRound: Vote | null;
  currCandidates: string[];
  timer: number;
}

export interface AdminContextType {
  isLoaded: boolean;
  sessions: Session[] | null;
  rounds: Round[] | null;
  votes: Vote[] | null;
}
