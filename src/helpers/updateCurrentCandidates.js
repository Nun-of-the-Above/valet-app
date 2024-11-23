export const updateCurrentCandidates = async (round, voteCount, rounds) => {
  // Mock getting session data
  console.log("Mock: Getting session data for", round.parentSessionID);
  const session = {
    candidatesLeft: ["Alina", "Isabelle", "Filip", "Simon"],
  };

  //Cautionary sort and getting of loserName.
  const loserName = voteCount.sort((a, b) => a[1] - b[1])[0][0];

  // Remove loser from candidatesLeft
  const candidatesLeftWithoutLoser = session.candidatesLeft.filter(
    (c) => c !== loserName
  );

  // UPDATE SESSION WITH LOSER REMOVED
  try {
    console.log(
      "Mock: Updating session candidatesLeft to",
      candidatesLeftWithoutLoser
    );
    console.log("Successfully deleted user from session candidatesLeft");
  } catch (e) {
    console.error("Error updating session candidate list: ", e);
  }

  const remainingRoundsInSession = rounds.filter((round) => !round.done);

  // UPDATE FUTURE ROUNDS WITH LOSER REMOVED
  remainingRoundsInSession.forEach((round) => {
    // Update the candidatesInRound in db for each round.
    try {
      console.log(
        `Mock: Updating Round #${round.number} candidatesInRound to`,
        candidatesLeftWithoutLoser
      );
      console.log(`Success updating candidateList in Round #${round.number}`);
    } catch (e) {
      console.error(
        `Failed to update candidateList of Round #${round.number}`,
        e
      );
    }
  });
};
