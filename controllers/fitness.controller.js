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
    const fitnessProgram = await fitnessModel.findOne({
      ProgramName: oldProgramName
    });

    if (_.isEmpty(fitnessProgram)) {
      return res.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: "Fitness program not found"
      });
    }
    const newName = req.body.newName;

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
  
}



}

export default new FitnessController();
