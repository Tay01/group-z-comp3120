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