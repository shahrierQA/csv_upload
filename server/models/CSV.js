const mongoose = require("mongoose")

// define schema for csv
const csvSchema = new mongoose.Schema(
  {
    csvFile: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("csv", csvSchema)
