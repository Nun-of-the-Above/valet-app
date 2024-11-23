import { v4 as uuidv4 } from "uuid";

export const addVote = async ({ candidate, roundID }) => {
  const voteID = uuidv4();
  const randomUserEmail = `${uuidv4()}@gmail.com`;
  // Mock vote data instead of firebase
  console.log("Mock vote added:", {
    voteID,
    candidate,
    userEmail: randomUserEmail,
    roundID,
  });
  return {
    voteID,
    candidate,
    userEmail: randomUserEmail,
    roundID,
  };
};
