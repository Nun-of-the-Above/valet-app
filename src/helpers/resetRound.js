export const resetRound = async (round, voteCount, votesOwnedByRound) => {
  //WHAT I WANT
  //Get the loser from the voteCount attached to round.voteCount.
  //Add loser back into candidatesInRound of THIS round.
  //Add loser back into candidatesInRound of FUTURE rounds.
  //Add loser back into session.candidatesLeft.
  //Delete all votes with vote.roundID === round.roundID
  //Reset timer in localStorage
  //Reset state on round (done, active, votingActive etc)
  const loserName = voteCount.sort((a, b) => a[1] - b[1])[0][0];

  try {
    // Mock deleting votes
    console.log("Mock: Deleting votes", votesOwnedByRound);

    // Mock getting session data
    console.log("Mock: Getting session data for", round.parentSessionID);
    const session = {
      sessionID: round.parentSessionID,
      candidatesLeft: ["Alina", "Isabelle", "Filip"],
    };

    // Mock updating session candidatesLeft
    const updatedCandidatesLeft = session.candidatesLeft.includes(loserName)
      ? session.candidatesLeft
      : [...session.candidatesLeft, loserName];
    console.log(
      "Mock: Updating session candidatesLeft to",
      updatedCandidatesLeft
    );

    // Mock updating current round
    const updatedRound = {
      ...round,
      candidatesInRound: [...round.candidatesInRound, loserName],
      roundActive: false,
      votingActive: false,
      done: false,
      displayResults: false,
    };
    console.log("Mock: Updating current round", updatedRound);

    // Mock getting future rounds
    const futureRounds = [
      {
        roundID: "2-abc",
        candidatesInRound: ["Alina", "Isabelle", "Filip"],
        done: false,
      },
      {
        roundID: "3-abc",
        candidatesInRound: ["Alina", "Isabelle", "Filip"],
        done: false,
      },
    ];

    // Mock updating future rounds
    futureRounds.forEach((futureRound) => {
      const updatedCandidatesInRound = futureRound.candidatesInRound.includes(
        loserName
      )
        ? futureRound.candidatesInRound
        : [...futureRound.candidatesInRound, loserName];

      console.log(
        `Mock: Updating round ${futureRound.roundID} candidatesInRound to`,
        updatedCandidatesInRound
      );
    });

    console.log("Successful reset of round.");
  } catch (e) {
    console.error("Error when resetting round: ", e);
  }
};
