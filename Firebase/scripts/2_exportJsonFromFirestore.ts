// imports
const { initializeFirebaseApp, backups } = require('firestore-export-import');

const serviceAccount = require('./serviceAccountKey');

// JSON from Firestore
const jsonFromFirestoreExport = async () => {
  let start = Date.now();
  try {
    console.log('Initializing Firebase');
    initializeFirebaseApp(serviceAccount, require('./config.ts').databaseURL);
    console.log('Firebase Initialized');

    const collectionNames = ['authentication', 'authorization', 'clients'];

    collectionNames.forEach(collectionName => {
      backups([collectionName]).then(collections => {
        console.log('-----');
        const clientsKeys = Object.keys(collections[collectionName]); // print the keys
        console.log(clientsKeys);
        // console.log(JSON.stringify(collections)); // print the entire JSON object "clients"
        console.log(
          JSON.stringify(collections[collectionName][clientsKeys[0]]),
        ); // print the 1st object inside "clients" array
      });
    });

    console.log('Download Success');
  } catch (error) {
    console.log(error);
  }
  let end = Date.now();
  console.log(`Time taken: ${(end - start) / 1000} seconds`);
};

jsonFromFirestoreExport();
