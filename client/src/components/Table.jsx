import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { updateCSVFile } from "../api/csv"
import Pagination from "./Pagination"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import Spinner from "./Spinner"

const Table = ({ tableColumns, tableData, tableSorting, sortOrder }) => {
  const [show, setShow] = useState(false)
  const { id } = useParams()

  /**
   * Implement Pagination
   */
  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 5

  // Get current page items
  const startIndex = (currentPage - 1) * itemPerPage
  const endIndex = startIndex + itemPerPage
  const currentPageItems = tableData.slice(startIndex, endIndex)

  /**
   * Mutation to update CSV file
   */
  const client = useQueryClient()

  const { mutate, isLoading } = useMutation(updateCSVFile, {
    onSuccess: () => {
      client.invalidateQueries(["csv"])
      toast.success("CSV file updated")
    },
    onError: err => {
      toast.error(err.response.data.message)
    },
  })

  const handleInputChange = (e, index, currentRow, key) => {
    // process body data
    const value = {
      data: e.target.value,
      row: currentRow.SL,
      col: index - 1,
    }

    // Return from this function if the input value is not changed!
    if (currentRow[key] === value.data) {
      setShow(false)
      return null
    }

    mutate({ id: id, value })
    !isLoading && setShow(false)
  }

  return (
    <div>
      <div className="">{isLoading && <Spinner />}</div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              {/* table columns  */}
              {tableColumns.map((col, i) => (
                <th key={i} onClick={() => tableSorting(col)}>
                  <div className="flex items-center cursor-pointer">
                    <span>{col}</span>
                    <span>
                      {col !== "SL" &&
                        (sortOrder === "asc" ? (
                          <ArrowSmUpIcon width={20} height={20} />
                        ) : (
                          <ArrowSmDownIcon width={20} height={20} />
                        ))}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* table rows  */}
            {currentPageItems.map((row, i) => {
              return (
                <tr key={i}>
                  {Object.entries(row).map(([key, value], ind) => {
                    return (
                      <td key={ind}>
                        <div
                          onClick={() => {
                            setShow(true)
                          }}
                        >
                          {show ? (
                            <input
                              type="text"
                              defaultValue={value}
                              className="w-full text-lg font-medium break-words max-w-[350px]"
                              onBlur={e => handleInputChange(e, ind, row, key)}
                              onKeyDown={e =>
                                e.key === "Enter" &&
                                handleInputChange(e, ind, row, key)
                              }
                            />
                          ) : (
                            <span>{value}</span>
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* pagination  */}
      <Pagination
        itemCount={tableData.length}
        itemPerPage={itemPerPage}
        pagination={page => setCurrentPage(page)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Table
