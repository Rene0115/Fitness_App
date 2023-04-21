import fitnessModel from "../models/fitness.model.js";
import { StatusCodes } from "http-status-codes";

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
        })
    }

    return res.status(StatusCodes.CREATED).send({
        success: true,
        data: fitnessProgram
    })
  }

  
}
