export const resetRound = async (data) => {
  const { roundID, parentSessionID, voteCount } = data;
  console.log("Mock: Received data", data);

  try {
    // Mock getting votes
    console.log("Mock: Getting votes");
    const votes = [
      { roundID: roundID, voteID: "vote1" },
      { roundID: roundID, voteID: "vote2" },
      { roundID: "other", voteID: "vote3" },
    ];

    // Mock deleting votes for this round
    const votesToDelete = votes.filter((vote) => vote.roundID === roundID);
    console.log("Mock: Deleting votes", votesToDelete);

    // Mock getting session data
    console.log("Mock: Getting session data for", parentSessionID);
    const session = {
      candidatesLeft: ["Alina", "Isabelle", "Filip"],
    };

    // Mock updating round
    console.log("Mock: Updating round", roundID, {
      roundActive: false,
      votingActive: false,
      done: false,
      displayResults: false,
      timer: 10,
    });

    // Get loser and update candidates
    const loser = Object.entries(voteCount).sort((a, b) => a[1] - b[1])[0][0];
    const updatedCandidates = [...session.candidatesLeft, loser];
    console.log("Mock: Updating session candidates to", updatedCandidates);

    // Mock getting remaining rounds
    const remainingRounds = [
      {
        roundID: "round1",
        number: 1,
        done: false,
        voteCount: { Alina: 2, Isabelle: 1 },
      },
      {
        roundID: "round2",
        number: 2,
        done: false,
        voteCount: { Alina: 0, Filip: 1 },
      },
    ];

    // Mock updating remaining rounds
    remainingRounds.forEach((round) => {
      const voteCountArray = Object.entries(round.voteCount);
      const filteredVoteCount = voteCountArray.filter(([name]) =>
        updatedCandidates.includes(name)
      );
      const updatedVoteCount = Object.fromEntries(filteredVoteCount);

      console.log(
        `Mock: Updating voteCount for round ${round.number}`,
        updatedVoteCount
      );
    });

    console.log("Successfully reset round");
  } catch (error) {
    console.error("Error resetting round:", error);
  }
};
