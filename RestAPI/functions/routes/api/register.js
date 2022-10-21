const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const generatePassword = require('password-generator');

const admin = require('firebase-admin');
const db = admin.firestore();

router.get('/', (req, res) => {
    res.send('register page');
});

router.post(
    '/',
    [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Email is not in the correct format.').isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {name, email} = req.body;

        try {
            const userRef = db.collection('users');

            let user = await userRef.where('email', '==', email).get()

            console.log(user)

            if(!user.empty){
                return res.status(400).json({errors: 'This email has been used.'})
            }

            const id = generatePassword(8, false);

            await db.collection('users').doc(id).set({
                id,
                name,
                email
            });

            const payload = {
                user: {
                    id,
                    name
                }
            }

            console.log(payload)

            jwt.sign(
                payload,
                config.get('jwtpass'),
                {expiresIn: 40000},
                (err, token) => {
                    if(err) throw err;
                    res.json({token})
                }
            )

        
        } catch (error) {
            res.status(500).send(`Server Error ${error}`);
        }
    }
);

module.exports = router;