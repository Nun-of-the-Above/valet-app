import { useState } from "react";
import {
  INITIAL_CANDIDATES,
  TEST_CANDIDATES,
} from "../../constants/CANDIDATES_TOOLKIT";
import { useSessionContext } from "../../context/session-context";
import { CandidateVotingButton } from "../CandidateVotingButton/CandidateVotingButton";
import { RoundTimer } from "../RoundTimer/RoundTimer";

export const VotingBox = () => {
  const { activeRound, currCandidates, userVoteInActiveRound } =
    useSessionContext();

  const [votingEnabled, setVotingEnabled] = useState(true);

  return (
    <>
      {votingEnabled ? (
        <>
          <div className="flex flex-col h-full px-12 pt-[15px] place-content-center">
            <RoundTimer
              round={activeRound}
              setVotingEnabled={setVotingEnabled}
              isAdmin={false}
            />
          </div>
          {activeRound.number === 0 ? (
            <>
              <h1 className="px-12 pb-[3vh] text-center text-2xl font-bold">
                {userVoteInActiveRound ? (
                  <>
                    <p>Tack för din röst!</p>
                    <p>Invänta resultatet.</p>
                  </>
                ) : (
                  "Rösta på det väder du tycker det är idag"
                )}
              </h1>
              <div className="grid grid-cols-2 gap-4 px-5 pb-5 place-items-center">
                {TEST_CANDIDATES.map((candidate) => (
                  <CandidateVotingButton
                    key={candidate}
                    candidate={candidate}
                    stillActive={true}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col h-full place-content-center">
                <h1 className="px-12 py-[3vh] text-center text-2xl font-bold">
                  {userVoteInActiveRound ? (
                    <>
                      <p>Tack för din röst!</p>
                      <p>Invänta resultatet.</p>
                    </>
                  ) : (
                    "Rösta på den kandidat du vill ska vara kvar"
                  )}
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-4 px-5 pb-5 place-items-center">
                {INITIAL_CANDIDATES.sort((a, b) => {
                  if (a < b) return 1;
                  if (a > b) return -1;
                  else return 0;
                }).map((candidate) => (
                  <CandidateVotingButton
                    key={candidate}
                    candidate={candidate}
                    stillActive={currCandidates.includes(candidate)}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <h1 className="text-2xl font-bold">Röstningen är stängd.</h1>
          <h2 className="text-xl font-bold">Invänta resultatet.</h2>
        </div>
      )}
    </>
  );
};
