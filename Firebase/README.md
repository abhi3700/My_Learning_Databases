# Firebase

## About

- Firebase is Google's Database.
- It has 2 database types:
  - NoSQL i.e. Firestore DB
  - SQL i.e. Realtime DB

## Setup Configuration

Here are the steps to get the config files required for Firebase setup in your project.

1. `firebaseConfig`
   - Project Settings > General > Your Apps > Firebase SDK Snippet > Config
2. `serviceAccountKey`
   - Project Settings > Service accounts > Generate New Private Key

> Save these files & don't reveal in public.

## Packages

- [firebase](https://www.npmjs.com/package/firebase)
  - default pkg
  - very slow response
  - config file required: `firebaseConfig`
- [firebase-admin](https://www.npmjs.com/package/firebase-admin) [RECOMMENDED]
  - built on top of [firebase](https://www.npmjs.com/package/firebase).
  - fast response
  - config file required: `serviceAccountKey`
- [firestore-export-import](https://www.npmjs.com/package/firestore-export-import)
  - For importing JSON file (from HTTP url, local file) to Firestore
  - For exporting JSON file from Firestore into a local file or object.
  - config file required: `firebaseConfig`, `serviceAccountKey`

## Coding

### Initialize Firestore

Here are the steps to initialize Firestore in your project:

> This also removes this error: `app/duplicate-app`

```js
const fs = require("firebase-admin");

const serviceAccount = require("../../../helper/serviceAccountKey.json");

let db = null;

// initialize firebase
if (!fs.apps.length) {
  fs.initializeApp({
    credential: fs.credential.cert(serviceAccount),
    // name: "zippy-mvp2",
  });

  db = fs.firestore();

  // allow undefined values.
  db.settings({
    ignoreUndefinedProperties: true,
  });
} else {
  db = fs.app().firestore();
}
```

### querySnapshot

- `querySnapshot` is a snapshot of the data in the database at a particular time.
- A `querySnapshot`, which is what is returned from the get method, is **not an array nor an iterable**.

https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot

`forEach` is a method from the `querySnapshot` object, which is why you can use it.

Code snippet:

```js
db.collection("clients")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // console.log(doc);
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data()); // get the
      console.log(doc.data().about_project.contracts.Token); // get the 'Token' contract info
    });
  });
```

---

To use as **iterable**, use this code:

```js
const clients = await db.collection("clients").get();
for (let doc of clients.docs) {
  console.log(doc.id, " => ", doc.data());
}
```

[Reference](https://stackoverflow.com/questions/62454459/why-does-for-each-work-but-for-of-doesnt)

## Databases

### Firestore (NoSQL) DB

#### Structure

- Try to have each document with same fields.

#### Rules:

For testing, set the rules to:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```

> Your security rules are defined as public, so anyone can steal, modify, or delete data in your database

### Realtime (SQL) DB

## Apps

### Android

### iOS

### Web

#### Deploy

This is regarding deployment of web app into Firebase Hosting.

Following are the steps:

1. Enable "Firebase Hosting" during registering the web app under "Add Firebase to your web app" in Firebase Console [here](https://console.firebase.google.com/project/zippy-mvp2/settings/general/web).
2. `$ firebase login`
3. `$ firebase init`
4. `$ firebase deploy`

After deployment, the URL will be shown in the terminal as well as in the Firebase Console: `https://zippy-mvp2.web.app/` (in my case).

## Troubleshooting

### 1. Incorrect Data structure

- _Cause_: It doesn't support the data structure you are trying to store.
- _Solution_: Use the correct data structure as Firebase considers all collection to be an array.

**Before**:

```json
{
  "authorization": {
    "emails": ["vinny@upside.gg", "abhijit@upside.gg", "alejandro@upside.gg"]
  }
}
```

**After**:

```json
{
  "authorization": [
    {
      "emails": ["vinny@upside.gg", "abhijit@upside.gg", "alejandro@upside.gg"]
    }
  ]
}
```

### 2. Error: `app/duplicate-app`

- _Cause_: You are trying to initialize the app again.
- _Solution_: Use this code snippet:

```js
const fs = require("firebase-admin");

const serviceAccount = require("../../../helper/serviceAccountKey.json");

let db = null;

// initialize firebase
if (!fs.apps.length) {
  fs.initializeApp({
    credential: fs.credential.cert(serviceAccount),
    // name: "zippy-mvp2",
  });

  db = fs.firestore();

  // allow undefined values.
  db.settings({
    ignoreUndefinedProperties: true,
  });
} else {
  db = fs.app().firestore();
}
```

### 3. Error: 'Failed to parse private key: Error: Invalid PEM formatted message.'

- _Cause_: The private key used in `.env` file needs string formatting.
- _Solution_: Do this:

**Before**:

```js
  // serviceAccountKey.ts
  private_key: process.env.YOUR_PRIVATE_KEY,
```

**After**:

```js
  // serviceAccountKey.ts
  private_key: process.env.YOUR_PRIVATE_KEY.replace(/\\n/gm, '\n'),
```

## References

- [Getting started with Firebase for the web – Firebase Fundamentals](https://www.youtube.com/watch?v=rQvOAnNvcNQ)
- [How to upload a Json Data File to Firebase Firestore 2021](https://www.youtube.com/watch?v=I11O0UVp8PQ)
- [What is a NoSQL Database? How is Cloud Firestore structured? | Get to know Cloud Firestore #1](https://www.youtube.com/watch?v=v_hR4K4auoQ)
- [What's the Difference Between Cloud Firestore & Firebase Realtime Database?](https://www.youtube.com/watch?v=KeIx-mArUck)
- Import, Export JSON to/from Firestore
  - [Firebase: Import JSON To Cloud Firestore | By Jeff Lewis](https://levelup.gitconnected.com/firebase-import-json-to-firestore-ed6a4adc2b57)
  - [firestore-export-import | Firebase Open Source](https://firebaseopensource.com/projects/dalenguyen/firestore-backup-restore/)
- [CRUD with Firestore using the Node.js SDK](https://dev.to/retool/crud-with-firestore-using-the-node-js-sdk-anp)
- [[Firebase] Cloud Firestore — Add, Set, Update, Delete, Get data](https://saveyourtime.medium.com/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b)
