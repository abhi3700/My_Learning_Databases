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
