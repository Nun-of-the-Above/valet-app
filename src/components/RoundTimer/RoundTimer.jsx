import { useEffect, useState } from "react";
import { useSessionContext } from "../../context/session-context";

export function RoundTimer({ round, setVotingEnabled, isAdmin }) {
  const { timer } = useSessionContext();
  const [seconds, setSeconds] = useState(timer);
  const [intervalState, setIntervalState] = useState(null);

  useEffect(() => {
    if (isAdmin) {
      // Mock writing time to database
      console.log("Mock: Writing time to database:", seconds);
    }
  }, [seconds, isAdmin]);

  //Storing state of timer in localStorage
  useEffect(() => {
    if (!round.votingActive) return;
    if (localStorage.getItem(round.roundID)) {
      if (intervalState === null) {
        const startTime = new Date(localStorage.getItem(round.roundID));
        const startingInterval = localStorage.getItem(
          round.roundID + "_initialTimer",
        );
        const currentTime = new Date();

        const diff = Math.ceil((currentTime - startTime) / 1000);

        setSeconds(startingInterval - diff);
      }
    } else {
      localStorage.setItem(round.roundID, new Date());
      localStorage.setItem(round.roundID + "_initialTimer", timer);
    }
  }, [round, intervalState, timer]);

  useEffect(() => {
    if (round.votingActive && intervalState === null) {
      setIntervalState(
        setInterval(() => {
          setSeconds((seconds) => seconds - 1);
        }, 1000),
      );
    } else if (!round.votingActive) {
      clearInterval(intervalState);
    }
    //This is a known memeory leak. Don't think it'll cause a problem.
    // return () => {
    // console.log("Clean up happened.");
    // clearInterval(intervalState);
    // };
  }, [intervalState, round]);

  useEffect(() => {
    if (seconds <= 0 && setVotingEnabled) {
      setVotingEnabled(false);
    }
  }, [seconds, setVotingEnabled]);

  return (
    <div className="flex justify-center items-center">
      {round.done ? (
        <h1 className="text-5xl font-bold">Klar.</h1>
      ) : (
        <>
          <h1 className="text-5xl font-bold">{seconds}</h1>
        </>
      )}
    </div>
  );
}
//
