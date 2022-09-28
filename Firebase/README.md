# Firebase

## About

- Firebase is Google's Database.
- It has 2 database types:
  - NoSQL i.e. Firestore DB
  - SQL i.e. Realtime DB

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
- Import JSON into Firestore
  - [Firebase: Import JSON To Cloud Firestore | By Jeff Lewis](https://levelup.gitconnected.com/firebase-import-json-to-firestore-ed6a4adc2b57)
  - [firestore-export-import | Firebase Open Source](https://firebaseopensource.com/projects/dalenguyen/firestore-backup-restore/)
