const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'Adarshisagood$dollarboyrichierich'
// Create a User using POST "/api/auth/createuser" . Doesn't require Auth
router.post('/createuser', [
    body('name', 'Enter a Valid Name of min 3 letters').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Enter a Valid Password').isLength({ min: 5 }),
], async (req, res) => {
    // If there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        //  Creating User
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email aldready exists" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
})

// Authenticate a User using POST "/api/auth/login" 
router.post('/login', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password Cannot be Blank').exists(),
], async (req, res) => {
    // If there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Sorry Invalid Credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Sorry Invalid Credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ")
    }
});

//Getting User info by  using POST "/api/auth/getuser" 
router.post('/getuser',fetchuser,async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ")
    }
})
module.exports = router