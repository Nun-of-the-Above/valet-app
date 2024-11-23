export const deleteVoteForCandidate = async (candidate, votesOwnedByRound) => {
  const voteToDelete = votesOwnedByRound.find(
    (vote) => vote.candidate === candidate
  );
  try {
    // Mock deletion instead of firebase
    console.log("Mock vote deleted:", {
      voteID: voteToDelete.voteID,
      candidate,
    });
    console.log("Successfully deleted vote for", candidate);
  } catch {
    console.error("Failed to delete vote for", candidate);
  }
};
