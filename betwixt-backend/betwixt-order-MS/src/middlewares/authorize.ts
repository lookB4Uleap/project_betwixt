import { NextFunction, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { BetwixtRequest } from "../utils/betwixt-request";
import { getAuth } from 'firebase-admin/auth';

interface AuthPayload {
    userId: string;
}

const selfAuthorize = (authToken: string) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
        console.log('[Auth] Secret missing!');
        new Error('Authorization Failed');
        return;
    }

    // Synchronous code - error will be handled automatically by the custom error handler
    const { userId } = jwt.verify(authToken, jwtSecretKey) as AuthPayload;  
    // console.log('[Auth] ', {userId});
    return userId;
}

const firebaseAuthorize = async (authToken: string) => {
    try {
        const token = await getAuth().verifyIdToken(authToken);
        return token.uid;
    }
    catch (err) {
        console.log('[Firebase] Auth Failed! Trying with self authorization.');
        return selfAuthorize(authToken);
    }
}

export const authorize = async (req: BetwixtRequest, res: Response, next: NextFunction) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.split(" ")[1]
    ) {
        console.log('[OrderMS] Authorization Failed! Envs missing. ', { authorization: req.headers.authorization })
        // res.status(403).json({ error: "Authorization Failed!" });
        const authorizationFailedError = new Error('Authorization Failed');
        res.status(401);
        return next(authorizationFailedError);
    }

    const authToken = req.headers.authorization.split(" ")[1];

    const uid = await firebaseAuthorize(authToken);
    req.userId = uid;
    next();
};

export const verify = (req: BetwixtRequest, res: Response, next: NextFunction) => {
    const uid = req.userId;
    // console.log('[Verify] User', uid);
    if (!uid) {
        console.log('[Verify] UID missing!');
        const authorizationFailedError = new Error('Authorization Failed');
        res.status(401);
        return next(authorizationFailedError);
    }
    next();
}