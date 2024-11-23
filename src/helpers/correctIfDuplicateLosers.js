import { addVote } from "./addVote";
import { deleteVoteForCandidate } from "./deleteVoteForCandidate";

export const correctIfDuplicateLosers = async (
  round,
  voteCount,
  candidatesLeft,
  votesInActiveRound,
) => {
  const sorted = voteCount.sort((a, b) => a[1] - b[1]);
  const losers = sorted.filter(([, votes]) => votes === sorted[0][1]);

  const loserVoteCount = losers[0][1];

  const randomIndexOfLosers = Math.floor(Math.random() * losers.length);
  const nameOfRandomLoser = losers[randomIndexOfLosers][0];

  //Case 1: Single loser. Just return.
  if (losers.length === 1) return;

  //Case 2: Multiple losers and are >1.
  //Choose loser at random from losers, delete a vote for that candidate.
  if (loserVoteCount > 1) {
    try {
      await deleteVoteForCandidate(nameOfRandomLoser, votesInActiveRound);
    } catch (e) {
      console.error("Failed to delete vote for", nameOfRandomLoser, e);
    }
  }

  //Case 3: Multiple losers with zero or one votes.
  if (loserVoteCount === 0 || loserVoteCount === 1) {
    try {
      //Add vote to all relevant candidates.
      console.log("CandidatesLeft at function: ", candidatesLeft);

      // Mock batch operation by adding votes one by one
      const addVotePromises = candidatesLeft.map((candidate) =>
        addVote({ candidate, roundID: round.roundID }),
      );

      await Promise.all(addVotePromises);
      console.log("Added 1 vote to all.");

      // Mock getting updated votes
      const updatedVotesInRound = [
        ...votesInActiveRound,
        ...addVotePromises.map((p) => p.value),
      ];

      await deleteVoteForCandidate(nameOfRandomLoser, updatedVotesInRound);
      console.log("Deleted 1 vote for", nameOfRandomLoser);
    } catch (e) {
      console.error("Failed to add one to all and then delete random vote.", e);
    }
  }
};
