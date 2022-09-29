// imports
const { initializeFirebaseApp, restore } = require("firestore-export-import");

const serviceAccount = require("./serviceAccountKey.json");

// JSON to Firestore
const jsonToFirestoreImport = async () => {
  try {
    const collectionNames = ["authentication", "authorization", "clients"];
    console.log("Initializing Firebase");
    let start = Date.now();
    initializeFirebaseApp(serviceAccount, require("./config.ts").databaseURL);
    console.log("Firebase Initialized");

    collectionNames.forEach((collectionName) => {
      restore(`data/${collectionName}.json`);
    });
    console.log("Upload Success");
    let end = Date.now();

    console.log(`Time taken: ${(end - start) / 1000} seconds`);
  } catch (error) {
    console.log(error);
  }
};

jsonToFirestoreImport();
