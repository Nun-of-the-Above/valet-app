import { useEffect, useRef, useState } from "react";
import { useAdminContext } from "../../context/admin-context";
import { DeleteSessionButton } from "../DeleteSessionButton";
import { RoundBox } from "../RoundBox";

export function SessionBox({ session }) {
  const { rounds, sessions } = useAdminContext();
  const [activeSession, setActiveSession] = useState(null);
  const [allRoundsDone, setAllRoundsDone] = useState(false);

  useEffect(() => {
    if (!sessions) return;
    const anActiveSession = sessions.find((s) => s.active === true);
    if (anActiveSession) {
      setActiveSession(anActiveSession);
    }
  }, [sessions, activeSession]);

  //TODO: Button still enabled. Don't know how to fix this yet. Something todo with refresh cycles.
  useEffect(() => {
    if (!rounds) return;
    const doneAndClosed = rounds
      .filter((r) => r.parentSessionID === session.sessionID)
      .every((r) => r.done === true && r.roundActive === false);
    if (doneAndClosed) {
      setAllRoundsDone(true);
    }
  }, [rounds, allRoundsDone, session]);

  return (
    <>
      {!session ? (
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      ) : (
        <div
          className={`flex flex-col p-3 mb-10 rounded-md ${
            session.active
              ? "bg-green-100 border-green-500 border-[3px]"
              : "bg-gray-100 border-black border"
          }`}
        >
          <h2 className="text-center text-2xl font-bold">
            {new Date(session.showDate).toDateString()}, {session.stage},{" "}
            {session.city}
          </h2>
          <SessionInfoBox session={session} />

          <div className="flex justify-around w-full my-8 space-x-4">
            <ActivateSessionButton session={session} disabled={activeSession} />
            <DeactivateSessionButton
              session={session}
              disabled={!allRoundsDone}
            />
            <DeleteSessionButton session={session} />
          </div>

          <div className="flex justify-between">
            {rounds &&
              rounds
                .filter((round) => round.parentSessionID === session.sessionID)
                .map((round, i, rounds) => {
                  let shouldBeActive = false;
                  const roundsSorted = rounds
                    .map((round) => round)
                    .sort((a, b) => a[0] - b[0]);

                  const roundBefore = roundsSorted[round.number - 1];

                  if (round.number === 0) {
                    shouldBeActive = true;
                  } else if (
                    roundBefore &&
                    roundBefore.done &&
                    !roundBefore.roundActive
                  ) {
                    shouldBeActive = true;
                  }

                  return (
                    <RoundBox
                      key={round.roundID}
                      round={round}
                      disabled={!session.active || !shouldBeActive}
                    />
                  );
                })}
          </div>
        </div>
      )}
    </>
  );
}

const SessionInfoBox = ({ session }) => {
  return (
    <div className="flex justify-between p-2 border-2 border-black rounded-lg">
      <div className="flex flex-col">
        <p>
          <span className="font-bold">Status:</span>{" "}
          {session.active ? "Öppen" : "Stängd"}
        </p>
        <p>
          <span className="font-bold">Speldatum:</span>{" "}
          {new Date(session.showDate).toLocaleString()}
        </p>
      </div>
      <div className="flex flex-col">
        <p>
          <span className="font-bold">Scen:</span> {session.stage}
        </p>
        <p>
          <span className="font-bold">Stad:</span> {session.city}
        </p>
      </div>
      <div className="flex flex-col">
        <p>
          <span className="font-bold">Genomförd:</span>{" "}
          {session.done ? "Ja" : "Nej"}
        </p>
        <p>
          <span className="font-bold">Hemligt ord:</span> {session.secretWord}
        </p>
      </div>
    </div>
  );
};

const ActivateSessionButton = ({ session, disabled }) => {
  return (
    <button
      className={`px-4 py-2 rounded text-white ${
        session.active || session.done || disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600"
      }`}
      disabled={session.active || session.done || disabled}
      onClick={() => {
        // Mock updating session
        console.log("Mock: Setting session active", session.sessionID);
      }}
    >
      ÖPPNA FÖRESTÄLLNING
    </button>
  );
};

const SetSessionDoneButton = ({ session, disabled }) => {
  return (
    <button
      className={`px-4 py-2 rounded ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
      onClick={() => {
        // Mock updating session
        console.log("Mock: Setting session done", session.sessionID);
      }}
      disabled={disabled}
    >
      Sätt till klar och visa sista bild
    </button>
  );
};

const DeactivateSessionButton = ({ session, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  return (
    <>
      <button
        className={`px-4 py-2 rounded text-white ${
          !session.active || disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
        disabled={!session.active || disabled}
        onClick={() => setIsOpen(true)}
      >
        Stäng föreställning
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-bold mb-4">Är du säker?</h3>

            <p className="mb-6">
              Alla användare kommer loggas ut. Föreställning sätts till
              "Genomförd".
            </p>

            <div className="flex justify-end space-x-3">
              <button
                ref={cancelRef}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={onClose}
              >
                Avbryt
              </button>
              <button
                className={`px-4 py-2 rounded text-white ${
                  !session.active
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={!session.active}
                onClick={() => {
                  onClose();
                  // Mock updating session
                  console.log("Mock: Deactivating session", session.sessionID);
                }}
              >
                STÄNG FÖRESTÄLLNING
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
