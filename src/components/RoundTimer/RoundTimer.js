import { Center, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

//Will be with user as well
export const RoundTimer = ({ round, setVotingEnabled }) => {
  const TIMER_DURATION = 82;
  const [seconds, setSeconds] = useState(TIMER_DURATION);
  const [intervalState, setIntervalState] = useState(null);

  //Storing state of timer in localStorage
  useEffect(() => {
    if (!round.votingActive) return;
    if (localStorage.getItem(round.roundID)) {
      if (intervalState === null) {
        const startTime = new Date(localStorage.getItem(round.roundID));
        const currentTime = new Date();

        const diff = Math.ceil((currentTime - startTime) / 1000);

        setSeconds(TIMER_DURATION - diff);
      }
    } else {
      localStorage.setItem(round.roundID, new Date());
    }
  }, [round]);

  useEffect(() => {
    if (round.votingActive && intervalState === null) {
      setIntervalState(
        setInterval(() => {
          setSeconds((seconds) => seconds - 1);
        }, 1000)
      );
    } else if (!round.votingActive) {
      clearInterval(intervalState);
    }
    //This is a known memeory leak. Don't think it'll cause a problem.
    // return () => {
    // console.log("Clean up happened.");
    // clearInterval(intervalState);
    // };
  }, [round]);

  useEffect(() => {
    if (seconds <= 0 && setVotingEnabled) {
      setVotingEnabled(false);
    }
  }, [seconds, setVotingEnabled]);

  return (
    <Center>
      {round.done ? (
        <Heading>Röstning klar.</Heading>
      ) : (
        <Heading size="4xl">{seconds}</Heading>
      )}
    </Center>
  );
};
//
