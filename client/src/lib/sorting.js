const sorting = (data, column, order) => {
  const sortedData = [...data].sort((rowA, rowB) => {
    if (order === "asc") {
      return rowA[column].toLowerCase() > rowB[column].toLowerCase() ? 1 : -1
    }
    if (order === "desc") {
      return rowA[column].toLowerCase() < rowB[column].toLowerCase() ? 1 : -1
    }
  })

  return sortedData
}

export default sorting
