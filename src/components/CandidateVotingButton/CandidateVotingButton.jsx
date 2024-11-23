import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CANDIDATES_TOOLKIT } from "../../constants/CANDIDATES_TOOLKIT";
import { useAuth } from "../../context/auth-context";
import { useSessionContext } from "../../context/session-context";

export function CandidateVotingButton({ candidate, stillActive }) {
  const { user } = useAuth();
  const { activeRound, userVoteInActiveRound } = useSessionContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const addVote = async (candidate) => {
    const voteID = uuidv4();
    console.log("Mock: Adding vote", {
      voteID,
      candidate,
      userEmail: user.email,
      roundID: activeRound.roundID,
    });
  };

  return (
    <>
      <div
        onClick={
          userVoteInActiveRound || !stillActive ? null : () => setIsOpen(true)
        }
        style={{
          backgroundColor: stillActive
            ? CANDIDATES_TOOLKIT[candidate].color
            : "rgba(0, 0, 0, .30)",
        }}
        className={`w-[140px] h-[180px] p-5 rounded-lg text-white border-2 flex flex-col 
          ${isOpen ? "border-green-500" : "border-white"}
          ${
            userVoteInActiveRound
              ? "opacity-50"
              : stillActive
              ? "opacity-100"
              : "opacity-50"
          }
          ${
            userVoteInActiveRound || !stillActive
              ? "cursor-default"
              : "cursor-pointer"
          }`}
      >
        <div className={`mb-2 ${!imageLoaded && "animate-pulse"}`}>
          {!imageLoaded && (
            <div className="w-[100px] h-[100px] rounded-full bg-gray-300" />
          )}
          <img
            onLoad={() => setImageLoaded(true)}
            className={`w-[100px] h-[100px] rounded-full object-cover ${
              !imageLoaded && "hidden"
            }`}
            src={CANDIDATES_TOOLKIT[candidate].image}
            alt={`Bild på ${candidate}`}
          />
        </div>

        {!imageLoaded ? (
          <div className="h-6 bg-gray-300 rounded animate-pulse" />
        ) : (
          <h1 className="text-center text-2xl font-bold">{candidate}</h1>
        )}

        {!stillActive && (
          <div className={`absolute ${!imageLoaded && "hidden"}`}>
            <div className="absolute w-[140px] h-[180px] -mt-[22px] -ml-[22px] z-50 flex items-center justify-center">
              <div className="absolute origin-center w-[200px] rotate-[52deg] border-4 border-red-700" />
              <div className="absolute origin-center w-[200px] -rotate-[52deg] border-4 border-red-700" />
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg">
            <div className="text-center p-4">
              <div className="-mt-24 mb-5 flex justify-center">
                <img
                  className="w-[150px] h-[150px] rounded-full object-cover border-4 border-white"
                  src={CANDIDATES_TOOLKIT[candidate].image}
                  alt={`Bild på ${candidate}`}
                />
              </div>
              <h2 className="text-lg font-medium">
                Du kommer att rösta på {candidate}.
              </h2>
            </div>
            <div className="p-4">
              <div className="flex w-full mb-5 space-x-4">
                <button
                  className="flex-1 py-10 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  AVBRYT
                </button>
                <button
                  className="flex-1 py-10 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                  onClick={() => {
                    setIsOpen(false);
                    addVote(candidate);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 8000);
                  }}
                >
                  SKICKA RÖST
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <div className="font-bold">Tack för din röst!</div>
          <div>Din röst på {candidate} har registrerats.</div>
        </div>
      )}
    </>
  );
}
