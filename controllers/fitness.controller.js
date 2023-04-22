import fitnessModel from "../models/fitness.model.js";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import logger from "../app.js";
class FitnessController {
  async create(req, res) {
    const data = {
      ProgramName: req.body.ProgramName
    };
    if (!data) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: "Cannot create fitness program without name"
      });
    }
    const fitnessProgram = await fitnessModel.create(data);
    if (!fitnessProgram) {
      return res.status(StatusCodes.EXPECTATION_FAILED).send({
        success: false,
        message: "Something went wrong"
      });
    }

    return res.status(StatusCodes.CREATED).send({
      success: true,
      data: fitnessProgram
    });
  }

  async edit(req, res) {
    const oldProgramName = req.body.programName;
    const newName = req.body.newName;

    if (!oldProgramName || !newName) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: 'Must provide old and new pogram name'
      })
    }
    const fitnessProgram = await fitnessModel.findOne({
      ProgramName: oldProgramName
    });

    if (_.isEmpty(fitnessProgram)) {
      return res.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: "Fitness program not found"
      });
    }
    

    try {
      fitnessProgram.updateOne({ ProgramName: newName });
      await fitnessProgram.save();
    } catch (err) {
      logger.error(err);
    }

    return res.status(StatusCodes.OK).send({
      success: true,
      message: `Your fitness program name was changed from ${oldProgramName} to ${newName}`
    });
  }

  async delete(req, res) {
    try {
      await fitnessModel.findByIdAndDelete(req.body.id);
    } catch (err) {
      logger.error(err);
    }
    return res.status(StatusCodes.ACCEPTED).send({
      success: true,
      message: `Fitness program successfully deleted`
    })
  }


async createExercise(req, res) {
  const fitnessProgram = await fitnessModel.findById(req.body.id);
  if (_.isEmpty(fitnessProgram)) {
    return res.status(StatusCodes.NOT_FOUND).send({
      success: false,
      message: `Could not find fitness program`
    })
  }

  const data = {
    name: req.body.name,
    length: req.body.length
  }

  if (!data.name || !data.length) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      success: false,
      message: 'must provide name and length'
    })
  }

  try {
    fitnessProgram.Exercises.push(data);
    await fitnessProgram.save();
    return res.status(StatusCodes.CREATED).send({
      data: fitnessProgram.Exercises,
      message: "Success"
    });
  }
  catch(error) {
    return logger.error(error);
  }

}

async deleteExercise(req, res) {
  const fitnessProgramId = req.body.id
  const exerciseName = req.body.name
  try {
    const result = await fitnessModel.updateOne(
      { _id: fitnessProgramId },
      { $pull: { Exercises: { name: exerciseName } } }
    );
   return res.status(StatusCodes.OK).send({
    data: result,
    success: true
   })
  } catch (error) {
   return logger.error(error);
  }
}



}

export default new FitnessController();
