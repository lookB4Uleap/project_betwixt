"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config"); // remember
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;
DATABASE_URL && mongoose_1.default.connect(DATABASE_URL).then(() => {
    console.log('[UserDB] : Database Found');
});
const db = mongoose_1.default.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => {
    console.log('[UserDB] : Connected to database');
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/users', auth_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
