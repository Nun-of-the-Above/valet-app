export const deleteSession = async ({ rounds, session, votes }) => {
  try {
    // Get rounds owned by this session
    const roundsOwnedBySession = rounds.filter(
      (r) => r.parentSessionID === session.sessionID
    );

    // Mock deleting rounds and their votes
    roundsOwnedBySession.forEach((round) => {
      console.log(`Mock: Deleting round ${round.roundID}`);

      // Mock deleting votes for this round
      const votesForRound = votes.filter((v) => v.roundID === round.roundID);
      console.log(
        `Mock: Deleting ${votesForRound.length} votes for round ${round.roundID}`
      );
    });

    // Mock deleting session
    console.log(`Mock: Deleting session ${session.sessionID}`);
    console.log("Successfully deleted session, rounds and votes");
  } catch (e) {
    console.error("Error deleting session, rounds and votes: ", e);
  }
};
