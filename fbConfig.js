require("firebase/auth");
const firebase = require('firebase')
const admin = require('firebase-admin')
const serviceAccount = require('./YOUR_PROJECT_SPECIAL_KEY.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://FIREBASE_PROJECT_NAME.firebaseio.com"
});

module.exports = { firebase, admin };