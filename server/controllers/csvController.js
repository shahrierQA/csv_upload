const fs = require("fs")
const { promisify } = require("util")
const unLinkFile = promisify(fs.unlink)
const readline = require("readline")

const fastCSV = require("fast-csv")

const CSV = require("../models/CSV")
const upload = require("../middlewares/uploadFeatures")

/**
 * Upload CSV file
 */
const uploadCSVFile = upload.single("csvFile")

/** POST /api/csv
 * Create a new CSV file
 */
const createCSVFile = async (req, res) => {
  const file = req.file

  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Field empty!",
      })
    }

    /**
     * Check file size is greater than 5 megabytes
     */
    const FILE_SIZE = 5 * 1024 * 1024
    if (file && file.size > FILE_SIZE) {
      await unLinkFile(file.path)
      return res.status(400).json({
        status: "error",
        message: "File is too large",
      })
    }

    let csvFile
    if (file) csvFile = file.filename

    /**
     * Insert a new csv file into database
     */
    const csvData = await CSV.create({
      csvFile,
      originalFilename: req.file.originalname,
    })

    res.status(200).json({
      status: "success",
      data: { csv: csvData },
    })
  } catch (err) {
    res.json(err)
  }
}

/** GET /api/csv
 * Get all CSV file
 */
const getCSVFiles = async (req, res) => {
  try {
    // find all csv files
    const csvs = await CSV.find()

    res.status(200).json({
      status: "success",
      data: { csvFiles: csvs },
    })
  } catch (err) {
    res.json(err)
  }
}

/** GET /api/csv/:id
 * Get CSV file data by ID
 */
const getCSVDataById = async (req, res) => {
  const id = req.params.id

  try {
    /**
     * Get the CSV data by id
     */
    const csvData = await CSV.findById(id)

    /**
     * Throw an Error if the CSV not found!
     */
    if (!csvData)
      return res.status(404).json({
        status: "error",
        message: "CSV file not found!",
      })

    /**
     * Parse CSV file from the file system
     */
    const csvFiles = []
    const filePath = `${process.cwd()}/server/csv-data/${csvData.csvFile}`

    /**
     * Read csv file from the filesystem
     */
    fs.createReadStream(filePath)
      .pipe(fastCSV.parse({ headers: true }))
      .on("error", () => {
        return false
      })
      .on("data", data => csvFiles.push(data))
      .on("end", () => {
        res.status(200).json({
          status: "success",
          data: { csvFiles },
        })
      })
  } catch (err) {
    res.json(err)
  }
}

/** /** DELETE /api/csv/:id
 * Delete CSV file
 */
const deleteCSVFile = async (req, res) => {
  const id = req.params.id

  try {
    // find and remove csv file from database
    const csv = await CSV.findOneAndRemove({ _id: id })

    if (!csv) {
      return res.status(404).json({
        status: "error",
        message: "CSV file not found!",
      })
    }

    /**
     * At the same time, delete or unlink the csv file from the filesystem
     */
    await unLinkFile(`${process.cwd()}/server/csv-data/${csv.csvFile}`)

    res.status(204).json({
      status: "success",
    })
  } catch (err) {
    res.json(err)
  }
}

/** /** Update /api/csv/:id
 * Update CSV file
 */
const updateCSVFile = async (req, res) => {
  const id = req.params.id
  const { data, row, col } = req.body

  try {
    // find csv file by id
    const csvData = await CSV.findById(id)

    const filePath = `${process.cwd()}/server/csv-data/${csvData.csvFile}`
    let count = 0

    // creating readline interface
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
    })

    /** Reading data line by line
     *  find the row and column to mutate the data for inputs
     */
    let updatedLine = ""
    rl.on("line", function (line) {
      if (count++ === row) {
        const splitLine = line.split(",")
        splitLine[col] = data

        const maindata = splitLine.join(",")
        updatedLine += maindata + "\n"
      } else {
        updatedLine += line + "\n"
      }
    }).on("close", function () {
      // finally write updated line on the file
      fs.writeFile(filePath, updatedLine, err => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: "Internal server error!",
          })
        }
      })
    })

    res.status(200).json({
      status: "success",
      message: "CSV file updated",
    })
  } catch (err) {
    res.json(err)
  }
}

/**
 * Export all files
 */
module.exports = {
  createCSVFile,
  uploadCSVFile,
  getCSVFiles,
  getCSVDataById,
  deleteCSVFile,
  updateCSVFile,
}
