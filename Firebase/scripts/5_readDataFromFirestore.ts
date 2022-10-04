const fs = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey');

// const isCollectionIdExist = require("./helper.ts");
// import { isCollectionIdExist } from "./helper";

async function isCollectionIdExist(db, collectionName) {
  const querySnapshot = await db.collection(collectionName).get();
  const res = !querySnapshot.empty;
  return res;
}

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});

const db = fs.firestore();

async function main() {
  // check if a collection Id exist
  isCollectionIdExist(db, 'clients').then(val => console.log(val));

  // get document data from collection id
  // M-1: querySnapshot is not an iterable, so no `break` or `continue` is possible
  /*   db.collection("clients")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // console.log(doc);
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data()); // get the
        console.log(doc.data().about_project.contracts.Token); // get the 'Token' contract info
      });
    });
 */
  // M-2: querySnapshot is an iterable, so `break` or `continue` is possible
  const clients = await db.collection('clients').get();
  for (let doc of clients.docs) {
    console.log(doc.id, ' => ', doc.data());
  }
}

main();
