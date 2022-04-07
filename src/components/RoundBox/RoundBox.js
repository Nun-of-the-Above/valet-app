import { Button } from "@chakra-ui/button";
import { Box, Heading, VStack, Text } from "@chakra-ui/layout";
import { collection, doc, updateDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { TEST_CANDIDATES } from "../../constants/CANDIDATES_TOOLKIT";
import { useAdminContext } from "../../context/admin-context";
import { db } from "../../firestore";
import { correctIfDuplicateLosers } from "../../helpers/correctIfDuplicateLosers";
import { updateCurrentCandidates } from "../../helpers/updateCurrentCandidates";
import { CandidateCard } from "../CandidateCard";
import { RoundTimer } from "../RoundTimer/RoundTimer";
import { getDatabase, ref, set, onValue } from "firebase/database";

export function RoundBox({ round, disabled }) {
  const roundRef = doc(collection(db, "rounds"), round.roundID);
  const [voteCount, setVoteCount] = useState(null);
  const [session, setSession] = useState(null);
  const [votesInActiveRound, setVotesInActiveRound] = useState(null);
  const { sessions, rounds, votes } = useAdminContext();
  const database = getDatabase();

  useEffect(() => {
    if (!votes) return;
    const votesInActiveRound = votes.filter((v) => v.roundID === round.roundID);
    setVotesInActiveRound(votesInActiveRound);

    const voteMap = new Map();

    round.candidatesInRound.forEach((candidate) => voteMap.set(candidate, 0));

    votesInActiveRound.forEach((vote) => {
      voteMap.set(vote.candidate, Number(voteMap.get(vote.candidate) + 1));
    });

    setVoteCount([...voteMap]);
  }, [votes, round]);

  // Filter out sessions from hook to get session for this round.
  useEffect(() => {
    const parentSession = sessions.find(
      (s) => s.sessionID === round.parentSessionID
    );

    setSession(parentSession);
  }, [sessions, round]);

  async function writeTimeToDb(seconds) {
    await set(ref(database, "timer"), {
      value: seconds,
    });
  }

  return (
    <Box
      className="self-start p-5 rounded-3xl"
      opacity={round.done && !round.roundActive ? "0.5" : "1"}
      bgColor={"white"}
      border={`1px solid ${round.roundActive ? "red" : "black"}`}
    >
      <VStack>
        <Heading size="md">ROUND #{round.number}</Heading>
        {round.done && !round.roundActive && <p>RUNDA KLAR</p>}

        {!round.roundActive && (
          <Button
            width="full"
            colorScheme="green"
            disabled={round.roundActive || round.done || disabled}
            onClick={() => {
              updateDoc(roundRef, { roundActive: true });
            }}
          >
            ÖPPNA RUNDA
          </Button>
        )}

        {round.roundActive && (
          <>
            <Button
              colorScheme="green"
              width="full"
              disabled={round.votingActive || round.done || disabled}
              onClick={() => {
                writeTimeToDb(60);
                updateDoc(roundRef, { votingActive: true });
              }}
            >
              STARTA RÖSTNING
            </Button>

            <RoundTimer round={round} isAdmin={true} />

            <Button
              colorScheme="red"
              width="full"
              disabled={!round.votingActive}
              onClick={async () => {
                updateDoc(roundRef, { votingActive: false, done: true });
                await writeTimeToDb(60);
                if (round.number === 0) {
                  correctIfDuplicateLosers(
                    round,
                    voteCount,
                    TEST_CANDIDATES,
                    votesInActiveRound
                  );
                } else {
                  correctIfDuplicateLosers(
                    round,
                    voteCount,
                    session.candidatesLeft,
                    votesInActiveRound
                  );
                }
              }}
            >
              AVSLUTA RÖSTNING
            </Button>

            <Button
              colorScheme="green"
              width={"full"}
              disabled={round.displayResults || !round.done}
              onClick={() => {
                updateDoc(roundRef, { displayResults: true });
              }}
            >
              VISA RESULTAT
            </Button>
            <Button
              width="full"
              colorScheme={"red"}
              disabled={
                !round.roundActive ||
                !round.done ||
                disabled ||
                !round.displayResults
              }
              onClick={() => {
                updateDoc(roundRef, { roundActive: false });
                if (round.number === 0) {
                } else {
                  updateCurrentCandidates(round, voteCount, rounds);
                }
              }}
            >
              STÄNG RUNDA
            </Button>
          </>
        )}

        {voteCount && (round.done || round.roundActive) && (
          <ResultsBoxAdmin voteCount={voteCount} round={round} />
        )}
        {/* <Button
          width="full"
          colorScheme="red"
          disabled={round.roundActive || !round.done}
          onClick={() => {
            resetRound(round, voteCount, votesInActiveRound);
          }}
        >
          NOLLSTÄLL RUNDA
        </Button> */}

        {/** TEMPORARY FAST VOTING */}
        {/* {round.votingActive && <TempAdminFastVoting round={round} />} */}
      </VStack>
    </Box>
  );
}

const ResultsBoxAdmin = ({ voteCount, round, showResult }) => {
  const [data, setData] = useState(null);
  const [numOfVotes, setNumOfVotes] = useState(0);

  useEffect(() => {
    if (!voteCount) return;

    const totalVotes = voteCount.reduce((acc, [name, votes]) => acc + votes, 0);
    const percentagePerVote = 100 / totalVotes;

    const percentageData = voteCount
      .map(([c, v]) => [c, Math.floor(v * percentagePerVote * 100) / 100])
      .map(([name, percent]) => ({
        name: name,
        value: percent,
      }));

    setNumOfVotes(totalVotes);
    setData(percentageData);
  }, [voteCount]);

  return (
    <>
      <Heading className="text-center" size="md">
        RESULTAT
      </Heading>
      <Text fontSize={"lg"}>Antal röster: {numOfVotes}</Text>
      <VStack
        padding="3"
        width="full"
        className="rounded-lg place-content-evenly"
      >
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
      </VStack>
      {round.votingActive && (
        <>
          <AiOutlineArrowUp
            size={"100px"}
            className="animate-bounce"
            color="red"
          />
          <Heading className="text-center" size="md">
            TROLIG FÖRLORARE
          </Heading>
        </>
      )}
      {round.done && round.roundActive && (
        <>
          <AiOutlineArrowUp size={"100px"} color="red" />
          <Heading className="text-center" size="md">
            DEFINITIV FÖRLORARE
          </Heading>
        </>
      )}
    </>
  );
};
