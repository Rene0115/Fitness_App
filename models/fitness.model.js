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
          type: Number,
          validate: {
            validator: function(v) {   // checks if the value is a number greater than zero
              return v % 1 === 0 && v > 0;
            },
            message: props => `${props.value} is not a positive integer`
          }
        }
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

const fitnessModel = mongoose.model("FitnessProgram", FitnessProgramSchema);

export default fitnessModel;
