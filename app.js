import express from "express";
import pino from "pino";
import middleware from "./middlewares/middleware.js";
import database from "./config/db.config.js";


const app = express();

middleware(app);

const logger = pino();

const port = process.env.PORT || 3000;

const start = () => {
    database()
    app.listen(port , () => {
        logger.info(`Listening on ${port}`)
    })
}

start();


export default logger;