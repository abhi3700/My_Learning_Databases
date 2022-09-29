// import { initializeApp } from "firebase/app";
const initializeApp = require("firebase/app");
// import firebase from "firebase/app";

// import { getFirestore, collection, addDoc } from "firebase/firestore";

const { getFirestore, collection, addDoc } = require("firebase/firestore");

// import * as firebaseConfig from "./config";
const firebaseConfig = require("./config.ts");

const app = require("firebase/app").initializeApp(firebaseConfig);
const db = getFirestore(app);

async function main() {
  let start = Date.now();
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  let end = Date.now();

  console.log(`Time taken: ${(end - start) / 1000} seconds`);
}

main();
