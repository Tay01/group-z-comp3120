const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require('../../config/serviceAccount.json');
const cors = require('cors');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

//Add all urls to CORS whitelist - change later for security
app.use(cors())


app.use('/api/register', require('./routes/api/register'));

app.use('/api/markers', require('./routes/api/markers'));

app.get('/', (req, res) => {
    res.send('Hello');
});

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})