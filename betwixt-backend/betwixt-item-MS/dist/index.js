"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config"); // remember
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dishes_1 = __importDefault(require("./routes/dishes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;
let connection = true;
DATABASE_URL && mongoose_1.default.connect(DATABASE_URL).then(() => {
    console.log('[ItemDB] : Database Found');
}).catch(err => {
    console.log(err);
    connection = false;
});
const db = mongoose_1.default.connection;
db.on('error', err => {
    console.error(err);
    connection = false;
});
db.once('open', () => {
    console.log('[ItemDB] : Connected to database');
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
connection && app.use('/api/items', dishes_1.default);
connection && app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
connection && app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
// Custom error handlers must be at the end
app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging
    if (Math.floor(res.statusCode / 100) === 4)
        res.status(res.statusCode).json({ message: err.message });
    else if (err.name === 'JsonWebTokenError')
        res.status(401).json({ message: 'Authorization Failed' });
    else
        res.status(500).json({ message: "Internal Server Error" });
});
