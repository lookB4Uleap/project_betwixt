import express, { Express, NextFunction, Request, Response } from 'express';
import 'dotenv/config'; // remember
import cors from 'cors';
import mongoose from 'mongoose';
import orderRouter from './routes/orders';
import { BetwixtRequest } from './utils/betwixt-request';
import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';


const app: Express = express();
const port = process.env.PORT || 6000;

// console.log(process.env.FIREBASE_CONFIG);

try {
    if (process.env.FIREBASE_CONFIG)
    initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG))
    });
    console.log('[OrderMS] Firebase Initialized');
} 
catch(err) {
    console.error(err);
}

const DATABASE_URL = process.env.DATABASE_URL;

DATABASE_URL && mongoose.connect(
    DATABASE_URL
).then(
    () => console.log(`[OrderMS ${process.pid}] : Database Found`)
).catch(err => console.log(err))

const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log(`[OrderMS ${process.pid}] : Connected to database`));

app.use(cors());
app.use(express.json());

// Add rate limiter

app.get('/', (req: Request, res: Response) => {
    console.log(`Request processed at ${process.pid}`);
    res.send('Betwixt Order MS');
});

app.listen(port, () => {
    console.log(`[OrderMS ${process.pid}]: Server is running at http://localhost:${port}`);
});

app.use("/api/orders", orderRouter);

// Custom error handlers must be at the end
app.use((err: Error, req: BetwixtRequest, res: Response, next: NextFunction) => {
    console.error(err); // Log the error for debugging

    if (Math.floor(res.statusCode/100) === 4)
        res.status(res.statusCode).json({ message: err.message });
    else if(err.name === 'JsonWebTokenError' || err.message === 'Authorization Failed')
        res.status(401).json({message: 'Authorization Failed'});
    else
        res.status(500).json({message: "Internal Server Error"});
});