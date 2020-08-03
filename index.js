const express = require('express');
const app = express();
const { admin } = require('./fbConfig');
const verify = require('./application/verifyToken');

app.get('/secretPage', verify, async (req, res) => {

    const uid = await req.uid;
    admin.auth().getUser(uid)
        .then(function (userRecord) {

            res.status(200).send("email: " + userRecord.email + "\nname: " + userRecord.displayName)
        })
        .catch(function (error) {
            console.log('Error fetching user data:', error);
        });

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Listening 5000'));