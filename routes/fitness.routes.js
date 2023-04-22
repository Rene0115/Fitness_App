import express from 'express';
import fitnessController from '../controllers/fitness.controller.js';

const fitnessRouter = express.Router();

fitnessRouter.post('/create', fitnessController.create)

export default fitnessRouter;