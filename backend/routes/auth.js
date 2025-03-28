import express from "express";
import bcrypt from "bcrypt";
import mongoUtils from '../utils/mongodb.js';
const { connectToMongoDB, closeMongodbConnection } = mongoUtils;

const router = express.Router();

const saltRounds = 10;

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('users');

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        await collection.insertOne({ firstName, lastName, email, password: hash });

        //check how to use jwt instead of sessions
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email
        };

        req.session.email = userData.email;
        res.json({ ok: true, userData });
    } catch (err) {
        console.error(err);
        res.json({ ok: false, message: "Failed to save the user data in the database." });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('users');

        const user = await collection.findOne({ email: email });
        
        if (user) {
            const response = await bcrypt.compare(password, user.password);

            if (response) {
                const userData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                };

                req.session.email = userData.email;
                res.json({ ok: true, userData });
            }
            else {
                // res user or password not matched (security reasons)
                res.json({ ok: false, message: "User or password is not correct!" });
            }
        }
        else {
            // res user or password not matched (security reasons)
            res.json({ ok: false, message: "User or password is not correct!" });
        }

    } catch (err) {
        console.error(err);
        res.json({ ok: false, message: "Failed loading user data from the database." });
    }
});

router.post("/login-with-google", async (req, res) => {
    const { userData } = req.body;
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('users');

        const user = await collection.findOne({ email: userData.email });
        if (!user) 
            await collection.insertOne(userData);

        req.session.email = userData.email;
        res.json({ ok: true });
    } catch (err) {
        console.error(err);
        res.json({ ok: false, message: "Failed loading user data from the database." });
    }
});

router.get("/load-user", async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('users');

        if (req.session.email) {
            const user = await collection.findOne({ email: req.session.email });
            if (user) {
                const userData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                };
                res.json({ ok: true, userData });
            }
            else {
                res.json({ ok: false, message: "Session expired, please login again!" });
            }
        }
    } catch (err) {
        console.error(err);
        res.json({ ok: false, message: "Failed loading user data from the database." });
    }
});

router.post("/logout", async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.json({ ok: false });
            }
            res.clearCookie('connect.sid');
            res.json({ ok: true });
        })
    } catch (err) {

    }
});

export default router;
