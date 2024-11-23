// const functions = require("firebase-functions");
// const admin = require("firebase-admin");

// admin.initializeApp();
// const db = admin.firestore();

// // TODO: Move to local.
// const createSession = require("./createSession");
// exports.createSession = createSession.createSession;

// exports.createUserDocument = functions.auth.user().onCreate((user) => {
//   db.collection("users")
//     .doc(user.uid)
//     .set(JSON.parse(JSON.stringify(user)));
// });
