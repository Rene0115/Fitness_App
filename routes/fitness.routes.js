import express from 'express';
import fitnessController from '../controllers/fitness.controller.js';

const fitnessRouter = express.Router();

fitnessRouter.post('/create', fitnessController.create)
fitnessRouter.patch('/edit', fitnessController.edit)
fitnessRouter.delete('/delete', fitnessController.delete)
fitnessRouter.post('/createExercise', fitnessController.createExercise)
fitnessRouter.delete('/deleteExercise', fitnessController.deleteExercise)

export default fitnessRouter;