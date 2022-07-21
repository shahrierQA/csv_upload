import { useState } from "react"
import { useRef } from "react"
import FileUpload from "../components/FileUpload"
import { toast } from "react-toastify"
import { createCSVFile } from "../api/csv"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import CSVFile from "../components/CSVFile"

export default function HomePage() {
  /**
   * Initialize states
   */
  const [value, setValue] = useState()
  const [errorMessage, setErrorMessage] = useState("")
  const fileRef = useRef(null)

  /**
   * Mutation for create CSV file
   */
  const client = useQueryClient()
  const { mutate } = useMutation(createCSVFile, {
    onSuccess: () => {
      client.invalidateQueries(["csvs"])
      toast.success("Add a new CSV file")
    },

    onError: err => {
      toast.error(err.response.data.message)
    },
  })

  /**
   * Handle submit to submit CSV file
   */
  const handleSubmit = e => {
    e.preventDefault()

    const csvFormData = new FormData()
    csvFormData.set("csvFile", value)

    mutate(csvFormData)
    setValue("")
  }

  /**
   * Handle change to check if the file format is valid(CSV) or not
   */
  const handleChange = e => {
    setErrorMessage("")

    const value = e.currentTarget.files[0]
    if (!value?.type.includes("csv")) setErrorMessage("Please select CSV file!")

    setValue(value)
  }

  return (
    <div className="max-w-6xl px-6 mx-auto">
      <form
        className="flex items-end justify-between mt-5 space-x-4"
        onSubmit={handleSubmit}
      >
        {/* upload file input  */}
        <FileUpload
          fileRef={fileRef}
          name="csvFile"
          onChange={e => handleChange(e)}
        >
          {value?.name || "Import CSV"}
        </FileUpload>

        <button
          className="submit-btn"
          type="submit"
          disabled={errorMessage.length > 0 || !value}
        >
          Upload
        </button>
      </form>

      {/* show error message  */}
      <div className="py-2 font-medium text-red-600">{errorMessage}</div>

      {/* display all csv files  */}
      <CSVFile />
    </div>
  )
}
