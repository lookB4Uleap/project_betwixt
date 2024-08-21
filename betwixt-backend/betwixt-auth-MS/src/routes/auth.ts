import 'dotenv/config';
import { Router, Request, Response } from "express";
import User from "../models/user";

const jwt = require("jsonwebtoken");

const router = Router();

const generateToken = (userId: string) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY
    const token = jwt.sign({
        time: Date(),
        userId
    }, jwtSecretKey);
    return token;
}

router.post('/', async (req: Request, res: Response) => {
    const user = req.body;
    if (!user?.email || !user?.name || !user?.uid) {
        // console.log("[Create Usser]", user);
        res.status(422).json({ message: "Missing Parameters" });
        return;
    }

    try {
        const newUser = new User(user);
        const createdUser = await newUser.save();

        res.status(200).json({
            user: {
                name: createdUser.name,
                email: createdUser.email,
                phone: createdUser.phone,
                photoUrl: createdUser.photoUrl,
                address: createdUser.address,
                city: createdUser.city,
                pincode: createdUser.pincode,
                authToken: generateToken(createdUser._id.toString())
            }
        });        
    } catch (error: any) {
        console.log('[Error] : ', error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
})

router.post('/auth', async (req: Request, res: Response) => {
    const { email, uid } = req.body;

    if (!email || !uid) {
        res.status(401).json({ message: "Email and UID required" });
        return;
    }

    try {
        const user = await User.find({ email, uid });

        if (user.length != 1) {
            res.status(401).json({ message: "Access Denied" });
            return;
        }

        res.status(200).json({
            user: {
                name: user[0].name,
                email: user[0].email,
                phone: user[0].phone,
                photoUrl: user[0]?.photoUrl,
                address: user[0].address,
                city: user[0].city,
                pincode: user[0].pincode,
                authToken: generateToken(user[0]._id.toString())
            }
        });
    } catch (error: any) {
        console.log('[Error] : ', error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/auth/provider', async (req: Request, res: Response) => {
    const user = req.body;
    if (!user?.email || !user?.name || !user?.uid) {
        // console.log("[Provider signin]", user);
        res.status(422).json({ message: "Missing Parameters" });
        return;
    }

    try {
        const currentUser = await User.findOneAndUpdate({
            email: user.email,
            uid: user.uid
        }, user, {
            new: true,
            upsert: true
        });

        res.status(200).json({
            user: {
                name: currentUser.name,
                email: currentUser.email,
                phone: currentUser.phone,
                photoUrl: currentUser.photoUrl,
                address: currentUser.address,
                city: currentUser.city,
                pincode: currentUser.pincode,
                authToken: generateToken(currentUser.uid.toString())
            }
        });        
    } catch (error: any) {
        console.log('[Error] : ', error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
})

export default router;
