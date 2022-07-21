import axios from "axios"

const createCSVFile = values => {
  return axios.post("/api/csv", values).then(res => res.data)
}

const getAllCSVFiles = () => {
  return axios("/api/csv").then(res => res.data)
}

const getCSVFile = id => {
  return axios(`/api/csv/${id}`).then(res => res.data)
}

const deleteCSVFile = id => {
  return axios.delete(`/api/csv/${id}`).then(res => res.data)
}

const updateCSVFile = ({ id, value }) => {
  return axios.patch(`/api/csv/${id}`, value).then(res => res.data)
}

export {
  createCSVFile,
  getAllCSVFiles,
  getCSVFile,
  deleteCSVFile,
  updateCSVFile,
}
