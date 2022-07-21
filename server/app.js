const express = require("express")
const mongoose = require("mongoose")
const app = express()

const cors = require("cors")
require("dotenv").config()

app.use(cors())
app.options("*", cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Import Controllers
 */
const {
  createCSVFile,
  uploadCSVFile,
  getCSVDataById,
  getCSVFiles,
  deleteCSVFile,
  updateCSVFile,
} = require("./controllers/csvController")

/**
 * Mount Routers
 */
app.route("/api/csv").post(uploadCSVFile, createCSVFile).get(getCSVFiles)
app
  .route("/api/csv/:id")
  .get(getCSVDataById)
  .delete(deleteCSVFile)
  .patch(updateCSVFile)

/**
 * Handle Global Errors
 */
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  })

  next()
})

/******************************************************************** */

/**
 * Connect to the database
 */
const DB = process.env.DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected successfully..."))
  .catch(err => {
    console.log(err)
    console.log("💥 FAILED to connect database!! 💥")
  })

const PORT = process.env.PORT || 8270
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}...`)
})
