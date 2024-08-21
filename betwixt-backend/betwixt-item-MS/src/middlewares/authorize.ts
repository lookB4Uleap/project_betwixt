import { NextFunction, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { BetwixtRequest } from "../utils/betwixt-request";

interface AuthPayload {
    userId: string;
}

const authorize = (req: BetwixtRequest, res: Response, next: NextFunction) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (
        !req.headers.authorization ||
        !req.headers.authorization.split(" ")[1] ||
        !jwtSecretKey
    ) {
        res.status(403).json({ error: "Authorization Failed!" });
        return;
    }

    const authToken = req.headers.authorization.split(" ")[1];

    try {
        const { userId } = jwt.verify(authToken, jwtSecretKey) as AuthPayload;
        req.userId = userId; 
        next();
    } catch (err) {
        res.status(403).json({ error: "Authorization Failed!" });
        return;
    }
};

export default authorize;
