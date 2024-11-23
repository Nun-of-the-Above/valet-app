import { useState } from "react";
import { CANDIDATES_TOOLKIT } from "./constants/CANDIDATES_TOOLKIT";
import { useAuth } from "./context/auth-context";
import { useSessionContext } from "./context/session-context";

export function UnauthenticatedApp() {
  const { login, registerWithRandomEmail } = useAuth();
  const { activeSession, isLoaded } = useSessionContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminShow, setAdminShow] = useState(false);
  const CANDIDATES_NAMES = ["Alina", "Filip", "Simon", "Isabelle"];

  const [secretWord, setSecretWord] = useState("");
  const [error, setError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleRegisterRandom = (e) => {
    e.preventDefault();
    if (secretWord.toLowerCase() === activeSession.secretWord) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 20000);
      registerWithRandomEmail();
    } else {
      setError(true);
    }
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
          <p className="font-bold">Hurra! Du är nu inloggad!</p>
          <p>Lyssna på teknikern för fler instruktioner.</p>
        </div>
      )}

      {isLoaded ? (
        activeSession.active ? (
          <div className="container mx-auto px-4">
            <form onSubmit={handleRegisterRandom}>
              <h2 className="text-xl font-bold my-5 text-center">LÖSENORD</h2>
              <p className="text-lg mt-5 text-center">
                Lösenordet ropas ut av en tekniker i foajén.
              </p>
              <p className="text-lg mb-10 text-center">
                Både stora och små bokstäver funkar.
              </p>

              <input
                className="w-full p-3 mb-2 border-2 border-green-400 rounded-md text-lg"
                placeholder="Skriv lösenordet här..."
                type="text"
                value={secretWord}
                onChange={(e) => {
                  setSecretWord(e.target.value);
                  setError(false);
                }}
              />

              {error && (
                <h3 className="text-sm font-bold mt-3">
                  Fel lösenord. Försök igen.
                </h3>
              )}
              <div className="flex justify-center">
                <button
                  className="w-full p-3 mt-2 bg-green-500 text-white rounded-md text-lg hover:bg-green-600"
                  type="submit"
                >
                  LOGGA IN
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p>Föreställningen hämtades men är inte igång.</p>
        )
      ) : (
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold my-5">
            Välkommen till årets viktigaste val
          </h3>

          <p className="text-2xl my-6 leading-snug">
            På den här hemsidan kommer du att rösta tre gånger under
            föreställningens gång.
          </p>

          <p className="text-2xl my-6 leading-snug">
            En tekniker kommer att leda dig igenom en test-röstning i foajén
            innan föreställningen börjar.
          </p>

          <div className="grid grid-cols-2 grid-rows-2 gap-5 mt-10 place-items-center">
            {CANDIDATES_NAMES.map((candidate) => (
              <div key={candidate}>
                <CandidatePic candidate={candidate} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="invisible lg:visible">
        <button
          className="fixed bottom-0 m-[30px] bg-white px-4 py-2 rounded-md"
          onClick={() => setAdminShow(!adminShow)}
        >
          Admin
        </button>
      </div>
      {adminShow && (
        <div className="fixed bottom-[50px] m-[30px] p-2 bg-white border-2 rounded-md">
          <h3 className="font-bold text-lg">Admin Login</h3>
          <form onSubmit={handleLogin} className="space-y-2">
            <input
              className="w-full p-2 border rounded"
              placeholder="Username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
}

const CandidatePic = ({ candidate }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div
      className={`h-[150px] w-[150px] ${
        !imageLoaded && "animate-pulse bg-gray-200"
      }`}
    >
      {imageLoaded && (
        <img
          onLoad={() => setImageLoaded(true)}
          className="rounded-lg object-cover h-[150px] w-[150px]"
          src={CANDIDATES_TOOLKIT[candidate].image}
          alt={candidate}
        />
      )}
    </div>
  );
};
