import { v4 as uuidv4 } from "uuid";

export const TempAdminFastVoting = ({ round }) => {
  const addVote = async (candidate) => {
    const voteID = uuidv4();
    const randomUserEmail = `${uuidv4()}@gmail.com`;
    // Mock vote data instead of firebase
    console.log("Mock vote added:", {
      voteID,
      candidate,
      userEmail: randomUserEmail,
      roundID: round.roundID,
    });
  };

  return (
    <div className="grid grid-cols-2">
      {round.candidatesInRound
        .sort((a, b) => b - a)
        .map((candidate) => (
          <button
            key={candidate}
            className="m-1 justify-self-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => addVote(candidate)}
          >
            Vote for {candidate}
          </button>
        ))}
    </div>
  );
};
