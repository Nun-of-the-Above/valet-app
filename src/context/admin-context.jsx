import { createContext, useContext, useEffect, useState } from "react";
import { useAdminData } from "../hooks/useAdminData";

const AdminContext = createContext({
  isLoaded: false,
  sessions: [],
  rounds: [],
  votes: [],
});

const AdminProvider = ({ children }) => {
  //Get all data
  const { sessions, rounds, votes } = useAdminData();
  const [extendedRounds, setExtendedRounds] = useState("");

  const isLoaded = sessions != null && rounds != null && votes != null;

  // TODO: Attach voteCount to the rounds objects.
  useEffect(() => {
    if (!rounds || !votes) return;

    const roundsAgain = rounds.map((round) => {
      const initialVoteCount = round.candidatesInRound.map((c) => [c, 0]);
      const voteCount = new Map(initialVoteCount);
      const votesOwnedByRound = votes.filter(
        (vote) => vote.roundID === round.roundID
      );

      votesOwnedByRound.forEach((vote) => {
        voteCount.set(vote.candidate, voteCount.get(vote.candidate) + 1);
      });

      return {
        ...round,
        voteCount: Object.entries(voteCount),
      };
    });

    setExtendedRounds(roundsAgain);
  }, [rounds, votes]);

  const value = {
    isLoaded,
    sessions,
    rounds: extendedRounds,
    votes,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

const useAdminContext = () => {
  return useContext(AdminContext);
};

export { AdminProvider, useAdminContext };
