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

app.use(express.json());

// Later Use. For more security.
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

//Add all urls to CORS whitelist - change later for security
app.use(cors(corsOptions));

app.use('/api/markers', require('./routes/api/markers'));

app.get('/', (req, res) => {
    res.send('Super Hello');
});

exports.app = functions.https.onRequest(app)