import { ExternalLinkIcon, TrashIcon } from "@heroicons/react/outline"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { deleteCSVFile } from "../api/csv"
import { toast } from "react-toastify"

const Card = ({ fileName, id }) => {
  /**
   * Mutation to delete CSV file
   */
  const client = useQueryClient()
  const { mutate } = useMutation(deleteCSVFile, {
    onSuccess: () => {
      client.invalidateQueries("csv")
    },

    onError: err => {
      toast.error(err.response.data.message)
    },
  })

  const handleDelete = () => {
    if (
      window.confirm("Are you sure you want to delete this file ?") === true
    ) {
      mutate(id)
    }
  }

  return (
    <div className="flex items-center justify-between p-5 text-lg font-semibold rounded-md shadow-md bg-blue-50 text-ellipsis">
      <div className="flex items-center space-x-4">
        <h4>{fileName}</h4>
        <div>
          <Link to={`/csv/${id}`} className="text-blue-400">
            <ExternalLinkIcon width={24} height={24} />
          </Link>
        </div>
      </div>

      <button className="text-red-600" onClick={() => handleDelete()}>
        <TrashIcon width={24} height={24} />
      </button>
    </div>
  )
}

export default Card
