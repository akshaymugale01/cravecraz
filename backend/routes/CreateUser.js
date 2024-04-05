const express = require('express');
const User = require('../models/User'); // Importing the User model
const router = express.Router();

const { body, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtSecret = "MyNameisAkshay"

// POST request handler for creating a new user
router.post("/createuser",
    [
        body('email', 'invalid email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password', 'invalid Password!').isLength({ min: 5 })
    ]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Hash Key Password
        const salt = await  bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            // Using await directly with User.create and sending response afterward
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
                location: req.body.location,
            }).then(res.json({ success: true }))
            // Sending a JSON response indicating success

        } catch (error) {
            // If an error occurs during user creation, log the error and send a JSON response indicating failure
            console.log(error)
            res.json({ success: false, message: "Internal server error" });
        }
    });


router.post("/loginuser",
    [body('email').isEmail(),
    body('password', 'invalid Password!').isLength({ min: 5 })
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const email = req.body.email
        try {
            let userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ errors: "Try Logging with correct credentials" })
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password);

            // if(req.body.password !== userData.password) or without encrypted password 
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try Logging with correct credentials" })
            }
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)
            return res.json({ success: true, authToken:authToken })

        } catch (error) {
            console.log(error)
            res.json({ success: false, message: "Internal server error" });
        }
    });

module.exports = router; 