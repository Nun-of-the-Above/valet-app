import { useEffect, useState } from "react";

// Mock data
const MOCK_SESSIONS = [
  {
    sessionID: "session1",
    active: true,
    secretWord: "test",
    name: "Test Session",
  },
];

const MOCK_ROUNDS = [
  {
    roundID: "round1",
    parentSessionID: "session1",
    number: 1,
    active: false,
  },
  {
    roundID: "round2",
    parentSessionID: "session1",
    number: 2,
    active: false,
  },
  {
    roundID: "round3",
    parentSessionID: "session1",
    number: 3,
    active: false,
  },
];

const MOCK_VOTES = [
  {
    roundID: "round1",
    votes: [],
  },
  {
    roundID: "round2",
    votes: [],
  },
  {
    roundID: "round3",
    votes: [],
  },
];

export function useSessionData() {
  const [votes, setVotes] = useState(null);
  const [rounds, setRounds] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [allSessions, setAllSessions] = useState(null);
  const [timer, setTimer] = useState(0);
  const [value, setValue] = useState({});

  // Mock timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get all sessions
  useEffect(() => {
    setAllSessions(MOCK_SESSIONS);
  }, []);

  // Get active session
  useEffect(() => {
    const session = MOCK_SESSIONS.find((s) => s.active);
    setActiveSession(session || {});
  }, []);

  // Get rounds
  useEffect(() => {
    if (!activeSession?.sessionID) return;

    const sessionRounds = MOCK_ROUNDS.filter(
      (r) => r.parentSessionID === activeSession.sessionID
    ).sort((a, b) => a.number - b.number);

    setRounds(sessionRounds.length >= 3 ? sessionRounds : null);
  }, [activeSession]);

  // Get votes
  useEffect(() => {
    if (!rounds) return;
    const roundIds = rounds.map((r) => r.roundID);
    const roundVotes = MOCK_VOTES.filter((v) => roundIds.includes(v.roundID));
    setVotes(roundVotes);
  }, [rounds]);

  // Set combined value
  useEffect(() => {
    setValue({
      allSessions,
      activeSession,
      rounds,
      votes,
      timer,
    });
  }, [votes, allSessions, activeSession, rounds, timer]);

  return value;
}
