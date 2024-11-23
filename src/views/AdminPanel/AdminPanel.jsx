import { useRef } from "react";
import { CreateSessionForm } from "../../components/CreateSessionForm/CreateSessionForm";
import { SessionBox } from "../../components/SessionBox";
import { useAdminContext } from "../../context/admin-context";
import { useAuth } from "../../context/auth-context";

export function AdminPanel() {
  const { logout } = useAuth();
  const btnRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const { sessions, isLoaded } = useAdminContext();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">ADMIN DASHBOARD</h1>

      {isLoaded ? (
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div className="flex flex-row m-3 space-x-3">
              <button
                ref={btnRef}
                className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600"
                onClick={() => setIsOpen(true)}
              >
                Skapa ny föreställning
              </button>
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={logout}
              >
                Logga ut
              </button>
            </div>
            <CreateSessionForm
              isOpen={isOpen}
              placement="left"
              onClose={() => setIsOpen(false)}
              finalFocusRef={btnRef}
              size="md"
            />
          </div>
          <h2 className="p-3 text-2xl font-bold text-center">
            Föreställningar
          </h2>
          <div className="flex flex-col items-center space-y-10 mb-10">
            {sessions ? (
              sessions
                .sort((a, b) => new Date(b.showDate) - new Date(a.showDate))
                .map((session) => (
                  <SessionBox key={session.sessionID} session={session} />
                ))
            ) : (
              <p>Det finns inga föreställningar.</p>
            )}
          </div>
        </div>
      ) : (
        <h1 className="text-3xl font-bold">Laddar admin dashboard...</h1>
      )}
    </div>
  );
}
