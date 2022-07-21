import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline"

const Pagination = ({
  itemCount,
  itemPerPage,
  currentPage,
  setCurrentPage,
}) => {
  // define total pages
  const totalPages = Math.ceil(itemCount / itemPerPage) || 1

  /**
   * Implement immediately goto page handler
   */
  const handleGotoPage = e => {
    if (!e.target.value) return setCurrentPage(1)
    const val = Number(e.target.value)

    /**
     * Return null and go to first page,
     * if the given page number is not exist
     */
    if (totalPages < val) {
      e.target.value = ""
      setCurrentPage(1)
      return null
    }
    setCurrentPage(val)
  }

  return (
    <div className="flex items-center justify-between mt-8">
      <div className="space-x-1 text-base font-semibold text-gray-700">
        Page {currentPage} of {totalPages}
      </div>

      {totalPages > 1 && (
        <>
          {/* go to page button  */}
          <div className="flex items-center space-x-3">
            <h4 className="font-semibold text-gray-700">Go to</h4>
            <input
              type="number"
              className="w-16 h-8 p-3 text-sm border border-gray-400 rounded focus:outline-none"
              defaultValue={1}
              onChange={e => handleGotoPage(e)}
            />
          </div>

          {/* pagination button  */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="page-btn"
              disabled={currentPage === 1}
            >
              <ChevronDoubleLeftIcon width={22} height={22} />
            </button>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="page-btn"
              disabled={currentPage === totalPages}
            >
              <ChevronDoubleRightIcon width={22} height={22} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Pagination
