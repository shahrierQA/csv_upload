import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getAllCSVFiles } from "../api/csv"
import Card from "./Card"
import Spinner from "./Spinner"

const CSVFile = () => {
  const [csvFiles, setCsvFiles] = useState([])

  /**
   * Query all csv files
   */
  const { isLoading } = useQuery(["csvs"], getAllCSVFiles, {
    onSuccess: data => {
      setCsvFiles(data?.data.csvFiles)
    },
  })

  return (
    <div className="max-w-6xl mt-14">
      {isLoading ? (
        <Spinner />
      ) : csvFiles.length === 0 ? (
        <p className="text-2xl font-semibold text-center ">
          Upload a new CSV file
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
          {csvFiles.map(item => (
            <Card key={item._id} fileName={item.csvFile} id={item._id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CSVFile
