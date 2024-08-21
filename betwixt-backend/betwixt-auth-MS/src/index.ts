import express, {Express, Request, Response} from 'express';
import 'dotenv/config'; // remember
import cors from 'cors';
import  mongoose from 'mongoose';
import AuthRouter from './routes/auth';

const app: Express = express();
const port = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

DATABASE_URL && mongoose.connect(
    DATABASE_URL
).then(
    () => {
        console.log('[UserDB] : Database Found')
    }
)

const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () =>{ 
    console.log('[UserDB] : Connected to database')
})

app.use(cors());
app.use(express.json());

app.use('/api/users', AuthRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
