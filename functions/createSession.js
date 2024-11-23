// const functions = require("firebase-functions");

// const admin = require("firebase-admin");
// const db = admin.firestore();
// const database = admin.database();

// const INITIAL_CANDIDATES = ["Alina", "Isabelle", "Filip", "Simon"];
// const uuid = require("uuid");

// exports.createSession = functions.https.onCall(async (data, context) => {
//   if (context.app === undefined) {
//     throw new functions.https.HttpsError(
//       "failed-precondition",
//       "The function must be called from an App Check verified app."
//     );
//   }

//   const active = false;
//   const done = false;
//   const createdAt = 0;
//   const updatedAt = 0;
//   const sessionID = uuid.v4();
//   const candidatesLeft = INITIAL_CANDIDATES;
//   const city = data.city;
//   const showDate = data.showDate;
//   const stage = data.stage;
//   const secretWord = data.secretWord;

//   await database.ref("timer").set({
//     value: 60,
//   });

//   await db.collection("sessions").doc(sessionID).set({
//     done: done,
//     active: active,
//     city: city,
//     showDate: showDate,
//     stage: stage,
//     secretWord: secretWord,
//     sessionID: sessionID,
//     createdAt: createdAt,
//     updatedAt: updatedAt,
//     candidatesLeft: candidatesLeft,
//   });

//   //Helper function to add round in firestore.
//   async function createRound(sessionID, number) {
//     const roundID = number + "-" + sessionID;
//     const candidatesInRound = ["Alina", "Isabelle", "Filip", "Simon"];

//     //Add round to firestore.
//     await db.collection("rounds").doc(roundID).set({
//       roundID: roundID,
//       parentSessionID: sessionID,
//       number: number,
//       candidatesInRound: candidatesInRound,
//       roundActive: false,
//       votingActive: false,
//       done: false,
//       displayResults: false,
//       timer: 60,
//     });
//   }

//   async function createTestRound(sessionID, number) {
//     const roundID = number + "-" + sessionID;
//     const candidatesInTestRound = ["Regn", "Blåsigt", "Sol", "Åska"];

//     //Add round to firestore.
//     await db.collection("rounds").doc(roundID).set({
//       roundID: roundID,
//       parentSessionID: sessionID,
//       number: number,
//       candidatesInRound: candidatesInTestRound,
//       roundActive: false,
//       votingActive: false,
//       done: false,
//       displayResults: false,
//       timer: 60,
//     });
//   }

//   createTestRound(sessionID, 0);
//   createRound(sessionID, 1);
//   createRound(sessionID, 2);
//   createRound(sessionID, 3);
// });
