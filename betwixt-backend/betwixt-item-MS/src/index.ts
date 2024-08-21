import express, {Express, NextFunction, Request, Response} from 'express';
import 'dotenv/config'; // remember
import cors from 'cors';
import mongoose from 'mongoose';
import ItemRouter from './routes/dishes';
import { BetwixtRequest } from './utils/betwixt-request';

const app: Express = express();
const port = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;
let connection = true;

DATABASE_URL && mongoose.connect(
    DATABASE_URL
).then(
    () => {
        console.log('[ItemDB] : Database Found')
    }
).catch(err => {
    console.log(err);
    connection = false;
})

const db = mongoose.connection
db.on('error', err => {
    console.error(err);
    connection = false;
})
db.once('open', () =>{ 
    console.log('[ItemDB] : Connected to database')
})

app.use(cors());
app.use(express.json());

connection && app.use('/api/items', ItemRouter);

connection && app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

connection && app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Custom error handlers must be at the end
app.use((err: Error, req: BetwixtRequest, res: Response, next: NextFunction) => {
    console.error(err); // Log the error for debugging

    if (Math.floor(res.statusCode/100) === 4)
        res.status(res.statusCode).json({ message: err.message });
    else if(err.name === 'JsonWebTokenError')
        res.status(401).json({message: 'Authorization Failed'});
    else
        res.status(500).json({message: "Internal Server Error"});
});
