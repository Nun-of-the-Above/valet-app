import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { debugToken } from "./debugToken";
import { firebaseConfig } from "../firebaseConfig";

const {
  initializeAppCheck,
  ReCaptchaV3Provider,
} = require("firebase/app-check");
// eslint-disable-next-line no-restricted-globals
self.FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);
const database = getDatabase();

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LfAjlkeAAAAAKxuwZIRCFrdqiaJuGNqYlzfC1K6"),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

// eslint-disable-next-line no-restricted-globals
if (location.hostname === "localhost") {
  console.log("We are now on the localhost.");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);

  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(database, "localhost", 9000);
}

export { app, db, functions };
