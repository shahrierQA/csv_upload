import { SearchIcon } from "@heroicons/react/outline"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getCSVFile } from "../api/csv"
import Table from "../components/Table"
import sorting from "../lib/sorting"

export default function CSVSinglePage() {
  const { id } = useParams() // get id from query params

  /**
   * Initialize states
   */
  const [tableData, setTableData] = useState([])
  const [tableColumns, setTableColumns] = useState([])
  const [sortOrder, setSortOrder] = useState("asc")

  /**
   * Query to get csv file data
   */
  useQuery(["csv"], () => getCSVFile(id), {
    onSuccess(data) {
      const files = data?.data?.csvFiles

      // define serial number on table
      const newFiles = []
      for (let i = 0; i < files.length; i++) {
        newFiles.push({ SL: i + 1, ...files[i] })
      }

      setTableData(newFiles)
      setTableColumns(Object.keys(newFiles[0]))
    },
  })

  /**
   * Implement table sorting functionality: ASC or DESC
   */
  const tableSorting = col => {
    if (col !== "SL") {
      if (sortOrder === "asc") {
        const data = sorting(tableData, col, "asc")

        setTableData(data)
        setSortOrder("desc")
      }

      if (sortOrder === "desc") {
        const data = sorting(tableData, col, "desc")

        setTableData(data)
        setSortOrder("asc")
      }
    }
  }

  /**
   * Implement search functionality
   */
  const [query, setQuery] = useState("")
  const handleSearch = data => {
    return data.filter(item => {
      return tableColumns.some(col => {
        if (col !== "SL") return item[col].toLowerCase().includes(query)
      })
    })
  }

  return (
    <div className="px-12 my-10">
      {/* search input field  */}
      <div className="relative max-w-2xl mb-4">
        <input
          type="search"
          placeholder="Search on this table..."
          className="w-full px-10 py-3 text-lg border rounded-md border-slate-200 focus:outline-none"
          onChange={e => {
            setQuery(e.target.value.toLowerCase())
          }}
        />
        <div className="absolute left-3 top-4 text-slate-700">
          <SearchIcon width={24} height={24} />
        </div>
      </div>

      {/* Display table */}
      <Table
        tableColumns={tableColumns}
        tableData={handleSearch(tableData)}
        sortOrder={sortOrder}
        tableSorting={tableSorting}
      />
    </div>
  )
}
