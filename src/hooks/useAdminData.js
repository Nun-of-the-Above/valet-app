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

export function useAdminData() {
  const [sessions, setSessions] = useState(null);
  const [rounds, setRounds] = useState(null);
  const [votes, setVotes] = useState(null);
  const [value, setValue] = useState({});

  // Get all sessions
  useEffect(() => {
    setSessions(MOCK_SESSIONS);
  }, []);

  // Get all rounds
  useEffect(() => {
    setRounds(MOCK_ROUNDS);
  }, []);

  // Get all votes
  useEffect(() => {
    setVotes(MOCK_VOTES);
  }, []);

  useEffect(() => {
    setValue({
      sessions: sessions,
      rounds: rounds,
      votes: votes,
    });
  }, [sessions, rounds, votes]);

  return value;
}
