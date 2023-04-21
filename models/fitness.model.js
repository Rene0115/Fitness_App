import mongoose from "mongoose";

const FitnessProgramSchema = mongoose.Schema(
  {
    ProgramName: {
      type: String,
      required: true
    },

    Exercises: [
      {
        name: {
          type: String
        },
        length: {
          type: Number
        }
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

const fitnessModel = mongoose.model("FitnessProgram", FitnessProgramSchema);

export default fitnessModel;
