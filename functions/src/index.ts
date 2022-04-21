import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// auth trigger (new user signup)

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("user").doc(user.uid).set({
    email: user.email,
    upVote: [],
  });
});

// auth trigger (delete user)

exports.sendByeEmail = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("user").doc(user.uid);
  return doc.delete();
});


// http callable function to add tutorial

exports.addRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "Request can only be done by authenticated users"
    );
  }
  if (data.text.length > 30) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Request must be no more than 30 characters long"
    );
  }

  return admin.firestore().collection("requests").add({
    text: data.text,
    upVotes: 0,
  });
});

// upvote callable function

exports.upVote = functions.https.onCall(async (data, context) => {
  // check auth state
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "Vote can only be done by authenticated users"
    );
  }

  // get refs for user doc and request doc
  const user = admin.firestore().collection("user").doc(context.auth.uid);
  const request = admin.firestore().collection("requests").doc(data.id);
  const doc: any = await user.get();
  // check if user as already upvoted
  if (doc.data().upVote.includes(data.id)) {
    throw new functions.https.HttpsError(
        "failed-precondition",
        "You can only upvote only once"
    );
  }

  // update user array

  await user.update({
    upVote: [...doc.data().upVote, data.id],
  });

  // update votes on request
  return request.update({
    upVotes: admin.firestore.FieldValue.increment(1),
  });
});

