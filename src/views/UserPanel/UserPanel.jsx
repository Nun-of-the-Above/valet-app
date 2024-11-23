import { useEffect, useState } from "react";
import { CandidateCard } from "../../components/CandidateCard";
import { ResultsBoxUserView } from "../../components/ResultsBoxUserView/ResultsBoxUserView";
import { VotingBox } from "../../components/VotingBox";
import { useAuth } from "../../context/auth-context";
import { useSessionContext } from "../../context/session-context";

export function UserPanel() {
  const { logout } = useAuth();

  const { isLoaded, activeSession, allSessions, activeRound, currCandidates } =
    useSessionContext();
  const [winnerDelay, setWinnerDelay] = useState(false);

  // If there is no session active, logout the user.
  useEffect(() => {
    if (allSessions && allSessions.every((s) => s.active === false)) {
      console.log(
        "User has old login-cookie. No session is active -> Cookie deleted."
      );
      logout();
    }
  }, [allSessions, logout]);

  useEffect(() => {
    if (activeSession && activeSession.done) {
      setTimeout(() => {
        setWinnerDelay(true);
      }, 2000);
    }
  }, [activeSession]);

  return (
    <>
      {isLoaded ? (
        <>
          {activeRound ? (
            <>
              {activeRound.votingActive && <VotingBox />}

              {activeRound.done && !activeRound.displayResults && (
                <div className="flex flex-col gap-4 mt-10 items-center justify-center animate-pulse">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
                  <h2 className="text-xl font-medium mb-2">
                    Rösterna räknas...
                  </h2>
                </div>
              )}

              {!activeRound.done && !activeRound.votingActive && (
                <div className="flex flex-col mt-5 justify-center">
                  <h2 className="text-xl font-medium mt-4 text-center">
                    Ingen röstning pågår just nu.
                  </h2>
                </div>
              )}

              {activeRound.displayResults && <ResultsBoxUserView />}
            </>
          ) : (
            <>
              {!activeSession.done && (
                <div className="flex flex-col w-full mt-5 justify-center">
                  <h2 className="text-xl font-medium mt-4 text-center">
                    Ingen röstning pågår just nu.
                  </h2>
                </div>
              )}
            </>
          )}

          {activeSession.done && (
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-2xl font-bold">Vinnaren är...</h1>
              <CandidateCard name={currCandidates} isLoaded={winnerDelay} />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
        </div>
      )}
    </>
  );
}
