import express, { json } from "express";
import cors from 'cors';
import login from "./routes/auth.js";
import cookieParser from "cookie-parser";
import session from "express-session";

import mongoUtils from './utils/mongodb.js';
const { closeMongodbConnection } = mongoUtils;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(session({
    secret: "yay",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 7
    }
}));

app.use('/auth', login);

const server = app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})

// const closeConnections = async () => {
//     try {
//       await closeMongodbConnection();
//       server.close(() => {
//         process.exit(0);
//       });
//     } catch (err) {
//       console.error("Error during shutdown:", err);
//       process.exit(1);
//     }
//   }
  
  // process.on('SIGINT', () => closeConnections());
  // process.on('SIGUSR2', () => closeConnections());