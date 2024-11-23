import { useRef, useState } from "react";
import { useAdminContext } from "../../context/admin-context";

export function DeleteSessionButton({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const { rounds, votes } = useAdminContext();

  const mockDeleteSession = ({ session, rounds, votes }) => {
    console.log("Mock: Deleting session", session.sessionID);
    console.log("Mock: Deleting associated rounds", rounds);
    console.log("Mock: Deleting associated votes", votes);
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => setIsOpen(true)}
      >
        Radera föreställning
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-bold mb-4">Delete Session</h3>

            <p className="mb-6">
              Är du säker? Föreställningen försvinner för alltid.
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
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={() => {
                  onClose();
                  console.log("Mock: Deactivating session", session.sessionID);
                  mockDeleteSession({ session, rounds, votes });
                }}
              >
                Radera
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
