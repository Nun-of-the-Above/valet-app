import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { CandidateCard } from "../CandidateCard";
import { RoundTimer } from "../RoundTimer/RoundTimer";

export function RoundBox({ round, disabled }) {
  const [mockRound, setMockRound] = useState(round);
  const [voteCount, setVoteCount] = useState(null);

  // Mock data that would come from context
  const mockData = {
    sessions: [
      {
        sessionID: round.parentSessionID,
        candidatesLeft: ["Candidate1", "Candidate2", "Candidate3"],
      },
    ],
    votes: [
      { roundID: round.roundID, candidate: "Candidate1" },
      { roundID: round.roundID, candidate: "Candidate2" },
      { roundID: round.roundID, candidate: "Candidate3" },
    ],
  };

  useEffect(() => {
    if (!mockData.votes) return;
    const votesInActiveRound = mockData.votes.filter(
      (v) => v.roundID === round.roundID,
    );

    const voteMap = new Map();

    round.candidatesInRound.forEach((candidate) => voteMap.set(candidate, 0));

    votesInActiveRound.forEach((vote) => {
      voteMap.set(vote.candidate, Number(voteMap.get(vote.candidate) + 1));
    });

    setVoteCount([...voteMap]);
  }, [mockData.votes, round]);

  async function writeTimeToDb(seconds) {
    // Mock timer update
    console.log(`Timer set to ${seconds} seconds`);
  }

  const updateRound = (updates) => {
    setMockRound((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div
      className={`self-start p-5 rounded-3xl bg-white ${
        mockRound.done && !mockRound.roundActive ? "opacity-50" : "opacity-100"
      } border ${mockRound.roundActive ? "border-red-500" : "border-black"}`}
    >
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-lg font-medium">ROUND #{mockRound.number}</h2>
        {mockRound.done && !mockRound.roundActive && <p>RUNDA KLAR</p>}

        {!mockRound.roundActive && (
          <button
            className={`w-full py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600 ${
              (mockRound.roundActive || mockRound.done || disabled) &&
              "opacity-50 cursor-not-allowed"
            }`}
            disabled={mockRound.roundActive || mockRound.done || disabled}
            onClick={() => {
              updateRound({ roundActive: true });
            }}
          >
            ÖPPNA RUNDA
          </button>
        )}

        {mockRound.roundActive && (
          <>
            <button
              className={`w-full py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600 ${
                (mockRound.votingActive || mockRound.done || disabled) &&
                "opacity-50 cursor-not-allowed"
              }`}
              disabled={mockRound.votingActive || mockRound.done || disabled}
              onClick={() => {
                writeTimeToDb(60);
                updateRound({ votingActive: true });
              }}
            >
              STARTA RÖSTNING
            </button>

            <RoundTimer round={mockRound} isAdmin={true} />

            <button
              className={`w-full py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600 ${
                !mockRound.votingActive && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!mockRound.votingActive}
              onClick={async () => {
                updateRound({ votingActive: false, done: true });
                await writeTimeToDb(60);
              }}
            >
              AVSLUTA RÖSTNING
            </button>

            <button
              className={`w-full py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600 ${
                (mockRound.displayResults || !mockRound.done) &&
                "opacity-50 cursor-not-allowed"
              }`}
              disabled={mockRound.displayResults || !mockRound.done}
              onClick={() => {
                updateRound({ displayResults: true });
              }}
            >
              VISA RESULTAT
            </button>

            <button
              className={`w-full py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600 ${
                (!mockRound.roundActive ||
                  !mockRound.done ||
                  disabled ||
                  !mockRound.displayResults) &&
                "opacity-50 cursor-not-allowed"
              }`}
              disabled={
                !mockRound.roundActive ||
                !mockRound.done ||
                disabled ||
                !mockRound.displayResults
              }
              onClick={() => {
                updateRound({ roundActive: false });
              }}
            >
              STÄNG RUNDA
            </button>
          </>
        )}

        {voteCount && (mockRound.done || mockRound.roundActive) && (
          <ResultsBoxAdmin voteCount={voteCount} round={mockRound} />
        )}
      </div>
    </div>
  );
}

const ResultsBoxAdmin = ({ voteCount, round }) => {
  const [data, setData] = useState(null);
  const [numOfVotes, setNumOfVotes] = useState(0);

  useEffect(() => {
    if (!voteCount) return;

    const totalVotes = voteCount.reduce((acc, [, votes]) => acc + votes, 0);
    const percentagePerVote = 100 / totalVotes;

    const percentageData = voteCount
      .map(([candidate, votes]) => [
        candidate,
        Math.floor(votes * percentagePerVote * 100) / 100,
      ])
      .map(([candidate, percent]) => ({
        name: candidate,
        value: percent,
      }));

    setNumOfVotes(totalVotes);
    setData(percentageData);
  }, [voteCount]);

  return (
    <>
      <h2 className="text-lg font-medium text-center">RESULTAT</h2>
      <p className="text-lg">Antal röster: {numOfVotes}</p>
      <div className="p-3 w-full rounded-lg flex flex-col justify-evenly space-y-4">
        {data &&
          data
            .map((obj) => [obj.name, obj.value])
            .sort((a, b) => b[1] - a[1])
            .map(([name, percentageOfVotes], index, array) => {
              const loser = index === array.length - 1;
              return (
                <div
                  key={name}
                  className={`w-full ${
                    loser &&
                    (round.votingActive || round.done) &&
                    round.roundActive
                      ? "border-red-400 border-8 border-solid"
                      : ""
                  }
                  `}
                >
                  <CandidateCard
                    name={name}
                    text={`${percentageOfVotes}%`}
                    isLoaded={true}
                  />
                </div>
              );
            })}
      </div>
      {round.votingActive && (
        <>
          <AiOutlineArrowUp
            size={"100px"}
            className="animate-bounce"
            color="red"
          />
          <h2 className="text-lg font-medium text-center">TROLIG FÖRLORARE</h2>
        </>
      )}
      {round.done && round.roundActive && (
        <>
          <AiOutlineArrowUp size={"100px"} color="red" />
          <h2 className="text-lg font-medium text-center">
            DEFINITIV FÖRLORARE
          </h2>
        </>
      )}
    </>
  );
};
