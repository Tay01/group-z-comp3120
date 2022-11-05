const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require('./config/serviceAccount.json');
const cors = require('cors');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();

//app.use(express.json());

// Later Use. For more security.
const corsOptions = {
    origin: "*",
    credentials: false,
    optionSuccessStatus: 200,
}

app.options('*', cors()) // include before other routes

//Add all urls to CORS whitelist - change later for security
app.use(cors(corsOptions));

//markers
app.use('/api/markers', require('./routes/api/markers'));



//user
app.use('/api/user', require('./routes/api/user'));


//other
app.get('/', (req, res) => {
    res.send('DIck balls and Hello');
});
// app.get('/', (req, res) => {
//     admin.firestore().collection('markers').onSnapshot(snapshot => {
//         let changes = snapshot.docChanges();
//         changes.forEach(change => {
//             if (change.type == 'added') {
//                 res.send(change.doc.data());
//             }
//         })
//     })
// });

exports.app = functions.https.onRequest(app)


exports.scheduledDelete = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
    console.log('This will be run every 1 minutes!');
    const db = admin.firestore();
    const now = Date.now();

    const query = db.collection('markers').where('metaData.timestamp', '<', now).limit(100);
    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve).catch(reject);
    });

    async function deleteQueryBatch(db, query, resolve) {
        const snapshot = await query.get();
        console.log("Checkpoint 1: " + snapshot)
        const batchSize = snapshot.size;
        if (batchSize === 0) {
            console.log("Checkpoint 2: " + batchSize)
            // When there are no documents left, we are done
            resolve();
            return;
        }

        // Delete documents in a batch
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
            console.log("Checkpoint 3: " + doc)
            batch.delete(doc.ref);
        });
        await batch.commit();

        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
            deleteQueryBatch(db, query, resolve);
        });
    }
})