import express from "express";
import fitnessRouter from "./fitness.routes.js";

const router = express.Router();

router.use("/fitness", fitnessRouter);

export default router;