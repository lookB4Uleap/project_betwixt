"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config"); // remember
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const orders_1 = __importDefault(require("./routes/orders"));
const app_1 = require("firebase-admin/app");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app = (0, express_1.default)();
const port = process.env.PORT || 6000;
// console.log(process.env.FIREBASE_CONFIG);
try {
    if (process.env.FIREBASE_CONFIG)
        (0, app_1.initializeApp)({
            credential: firebase_admin_1.default.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG))
        });
    console.log('[OrderMS] Firebase Initialized');
}
catch (err) {
    console.error(err);
}
const DATABASE_URL = process.env.DATABASE_URL;
DATABASE_URL && mongoose_1.default.connect(DATABASE_URL).then(() => console.log(`[OrderMS ${process.pid}] : Database Found`)).catch(err => console.log(err));
const db = mongoose_1.default.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log(`[OrderMS ${process.pid}] : Connected to database`));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Add rate limiter
app.get('/', (req, res) => {
    console.log(`Request processed at ${process.pid}`);
    res.send('Betwixt Order MS');
});
app.listen(port, () => {
    console.log(`[OrderMS ${process.pid}]: Server is running at http://localhost:${port}`);
});
app.use("/api/orders", orders_1.default);
// Custom error handlers must be at the end
app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging
    if (Math.floor(res.statusCode / 100) === 4)
        res.status(res.statusCode).json({ message: err.message });
    else if (err.name === 'JsonWebTokenError' || err.message === 'Authorization Failed')
        res.status(401).json({ message: 'Authorization Failed' });
    else
        res.status(500).json({ message: "Internal Server Error" });
});
