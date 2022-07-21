const multer = require("multer")

const fileStorage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, `${process.cwd()}/server/csv-data`)
  },

  filename: (req, file, next) => {
    const ext = file.mimetype.split("/")[1]

    const filename = `file-${
      file.originalname.split(" ")[0]
    }-${Date.now()}.${ext}`

    next(null, filename)
  },
})

// filtering file type that support only csv file
const typeFilter = (req, file, next) => {
  if (file.mimetype.includes("csv")) return next(null, true)
  else return next(new Error("Please upload only CSV file!"), false)
}

module.exports = multer({ storage: fileStorage, fileFilter: typeFilter })
